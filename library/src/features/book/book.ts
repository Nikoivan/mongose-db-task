import type { Book } from '../../db/entities/book.js';

export class BookClass implements Book {
  id: string;
  title: string;
  description: string;
  authors: string;
  favorite: string;
  fileCover: string;
  fileName: string;
  path: string;

  constructor(book: Book) {
    this.title = book.title;
    this.id = book.id;
    this.description = book.description;
    this.authors = book.authors;
    this.favorite = book.favorite;
    this.fileCover = book.fileCover;
    this.fileName = book.fileName;
    this.path = book.path;
  }
}
