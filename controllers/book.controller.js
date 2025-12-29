import books from '../db.js'
import users from '../users.js'
import validateBook from '../models/book.model.js'
import { Book } from '../models/book.model.js'
import { isValidObjectId } from 'mongoose'

//get all books
export const getAllBooks = async (req,res,next)=>{

    const {page =1 , limit =5,name =''} = req.query

    try{
        const result = await Book.find({ name: new RegExp(name,'i')})
        .skip( (page-1) *limit)
        .limit(parseInt(limit));

        res.json(result)
    }
    catch(error){
        next({message: error.message})
    } 
}

//get book by id
export const getBookById = async(req,res,next)=>{
    const {id} = req.params

    try{
        if(!isValidObjectId(id))
            next({status: 404, message: `ID invalid`});

        const book = await Book.findById(id)

         if (!book)
            next({status: 404, message: `book ${req.params.id} not found`});

        res.json(book)    
    }
    catch(error){
        next({status: error.status, message: error.message})
    }
}

//add book
export const addBook = async (req,res,next)=>{

    const {error} = validateBook.validate(req.body);
    if(error)
        return next({status:400 ,message: error.details[0].message});
    
    try{
        const newbook = new Book({
            ...req.body,
            img: req.file?.path
        });

        await newbook.save();

        res.send(req.body);
    }
    catch(error){
        next({})
    }
}

//update book
export const updateBook = async (req,res,next)=>{

    const {id} = req.params
    try{
        const book = await Book.findByIdAndUpdate(id,
            { $set: req.body },
            {new: true}
        )
        if (!book)
            next({status: 404, message: `book ${req.params.id} not found`});
        if(Number(req.params.id)!==req.body.id)
            next({status :409,message:`id in body not match to params id`});
    
    res.json(book)
    }
    catch(error){
        next({})
    }
}

//borrow book
export const borrowBook =(req,res,next)=>{

    const id = +(req.params.id)
    const userName = req.params.username

    const book = books.find(x=>x.id === id)
    const user = users.find(x=>x.userName === userName)

    if (!book)
        next({status: 404 ,message: `book ${id} not found`});
    if(book.isBorrowed===true)
        next({status: 400, message:'Book is already borrowed'})
    if(!user)

    book.isBorrowed = true
    book.borrowArr.push({name:userName,date:new Date()})
    user.borrowBooksArr.push(id)

    res.json(book)
}

//return book
export const returnBarrowedBook = (req,res,next)=>{
    const id = +(req.params.id)
    const book = books.find(x=>x.id === id)  
    
    
    if (!book)
        next({status: 404 ,message: `book ${id} not found`});
    
    const user = users.find(x=>x.userName === book.borrowArr[book.borrowArr.length-1].name)
    user.borrowBooksArr = user.borrowBooksArr.filter(x=>x!==id)
    book.isBorrowed = false

    res.json(book)
}

//delet book
export const deletBook = async (req,res,next)=>{
    
   const {id} = req.params

    try{
        const book = await Book.findByIdAndUpdate(id,{
            $set: req.body
        })
        if (!book)
            next({status: 404 , message: `book ${req.params.id} nod fount`});
    
     res.status(204).end();
    }
    catch(error){
        next({message: error.message})
    }
}
