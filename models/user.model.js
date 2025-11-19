import Joi from 'joi'

const validateUser ={
    login: Joi.object({

        userName: 
            Joi.string()
            .pattern(/[a-z]/)
            .pattern(/[A-Z]/)
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
    })
}
export default validateUser