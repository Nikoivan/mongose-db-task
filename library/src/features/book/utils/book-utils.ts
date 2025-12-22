import * as fs from 'node:fs';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import type { Book } from '~/db/entities/book.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const bookdir = path.resolve(
  __dirname,
  '..',
  '..',
  '..',
  '..',
  'public',
  'books',
);

const createBookFile = (bookPart: Omit<Book, 'path'>): Promise<Book> => {
  return new Promise((resolve, reject) => {
    const path = `${bookdir}/${bookPart.id}-book.json`;
    const book = { ...bookPart, path };

    const writeStream = fs.createWriteStream(path);

    writeStream.on('finish', () => resolve(book));
    writeStream.on('error', reject);

    writeStream.write(JSON.stringify(book, null, 2));
    writeStream.end();
  });
};

const getViewCount = (value: unknown): number =>
  !!value &&
  typeof value === 'object' &&
  'viewCount' in value &&
  typeof value.viewCount === 'string'
    ? Number(value.viewCount)
    : 0;

export const bookUtils = { createBookFile, getViewCount };
