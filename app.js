import express from 'express'
import books from './db.js'

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))
//3
//-

//i
app.get('/books',(req,res)=>{
    const {page =1 , limit =5,name =''} = req.query
    parseInt(page)
    parseInt(limit)
    const result = books
        .filter(b => b.name.includes(name))
        .slice((page-1)*limit , page*limit)

    res.json(result)
})

//ii
app.get('/books/:id',(req,res)=>{
    const b = books.find(x=>x.id === +req.params.id)
    if (!b) return res.status(404).json( {message:`book ${req.params.id} not found`});
    res.json(b)
})

//iii
app.post('/books',(req,res)=>{
    books.push(req.body)
    res.send(req.body)
})

//iv
app.put('/books/:id',(req,res)=>{
    const b = books.find(x=>x.id ===parseInt(req.params.id))
    if (!b)
        return res.status(404).json({message:`book ${req.params.id} not found`});

    if(parseInt(req.params.id)!==req.body.id)
        return res.status(409).json({message:`id in body not match to params id`})
    
    const {name , category,price} = req.body
    b.name = name
    b.category = category
    b.price = price
    
    res.json(b)
})

//v
app.patch('/books/borrow/:id/:username',(req,res)=>{
    const book = books.find(x=>x.id ===parseInt(req.params.id))
    if (!book)
        return res.status(404).json({message:`book ${req.params.id} not found`});
    if(book.isBorrowed===true)
        return res.status(400).json({message:'Book is already borrowed'})
    
    book.isBorrowed = true
    const b ={name:req.params.username,date:new Date()}
    book.borrowArr.push(b)
    res.json(book)
})

//vi
app.patch('/books/:id',(req,res)=>{
    const b = books.find(x=>x.id ===parseInt(req.params.id))
    if (!b)
        return res.status(404).json({message:`book ${req.params.id} not found`});
    b.isBorrowed = false
    res.json(b)
})

//vii
app.delete('/books/:id',(req,res)=>{
    const index = books.findIndex(x => x.id === parseInt(req.params.id))
    if (index === -1)
        return res.status(404).json({message:`book ${req.params.id} not found`})
    books.splice(index, 1);
    res.status(204).end();
})

const port = 5000
app.listen(port,()=>{
    console.log('wellcome to my site');
})