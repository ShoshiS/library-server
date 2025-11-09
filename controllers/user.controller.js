import users from '../users.js'


export const getAllUser= (req,res)=>{
    res.json(users)
}

 export const sign_in =(req,res)=>{
     const {userName , password} =req.body
    const user = users.find(x=>x.userName === userName)
    if(!user)
        return res.status(404).json({message: `user ${userName} not found`})
    if(user.password !== password)
        return res.status(400).json({message: `password is incorect`})

    res.json(user)
}

//sign up
export const sign_up=(req,res)=>{

    const {userName , password,email} =req.body
    if(users.find(x=>x.userName===userName))
        return res.status(400).json({message: `user ${userName} already exists`})

    const newUser = {userName,password,email,borrowBooksArr:[]}
    users.push(newUser)
    res.send(newUser)
}