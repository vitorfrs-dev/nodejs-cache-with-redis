![Redis and Node JS](src/assets/image.png)

# Simple implementation of cache with Node JS and Redis database

This repository is a simple implementation of cache using Node JS and redis database. 

## How to run?
You must have a redis instance running in the port ``6379`` in your machine, i recommend you to install redis trhough docker.

``docker run --name redis-cache -p 6379:6379 -d redis:alpine``

With redis running, you just need to start the application. 

Inside of the application folder run ``yarn start``

## Routes

There are only two routes on this app.

```
GET /users/:user
````
This route takes a user as a req.param and make a request to ``https://api.github.com/users/{user}``, then return the result and save it on cache.

By the next time that the same request be made, the answer will be much more quickly, because it is already saved in cache.

```
POST /users/cleanCache
````
This route deletes all the keys that are stored in redis that starts with the cache prefix. The cache prefix is defined in the constructor of the ``Cache`` class.




