import books from '../db.js'
import users from '../users.js'
import { Router } from 'express'

const router = Router();

router.get('/',(req,res)=>{
    const {page =1 , limit =5,name =''} = req.query
    parseInt(page)
    parseInt(limit)
    const result = books
        .filter(b => b.name.includes(name))
        .slice((page-1)*limit , page*limit)

    res.json(result)
})

router.get('/:id',(req,res)=>{
    const book = books.find(x=>x.id === +req.params.id)
    if (!book) return res.status(404).json( {message:`book ${req.params.id} not found`});
    res.json(book)
})

router.post('/',(req,res)=>{
    books.push(req.body)
    res.send(req.body)
})

router.put('/:id',(req,res)=>{
    const book = books.find(x=>x.id ===parseInt(req.params.id))
    if (!book)
        return res.status(404).json({message:`book ${req.params.id} not found`});

    if(parseInt(req.params.id)!==req.body.id)
        return res.status(409).json({message:`id in body not match to params id`})
    
    const {name , category,price} = req.body
    book.name = name
    book.category = category
    book.price = price
    
    res.json(book)
})

//borrow book
router.patch('/borrow/:id/:username',(req,res)=>{

    const id = +(req.params.id)
    const userName = req.params.username

    const book = books.find(x=>x.id === id)
    const user = users.find(x=>x.userName === userName)

    if (!book)
        return res.status(404).json({message:`book ${id} not found`});
    if(book.isBorrowed===true)
        return res.status(400).json({message:'Book is already borrowed'})
    if(!user)
        return res.status(404).json({message:`user ${userName} not found`})

    book.isBorrowed = true
    book.borrowArr.push({name:userName,date:new Date()})
    user.borrowBooksArr.push(id)

    res.json(book)
})

//return book
router.patch('/:id',(req,res)=>{
    const id = +(req.params.id)
    const book = books.find(x=>x.id === id)  
    if (!book)
        return res.status(404).json({message:`book ${id} not found`});
    
    const user = users.find(x=>x.userName === book.borrowArr[book.borrowArr.length-1].name)
    user.borrowBooksArr = user.borrowBooksArr.filter(x=>x!==id)
    book.isBorrowed = false

    res.json(book)
})

//delet book
router.delete('/:id',(req,res)=>{
    const index = books.findIndex(x => x.id === parseInt(req.params.id))
    if (index === -1)
        return res.status(404).json({message:`book ${req.params.id} not found`})
    books.splice(index, 1);
    res.status(204).end();
})

export default router;