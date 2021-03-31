const express=require('express')
const router=express.Router()
const HRController=require("../controllers/HRController")
const ifLoggedIn = require("../middleware/ifLoggedIn");
const ifNotLoggedIn = require("../middleware/ifNotLoggedIn");
const ifAdmin = require("../middleware/ifAdmin");
const RootController = require("../controllers/rootController");



router.get("/login", HRController.loginHR);
router.get("/", HRController.index);
router.get('/addEmployeePage', HRController.addEmployeePage);
router.get('/viewData/:id', HRController.viewData);
router.get('/viewData', HRController.viewData);
router.get("/report", HRController.report);
router.get("/customreport", HRController.customreport);
router.get("/leavereport", HRController.leaveReport);


router.post("/submitEmployee", HRController.submitEmployee);
router.post("/findReport", HRController.findReport);
router.post("/findcustomreport", HRController.findCustomReport);
router.post("/findLeave", HRController.findleaveReport);
router.post('/viewData', HRController.viewEmployee);
router.post('/viewData/updateEmployee', HRController.updateEmployee)


module.exports=router