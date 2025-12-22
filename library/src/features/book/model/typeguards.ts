import type { Book } from '../../../db/entities/book.js';

const isBookPart = (value: unknown): value is Omit<Book, 'path'> =>
  !!value &&
  typeof value === 'object' &&
  'id' in value &&
  typeof value.id === 'string' &&
  'title' in value &&
  typeof value.title === 'string' &&
  'description' in value &&
  typeof value.description === 'string' &&
  'authors' in value &&
  typeof value.authors === 'string' &&
  'favorite' in value &&
  typeof value.favorite === 'string' &&
  'fileCover' in value &&
  typeof value.fileCover === 'string' &&
  'fileName' in value &&
  typeof value.fileName === 'string';

const isBook = (value: unknown): value is Book =>
  !!value &&
  isBookPart(value) &&
  'path' in value &&
  typeof value.path === 'string';

export const typeguards = { isBookPart, isBook };
