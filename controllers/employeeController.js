const Employee = require("../models/employee");
const OrganizationServices = require("../services/organizationServices");

class employeeController {
  static async index(req, res) {
    res.render("employee/index", {
      user: req.session.user,
    });
  }

  static async applyLeave(req, res) {
    const id = req.session.user.uid;
    res.render("employee/applyLeave", {
      userId: id,
    });
  }
  static async attendance(req, res) {
    const history = await Employee.getLeavingHistory(req.session.user.uid);
    // console.log(history[0].leave_id);
    res.render("employee/attendance", { history: history });
  }

  // static async employeeInfo(req, res) {
  //   const information = await Employee.getEmployeeInfo(req.session.user.uid);
  //   res.render("employee/employeeInfo", { information: information });
  // }
  static async employeeInfo(req, res) {
    const id = req.session.user.uid;
    // console.log(id);
    try {
      const empDATA = await Employee.getEmpDATA(id);
      const customAttributes = await OrganizationServices.getCustomAttributes();
      // console.log(empDATA)
      res.render("./employee/employeeInfo", {
        empDATA: empDATA,
        customAttributes: customAttributes,
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async leavesHistory(req, res) {
    res.render("employee/leavesHistory", {});
  }

  static async requestLeave(req, res) {
    // console.log(req.body);
    const request = await Employee.applyLeave1(req.body);
    res.render("employee/index", {
      user: req.session.user,
    });
  }
}

module.exports = employeeController;
