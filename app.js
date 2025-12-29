import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { fileURLToPath } from 'url';
import booksRouter from './routes/book.route.js'
import usersRouter from './routes/user.route.js'
import {addCurrentDate }from './middlewares/date.middlewares.js'
import { errorHandler, errorRouteHandler } from './middlewares/errors.middlewares.js';
import { config } from 'dotenv';
import { connectDB } from './config/db.js';

config();

const app = express();

connectDB();

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

const port = process.env.PORT ?? 5000;
app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`)
});