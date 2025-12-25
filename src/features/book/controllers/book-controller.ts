import type { NextFunction, Request, Response } from 'express';

import { Book, type BookSchema } from '../../../db/models/book-schema.js';
import { handleError } from '../../user/utils/handler-utils.js';
import { BookError } from '../model/book-error.js';
import { typeguards } from '../model/typeguards.js';

class BookController {
  public async getBooks(
    _: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const books: BookSchema[] = await Book.find();

      if (!books) {
        throw new BookError('Ошибка получения книг', 404);
      }

      response.set('Content-Type', 'application/json').status(200).json(books);
    } catch (error) {
      handleError(response, next, error);
    }
  }

  public async getUniqBook(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = request.params;

      if (!id) {
        throw new BookError('Отсутствует идентификатор книги', 404);
      }

      const book = await Book.findById(id);

      if (!book) {
        throw new BookError(`Книга с идентификаторм ${id} не найдена`, 404);
      }

      response.set('Content-Type', 'application/json').status(200).json(book);
    } catch (error) {
      handleError(response, next, error);
    }
  }

  public async createBook(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const book = request.body;

      const isBook = typeguards.isBook(book);

      if (!isBook) {
        throw new BookError(
          `Validation error! ${JSON.stringify(book)} in not Book.`,
        );
      }

      const createdBook = await Book.create(book);

      if (!createdBook) {
        throw new BookError('Ошибка при создание книги');
      }

      response
        .set('Content-Type', 'application/json')
        .status(200)
        .json(createdBook);
    } catch (error) {
      handleError(response, next, error);
    }
  }

  public async updateBook(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = request.params;

      if (!id) {
        throw new BookError('Отсутствует идентификатор книги', 404);
      }

      const foundedBook = await Book.findById(id);

      if (!foundedBook) {
        throw new BookError(`Книга с идентификаторм ${id} не найдена`, 404);
      }

      const book = request.body;

      const isBook = typeguards.isBook(book);

      if (!isBook) {
        throw new BookError(
          `Validation error! ${JSON.stringify(book)} in not Book.`,
        );
      }

      const updatedBook = await Book.findByIdAndUpdate({ ...book, _id: id });

      if (!updatedBook) {
        throw new BookError('Ошибка при обновление книги');
      }

      response
        .set('Content-Type', 'application/json')
        .status(200)
        .json(updatedBook);
    } catch (error) {
      handleError(response, next, error);
    }
  }

  public async deleteBook(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = request.params;

      if (!id) {
        throw new BookError('Отсутствует идентификатор книги', 404);
      }

      const book = await Book.deleteOne({ _id: id });

      if (!book) {
        throw new BookError(`Книга с идентификаторм ${id} не найдена`, 404);
      }

      response.set('Content-Type', 'application/json').status(200).json('Ok');
    } catch (error) {
      handleError(response, next, error);
    }
  }
}

export const bookController = new BookController();
