const { pool6 } = require("../connection");

class Employee {
  static async applyLeave1({ ID, leaveType, startdate, duration, reason }) {
    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    const today = year + "-" + month + "-" + date;
    let state = "No";
    const res = (
      await pool6.query(
        `INSERT INTO leave_record (
employee_id, leave_type, apply_date, start_date, duration, reason, approval_state)  VALUES ($1,$2,$3,$4,$5,$6,$7)`,
        [ID, leaveType, today, startdate, duration, reason, state]
      )
    ).rows;
  }

  static async getLeavingHistory(employee_id) {
    // let employee_id = 180336;
    const res = (
      await pool6.query(`select * from leave_record where employee_id = $1`, [
        employee_id,
      ])
    ).rows;
    console.log(res);

    for (let i = 0; i < res.length; i++) {
      let date_ob = new Date(res[i].apply_date);
      let date = ("0" + date_ob.getDate()).slice(-2);
      let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
      let year = date_ob.getFullYear();
      const apply_date = year + "-" + month + "-" + date;
      console.log(apply_date);
      res[i].apply_date = apply_date;

      let date_ob1 = new Date(res[i].start_date);
      let date1 = ("0" + date_ob1.getDate()).slice(-2);
      let month1 = ("0" + (date_ob1.getMonth() + 1)).slice(-2);
      let year1 = date_ob1.getFullYear();
      const start_date = year1 + "-" + month1 + "-" + date1;
      res[i].start_date = start_date;

      if (res[i].approval_state == "No") {
        res[i].approval_state = "Pending..";
      }
    }

    return res;
  }

  static async getEmployeeInfo(employee_id) {
    // let employee_id = 180336;

    const res = (
      await pool6.query(
        `SELECT 
      personal_information.photo,
      personal_information.first_name,
        personal_information.middle_name,
        personal_information.last_name,
    
        personal_information.nic,
      personal_information.gender,
        personal_information.birth_day,
      
        Address.address,
      city.city,
      
      employee_phone_number.phone,
        personal_information.email,
      
      employee.employee_id,
        employee.branch_name,
        employee.job_title,
        employee.dept_name,
        employee.paygrade_level,
        employee.e_status_name,
        employee.supervisor,
      personal_information.registered_date
   
       
      FROM 
      (employee
        JOIN (personal_information 
          join (address JOIN city USING (city_id) )
          USING(address_id) )
        USING (employee_id) 
      )
      JOIN employee_phone_number
      USING (employee_id)  where employee_id = $1 ;`,
        [employee_id]
      )
    ).rows;
    console.log(res);

    return res;
  }
  static async getEmpDATA(id) {
    const result = await pool6.query(
      `
    select * from EmployeeData_View left outer join employee_phone_number using(employee_id) join address using(address_id) join city using(city_id) join country using(country_id)
    where employee_id = $1`,
      [id]
    );
    return result.rows;
  }
}

module.exports = Employee;
