const e = require('cors');
const managerServices =require('../services/managerServices');


var user;
var userBranch;
var userDepartment;

var checkSupervisorADD = false;
var employeeList = [];
var canBeSupervisors=[];
var supervisorGroup=[];
var supervisor_id;
var supervisor_name;
var employeeListToAddSupervisor=[];
var searchSupervisorErr=false;
var searchSupervisormsg=[];

class  MnagerController{

        static async dashboard(req,res){
          

            user=req.session.user.job_title;
            userBranch=req.session.user.branch_name;
            userDepartment=req.session.user.department;
            // const id = req.session.user.uid;
            // const empDATA = await managerServices.getEmpDATA(id);
            // user=empDATA[0].job_title;
            // userBranch=empDATA[0].branch_name;
            // userDepartment=empDATA[0].dept_name;
            res.render('./manager/managerDashboard', {
                user:req.session.user
            })
        }

        static async searchEmployee(req,res){
            const branches=await managerServices.getAllBranches();
            const Jobtypes=await managerServices.getAllJobTitles();
            const departments=await managerServices.getAllDepartments();
            res.render('./manager/searchEmployee', {
                user:user,
                userBranch:userBranch,
                userDepartment:userDepartment,
                branches:branches,
                departments:departments,
                Jobtypes:Jobtypes,
                employeeList:employeeList
            })
        }
     
        static async getEmployeeList(req,res){
            var branch = req.body.branchSelect;
            var department = req.body.deptSelect;
            var jobtype = req.body.jobTypeSelect;
            // console.log(branch);
            // console.log(department);
            // console.log(jobtype);
            employeeList= await managerServices.getEmployeeList(branch,department,jobtype,user);
            res.redirect('/manager/search');
        }
     
        static async addSupervisorView(req,res){
            canBeSupervisors= await managerServices.getCanbeSupervisors(userBranch,userDepartment,user);
          
            res.render('./manager/addSupervisor', {
                checkSupervisorADD:checkSupervisorADD,
                canBeSupervisors: canBeSupervisors,
                supervisorGroup:supervisorGroup,
                supervisor_id:supervisor_id,
                supervisor_name:supervisor_name,
                employeeListToAddSupervisor:employeeListToAddSupervisor
            })
        }
        static async viewSupervisor(req,res){
            const supervisorList= await managerServices.getSupervisorList(userBranch,userDepartment,user);
            res.render('./manager/viewSupervisor', {
                supervisorList:supervisorList,
                searchSupervisorErr:searchSupervisorErr,
                searchSupervisormsg:searchSupervisormsg
            })
        }
        static async addSupervisor(req,res){
            const selected_supervisor = req.body.selected_supervisor;
            if(selected_supervisor!=''){
                supervisor_id=parseInt(selected_supervisor);
                supervisorGroup=await managerServices.getSupervisorGroup(supervisor_id);
                employeeListToAddSupervisor = await managerServices.getEmployeesToaddSupervisorT(userBranch,userDepartment,user);//get all employees not in supervisor table
                checkSupervisorADD=true;
            }
            res.redirect('/manager/addSupervisor');
        } 
        static async addMemberToSupervisorGroup(req,res){
           
            const employee_select = req.body.addSuemployee_select;
            var employee_id,employee_name,first_name,last_name;
            // console.log(supervisorGroup);
            [employee_id,employee_name] = employee_select.split(/\s{9}/);
            [first_name,last_name] = employee_name.split(/\s{1}/);
            employee_id = parseInt(employee_id);
            // console.log(employee_id); 
            const findIndex = employeeListToAddSupervisor.findIndex(a => a.employee_id === employee_id);
            findIndex !== -1 && employeeListToAddSupervisor.splice(findIndex , 1);
            supervisorGroup.push({employee_id,first_name,last_name});
            // console.log(supervisorGroup);
            //  console.log(employeeListToAddSupervisor);
            return res.status(200).send({ result: 'redirect', url: '/manager/addSupervisor' });
            // res.redirect('/manager/addSupervisor');

        } 
        static async deleteFromSupervisorGroup(req,res){
            const employee_id = parseInt(req.params.id);
            const findIndex = supervisorGroup.findIndex(a => a.employee_id === employee_id);
            // console.log(employee_id);
            if (findIndex !== -1){
               const employee= supervisorGroup.splice(findIndex , 1);
               employeeListToAddSupervisor.push(employee[0]);
               console.log(employeeListToAddSupervisor);
            }
            res.redirect('/manager/addSupervisor');
        }

        static async saveSupervisorGroup(req,res){
            await managerServices.saveSupervisorGroup(supervisor_id,supervisorGroup);
            checkSupervisorADD=false;
            res.redirect('/manager/addSupervisor');
        }
        static async viewSupervisorsearch(req,res){
            const employee_id = req.body.e_id; 
            const result = await managerServices.findSupervisor(employee_id);
            if(result.length !== 0) {
                const supervisor_id = result[0].supervisor_id;
                searchSupervisormsg.pop();
                searchSupervisormsg.push({employee_id,supervisor_id});
                console.log(searchSupervisormsg);
                searchSupervisorErr=false;
            }
            else{
                searchSupervisormsg.pop();
                searchSupervisorErr=true;
            }
            res.redirect('/manager/viewSupervisor');
        }
   
        static async viewSupervisorDelete(req,res){
            try{
                searchSupervisormsg.pop();
                await managerServices.SupervisorDelete(req.body);
                return res.status(200).send({ result: 'redirect', url: '/manager/viewSupervisor' , err:''});
            }catch(err){
                return res.status(200).send({err:err});
            }
          
        }
   


// ------------------------viewemployee and edit employee------------------

static async viewData(req,res){
    const id = req.params.id;
    if(!id){
              res.render("./manager/viewData", {
                user: req.session.user,
                error: req.query.error,
                success: req.query.success,
                branches: {},
                Jobtypes: {},
                departments:{},
                payGrades: {},
                employee_statuses:{},
                empDATA:{},
                user:user,
                customAttributes:{}
              
              });
    }
    else{
        // console.log(id);
        try{
            await managerServices.checkEmp(id,user,userBranch,userDepartment);
            const empDATA = await managerServices.getEmpDATA(id);
            const branches=await managerServices.getAllBranches();
            const Jobtypes=await managerServices.getAllJobTitles();
            const departments=await managerServices.getAllDepartments();
            const payGrades = await managerServices.getAllPayGradeLevel();
            const employee_statuses = await managerServices.getEmployeeStatus();
            const customAttributes=await managerServices.getCustomAttributes();

            // console.log(empDATA)
            res.render("./manager/viewData", {
                user: req.session.user,
                error: req.query.error,
                success: req.query.success,
                branches: branches,
                Jobtypes: Jobtypes,
                departments: departments,
                payGrades: payGrades,
                employee_statuses: employee_statuses,
                empDATA:empDATA,
                user:user,
                customAttributes:customAttributes,
              

              });
        }
      catch(error){
          console.log(error);
          res.redirect(`/manager/viewData?error=${error}`);
      }
    }
}

static async viewEmployee(req,res){
    const e_id = req.body.e_id;
    res.redirect(`/manager/viewData/${e_id}`);
}

static async updateEmployee(req,res){
    try{
        const empAdd = await managerServices.updateEmployee(req.body);
        const success= "Successfully Update the Employee";
        res.redirect(`/manager/viewData?success=${success}`);
    }catch(error){
        console.log(error);
        res.redirect(`/manager/viewData?error=${error}`);
    }
}

}
module.exports=MnagerController