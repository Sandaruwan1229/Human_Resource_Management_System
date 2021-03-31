const Error =require('../helpers/error')
const Admin=require('../models/admin')
const bcrypt=require('bcrypt');
const idChecker=require("../helpers/idChecker")

class adminServices{

    // static async adminLogin({id,password}){
        
    //     const isValidID=idChecker.idChecker(id)
    //     if(!isValidID){
    //         throw new Error.BadRequest("EMP ID is not Valid")
    //     }


    //     const user= await User.findUser(isValidID)
    //     if(!user){
    //         throw new Error.BadRequest('EMP ID is not registered');
    //     }
    //     const admin=await Admin.findAdmin(isValidID)
    //     if(!admin){
    //         throw new Error.BadRequest('you dont have permission to login');
    //     }


    //     const isPasswordCorrect =await bcrypt.compare(password,user.password)
    //     if(!isPasswordCorrect){
    //          throw new Error.BadRequest('entered password is wrong');
    //      }
    //     return user;
        
    // }
    static async adminDetails(uid){
        return await Admin.adminDetails(uid)
    }



    static async adminRegister({NIC, first_name, middle_name, last_name, gender, birthday, address,city, postal_code,country, email, phone,password, photo, securityKey}){
            
                const isEmailRegistered=await Admin.findUserByEmail(email);
                if(isEmailRegistered){
                    throw new Error.BadRequest("email is already registered")
                }
                
                if(securityKey != process.env.SECRET){
                    throw new Error.Unauthorized("provided security key is invalid")
                }
              
                const hashpwd= await bcrypt.hash(password, 10)
        
                const admin=await Admin.adminRegister(NIC, first_name, middle_name, last_name, gender, birthday, address,city, postal_code,country, email,phone ,  hashpwd, photo)
                return admin;
    }

    static async addHR(value){
                const isEmailRegistered=await Admin.findUserByEmail(value.email);
                if(isEmailRegistered){
                    throw new Error.BadRequest("email is already registered")
                }
                const isNICRegistered=await Admin.findUserByNIC(value.NIC);
                if(isNICRegistered){
                    throw new Error.BadRequest("NIC is already registered")
                }
                // const isHRinBranch=await Admin.findHR(value.branch_name);

                const hashpwd=await bcrypt.hash(value.password, 10);
                value.password=hashpwd
                const HR=await  Admin.addHR(value);
                return HR
    }

    static async addCustomAttribute({ name, type, size, default_val }) {
        await Admin.addCustomAttribute(name, type, size, default_val)
    }  

    static async getCustomAttributes(){
    
        return await Admin.getCustomAttributes()
    }
    static async getAllBranches(){
        const branches=await Admin.getAllBranches()
        return branches;
    }
    static async getBranch(branch_name){
        const branch=await Admin.getLeave(branch_name);
        return branch;
    }
    static async setBranch(branch_name,{address, city, postal_code, country}){
        return await Admin.setBranch(branch_name,address, city, postal_code, country);
    }
    static async getAllJobTitle(){
        const Jobtype=await Admin.getAllJobTitle()
        return Jobtype;
    }
    static async getAllDepartment(){
        const department=await Admin.getAllDepartment();
        return department;
    }
    static async addDepartment({dept_name}){
        return await Admin.addDepartment(dept_name);
       
    }

    static async getAllPayGradeLevel(){
        const payGrade=await Admin.getAllPayGradeLevel();
        return payGrade;
    }
    static async getEmployeeStatus(){
        const employee_status=await Admin.getEmployeeStatus();
        return employee_status; 
    }
    static async getLeaves(){
        const leaves=await Admin.getLeaves();
        return leaves
    }
    static async getLeave(paygrade_level){
        const leave=await Admin.getLeave(paygrade_level);
        return leave
    }
    static async setLeave(paygrade_level,{anual, casual, maternity, no_pay}){
       return await Admin.setLeave(paygrade_level,anual, casual, maternity, no_pay);
    }
    static async getAllBranchesWithAdress(){
        return await Admin.getAllBranchesWithAddress()
    }
    static async addBranch({branch_name, address,city, postal_code, country}){
        return await Admin.addBranch(branch_name, address,city, postal_code, country)
    }

  

    static async deleteCustomAttribute(columnName){
        return await Admin.deleteCustomAttribute(columnName)
    }
    static async addPayGrade({paygrade_level,description,requirement}){
        return await Admin.addPayGrade(paygrade_level,description,requirement)
    }
    static async getPayGrade(paygrade_level){
        return await Admin.getPayGrade(paygrade_level)
    }
    static async setPayGrade(paygrade_level, {description, requirement}){
        return await Admin.setPayGrade(paygrade_level, description,requirement)
    }
    static async addEmployeeStatus({e_status_name, duration,description}){
        return await Admin.addEmployeeStatus(e_status_name, duration, description)
    }
    static async getEmployeeState(e_status_name){
        return await Admin.getEmployeeState(e_status_name)
    }
    static async setEmployeeStatus(e_status_name, {duration, description}){
        return await Admin.setEmployeeStatus(e_status_name, duration, description)
    }
    static async getJobType(job_title){
        return await Admin.getJobType(job_title)
    }
    static async addJobType({job_title, description, req_qualification, prerequisites}){
        return await Admin.addJobType(job_title, description, req_qualification, prerequisites)
    }
    static async setJobType(job_title, { description,req_qualification, prerequisites }){
        return await Admin.setJobType(job_title, description,req_qualification, prerequisites )
    }
    static async getBranch(branch_name){
        return await Admin.getBranch(branch_name)
    }
    static async getHRData(branch_name){
        return await Admin.getHRData(branch_name)
    }
    static async getEmplyeeCount(branch_name){
        return await Admin.getEmplyeeCount(branch_name)
    }

    





              



    
    
}
module.exports=adminServices