const { pool3 } = require("../connection");
const hrService = require("../services/hrService");
const {
  adminRegisterValidator,
  addHRvalidator,
} = require("../validaters/registerValidator");
// const hrService = require("../services/hrService");
// const hrService =require('../services/hrService');

var employeeSet = { column: [], details: [], selectTypes: [] };
var departmentSet = [];
var departmentSetAP = [];
var departmentBYleave = [];
var user = "HR Manager";

class HRController {
  static async loginHR(req, res) {
    // res.render("HR/index", {});
    res.redirect("/HR/home");
  }
  static async index(req, res) {
    res.render("HR/home", {
      user: req.session.user,
    });
  }
  static async abc(req, res) {
    const a = 1;
    const r = await pool3`select * from get_leaverequests('jjj')`;
    res.send(r);
    console.log(r);
  }

  static async addEmployeePage(req, res) {
    try {
      const branches = await hrService.getAllBranches();
      const Jobtypes = await hrService.getAllJobTitle();
      const departments = await hrService.getAllDepartment();
      const payGrades = await hrService.getAllPayGradeLevel();
      const employee_statuses = await hrService.getEmployeeStatus();
      const customAttributes = await hrService.getCustomAttributes();

      res.render("HR/add_employee", {
        user: req.session.user,
        error: req.query.error,
        success: req.query.success,
        branches: branches,
        Jobtypes: Jobtypes,
        departments: departments,
        payGrades: payGrades,
        employee_statuses: employee_statuses,
        customAttributes: customAttributes,
        HR: {},
      });
    } catch (error) {
      res.render("HR/home", {
        user: req.session.user,
        error: error,
        success: "",
      });
    }
  }

  static async submitEmployee(req, res) {
    const branches = await hrService.getAllBranches();
    const Jobtypes = await hrService.getAllJobTitle();
    const departments = await hrService.getAllDepartment();
    const payGrades = await hrService.getAllPayGradeLevel();
    const employee_statuses = await hrService.getEmployeeStatus();
    const customAttributes = await hrService.getCustomAttributes();

    const HR = {};
    HR.NIC = req.body.NIC;
    HR.first_name = req.body.first_name;
    HR.middle_name = req.body.middle_name;
    HR.last_name = req.body.last_name;
    HR.gender = req.body.gender;
    HR.birthday = req.body.birthday;
    HR.address_id = req.body.address_id;
    HR.country = req.body.country;
    HR.email = req.body.email;
    HR.phone = req.body.phone;
    HR.city = req.body.city;
    HR.postal_code = req.body.postal_code;

    try {
      const empAdd = await hrService.addEmployee(req.body);
      console.log(empAdd);
      const success = "HR added sucessfully. you can logged in using emp";
      res.redirect("viewData/" + empAdd.employee_id);
    } catch (error) {
      res.render("HR/add_employee", {
        error: error,
        HR: HR,
        branches: branches,
        Jobtypes: Jobtypes,
        departments: departments,
        payGrades: payGrades,
        employee_statuses: employee_statuses,
        customAttributes: customAttributes,
      });
    }
  }

  static async viewData(req, res) {
    const id = parseInt(req.params.id);

    if (!id) {
      res.render("HR/viewData", {
        user: req.session.user,
        error: req.query.error,
        success: req.query.success,
        branches: {},
        Jobtypes: {},
        departments: {},
        payGrades: {},
        employee_statuses: {},
        empDATA: {},
        user: user,
        customAttributes: {},
      });
    } else {
      // console.log(id);
      try {
        const empDATA = await hrService.getEmpDATA(id);
        const branches = await hrService.getAllBranches();
        const Jobtypes = await hrService.getAllJobTitle();
        const departments = await hrService.getAllDepartment();
        const payGrades = await hrService.getAllPayGradeLevel();
        const employee_statuses = await hrService.getEmployeeStatus();
        const customAttributes = await hrService.getCustomAttributes();
        console.log(empDATA);
        // console.log(empDATA)
        res.render("HR/viewData", {
          user: req.session.user,
          error: req.query.error,
          success: req.query.success,
          branches: branches,
          Jobtypes: Jobtypes,
          departments: departments,
          payGrades: payGrades,
          employee_statuses: employee_statuses,
          empDATA: empDATA,
          user: user,
          customAttributes: customAttributes,
        });
      } catch (error) {
        console.log(error);
        res.redirect(`viewData?error=${error}`);
      }
    }
  }

