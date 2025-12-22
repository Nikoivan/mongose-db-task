import { createClient } from 'redis';

const REDIS_URL = process.env.REDIS_URL || '';

export const redisClient = await createClient({ url: REDIS_URL })
  .on('error', (err: Error) => console.log('Redis Client Error', err))
  .connect();
