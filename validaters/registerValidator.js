const Joi=require('joi')
const customAttributesValidaterHelper =require('../helpers/customAttributesValidaterHelper')


const registerValidator=Joi.object().options({abortEarly:false}).keys({
    NIC:Joi.string().required().label('NIC').min(10),
    first_name:Joi.string().required().label('first_name'),
    middle_name:Joi.string().allow(null).allow("").label('middle_name'),
    last_name:Joi.string().allow(null).allow("").label('last_name'),
    gender:Joi.string().required().label('gender'),
    birthday:Joi.string().required().label('birthday'),

    address:Joi.string().required().label('address'),
    city:Joi.string().required().label('city'),
    postal_code:Joi.string().required().label('postal_code'),
    country:Joi.string().required().label('country'),
    
    email:Joi.string().required().label('email'),
    password:Joi.string().required().label('password'),
    branch_name:Joi.string().required().label("branch_name"),
    job_title:Joi.string().required().label("job_title"),
    dept_name:Joi.string().required().label("dept_name"),
    paygrade_level:Joi.string().required().label("paygrade_level"),
    e_status_name:Joi.string().required().label("e_sataus_name")
   
})


const adminRegisterValidator=Joi.object().options({abortEarly:false}).keys({
    NIC:Joi.string().required().label('NIC').min(10),
    first_name:Joi.string().required().label('first_name'),
    middle_name:Joi.string().allow(null).allow("").label('middle_name'),
    last_name:Joi.string().allow(null).allow("").label('last_name'),
    gender:Joi.string().required().label('gender'),
    birthday:Joi.string().required().label('birthday'),

    address:Joi.string().required().label('address'),
    city:Joi.string().required().label('city'),
    postal_code:Joi.string().required().label('postal_code'),
    country:Joi.string().required().label('country'),
    phone:Joi.string().trim().required().length(10, 'utf8').message('"phone" must be 10 digits'),

    email:Joi.string().required().label('email'),
    password:Joi.string().required().label('password'),
    photo:Joi.string().required().label('photo'),

    securityKey:Joi.string().required().label("securityKey")
});

const  addHRvalidatorWrapper=async(params)=> {
    const result=await  customAttributesValidaterHelper();
    
    const s=`addHRvalidator=Joi.object().options({abortEarly:false}).keys({
        NIC:Joi.string().required().label('NIC').min(10),
        first_name:Joi.string().required().label('first_name'),
        middle_name:Joi.string().allow(null).allow("").label('middle_name'),
        last_name:Joi.string().allow(null).allow("").label('last_name'),
        gender:Joi.string().required().label('gender'),
        birthday:Joi.string().required().label('birthday'),
    
        address:Joi.string().required().label('address'),
        city:Joi.string().required().label('city'),
        postal_code:Joi.string().required().label('postal_code'),
        country:Joi.string().required().label('country'),
    
        email:Joi.string().required().label('email'),
        phone:Joi.string().trim().required().length(10, 'utf8').message('"phone" must be 10 digits'),

        password:Joi.string().required().label('password'),

        photo:Joi.string().required().label('photo'),

        branch_name:Joi.string().required().label("branch_name"),
        job_title:Joi.string().required().label("job_title"),
        dept_name:Joi.string().required().label("dept_name"),
        paygrade_level:Joi.string().required().label("paygrade_level"),
        e_status_name:Joi.string().required().label("e_sataus_name"),${result? result:''}})
        
        `
    eval(s)
    return addHRvalidator.validate(params)
}

module.exports={adminRegisterValidator,addHRvalidatorWrapper, registerValidator}