  static async viewEmployee(req, res) {
    const e_id = req.body.e_id;

    res.redirect(`viewData/${e_id}`);
  }

  static async updateEmployee(req, res) {
    try {
      const empAdd = await hrService.updateEmployee(req.body);

      const success = "Successfully Update the Employee";

      res.redirect(`${req.body.ID}?${success}`);
    } catch (error) {
      console.log(error);
    }
  }

  static async report(req, res) {
    const branches = await hrService.getAllBranches();
    const Jobtypes = await hrService.getAllJobTitle();
    const departments = await hrService.getAllDepartment();
    const payGrades = await hrService.getAllPayGradeLevel();
    const employee_statuses = await hrService.getEmployeeStatus();

    res.render("HR/employeeReports", {
      user: req.session.user,
      error: req.query.error,
      branches: branches,
      Jobtypes: Jobtypes,
      departments: departments,
      payGrades: payGrades,
      employee_statuses: employee_statuses,
      employeeList: employeeSet,
    });
    employeeSet = { column: [], details: [], selectTypes: [] };
  }
  static async findReport(req, res) {
    var branch = req.body.branch_name;
    var department = req.body.department;
    var jobTitle = req.body.jobTitle;
    var payGrade = req.body.payGrade;
    var customize = false;
    var fields = [];
    // console.log(branch);
    // console.log(department);
    // console.log(jobtype);
    try {
      employeeSet = await hrService.getEmployeeList(
        branch,
        department,
        jobTitle,
        payGrade,
        customize,
        fields
      );
      res.redirect("report");
    } catch (error) {}
  }
  static async customreport(req, res) {
    const branches = await hrService.getAllBranches();
    const Jobtypes = await hrService.getAllJobTitle();
    const departments = await hrService.getAllDepartment();
    const payGrades = await hrService.getAllPayGradeLevel();
    const employee_statuses = await hrService.getEmployeeStatus();
    const fieds = await hrService.getEmpFields();
    console.log(fieds);
    res.render("HR/customizeReports", {
      user: req.session.user,
      error: req.query.error,
      branches: branches,
      Jobtypes: Jobtypes,
      departments: departments,
      payGrades: payGrades,
      employee_statuses: employee_statuses,
      employeeList: employeeSet,
      customFields: fieds,
    });
    employeeSet = { column: [], details: [], selectTypes: [] };
  }

  static async findCustomReport(req, res) {
    var branch = req.body.branch_name;
    var department = req.body.department;
    var jobTitle = req.body.jobTitle;
    var payGrade = req.body.payGrade;
    var customize = true;
    var fields = req.body.field;
    try {
      employeeSet = await hrService.getEmployeeList(
        branch,
        department,
        jobTitle,
        payGrade,
        customize,
        fields
      );
      res.redirect("customreport");
    } catch (error) {}
  }

  static async leaveReport(req, res) {
    try {
      departmentBYleave = await hrService.getDepartmentLeavesByType();
      res.render("HR/leaveReport", {
        departmentlist: departmentSet,
        departmentlistAp: departmentSetAP,
        dates: {},
        departmentleave: departmentBYleave,
        error: "",
      });
      departmentSet = [];
      departmentSetAP = [];
    } catch (error) {
      throw error;
    }
  }

  static async findleaveReport(req, res) {
    const inpdate = {
      startDate: req.body.startdate,
      endDate: req.body.endDate,
    };
    if (
      inpdate.startDate < inpdate.endDate &&
      parseInt(inpdate.startDate.substring(0, 4)) > 2000
    ) {
      try {
        departmentSet = await hrService.getDepartmentLeaves(
          inpdate.startDate,
          inpdate.endDate
        );
        departmentSetAP = await hrService.getDepartmentLeavesAP(
          inpdate.startDate,
          inpdate.endDate
        );
        res.render("HR/leaveReport", {
          departmentlist: departmentSet,
          departmentlistAp: departmentSetAP,
          departmentleave: departmentBYleave,
          dates: inpdate,
          error: "",
        });
      } catch (error) {
        departmentSet = [];
        departmentSetAP = [];
        throw error;
      }
    } else {
      res.render("HR/leaveReport", {
        departmentlist: [],
        departmentlistAp: [],
        dates: {},
        departmentleave: departmentBYleave,
        error:
          "Invalid Date. Start Date must be greater than year 2000 and End Date must be greater than Start Date",
      });
    }
  }
}
module.exports = HRController;
