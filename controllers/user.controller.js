import users from '../users.js'
import { errorRouteHandler } from '../middlewares/errors.middlewares.js'

export const getAllUser= (req,res)=>{
    res.json(users)
}

 export const sign_in =(req,res)=>{
     const {userName , password} =req.body
    const user = users.find(x=>x.userName === userName)

    if(!user)
        next(errorRouteHandler(req,res,next))
    if(user.password !== password)
        next({status:400 ,message: `password is incorect`})

    res.json(user)
}

//sign up
export const sign_up=(req,res)=>{

    const {userName , password,email} =req.body

    if(users.find(x=>x.userName===userName))
        next({status:400 ,message: `user ${userName} already exists`})

    const newUser = {userName,password,email,borrowBooksArr:[]}
    users.push(newUser)
    res.send(newUser)
}