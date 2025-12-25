import type { BookSchema } from '../../../db/models/book-schema.js';

const isBook = (value: unknown): value is BookSchema =>
  !!value &&
  typeof value === 'object' &&
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

export const typeguards = { isBook };
