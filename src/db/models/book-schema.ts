import { model, Schema } from 'mongoose';

export type BookSchema = {
  id: string;
  title: string;
  description: string;
  authors: string;
  favorite: string;
  fileCover: string;
  fileName: string;
};

const bookSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  authors: { type: String, required: true },
  favorite: { type: String, required: true },
  fileCover: { type: String, required: true },
  fileName: { type: String, required: true },
});

export const Book = model<BookSchema>('Book', bookSchema);
