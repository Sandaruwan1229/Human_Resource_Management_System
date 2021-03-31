const Error = require("../helpers/error");
const hrManager = require("../models/hrManager");
const bcrypt = require("bcrypt");
class hrServices {
  static async addEmployee(value) {
    const isEmailRegistered = await hrManager.findUserByEmail(value.email);
    if (isEmailRegistered) {
      throw new Error.BadRequest("email is already registered");
    }
    const isNICRegistered = await hrManager.findUserByNIC(value.NIC);
    if (isNICRegistered) {
      throw new Error.BadRequest("NIC is already registered");
    }
    const hashpwd = await bcrypt.hash(value.password, 10);
    value.password=hashpwd
    const HR = await hrManager.addEmployee(value);
    return HR;
  }

  static async getEmployeeList(branch, department, jobTitle, payGrade,customize,fields) {
    var querySelect = 1;
    var columns=""; //default
    if (
      branch == "allBranches" &&
      department == "allDepartments" &&
      jobTitle == "allJobtypes" &&
      payGrade == "allPayGrades"
    ) {
      querySelect = 1;
      columns = "employee_id,first_name,last_name,branch_name,dept_name,job_title,paygrade_level";
    } else if (
      branch == "allBranches" &&
      department == "allDepartments" &&
      jobTitle == "allJobtypes"
    ) {
      querySelect = 2;
      columns = "employee_id,first_name,last_name,branch_name,dept_name,job_title";
    } else if (
      branch == "allBranches" &&
      department == "allDepartments" &&
      payGrade == "allPayGrades"
    ) {
      querySelect = 3;
      columns = "employee_id,nic,first_name,last_name,branch_name,dept_name,paygrade_level";
    } else if (
      branch == "allBranches" &&
      jobTitle == "allJobtypes" &&
      payGrade == "allPayGrades"
    ) {
      querySelect = 4;
      columns = "employee_id,nic,first_name,last_name,branch_name,job_title,paygrade_level";
    } else if (
      department == "allDepartments" &&
      jobTitle == "allJobtypes" &&
      payGrade == "allPayGrades"
    ) {
      querySelect = 5;
      columns = "employee_id,nic,first_name,last_name,dept_name,job_title,paygrade_level";
    } else if (branch == "allBranches" && department == "allDepartments") {
      querySelect = 6;
      columns = "employee_id,nic,email,first_name,last_name,branch_name,dept_name";
    } else if (branch == "allBranches" && jobTitle == "allJobtypes") {
      querySelect = 7;
      columns = "employee_id,nic,email,first_name,last_name,branch_name,job_title";
    } else if (branch == "allBranches" && payGrade == "allPayGrades") {
      querySelect = 8;
      columns = "employee_id,nic,email,first_name,last_name,branch_name,paygrade_level";
    } else if (department == "allDepartments" && jobTitle == "allJobtypes") {
      querySelect = 9;
      columns = "employee_id,nic,email,first_name,last_name,dept_name,job_title";
    } else if (department == "allDepartments" && payGrade == "allPayGrades") {
      querySelect = 10;
      columns = "employee_id,nic,email,first_name,last_name,dept_name,paygrade_level";
    } else if (jobTitle == "allJobtypes" && payGrade == "allPayGrades") {
      querySelect = 11;
       columns = "employee_id,nic,email,first_name,last_name,job_title,paygrade_level";
    } else if (branch == "allBranches") {
      querySelect = 12;
      columns = "employee_id,nic,email,first_name,last_name,branch_name";
    } else if (department == "allDepartments") {
      querySelect = 13;
      columns = "employee_id,nic,email,first_name,last_name,dept_name";
    } else if (payGrade == "allPayGrades") {
      querySelect = 14;
       columns = "employee_id,nic,email,first_name,last_name,paygrade_level";
    } else if (jobTitle == "allJobtypes") {
      querySelect = 15;
      columns = "employee_id,nic,email,first_name,last_name,job_title";
    } else {
      querySelect = 16;
       columns = "employee_id,nic,email,first_name,last_name,job_title";
    }

    if(customize){
      columns=fields.toString();
    }
    const employeeList = await hrManager.getEmployees(
      branch,
      department,
      jobTitle,
      payGrade,
      querySelect,
      columns,
    );
    // console.log(employeeList);
    const columnAndDetails = {
        column:columns.split(","),
        details:employeeList.details,
        selectTypes:employeeList.selectTypes
      }
    return columnAndDetails;
  }

  static async getEmpFields() {
    const fields = await hrManager.getEmpFields();
    return fields;
  }

  static async getDepartmentLeaves(startDate,endDate) {
    const deptLeave = await hrManager.getDepartmentLeaves(startDate,endDate);
    return deptLeave;
  }
  static async getDepartmentLeavesByType() {
    const deptLeavebyType = await hrManager.getDepartmentLeavesByType();
    return deptLeavebyType;
  }
  static async getDepartmentLeavesAP(startDate,endDate) {
    const deptLeave = await hrManager.getDepartmentLeavesAP(startDate,endDate);
    return deptLeave;
  }

  static async getAllBranches(){
        const branches=await hrManager.getAllBranches()
        return branches;
    }
  static async getAllJobTitle(){
        const Jobtype=await hrManager.getAllJobTitle()
        return Jobtype;
    }
   static async getAllDepartment(){
        const department=await hrManager.getAllDepartment();
        return department;
    }
   static async getAllPayGradeLevel(){
        const payGrade=await hrManager.getAllPayGradeLevel();
        return payGrade;
    }
  static async getEmployeeStatus(){
        const employee_status=await hrManager.getEmployeeStatus();
        return employee_status; 
    }
   static async getCustomAttributes(){
    
        return await hrManager.getCustomAttributes()
    }
  static async getEmpDATA(id){
    const result=await hrManager.getEmpDATA(id);
     console.log(5555555);
    console.log(result);
    return result; 
    }

  static async updateEmployee(value) { console.log(value)
    const checkEmail = await hrManager.findUserIDByEmail(value.email);
    // console.log(checkEmail)
    const ID= parseInt(value.ID);
    // console.log(ID)
    if (checkEmail.length>0 && checkEmail[0].employee_id !==ID) {
      throw new Error.BadRequest(`This email is already registered with employee id ${checkEmail[0].employee_id}`);
    }
    const checkNIC = await hrManager.findUserIDByNIC(value.NIC);
    // console.log(checkNIC)
    if (checkNIC.length>0 && checkNIC[0].employee_id !==ID) {
      throw new Error.BadRequest(`This NIC is already registered with employee id ${checkNIC[0].employee_id}`);
    }

    const result = await hrManager.updateEmployee(value);
    return result;
  }

}
module.exports = hrServices;
