import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path'
import { fileURLToPath } from 'url';
import booksRouter from './routes/book.route.js'
import usersRouter from './routes/user.route.js'
import {addCurrentDate }from './middlewares/date.middlewares.js'
import { errorHandler, errorRouteHandler } from './middlewares/errors.middlewares.js';


const app = express();


//app.use(morgan('dev'))
app.use(cors());


app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static('public'));

app.use(addCurrentDate);

app.use('/books', booksRouter);
app.use('/users',usersRouter);

app.use(errorRouteHandler)
app.use(errorHandler)

const port = 5000
app.listen(port,()=>{
    console.log('wellcome to my site');
})