const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");

router.get("/", employeeController.index);

router.use("/applyLeave", employeeController.applyLeave);
router.get("/attendance", employeeController.attendance);
router.use("/employeeInfo", employeeController.employeeInfo);
router.use("/leavesHistory", employeeController.leavesHistory);
router.post("/requestLeave", employeeController.requestLeave);

module.exports = router;
