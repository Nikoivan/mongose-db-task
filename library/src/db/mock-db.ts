import { BookEntity } from '../db/entities/book.js';
import { UserEntity } from '../db/entities/user.js';

class MockDb {
  _user: UserEntity = new UserEntity();

  public get user() {
    return this._user;
  }

  _book: BookEntity = new BookEntity();

  public get book() {
    return this._book;
  }
}

export const mockDb: MockDb = new MockDb();
