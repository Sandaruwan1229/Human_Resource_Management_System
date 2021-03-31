const Error =require('../helpers/error')
const Supervisor=require('../models/supervisor')
const bcrypt=require('bcrypt')
const idChecker=require("../helpers/idChecker")

class supervisorServices {
    static async login({id,password}){
        
        const isValidID=idChecker.idChecker(id)
        if(!isValidID){
            throw new Error.BadRequest("EMP ID is not Valid")
        }
        const supervisor= await Supervisor.findEmployee(isValidID)
        if(!supervisor){
            throw new Error.BadRequest('EMP ID is not registered as a supervisor');
        }
        const isPasswordCorrect =await bcrypt.compare(password,supervisor.password)
        if(!isPasswordCorrect){
             throw new Error.BadRequest('entered password is wrong');
        }
        console.log(supervisor)
        return supervisor;
        
    }

}
module.exports=supervisorServices