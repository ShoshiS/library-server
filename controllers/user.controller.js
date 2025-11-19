import users from '../users.js'
import { errorRouteHandler } from '../middlewares/errors.middlewares.js'
import validateUser from '../models/user.model.js'


export const getAllUser= (req,res)=>{
    res.json(users)
}

 export const login =(req,res,next)=>{

    const {userName , password} =req.body
    
    const {error} = validateUser.login.validate(req.body)
    if(error) 
        return next({ status: 400, message: error.details[0].message });
    
    const user = users.find(x=>x.userName === userName)

    if(!user)
        return next({ status: 404, message: `User ${userName} not found` });
    if(user.password !== password)
        return next({status:400 ,message: `password is incorect`});

    res.json(user)
}

export const register=(req,res,next)=>{

    const {userName , password,email} =req.body

    const {error} = validateUser.register.validate(req.body)
    if(error)
        return next({status:400 ,message: error.details[0].message})

    if(users.find(x=>x.userName===userName))
       return next({status:400 ,message: `user ${userName} already exists`})

    const newUser = {userName,password,email,borrowBooksArr:[]}
    users.push(newUser)
    res.send(newUser)
}