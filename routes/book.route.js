
import { Router } from 'express'
import { printCurrentDate } from '../middlewares/middlewaresDate.js';
import {getAllBooks,getBookById,addBook,updateBook,borrowBook,returnBarrowedBook,deletBook} from '../controllers/book.controller.js'

const router = Router();

router.get('/',printCurrentDate,getAllBooks)

router.get('/:id',printCurrentDate,getBookById)

router.post('/',addBook)

router.put('/:id',updateBook)

router.patch('/borrow/:id/:username',borrowBook)

router.patch('/:id',returnBarrowedBook)

router.delete('/:id',deletBook)

export default router;