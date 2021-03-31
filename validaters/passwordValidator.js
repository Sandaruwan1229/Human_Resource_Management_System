
const Joi=require('joi')
const passwordValidator=Joi.object().options({abortEarly:false}).keys({
    password:Joi.string().required().label('password'),
    new_password:Joi.string().required().label('new_password'),
    confirm_new_password:Joi.string().required().label('confirm_new_password').valid(Joi.ref('new_password')).label("confirm_new_password")
    .messages({ 'any.only': '{{#label}} does not match "New Password"' }),
   
})
module.exports=passwordValidator