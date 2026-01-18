import Joi from 'joi'
import {model,Schema} from 'mongoose'
import bcrypt from 'bcryptjs'
import { update } from '../controllers/user.controller.js'


const userSchema = new Schema({
    userName: {type: String , unique: true},
    password: String,
    email: String,
    phone: String,
    role: { type:String, enums: ['admin', 'user'], required: true }
})

userSchema.pre('save',function(){
    const salt = bcrypt.genSaltSync(12)
    const hash = bcrypt.hashSync(this.password, salt)
    this.password = hash
})

userSchema.method('comparePasswords', function (newPassword){

    const isEqual = bcrypt.compareSync(newPassword, this.password)

    return isEqual
})

userSchema.set('toJSON',{
    virtuals: true,
    transform(doc, converted){
        delete converted.__v
        delete converted._id
        delete converted.password
    }
})

export const User = model('User',userSchema)

const validateUser ={
    login: Joi.object({

        userName: 
            Joi.string()
            .pattern(/^[A-Za-z]+$/)
            .required(),
        password: 
            Joi.string()
            .min(8)
            .max(20)
            .pattern(/^[A-Z a-z 0-9 @!?*&%$]+$/)
            .required()
    }),

    register: Joi.object({
        userName: 
            Joi.string()
            .pattern(/^[A-Za-z]+$/)
            .required(),
        password: 
            Joi.string()
            .min(8)
            .max(20)
            .pattern(/^[A-Z a-z 0-9 @!?*&%$]+$/)
            .required(),
        repeat_password: 
            Joi.ref('password'),
        email: 
            Joi.string().email()
            .required(),
        phone: 
            Joi.string()
            .pattern(/^0?(([23489]{1}[0-9]{7})|[57]{1}[0-9]{8})+$/)
            .required(),
    }),
    update: Joi.object({
        password:
            Joi.string()
            .min(8)
            .max(20)
            .pattern(/^[A-Z a-z 0-9 @!?*&%$]+$/)
            .required(),
        phone: 
            Joi.string()
            .pattern(/^0?(([23489]{1}[0-9]{7})|[57]{1}[0-9]{8})+$/)
            .required(),
        email: 
                Joi.string().email()
                .required(),
    })
}
export default validateUser