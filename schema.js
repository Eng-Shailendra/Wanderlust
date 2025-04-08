const joi = require("joi");

const listingSchema = joi.object({
    title: joi.string().required(),
    description: joi.string().required(),
    images: joi.array().items(joi.string().allow("", null)),
    price: joi.number().required().min(0),
    country: joi.string().required(),
    location: joi.string().required()
})




// review schema 

const reviewSchema = joi.object({
    review: joi.object({
        rating: joi.number().min(1).max(5).required(),
        message: joi.string().required()

    }).required()
})

module.exports = { listingSchema, reviewSchema };