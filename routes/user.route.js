import users from '../users.js'
import { Router } from 'express'

const router = Router();

//show all users
router.get('/',(req,res)=>{
    res.json(users)
})

//sign in
router.get('/:username/:password',(req,res)=>{
    const user = users.find(x=>x.userName === req.params.username)
    if(!user)
        return res.status(404).json({message: `user ${req.params.username} not found`})
    if(user.password !== req.params.password)
        return res.status(400).json({message: `password is incorect`})

    res.json(user)
})

//sign up
router.post('/sign-up',(req,res)=>{

    const {userName , password,email} =req.body
    if(users.find(x=>x.userName===userName))
        return res.status(400).json({message: `user ${userName} already exists`})

    const newUser = {userName,password,email,borrowBooksArr:[]}
    users.push(newUser)
    res.send(newUser)
})

export default router
