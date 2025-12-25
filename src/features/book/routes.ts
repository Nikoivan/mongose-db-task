import { Router } from 'express';

import { bookController } from '../book/controllers/book-controller.js';

export const bookRouter = Router();

bookRouter.get('/', bookController.getBooks);
bookRouter.get('/:id', bookController.getUniqBook);
bookRouter.post('/', bookController.createBook);
bookRouter.put('/:id', bookController.updateBook);
bookRouter.delete('/:id', bookController.deleteBook);
