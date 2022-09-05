import { createClient } from 'redis';
import { promisify } from 'util';

class RedisClient {
  constructor() {
    this.client = createClient();
    this.clientGetAsync = promisify(this.client.get).bind(this.client);
    this.client.on('error', (err) => console.log(err));
    this.client.on('connect', () => console.log());
  }

  isAlive() {
    return this.client.connected;
  }

  async get(key) {
    const res = await this.clientGetAsync(key);
    return res;
  }

  async set(key, value, duration) {
    return this.client.setex(key, duration, value);
  }

  async del(key) {
    return this.client.del(key);
  }
}

const redisClient = new RedisClient();

export default redisClient;
