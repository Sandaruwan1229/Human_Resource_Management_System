const Joi = require('joi')


const loginValidator =Joi.object().options({abortEarly: false}).keys({
    id: Joi.string().required().label("id").min(8),
    password: Joi.string().required().label("password")
})

const adminLoginValidator =Joi.object().options({abortEarly: false}).keys({
    id: Joi.string().required().label("id").min(8),
    password: Joi.string().required().label("password")
})


module.exports={loginValidator ,adminLoginValidator};
