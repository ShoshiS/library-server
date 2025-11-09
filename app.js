import express from 'express';
import booksRouter from './routes/book.route.js'
import usersRouter from './routes/user.route.js'
import {addCurrentDate }from './middlewares/middlewaresDate.js'

const app = express();

app.use(addCurrentDate)

app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.use('/books', booksRouter);
app.use('/users',usersRouter);

const port = 5000
app.listen(port,()=>{
    console.log('wellcome to my site');
})