const Organization=require("../models/organization")
class OrganizationServices{

    
    static async getCustomAttributes(){
    
        return await Organization.getCustomAttributes()
    }
    static async getAllBranches(){
        const branches=await Organization.getAllBranches()
        return branches;
    }
    static async getBranch(branch_name){
        const branch=await Organization.getLeave(branch_name);
        return branch;
    }
    static async setBranch(branch_name,{address, city, postal_code, country}){
        return await Organization.setBranch(branch_name,address, city, postal_code, country);
    }
    static async getAllJobTitle(){
        const Jobtype=await Organization.getAllJobTitle()
        return Jobtype;
    }
    static async getAllDepartment(){
        const department=await Organization.getAllDepartment();
        return department;
    }
    static async addDepartment({dept_name}){
        return await Organization.addDepartment(dept_name);
       
    }

    static async getAllPayGradeLevel(){
        const payGrade=await Organization.getAllPayGradeLevel();
        return payGrade;
    }
    static async getEmployeeStatus(){
        const employee_status=await Organization.getEmployeeStatus();
        return employee_status; 
    }
    static async getLeaves(){
        const leaves=await Organization.getLeaves();
        return leaves
    }
    static async getLeave(paygrade_level){
        const leave=await Organization.getLeave(paygrade_level);
        return leave
    }
    static async setLeave(paygrade_level,{anual, casual, maternity, no_pay}){
       return await Organization.setLeave(paygrade_level,anual, casual, maternity, no_pay);
    }
    static async getAllBranchesWithAdress(){
        return await Organization.getAllBranchesWithAddress()
    }
    static async addBranch({branch_name, address,city, postal_code, country}){
        return await Organization.addBranch(branch_name, address,city, postal_code, country)
    }

  

    static async deleteCustomAttribute(columnName){
        return await Organization.deleteCustomAttribute(columnName)
    }
    static async addPayGrade({paygrade_level,description,requirement}){
        return await Organization.addPayGrade(paygrade_level,description,requirement)
    }
    static async getPayGrade(paygrade_level){
        return await Organization.getPayGrade(paygrade_level)
    }
    static async setPayGrade(paygrade_level, {description, requirement}){
        return await Organization.setPayGrade(paygrade_level, description,requirement)
    }
    static async addEmployeeStatus({e_status_name, duration,description}){
        return await Organization.addEmployeeStatus(e_status_name, duration, description)
    }
    static async getEmployeeState(e_status_name){
        return await Organization.getEmployeeState(e_status_name)
    }
    static async setEmployeeStatus(e_status_name, {duration, description}){
        return await Organization.setEmployeeStatus(e_status_name, duration, description)
    }
    static async getJobType(job_title){
        return await Organization.getJobType(job_title)
    }
    static async addJobType({job_title, description, req_qualification, prerequisites}){
        return await Organization.addJobType(job_title, description, req_qualification, prerequisites)
    }
    static async setJobType(job_title, { description,req_qualification, prerequisites }){
        return await Organization.setJobType(job_title, description,req_qualification, prerequisites )
    }
    static async getBranch(branch_name){
        return await Organization.getBranch(branch_name)
    }
    static async getHRData(branch_name){
        return await Organization.getHRData(branch_name)
    }
    static async getEmplyeeCount(branch_name){
        return await Organization.getEmplyeeCount(branch_name)
    }

    
    

}
module.exports=OrganizationServices