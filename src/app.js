import express from 'express';
import api from './services/api';
import redis from 'redis';

import Cache from './utils/cache';

const client = redis.createClient();

const cache = new Cache(client, 'ch');
const app = express();

app.use(express.json());

app.get('/users/:user', async (req, res) => {
  const { user } = req.params;

  // cache first
  const cacheData = await cache.getItem(`ch:${user}`);
  if (cacheData) {
    console.log('returning data from cache')
    return res.json(JSON.parse(cacheData));
  }

  const { data: userData } = await api.get(`/users/${user}`);

  console.log('returning data from source and defining data to cache');
  await cache.setItem(user, userData, 600);

  return res.json(userData);
});

app.post('/cleanCache', async (req, res) => {
  await cache.destroyAll();

  return res.sendStatus(200);
});

export default app;
