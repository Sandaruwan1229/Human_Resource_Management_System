const { Pool } = require('pg');
const {pool1} = require('../connection');
class User{
    
    
    static async findUser(id){
         
            const user= await pool1.query("select * from personal_information where employee_id = $1", [id])
            return user.rows[0];
           
    }
    static async findAdmin(id){
      const admin=await pool1.query("select * from admin left outer join personal_information using(employee_id) where employee_id=$1",[id])
      return admin.rows[0];
    }
    static async updatePassword(new_password,uid){
          return await pool1.query("update personal_information set password =$1 where employee_id=$2", [new_password,uid])
    }


    static async findUserByNIC(NIC){

            const user =await pool1.query('select * from personal_information where NIC= $1', [NIC])
            return user.rows[0];
   
      }

      static async findUserByEmail(email){
            const user =await pool1.query('select * from personal_information where email= $1', [email])
            return user.rows[0]

      }
      static async findEmployee(id){
            const user =await pool1.query(`
            select * from employee left outer join personal_information using(employee_id) where employee_id = $1`, [id])
            return user.rows[0];
      }

      
      static async addressTable(address, city, postal_code, country){

                         const countryrow=(await pool1.query(`select * from setCountry($1)`, [country])).rows
                         const cityrow=(await pool1.query(`select * from setCity($1,$2)`,[city,countryrow[0].setcountry])).rows
                         const addressrow=(await pool1.query(`select setaddress as address_id from setaddress($1,$2,$3)`,[address, cityrow[0].setcity, postal_code])).rows
                         return addressrow;
            
      }

      static async addressTable(address, city, postal_code, country){
                      
                        const iscountryExists=(await pool1.query(`select * from country where country =$1`, [country])).rows
                        
                        var countryrow;
                        if(iscountryExists[0]){
                              countryrow=iscountryExists
                        }else{
                              countryrow=(await pool1.query(`insert into country (country) values($1) returning *`,[country])).rows
                        }
                      

                        
                        
                        const iscityExists=(await pool1.query(`select * from city where city =$1 and country_id=$2`,[city,countryrow[0].country_id])).rows
                        var cityrow;
                        if(iscityExists[0]){
                              cityrow=iscityExists
                        }else{
                              cityrow=(await pool1.query(`insert into city(city, country_id) values($1, $2) returning *`,[city,countryrow[0].country_id])).rows
                        }

            
                       
                        console.log(iscityExists)
                        const isAddressExists=(await pool1.query(`select * from address where address =$1 and city_id=$2 and postal_code=$3`,[address, cityrow[0].city_id, postal_code])).rows
                        var addressrow;
                       
                        if(isAddressExists[0]){
                              addressrow=isAddressExists
                        }
                        else{
                              addressrow=(await pool1.query(`insert into address (address, city_id, postal_code) values($1, $2, $3) returning *`,[address,cityrow[0].city_id,postal_code])).rows
                        }
                        

                        return addressrow;
            
      }

      static async register(NIC,first_name, middle_name, last_name, gender, birthday,  address,city, postal_code,country, email, password, branch_name, job_title, dept_name, paygrade_level, e_status_name){
      
            try{
                  await pool1.query("BEGIN")
                  const addressrow= await User.addressTable(address,city,postal_code, country);
                  
                  const personal_information =(await pool1.query(`
                                    insert into Personal_information (NIC, first_name, middle_name, last_name, gender,birth_day, address_id, email, password) values ($1, $2, $3, $4, $5,$6,$7,$8,$9 ) 
                                    returning *`,[NIC,first_name,middle_name,last_name,gender,birthday,addressrow[0].address_id,email,password]
                                    )).rows[0];

                  const employee=(await pool1.query(`insert into Employee (employee_id ,branch_name, job_title, dept_name, paygrade_level, e_status_name) values($1,$2, $3, $4, $5, $6)
                                    `,[personal_information.employee_id,branch_name,job_title,dept_name,paygrade_level,e_status_name]))

                                    await pool1.query("COMMIT")
                                    return personal_information

                  } catch (error) {
                        await pool1.query("ROLLBACK")
                        throw error
                  }   
       }
       
}


module.exports=User