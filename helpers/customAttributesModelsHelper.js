const { Cookie } = require('express-session');
const OrganizationServices = require('../services/organizationServices');

const customAttributesModelsHelper=async(value)=>{
    var bind='$1';
    var data=[]
    data.push(value.employee_id)
    const attributes=await OrganizationServices.getCustomAttributes();
    var c=1
    attributes.forEach(function(attribute) {
       c=c+1
       bind+=`, $${c} `
       data.push(value[attribute.name])
    });
    console.log(bind, data)
        return {
        r_bind:bind,
        r_data:data
    }
}

module.exports=customAttributesModelsHelper