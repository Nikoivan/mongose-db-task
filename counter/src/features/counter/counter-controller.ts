import type { Request, Response } from 'express';

import { redisClient } from '../../db/redisClient.js';

class CounterController {
  public async incrementCount(
    request: Request,
    response: Response,
  ): Promise<void> {
    const { bookId } = request.params;

    try {
      if (!bookId) {
        throw new Error('Missing id in queryParams');
      }

      const viewCount = await redisClient.incr(bookId);

      response.status(201).send({ success: true, viewCount });
    } catch (error) {
      response.status(400).json({
        success: false,
        error:
          error instanceof Error ? error.message : 'Unknown error occurred',
      });
    }
  }

  public async getCountById(
    request: Request,
    response: Response,
  ): Promise<void> {
    const { bookId } = request.params;

    try {
      if (!bookId) {
        throw new Error('Missing id in queryParams');
      }

      const viewCount = await redisClient.get(bookId);

      if (viewCount === null) {
        throw new Error('Count not found');
      }

      response.status(201).send({ success: true, viewCount });
    } catch (error) {
      response.status(400).json({
        success: false,
        error:
          error instanceof Error ? error.message : 'Unknown error occurred',
      });
    }
  }
}

export const counterController = new CounterController();
