import jwt from 'jsonwebtoken'

export const auth = (req, res, next) =>{
    try{

        const {authorization = ''} = req.headers
        const [,token] =authorization.split(' ')

        const secretKey = process.env.JWT_SECRET ?? "secretKey"
        const data = jwt.verify(token,secretKey)
        
        req.currentUser = data
        next()

    }catch(error){
        next({status:403,message: `Authentication failed`})
    }
}

export const isAdmin = (req,res,next) =>{

    if(req.currentUser.role === 'admin')
        return next()
    return next ({status:401, message:`Authorization failed (no permissions)`})
}