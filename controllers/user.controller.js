import users from '../users.js'
import validateUser from '../models/user.model.js'
import { User} from '../models/user.model.js'
import bcrypt from 'bcryptjs'


export const getAllUser= async (req,res)=>{
    try {
        const users = await User.find({});
        res.status(200).json(users);
    }
    catch (error) {
        next({ status: 500, message: error.message });
    }
}

 export const login = async (req,res,next) => {
    try{
        const {userName , password} =req.body
        
        const {error} = validateUser.login.validate(req.body)
        if(error) 
            return next({ status: 400, message: error.details[0].message });

        const user = await User.findOne({ userName })
        if(!user)
            return next({ status: 404, message: `User ${userName} not found` });
        
        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch)
            return next({ status: 400, message: 'password is incorrect' });


        res.status(200).json(user)
    }
    catch(error){
        next({status: 500, message: error.message})
    }
}


export const register = async (req, res, next) => {
    const { userName } = req.body;

    const { error } = validateUser.register.validate(req.body)
    if (error) {
        return next({ status: 400, message: error.details[0].message })
    }

    try {
        const existingUser = await User.findOne({ userName })
        if (existingUser) {
            return next({status: 400, message: `user ${userName} already exists`})
        }

        const newUser = new User(req.body);
        await newUser.save();

        return res.status(201).json(newUser);
    } catch (error) {
        return next({ status: 500, message: error.message });
    }
};


export const update = (req,res,next)=>{
        
    const user = login();
    user = user.find(x=>x.userName ===parseInt(req.params.userName))


    const {userName, password, phone, email} = req.body

    user.password = password
    user.phone = phone
    user.email = email
    
    res.json(user)
}