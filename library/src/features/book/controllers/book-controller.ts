import type { NextFunction, Request, Response } from 'express';

import type { Book } from '../../../db/entities/book.js';
import { mockDb } from '../../../db/mock-db.js';
import { BookError } from '../../book/model/book-error.js';
import { typeguards } from '../../book/model/typeguards.js';
import { bookUtils } from '../../book/utils/book-utils.js';
import { handleError } from '../../user/utils/handler-utils.js';

class BookController {
  public getBooks(_: Request, response: Response, next: NextFunction): void {
    try {
      const books: Book[] = mockDb.book.getBooks();

      if (!books) {
        throw new BookError('Ошибка получения книг', 404);
      }

      response.set('Content-Type', 'application/json').status(200).json(books);
    } catch (error) {
      handleError(response, next, error);
    }
  }

  public getUniqBook(
    request: Request,
    response: Response,
    next: NextFunction,
  ): void {
    try {
      const { id } = request.params;

      if (!id) {
        throw new BookError('Отсутствует идентификатор книги', 404);
      }

      const book = mockDb.book.getUniqBook(id);

      if (!id) {
        throw new BookError(`Книга с идентификаторм ${id} не найдена`, 404);
      }

      response.set('Content-Type', 'application/json').status(200).json(book);
    } catch (error) {
      handleError(response, next, error);
    }
  }

  public getBookPath(
    request: Request,
    response: Response,
    next: NextFunction,
  ): void {
    try {
      const { id } = request.params;

      if (!id) {
        throw new BookError('Отсутствует идентификатор книги', 404);
      }

      const book = mockDb.book.getUniqBook(id);

      if (!book) {
        throw new BookError(`Книга с идентификаторм ${id} не найдена`, 404);
      }

      const bookPath = book.path;

      response.sendFile(bookPath, err => {
        if (err) next(err);
      });
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
      const bookPart = request.body;

      const isBook = typeguards.isBookPart(bookPart);

      if (!isBook) {
        throw new BookError(
          `Validation error! ${JSON.stringify(bookPart)} in not Book.`,
        );
      }

      const book = await bookUtils.createBookFile(bookPart);
      const createdBook = mockDb.book.createBook(book);

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

  public updateBook(
    request: Request,
    response: Response,
    next: NextFunction,
  ): void {
    try {
      const { id } = request.params;

      if (!id) {
        throw new BookError('Отсутствует идентификатор книги', 404);
      }

      const foundedBook = mockDb.book.getUniqBook(id);

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

      const updatedBook = mockDb.book.updateBook({ ...book, id });

      if (!updatedBook) {
        throw new BookError('Ошибка при обновление книги');
      }

      response.set('Content-Type', 'application/json').status(200).json(book);
    } catch (error) {
      handleError(response, next, error);
    }
  }

  public deleteBook(
    request: Request,
    response: Response,
    next: NextFunction,
  ): void {
    try {
      const { id } = request.params;

      if (!id) {
        throw new BookError('Отсутствует идентификатор книги', 404);
      }

      const book = mockDb.book.deleteBook(id);

      if (!book) {
        throw new BookError(`Книга с идентификаторм ${id} не найдена`, 404);
      }

      response.set('Content-Type', 'application/json').status(200).json('Ok');
    } catch (error) {
      handleError(response, next, error);
    }
  }

  public uploadBook(request: Request, response: Response) {
    if (!request.file) return response.json();

    const { path } = request.file;

    response.json({ path });
  }
}

export const bookController = new BookController();
