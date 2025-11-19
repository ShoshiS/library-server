import express from 'express';
import booksRouter from './routes/book.route.js'
import usersRouter from './routes/user.route.js'
import {addCurrentDate }from './middlewares/date.middlewares.js'
import { errorHandler, errorRouteHandler } from './middlewares/errors.middlewares.js';
import cors from 'cors';
import morgan from 'morgan';

const app = express();

app.use(addCurrentDate);

app.use(morgan('dev'))
app.use(cors());


app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use('/books', booksRouter);
app.use('/users',usersRouter);

app.use(errorRouteHandler)
app.use(errorHandler)

const port = 5000
app.listen(port,()=>{
    console.log('wellcome to my site');
})