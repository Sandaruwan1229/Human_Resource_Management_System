const OrganizationServices = require('../services/organizationServices');


const customAttributesValidaterHelper=async()=>{
    var result='';
    const attributes=await OrganizationServices.getCustomAttributes(); 
    attributes.forEach(function(attribute) {
        result+=`${attribute.name}:Joi.string().required().label("${attribute.name}"),`;
    });
    //console.log(result)
    if(result) return result
    else return undefined
}


module.exports=customAttributesValidaterHelper