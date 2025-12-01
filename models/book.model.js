import Joi from "joi";
import { model, Schema } from "mongoose";

const bookSchema = new Schema({
    name: {type: String, unique: true},
    price: Number,
    category: [String],
    author: {
        _id: Schema.Types.ObjectId,
        name: String,
        phone: Number,
        email: String
    },
    isBorrowed: Boolean
})

export const Book = model('Book',bookSchema)

const validateBook = Joi.object({
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
