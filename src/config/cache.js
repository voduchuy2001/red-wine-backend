import { BAD_REQUEST } from '@constants/http.status.code'
import CacheException from '@exceptions/cache.exception'
import Redis from 'ioredis'

class RedisCache {
  constructor() {
    this.client = new Redis({
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      password: process.env.REDIS_PASSWORD,
      db: process.env.REDIS_DB
    })
  }

  async set(key, value, expiry = 3600) {
    try {
      await this.client.set(key, value, 'EX', expiry)
    } catch (error) {
      throw new CacheException(BAD_REQUEST, error.message)
    }
  }

  async setex(key, value, expiry = 3600) {
    try {
      await this.client.setex(key, expiry, value)
    } catch (error) {
      throw new CacheException(BAD_REQUEST, error.message)
    }
  }

  async get(key) {
    try {
      return this.client.get(key)
    } catch (error) {
      throw new CacheException(BAD_REQUEST, error.message)
    }
  }

  async del(key) {
    try {
      await this.client.del(key)
    } catch (error) {
      throw new CacheException(BAD_REQUEST, error.message)
    }
  }

  async sadd(key, members) {
    try {
      if (!Array.isArray(members)) {
        members = [members]
      }
      return await this.client.sadd(key, ...members)
    } catch (error) {
      throw new CacheException(BAD_REQUEST, error.message)
    }
  }

  async srem(key, members) {
    try {
      if (!Array.isArray(members)) {
        members = [members]
      }
      return await this.client.srem(key, ...members)
    } catch (error) {
      throw new CacheException(BAD_REQUEST, error.message)
    }
  }

  async smembers(key) {
    try {
      return await this.client.smembers(key)
    } catch (error) {
      throw new CacheException(BAD_REQUEST, error.message)
    }
  }

  async exists(key) {
    try {
      return await this.client.exists(key)
    } catch (error) {
      throw new CacheException(BAD_REQUEST, error.message)
    }
  }

  async expire(key, seconds) {
    try {
      return await this.client.expire(key, seconds)
    } catch (error) {
      throw new CacheException(BAD_REQUEST, error.message)
    }
  }
}

export default new RedisCache()
