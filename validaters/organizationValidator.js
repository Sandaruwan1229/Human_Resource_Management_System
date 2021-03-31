const Joi = require("joi");

const branchValidator=Joi.object().options({abortEarly:false}).keys({
    
    branch_name:Joi.string().required().label('branch_name'),
    address:Joi.string().required().label('address'),
    city:Joi.string().required().label('city'),
    postal_code:Joi.string().required().label('postal_code'),
    country:Joi.string().required().label('country'),

})

const payGradeValidator=Joi.object().options({abortEarly:false}).keys({
    
    paygrade_level:Joi.string().required().label('paygrade_level'),
    description:Joi.string().required().label('description'),
    requirement:Joi.string().required().label('requirement'),
})

const payGradeEditValidator=Joi.object().options({abortEarly:false}).keys({
    
    description:Joi.string().required().label('description'),
    requirement:Joi.string().required().label('requirement'),
})
const employeeStatusValidator=Joi.object().options({abortEarly:false}).keys({
    e_status_name:Joi.string().required().label('e_status_name'),
    duration:Joi.string().required().label('duration'),
    description:Joi.string().required().label('description'),
})
const EmployeeStatusEditValidator=Joi.object().options({abortEarly:false}).keys({
    
    duration:Joi.string().required().label('duration'),
    description:Joi.string().required().label('description'),

})
const jobTypeEditValidator=Joi.object().options({abortEarly:false}).keys({
    
    description:Joi.string().required().label('description'),
    req_qualification:Joi.string().required().label('req_qualification'),
    prerequisites:Joi.string().required().label('prerequisites'),


})
const jobTypeValidator=Joi.object().options({abortEarly:false}).keys({
    job_title:Joi.string().required().label('job_title'),
    description:Joi.string().required().label('description'),
    req_qualification:Joi.string().required().label('req_qualification'),
    prerequisites:Joi.string().required().label('prerequisites'),


})
const branchEditValidator=Joi.object().options({abortEarly:false}).keys({
    address:Joi.string().required().label('address'),
    postal_code:Joi.string().required().label('postal_code'),
    city:Joi.string().required().label('city'),
    country:Joi.string().required().label('country'),


})
const DepartmentValidator=Joi.object().options({abortEarly:false}).keys({
    dept_name:Joi.string().required().label('dept_name'),
})

module.exports={branchValidator,payGradeValidator,payGradeEditValidator, employeeStatusValidator, EmployeeStatusEditValidator,jobTypeEditValidator,jobTypeValidator, branchEditValidator, DepartmentValidator}