export type Book = {
  id: string;
  title: string;
  description: string;
  authors: string;
  favorite: string;
  fileCover: string;
  fileName: string;
  path: string;
  viewCount?: number;
};

export class BookEntity {
  books: Book[] = [
    {
      id: '1',
      title: 'Война и Мир',
      description: 'Some Description',
      authors: 'Lev Tolstoy',
      favorite: 'Junost',
      fileCover: 'Some file cover',
      fileName: 'book.json',
      path: '/public/books/book.json',
    },
  ];

  public getBooks(): Book[] {
    return this.books;
  }

  public getUniqBook(id: string) {
    return this.books.find(book => book.id === id);
  }

  public createBook(book: Book): Book {
    this.books.push(book);

    return book;
  }

  public deleteBook(id: string) {
    const currentBook = this.books.find(book => book.id === id);

    if (!currentBook) {
      throw new Error('Current book does not exist');
    }

    this.books = this.books.filter(book => book.id !== book.id);

    return currentBook;
  }

  public updateBook(book: Book) {
    this.deleteBook(book.id);

    this.books.push(book);

    return book;
  }
}
