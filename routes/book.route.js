
import { Router } from 'express'
import {getAllBooks,getBookById,addBook,updateBook,borrowBook,returnBarrowedBook,deletBook} from '../controllers/book.controller.js'

const router = Router();

router.get('/',getAllBooks)

router.get('/:id',getBookById)

router.post('/',addBook)

router.put('/:id',updateBook)

router.patch('/borrow/:id/:username',borrowBook)

router.patch('/:id',returnBarrowedBook)

router.delete('/:id',deletBook)

export default router;