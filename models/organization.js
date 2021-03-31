const {pool1}=require('../connection')
const User=require('../models/user')

class Organization{
    static async getAllBranches(){
            const branches =await pool1.query(`
            select branch_name from branch`)
            return branches.rows;
    }
    static async getBranch(branch_name){
        const branch=await pool1.query(`
        select * from branch left outer join address using(address_id) left outer join city using(city_id) left outer join country using(country_id)  where branch_name=$1`,[branch_name])
        return branch.rows[0]
    }
    static async getAllJobTitle(){
        const jobTitle=await pool1.query(`
        select * from job_type`)
        return jobTitle.rows;
    }
    static async getAllDepartment(){
        const department=await pool1.query(`
        select * from department`) 
        return department.rows;
    }
    static async addDepartment(dept_name){
        return await pool1.query(`
        insert into department (dept_name) values($1)`, [dept_name]) 

    }

    static async getAllPayGradeLevel(){
        
        const payGrade=await pool1.query(`
        select * from pay_grade `)
        return payGrade.rows;
    }
    static async getEmployeeStatus(){
        const employee_status=await pool1.query(`
        select * from employee_status`)
        return employee_status.rows;
    }
    static async getLeaves(){
      
        const leaves=await pool1.query(`
        select pay_grade.paygrade_level, leave.anual, leave.casual, leave.maternity, leave.no_pay from pay_grade left outer join leave using(paygrade_level)`)
        return leaves.rows;
    }
    static async getLeave(paygrade_level){
        const leave=await pool1.query(`
        select * from leave where paygrade_level=$1`,[paygrade_level])
        
        return leave.rows[0]

    }
    static async setLeave(paygrade_level,anual, casual, maternity, no_pay){
        console.log(paygrade_level,anual,casual,no_pay,maternity)
        return  (await pool1.query(`call updateJupitorLeaves($1 ,$2, $3, $4 ,$5 )`,[paygrade_level,anual,casual,maternity,no_pay])).rows
    }
    static async getAllBranchesWithAddress(){
        return (await pool1.query(`select * from branch left outer join address using(address_id) left outer join city using(city_id) left outer join country using(country_id)`)).rows
    }

    static async adpool1ranch(branch_name, address, city, postal_code, country){
        const addressrow=await User.addressTable(address,city,postal_code, country);
        return await pool1.query(`insert into branch values($1, $2)`,[branch_name,addressrow[0].address_id])
    }
    static async getCustomAttributes(){
        
        return (await pool1.query('select * from customattributes')).rows
    }

    static async deleteCustomAttribute(columnName){
                    await pool1.query(`delete from customattributes where name=$1`,[columnName])
        return await pool1.query(`alter table personal_information_custom drop column ${columnName}`)

    }
    static async getColumn(tableName){
        return (await pool1.query(`select column_name from information_schema.columns where table_name='${tableName}'`)).rows
    }
    static async addPayGrade(paygrade_level,description,requirement){
        return await pool1.query('insert into pay_grade (paygrade_level , description, requirement) values($1,$2,$3) ', [paygrade_level, description, requirement])
    }
    static async getPayGrade(paygrade_level){
        return (await pool1.query('select * from pay_grade where paygrade_level=$1',[paygrade_level])).rows[0]
    }
    static async setPayGrade(paygrade_level, description,requirement){
        return await pool1.query(`call updateJupitorPayGrade($1 ,$2, $3 )`,[paygrade_level, description, requirement])
    }
    static async addEmployeeStatus(e_sataus_name, duration, description){
        return await pool1.query(`insert into employee_status (e_status_name, duration, description) values($1, $2, $3)`, [e_sataus_name, duration, description])
    }
    static async getEmployeeState(e_status_name){
        return (await pool1.query('select * from employee_status where e_status_name=$1', [e_status_name])).rows[0]
    }
    static async setEmployeeStatus(e_status_name, duration, description){
        return await pool1.query('call updateJupitorEmployeeStatus($1, $2, $3)',[e_status_name, duration, description])
    }
    static async getJobType(job_title){
        return (await pool1.query('select * from job_type where job_title=$1', [job_title])).rows[0]
    }
    static async addJobType(job_title, description, req_qualification, prerequisites){
        return await pool1.query(`insert into job_type values($1, $2, $3, $4)`,[job_title, description, req_qualification, prerequisites])
    }
    static async setJobType(job_title, description,req_qualification, prerequisites ){
        return await pool1.query('call updateJupitorJobs($1, $2, $3, $4)', [job_title, description,req_qualification, prerequisites])
    }
    static async getBranch(branch_name){
        return (await pool1.query('select * from branch left outer join address using(address_id) left outer join city using(city_id) left outer join country using(country_id) where branch_name=$1', [branch_name])).rows[0]
    }
    static async getHRData(branch_name){
        return (await pool1.query('select * from personal_information left outer join employee using(employee_id) left outer join address using(address_id) left outer join city using(city_id) left outer join country using(country_id)  where branch_name=$1', [branch_name])).rows[0]
    }
    static async getEmplyeeCount(branch_name){
        return (await pool1.query('select count(*) from personal_information left outer join employee using(employee_id) where branch_name=$1', [branch_name])).rows[0]
    }
    static async setBranch(branch_name,address, city, postal_code, country){
        const addressrow=await User.addressTable(address,city,postal_code, country);
        return await pool1.query(`call updateJupitorBranch($1, $2)`,[branch_name,addressrow[0].address_id])
    }
}
module.exports=Organization;