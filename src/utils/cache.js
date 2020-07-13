class Cache {
  constructor(client, prefix = 'cache') {
    this.client = client;
    this.prefix = prefix;
  }

  setItem = (key, value, expiresIn = null) => new Promise((resolve, reject) => {
    let data = value;

    if (typeof data !== 'string') {
      data = JSON.stringify(value);
    }

    if (expiresIn) {
      this.client.setex(`${this.prefix}:${key}`, expiresIn, data, (err, reply) => {
        if (err) {
          reject(err)
        }
        resolve(reply);
      });
    } else {
      this.client.set(`${this.prefix}:${key}`, data, (err, reply) => {
        if (err) {
          reject(err)
        }
        resolve(reply);
      });
    }
  })

  getItem = key => new Promise((resolve, reject) => {
    this.client.get(key, (err, reply) => {
      if (err) {
        reject(err)
      } else {
        resolve(reply)
      }
    })
  });

  destroyItem(key) {
    this.client.del(key);
  }

  destroyAll = () => new Promise((resolve, reject) => {
    this.client.keys(`${this.prefix}*`, (err, keys) => {
      if (err) {
        reject(err)
      }

      keys.forEach(item => {
        this.client.del(item)
      });

      resolve(true);
    });
  });
}

export default Cache;