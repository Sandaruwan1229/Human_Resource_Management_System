const Joi=require('joi')
const leaveCountValidator=Joi.object().options({abortEarly:false}).keys({
    anual:Joi.number().required().label('anual'),
    casual:Joi.number().required().label('casual'),
    maternity:Joi.number().required().label('maternity'),
    no_pay:Joi.number().required().label('no_pay')
})
module.exports={leaveCountValidator}