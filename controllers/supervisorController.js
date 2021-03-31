const Supervisor = require("../models/supervisor");
const supervisorServices=require("../services/supervisorServices")
const {loginValidator}=require("../validaters/loginValidater")

class SupervisorController {
  static async loginPage(req,res){
        
    res.render('supervisor/login', {
        user:'',
        success:req.query.success,
        error:req.query.error,
        email:'',
        password:''
    })
}
static async login(req,res){
    try {
        const {error, value} =await loginValidator.validate(req.body)
        if(error) throw error
        const user=await supervisorServices.login(value);
          
        req.session.user={}
        req.session.user.type="supervisor"
        req.session.user.uid=user.employee_id
        req.session.user.NIC=user.NIC
        req.session.user.first_name=user.first_name
        req.session.user.middle_name=user.middle_name
        req.session.user.last_name=user.last_name
        req.session.user.email=user.email
    

        res.redirect(`/supervisor`)
        


    } catch (error) {
        res.redirect(`/supervisor/login?error=${error}`)
    }
}

  static async supervisor(req, res) {
    const req_count = await Supervisor.getLeavingRequestCount(req.session.user.uid);
    const emp_count = await Supervisor.getEmployees_Count(req.session.user.uid);
    const attendance = await Supervisor.countAttendance(req.session.user.uid);
    const weekly = await Supervisor.countWeeklyAttendance(req.session.user.uid);
    // console.log(req_count);
    // console.log(emp_count);
    console.log(weekly[0].date);
    console.log(weekly[0].val[0].getattendence);
    console.log(weekly.length);
    res.render("./supervisor/dashboard", {
      req_count: req_count,
      emp_count: emp_count,
      attendance: attendance,
      weekly: weekly,
    });
  }

  //  get all employees from database
  static async employee(req, res) {
    const employees = await Supervisor.getEmployees(req.session.user.uid);
    console.log(employees);
    res.render("./supervisor/employees", {
      employeeLst: employees,
    });
  }

  // load attendence page
  static async attendence(req, res) {
    res.render("./supervisor/attendence", {});
  }

  // get all Leaving Requests
  static async leaves(req, res) {
    const requests = await Supervisor.getAllLeavingRequests(req.session.user.uid);
    res.render("./supervisor/leaves", {
      requestLst: requests,
    });
  }

  // get data for each leaving request
  static async leaveRequest(req, res) {
    let leave_id = req.params.request;
    const leave = await Supervisor.findByID(leave_id);
    const remaining_leaves = await Supervisor.getRemainingLeaves(
      leave[0].employee_id
    );
    console.log(leave[0].leave_type);
    var date = new Date(leave[0].start_date),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    var newdate = [date.getFullYear(), mnth, day].join("-");
    res.render("./supervisor/leaveRequest", {
      leave: leave,
      remaining_leaves: remaining_leaves,
      date: newdate,
    });
  }

  // approve leaving request

  static async approve(req, res) {
    const get = await Supervisor.approveLeave(req.body);
    const req_count = await Supervisor.getLeavingRequestCount(req.session.user.uid);
    const emp_count = await Supervisor.getEmployees_Count(req.session.user.uid);
    const attendance = await Supervisor.countAttendance(req.session.user.uid);
    const weekly = await Supervisor.countWeeklyAttendance(req.session.user.uid);
    res.render("./supervisor/dashboard", {
      req_count: req_count,
      emp_count: emp_count,
      attendance: attendance,
      weekly: weekly,
    });
  }

  // find employee
  static async findemployee(req, res) {
    let emp = JSON.parse(JSON.stringify(req.body)).employee_id;
    const employee = await Supervisor.findemployee(emp);
    console.log(employee);
    res.render("./supervisor/employees", {
      employeeLst: employee,
    });
  }

  static async countAttendance(req, res) {}
}

module.exports = SupervisorController;
