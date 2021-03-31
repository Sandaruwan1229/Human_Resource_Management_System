const {pool4} =require('../connection');
const customAttributesUpdateHelper=require('../helpers/customAttributesUpdateHelper')
class manager{

    static async getAllBranches(){
        const branches =(await pool4.query(`
        select branch_name from branch`)).rows;
        return branches;
    }
    static async getAllJobTitles(){
        const Jobtypes=(await pool4.query(`
        select job_title from job_type`)).rows;
        return Jobtypes;
    }
    static async getAllDepartments(){
        const departments=(await pool4.query(`
        select dept_name from department`)).rows;
        return departments;
    }
    static async getEmployees(branch,department,jobtype,user,querySelect){
        var employees;
      switch(querySelect){
        case 1:
          employees=(await pool4.query(`
          select employee_id,nic,first_name,last_name from EmployeeData_View
          where branch_name = $1 and job_title != $2`,[branch,user])).rows;
          return employees;
        case 2:
            employees=(await pool4.query(`
            select employee_id,nic,first_name,last_name from EmployeeData_View 
            where branch_name = $1 and job_title  = $2`,[branch,jobtype])).rows;
            return employees;
        case 3:
            employees=(await pool4.query(`
            select employee_id,nic,first_name,last_name from EmployeeData_View
            where branch_name = $1 and dept_name = $2 and job_title != $3`,[branch,department,user])).rows;
            return employees;
        case 4:
            employees=(await pool4.query(`
            select employee_id,nic,first_name,last_name from EmployeeData_View
            where branch_name = $1 and dept_name = $2 and job_title  = $3 `,[branch,department,jobtype])).rows;
            return employees;
        default:
            console.log(querySelect);
      };
     
  }
  static async customAttributesUpdate(employee_id,value){
    console.log(value)
    const {r_bind, r_data}= await customAttributesUpdateHelper(value)
    const sql=`update personal_information_custom set ${r_bind} where employee_id=${employee_id} `
    console.log(sql)
    await pool3.query(sql, r_data)
  } 
  static async getCanbeSupervisors(branch,department,user){
    //get all supervisor list in relevent branch and department but not a manager
    const result1=(await pool4.query(`
    select employee_id,first_name,last_name from getSupervisors($1,$2,$3)`,[branch,department,user])).rows;    
    //get all employees who are able to be a supervisor in relevent branch and department but not a manager
    // if an employee already has a supervisor, that employee is not able to be a supervisor
    const result2=(await pool4.query(`
    select * from getNoSupervisorEmployees($1,$2,$3)`,[branch,department,user])).rows;
    const result = result1.concat(result2);
    return result;
}
  static async getSupervisorGroup(supervisor_id){
    const supervisor_employees=(await pool4.query(`
    select employee_id,first_name,last_name from supervisor join personal_information using(employee_id) 
    where supervisor_id = $1`,[supervisor_id])).rows;
    return supervisor_employees;
}

static async getEmployeesToaddSupervisorT(branch,department,user){
    const toAddSupervisor_employees=(await pool4.query(`
    select * from getNoSupervisorEmployees($1,$2,$3)`,[branch,department,user])).rows;
    return toAddSupervisor_employees;
}

static async saveSupervisor(supervisor_id){
    const result=(await pool4.query(`
    update employee set supervisor= 'true' where employee_id = $1`,[supervisor_id])).rows;
    return result;
}
static async saveSupervisorGroup(supervisor_id,supervisorGroupemployeeIDs,arraylength){
    console.log(supervisor_id);
    console.log(supervisorGroupemployeeIDs);
    const result=(await pool4.query(`
    CALL addToSupervisorT($1,$2,$3)`,[supervisorGroupemployeeIDs,supervisor_id,arraylength])).rows;
    return result;
} 
static async getSupervisors(branch,department,user){
    // const result=(await pool4.query(`
    // select employee_id,nic,first_name,last_name from EmployeeData_View
    // where branch_name = $1 and dept_name = $2 and job_title != $3 and supervisor = true`,[branch,department,user])).rows;
    // return result;
    const result=(await pool4.query(`
    select * from getSupervisors($1,$2,$3)`,[branch,department,user])).rows;
    return result;
}
static async getSupervisor(emp_id){
    const result=(await pool4.query(`
    select supervisor_id from supervisor where employee_id = $1`,[emp_id])).rows;
    return result;
}
static async SupervisorDelete(emp_id){
    const result=(await pool4.query(`
    update employee set supervisor= 'false' where employee_id = $1`,[emp_id])).rows;
    return result;
}

// -----------------------------view data edit data -----------------------
static async getAllPayGradeLevel(){
    const payGrade=await pool4.query(`
    select paygrade_level from pay_grade `)
    return payGrade.rows;
}
static async getEmployeeStatus(){
    const employee_status=await pool4.query(`
    select e_status_name from employee_status`)
    return employee_status.rows;
}
static async getEmployeeBranchAndDeptAndjobTitle(id){
    const result=await pool4.query(`
    select branch_name,dept_name,job_title from employee where employee_id = $1`,[id])
    return result.rows;
}
static async getEmpDATA(id){
    const result=await pool4.query(`
    select * from EmployeeData_View left outer join employee_phone_number using(employee_id) join address using(address_id) join city using(city_id) join country using(country_id)
    where employee_id = $1`,[id])
    return result.rows;
}

static async findUserIDByEmail(email){
    const result=await pool4.query(`
    select employee_id from personal_information where email = $1`,[email])
    return result.rows;
}
static async findUserIDByNIC(NIC){
    const result=await pool4.query(`
    select employee_id from personal_information where NIC = $1`,[NIC])
    return result.rows;
}
static async getCustomAttributes(){
        
    return (await pool4.query('select * from customattributes')).rows
}
static async addressTable(address, city, postal_code, country){

    const countryrow=(await pool4.query(`select * from setCountry($1)`, [country])).rows
    const cityrow=(await pool4.query(`select * from setCity($1,$2)`,[city,countryrow[0].setcountry])).rows
    const addressrow=(await pool4.query(`select setaddress as address_id from setaddress($1,$2,$3)`,[address, cityrow[0].setcity, postal_code])).rows

   return addressrow;

}
static async updateEmployee(value) {
   
    try{
        await pool4.query("BEGIN");
        
        console.log(value)
        const addressrow= await manager.addressTable(value.address_id,value.city,value.postal_code, value.country);
        const personal_information = (await pool4.query(`update Personal_information set NIC = $1, first_name=$2, middle_name=$3, last_name=$4, gender=$5, birth_day=$6, address_id=$7, email=$8
        where employee_id = $9`,[value.NIC, value.first_name, value.middle_name, value.last_name, value.gender, value.birthday, addressrow[0].address_id,  value.email,value.ID])).rows;

        const employee = (await pool4.query(`update Employee set branch_name=$1, job_title=$2, dept_name=$3, paygrade_level=$4, e_status_name=$5 
        where employee_id=$6`,[value.branch, value.jobTitle, value.department, value.payGrade, value.empStatus, value.ID])).rows;

        const empEmergency = (await pool4.query(`UPDATE emergency_contact_details set relative_name=$1, contact_no=$2 
        where employee_id=$3`,[value.first_name, value.phone,value.ID])).rows;
        const empPhone = (await pool4.query(`UPDATE employee_phone_number set phone=$1 
        where employee_id=$2`,[value.phone,value.ID])).rows;
        await manager.customAttributes(value)

        await pool4.query("COMMIT");

        } catch (error) {
              await pool4.query("ROLLBACK");
              throw error
        }   

  }

}
module.exports=manager;