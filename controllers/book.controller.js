import books from '../db.js'
import users from '../users.js'
import validateBook from '../models/book.model.js'

//get all books
export const getAllBooks = (req,res)=>{
    const {page =1 , limit =5,name =''} = req.query
    parseInt(page)
    parseInt(limit)
    const result = books
        .filter(b => b.name.includes(name))
        .slice((page-1)*limit , page*limit)

    res.json(result)
}

//get book by id
export const getBookById = (req,res,next,next)=>{


    const book = books.find(x=>x.id === +req.params.id)

    if (!book) 
        next({status: 404 , message: `book ${req.params.id} not found`})


    if (!book) 
        next({status: 404 , message: `book ${req.params.id} not found`})

    res.json(book)
}

//add book
export const addBook = (req,res)=>{

    const {error} = validateBook.validateBook.validate(req.body)
    if(error)
        return next({status:400 ,message: error.details[0].message})
    books.push(req.body)

    res.send(req.body)
}

//update book
export const updateBook = (req,res)=>{

    const book = books.find(x=>x.id ===parseInt(req.params.id))
    
    if (!book)
        next({status: 404, message: `book ${req.params.id} not found`});
    if(parseInt(req.params.id)!==req.body.id)
        next({status :409,message:`id in body not match to params id`});
    
    const {name , category,price} = req.body
    book.name = name
    book.category = category
    book.price = price
    
    res.json(book)
}

//borrow book
export const borrowBook =(req,res)=>{

    const id = +(req.params.id)
    const userName = req.params.username

    const book = books.find(x=>x.id === id)
    const user = users.find(x=>x.userName === userName)

    if (!book)
        next({status: 404 ,message: `book ${id} not found`});
        next({status: 404 ,message: `book ${id} not found`});
    if(book.isBorrowed===true)
        next({status: 400, message:'Book is already borrowed'})
        next({status: 400, message:'Book is already borrowed'})
    if(!user)
        next({status: 404 ,message:`user ${user} not found`});
        next({status: 404 ,message:`user ${user} not found`});

    book.isBorrowed = true
    book.borrowArr.push({name:userName,date:new Date()})
    user.borrowBooksArr.push(id)

    res.json(book)
}

//return book
export const returnBarrowedBook = (req,res)=>{
    const id = +(req.params.id)
    const book = books.find(x=>x.id === id)  
    
    
    if (!book)
        next({status: 404 ,message: `book ${id} not found`});
        next({status: 404 ,message: `book ${id} not found`});
    
    const user = users.find(x=>x.userName === book.borrowArr[book.borrowArr.length-1].name)
    user.borrowBooksArr = user.borrowBooksArr.filter(x=>x!==id)
    book.isBorrowed = false

    res.json(book)
}

//delet book
export const deletBook = (req,res)=>{
    const index = books.findIndex(x => x.id === parseInt(req.params.id))
    if (index === -1)
        next({status: 404 , message: `book ${req.params.id} nod fount`});
        next({status: 404 , message: `book ${req.params.id} nod fount`});
    books.splice(index, 1);
    res.status(204).end();
}
