import Joi from "joi";

const validateBook = Joi.object({
    id: Joi.number()
        .integer()
        .positive()
        .required(),

    name: Joi.string()
        .min(1)
        .required(),

    category: Joi.string()
        .min(1)
        .required(),

    price: Joi.number()
        .positive()
        .required(),

    isBorrowed: Joi.boolean()
        .required(),

});

export default validateBook
