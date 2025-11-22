import users from '../users.js'
import { errorRouteHandler } from '../middlewares/errors.middlewares.js'
import validateUser from '../models/user.model.js'


export const getAllUser= (req,res)=>{
    res.json(users)
}

 export const login =(req,res,next)=>{

    const {useruserName , password} =req.body
    
    const {error} = validateUser.login.validate(req.body)
    if(error) 
        return next({ status: 400, message: error.details[0].message });
    
    const user = users.find(x=>x.useruserName === useruserName)

    if(!user)
        return next({ status: 404, message: `User ${useruserName} not found` });
    if(user.password !== password)
        return next({status:400 ,message: `password is incorect`});

    res.json(user)
}

export const register=(req,res,next)=>{

    const {useruserName, password, email, phone} =req.body

    const {error} = validateUser.register.validate(req.body)
    if(error)
        return next({status:400 ,message: error.details[0].message})

    if(users.find(x=>x.useruserName===useruserName))
       return next({status:400 ,message: `user ${useruserName} already exists`})

    const newUser = {useruserName,password,email,phone,borrowusersArr:[]}
    users.push(newUser)

    res.send(newUser)
}

export const update = (req,res,next)=>{
        
    const user = login();
    user = user.find(x=>x.userName ===parseInt(req.params.userName))


    const {userName, password, phone, email} = req.body

    user.password = password
    user.phone = phone
    user.email = email
    
    res.json(user)
}