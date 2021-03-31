const{ pool2} =require('../connection')
const customAttributesModelsHelper=require('../helpers/customAttributesModelsHelper')


class Admin{
    static async adminDetails(uid){
      return (await pool2.query('select * from personal_information_view left outer join address_view using(address_id) left outer join contact_details_view using(employee_id) where employee_id=$1;',[uid])).rows[0]
    }


      static async findUserByNIC(NIC){

            const user =await pool2.query('select * from personal_information where NIC= $1', [NIC])
            return user.rows[0];
      }
      

      static async findUserByEmail(email){
            const user =await pool2.query('select * from personal_information where email= $1', [email])
            return user.rows[0]
      }
      static async customAttributes(value){
            const {r_bind, r_data}= await customAttributesModelsHelper(value)
            const sql=`insert into personal_information_custom values(${r_bind}) `
             await pool2.query(sql, r_data)
      }
      static async addressTable(address, city, postal_code, country){

            const countryrow=(await pool2.query(`select * from setCountry($1)`, [country])).rows
            const cityrow=(await pool2.query(`select * from setCity($1,$2)`,[city,countryrow[0].setcountry])).rows
            const addressrow=(await pool2.query(`select setaddress as address_id from setaddress($1,$2,$3)`,[address, cityrow[0].setcity, postal_code])).rows
            return addressrow;

      }
      static async adminRegister(NIC,first_name, middle_name, last_name,  gender, birthday, address,city, postal_code,country,email,phone, password ,photo){
            try {
                  await pool2.query("BEGIN")
                  const addressrow= await Admin.addressTable(address,city,postal_code, country);
            
                  const personal_information =(await pool2.query(`
                  insert into Personal_information (NIC, first_name, middle_name, last_name, gender,birth_day, address_id, email, password, photo) values ($1, $2, $3, $4, $5,$6,$7,$8,$9,$10 ) 
                  returning *`,[NIC,first_name,middle_name,last_name,gender,birthday,addressrow[0].address_id,email,password, photo]
                  )).rows[0];


                  const empPhone = (await pool2.query(`INSERT INTO employee_phone_number(employee_id,phone) values($1,$2)
                  `,[personal_information.employee_id,phone]));

                  
                  const admin=(await pool2.query(`
                  insert into admin (employee_id) values($1)
                  returning *`,[personal_information.employee_id]
                  )).rows[0];

                  await pool2.query("COMMIT")
                  return personal_information

            } catch (error) {
                  await pool2.query("ROLLBACK")
                  throw error
            }                     
      }
      static async addHR(value){
                  try{
                  await pool2.query("BEGIN")
                  const addressrow= await Admin.addressTable(value.address,value.city,value.postal_code, value.country);
                  
                  const hr =(await pool2.query(`
                                    insert into personal_information (NIC, first_name, middle_name, last_name, gender,birth_day, address_id, email, password, photo) values ($1, $2, $3, $4, $5,$6,$7,$8,$9, $10) 
                                    returning *`,[value.NIC,value.first_name,value.middle_name,value.last_name,value.gender,value.birthday,addressrow[0].address_id,value.email,value.password, value.photo]
                                    )).rows[0];
                  value.employee_id=hr.employee_id;
                 

                  const employee=(await pool2.query(`insert into Employee (employee_id ,branch_name, job_title, dept_name, paygrade_level, e_status_name) values($1,$2, $3, $4, $5, $6)
                                    `,[hr.employee_id,value.branch_name,value.job_title,value.dept_name,value.paygrade_level,value.e_status_name]))

                  await Admin.customAttributes(value)
                  const empPhone = (await pool2.query(`INSERT INTO employee_phone_number(employee_id,phone) values($1,$2)
                  `,[hr.employee_id,value.phone]));
                                    await pool2.query("COMMIT")
                                    return hr

                  } catch (error) {
                        await pool2.query("ROLLBACK")
                        throw error
                  }   
                  }
      static async findAdmin(id){
            const admin=await pool2.query("select * from admin left outer join personal_information using(employee_id) where employee_id=$1",[id])
            return admin.rows[0];
      }

      static async addCustomAttribute(name, type, size, default_val){
            try{
                  await pool2.query("BEGIN")
            var s;
            var dv;
            if(size){
                   s=`(${size})`
            }
            else{
                  s=''
            }

            if(default_val){
                  dv=`default ${default_val}`
            }
            else{
                  dv=''
            }

            const sql=`alter table personal_information_custom add column ${name} ${type}  ${s} ${dv}`
            await pool2.query(sql)
            await pool2.query('insert into customattributes(name, type, size, default_val) values ($1, $2, $3, $4)', [name, type, size? size:0, default_val])
            await pool2.query("COMMIT");
            return;


            } catch (error) {
                await pool2.query("ROLLBACK")
                throw error
            }   
            
      }
      static async getAllBranches(){
            const branches =await pool2.query(`
            select branch_name from branch`)
            return branches.rows;
      }
    static async getBranch(branch_name){
        const branch=await pool2.query(`
        select * from branch left outer join address using(address_id) left outer join city using(city_id) left outer join country using(country_id)  where branch_name=$1`,[branch_name])
        return branch.rows[0]
       }
    static async getAllJobTitle(){
        const jobTitle=await pool2.query(`
        select * from job_type`)
        return jobTitle.rows;
      }
    static async getAllDepartment(){
        const department=await pool2.query(`
        select * from department `) 
        return department.rows;
      }
    static async addDepartment(dept_name){
        return await pool2.query(`
        insert into department (dept_name) values($1) `, [dept_name]) 
      }

