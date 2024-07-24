import Redis from 'ioredis'

class RedisCache {
  constructor() {
    this.client = new Redis({
      host: process.env.REDIS_HOST || 'localhost',
      port: process.env.REDIS_PORT || 6379,
      password: process.env.REDIS_PASSWORD || '',
      db: process.env.REDIS_DB || 0
    })
  }

  async set(key, value, expiry = 3600) {
    await this.client.set(key, value, 'EX', expiry)
  }

  async get(key) {
    return await this.client.get(key)
  }

  async del(key) {
    await this.client.del(key)
  }
}

export default new RedisCache()
