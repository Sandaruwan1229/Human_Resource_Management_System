const { Cookie } = require('express-session');
const OrganizationServices = require('../services/organizationServices');

const customAttributesUpdateHelper=async(value)=>{
    var bind='';
    var data=[]
    const attributes=await OrganizationServices.getCustomAttributes();
    var c=0
    attributes.forEach(function(attribute) {
       c=c+1
       bind+=`${attribute.name}=$${c},`
       data.push(value[attribute.name])
    });
    console.log(bind, data)
        return {
        r_bind:bind.slice(0, bind.length-1),
        r_data:data
    }
}

module.exports=customAttributesUpdateHelper