    static async getAllPayGradeLevel(){
        const payGrade=await pool2.query(`
        select * from pay_grade `)
        return payGrade.rows;
    }
    static async getEmployeeStatus(){
        const employee_status=await pool2.query(`
        select * from employee_status`)
        return employee_status.rows;
      }
    static async getLeaves(){
        const leaves=await pool2.query(`
        select pay_grade.paygrade_level, leave.anual, leave.casual, leave.maternity, leave.no_pay from pay_grade left outer join leave using(paygrade_level)`)
        return leaves.rows;
    }
    static async getLeave(paygrade_level){
        const leave=await pool2.query(`
        select * from leave where paygrade_level=$1`,[paygrade_level])
        return leave.rows[0]
      }
    static async setLeave(paygrade_level,anual, casual, maternity, no_pay){
        return  (await pool2.query(`call updateJupitorLeaves($1 ,$2, $3, $4 ,$5 )`,[paygrade_level,anual,casual,maternity,no_pay])).rows
    }
    static async getAllBranchesWithAddress(){
        return (await pool2.query(`select * from branch left outer join address using(address_id) left outer join city using(city_id) left outer join country using(country_id)`)).rows
    }

    static async addBranch(branch_name, address, city, postal_code, country){

      try{
        await pool2.query("BEGIN")
        const addressrow=await Admin.addressTable(address,city,postal_code, country);
        await pool2.query(`insert into branch values($1, $2)`,[branch_name,addressrow[0].address_id])
        await pool2.query("COMMIT");
        return;
      } catch (error) {
            await pool2.query("ROLLBACK")
            throw error
      }
    }

    static async getCustomAttributes(){
        return (await pool2.query('select * from customattributes')).rows
    }

    static async deleteCustomAttribute(columnName){
      try{
        await pool2.query("BEGIN")
        await pool2.query(`delete from customattributes where name=$1`,[columnName])
        await pool2.query(`alter table personal_information_custom drop column ${columnName}`)
        await pool2.query("COMMIT");
        return;
      } catch (error) {
            await pool2.query("ROLLBACK")
            throw error
      } 
    }
    static async getColumn(tableName){
        return (await pool2.query(`select column_name from information_schema.columns where table_name='${tableName}'`)).rows
    }
    static async addPayGrade(paygrade_level,description,requirement){
        return await pool2.query('insert into pay_grade (paygrade_level , description, requirement) values($1,$2,$3) ', [paygrade_level, description, requirement])
    }
    static async getPayGrade(paygrade_level){
        return (await pool2.query('select * from pay_grade where paygrade_level=$1',[paygrade_level])).rows[0]
    }
    static async setPayGrade(paygrade_level, description,requirement){
        return await pool2.query(`call updateJupitorPayGrade($1 ,$2, $3 )`,[paygrade_level, description, requirement])
    }
    static async addEmployeeStatus(e_sataus_name, duration, description){
        return await pool2.query(`insert into employee_status (e_status_name, duration, description) values($1, $2, $3)`, [e_sataus_name, duration, description])
    }
    static async getEmployeeState(e_status_name){
        return (await pool2.query('select * from employee_status where e_status_name=$1', [e_status_name])).rows[0]
    }
    static async setEmployeeStatus(e_status_name, duration, description){
        return await pool2.query('call updateJupitorEmployeeStatus($1, $2, $3)',[e_status_name, duration, description])
    }
    static async getJobType(job_title){
        return (await pool2.query('select * from job_type where job_title=$1', [job_title])).rows[0]
    }
    static async addJobType(job_title, description, req_qualification, prerequisites){
        return await pool2.query(`insert into job_type values($1, $2, $3, $4)`,[job_title, description, req_qualification, prerequisites])
    }
    static async setJobType(job_title, description,req_qualification, prerequisites ){
        return await pool2.query('call updateJupitorJobs($1, $2, $3, $4)', [job_title, description,req_qualification, prerequisites])
    }
    static async getBranch(branch_name){
        return (await pool2.query('select * from branch left outer join address using(address_id) left outer join city using(city_id) left outer join country using(country_id) where branch_name=$1', [branch_name])).rows[0]
    }
    static async getHRData(branch_name){
        return (await pool2.query('select * from personal_information left outer join employee using(employee_id) left outer join address using(address_id) left outer join city using(city_id) left outer join country using(country_id)  where branch_name=$1', [branch_name])).rows[0]
    }
    static async getEmplyeeCount(branch_name){
        return (await pool2.query('select count(*) from personal_information left outer join employee using(employee_id) where branch_name=$1', [branch_name])).rows[0]
    }
    static async setBranch(branch_name,address, city, postal_code, country){

      try{
        await pool2.query("BEGIN")
        const addressrow=await Admin.addressTable(address,city,postal_code, country);
        await pool2.query(`call updateJupitorBranch($1, $2)`,[branch_name,addressrow[0].address_id])
        await pool2.query("COMMIT");
        return;

      } catch (error) {
            await pool2.query("ROLLBACK")
            throw error
      } 
    } 
}

module.exports=Admin