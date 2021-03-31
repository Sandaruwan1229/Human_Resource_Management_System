const {adminRegisterValidator, addHRvalidatorWrapper} =require('../validaters/registerValidator')
const passwordValidator =require('../validaters/passwordValidator')
const adminServices =require('../services/adminServices');
const idForm=require("../helpers/idChecker")
const userServices=require('../services/userServices')
const {leaveCountValidator}=require('../validaters/leaveValidator');
const {branchValidator,payGradeValidator,payGradeEditValidator,employeeStatusValidator,EmployeeStatusEditValidator, jobTypeEditValidator, jobTypeValidator, branchEditValidator, DepartmentValidator}=require('../validaters/organizationValidator');
const session = require('express-session');


class  AdminController{

        // static async dashboard(req,res){
        //     res.render('admin/dashboard',{
        //         user:req.session.user
        //     })
        // }
        static async adminProfilePage(req,res){

            try {
                const admin=await adminServices.adminDetails(req.session.user.uid)
                console.log(admin)
                res.render('admin/account',{
                    user:admin
                })
            } catch (error) {
                console.log(error)
                res.redirect('/admin?error="profile page error"')
            }

           
        }

        static async signupPage(req,res){
            res.render('admin/adminSignup',{
                    NIC:'',
                    first_name:'',
                    middle_name:'',
                    last_name:'',
                    gender:'',
                    birthday:'',
                    address:'',
                    city:'',
                    postal_code:'',
                    country:'',
                    email:'',
                    phone:'',
                    password:'',
                    error:'',
                    user:""
                
            })
        }

        static async signup(req,res){
            try {
                const {error, value} =await adminRegisterValidator.validate(req.body)
                if(error) throw error;
                const admin =await adminServices.adminRegister(value)
                res.redirect('/login?success=admin register sucessfull.you can logged in using '+idForm.idForm(admin.employee_id))

            } catch (error) {
                res.render('admin/adminSignup',{
                    NIC:req.body.NIC,
                    first_name:req.body.first_name,
                    middle_name:req.body.middle_name,
                    last_name:req.body.last_name,
                    gender:req.body.gender,
                    birthday:req.body.birthday,
                    address:req.body.address,
                    city:req.body.city,
                    postal_code:req.body.postal_code,
                    country:req.body.country,
                    email:req.body.email,
                    phone:req.body.phone,
                    password:req.body.password,
                    error:error,
                    user:""
                })
            }
        }
        // static async loginPage(req,res){
        //     res.render('admin/adminLogin',{
        //         error:req.query.error? req.query.error:"",
        //         userName:"",
        //         password:"",
        //         user:'',
        //         success:req.query.success?req.query.success:"" 
        //     })
        // }
        // static async login(req,res){
        //     try{
        //             const {error, value}= await adminLoginValidator.validate(req.body)
        //             if(error) throw error;
        //             const admin=await adminServices.adminLogin(value)
        //             req.session.user={}
        //             req.session.user.type='admin'
        //             req.session.user.uid=admin.employee_id,
        //             req.session.user.NIC=admin.NIC,
        //             req.session.user.first_name=admin.first_name,
        //             req.session.user.middle_name=admin.middle_name,
        //             req.session.user.last_name=admin.last_name,
        //             req.session.user.email=admin.email
                    
        //             res.redirect('/admin/home?success=admin login successfull')




        //     }catch(error){
        //             res.render('admin/adminLogin',{
        //                 error:error,
        //                 username: req.body.user_name,
        //                 password:req.body.password,
        //                 user:'',
        //                 success:''
        //             })
        //     }
        // }


        

        static async home(req,res){
            res.render('admin/dashboard', {
                user:req.session.user,
                error:req.query.error,
                success:req.query.success
            })
        }
        static async changePasswordPage(req,res){
            res.render('admin/changePassword',{
                user:req.session.user,
                error:req.query.error,
                success:req.query.success
            })
        }
        static async changePassword(req,res){
            try {
                const {value,error} =await passwordValidator.validate(req.body)
                if (error) throw error
                await userServices.changePassword(req.session.user.uid,value);
                res.redirect('/admin/changePassword?success=your password is sucessfully changed')
    
            } catch (error) {
                res.redirect(`/admin/changePassword?error=${error}`)
            }
        }

        static async addHRPage(req,res){
            try {
                const branches=await adminServices.getAllBranches()
                const Jobtypes=await adminServices.getAllJobTitle()
                const departments=await adminServices.getAllDepartment();
                const payGrades=await adminServices.getAllPayGradeLevel()
                const employee_statuses=await adminServices.getEmployeeStatus();
                const customAttributes=await adminServices.getCustomAttributes();
                const HR={}
                HR.NIC=req.query.NIC
                HR.first_name=req.query.first_name
                HR.middle_name=req.query.middle_name
                HR.last_name=req.query.last_name
                HR.gender=req.query.gender
                HR.birthday=req.query.birthday

                HR.address=req.query.address
                HR.city=req.query.city
                HR.postal_code=req.query.postal_code
                HR.country=req.query.country
                HR.phone=req.query.phone

                HR.email=req.query.email,
                HR.password=req.query.password
                HR.branch_name=req.query.branch_name
                HR.job_title=req.query.job_title
                HR.dept_name=req.query.dept_name
                HR.paygrade_level=req.query.paygrade_level
                HR.e_status_name=req.query.e_status_name
            



                res.render('admin/addHR',{
                    user:req.session.user,
                    error:req.query.error,
                    success:req.query.success,
                    branches:branches,
                    Jobtypes:Jobtypes,
                    departments:departments,
                    payGrades:payGrades,
                    employee_statuses:employee_statuses,
                    customAttributes:customAttributes,
                    HR:HR
                })
            } catch (error) {
               
                res.render('admin/addHR',{
                    user:req.session.user,
                    error:error,
                    success:"",
                    branches:'',
                    Jobtypes:'',
                    departments:'',
                    payGrades:'',
                    employee_statuses:'',
                    customAttributes:'',
                    HR:{}
                    
                })
            }

                
        }
        static async addHR(req,res){
            try {
                const {error , value}= await addHRvalidatorWrapper(req.body)
                if(error) throw error
                const HR =await adminServices.addHR(value); 
                
                const success="HR addedd sucessfully. you can logged in using"+idForm.idForm(HR.employee_id);
              

                
                res.redirect(`/admin/addHR?success=${success}&NIC=${req.body.NIC}&first_name=${req.body.first_name}&
                middle_name=${req.body.middle_name}&last_name=${req.body.last_name}&gender=${req.body.gender}&birthday=${req.body.birthday}&
                address=${req.body.address}&city=${req.body.city}&postal_code=${req.body.postal_code}&country=${req.body.country}&email=${req.body.email}&password=${req.body.password}&branch_id=${req.body.branch_name}&job_title=${req.body.job_title}&
                dept_name=${req.body.dept_name}&paygrade_level=${req.body.paygrade_level}&e_status_name=${req.body.e_status_name}&phone=${req.body.phone}`)

            } catch (error) {
                console.log(error)
                res.redirect(`/admin/addHR?error=${error}&NIC=${req.body.NIC}&first_name=${req.body.first_name}&
                middle_name=${req.body.middle_name}&last_name=${req.body.last_name}&gender=${req.body.gender}&birthday=${req.body.birthday}&
                address=${req.body.address}&city=${req.body.city}&postal_code=${req.body.postal_code}&country=${req.body.country}&email=${req.body.email}&password=${req.body.password}&branch_id=${req.body.branch_name}&job_title=${req.body.job_title}&
                dept_name=${req.body.dept_name}&paygrade_level=${req.body.paygrade_level}&e_status_name=${req.body.e_status_name}&phone=${req.body.phone}`)
            }
        }

        static async viewLeaves(req,res){
            try {
                    const leaves=await adminServices.getLeaves()
                    
                    res.render('admin/viewLeaves',{
                        user:req.session.user,
                        leaves:leaves,
                        error:'',
                        success:req.query.success
                    })
            } catch (error) {
                 res.render('admin/viewLeaves',{
                     error:error,
                     leaves:'',
                     user:req.session.user,
                     success:''
                 })
            }
        }

        static async editLeavePage(req,res){
            try {
                const leave=await adminServices.getLeave(req.params.paygrade_level)
                res.render('admin/editLeave',{
                    paygrade_level:req.params.paygrade_level,
                    user:req.session.user,
                    error:req.query.error,
                    leave:leave
                })
            } catch (error) {
                 res.render('admin/editLeave',{
                     paygrade_level:req.params.paygrade_level,
                     user:req.session.user,
                     error:error,
                     leave:{}
                 })
            }
        }
        static async editLeave(req,res){
            try {
                const {error , value}=await leaveCountValidator.validate(req.body)
                if(error) throw error

                await adminServices.setLeave(req.params.paygrade_level, value);
                res.redirect(`/admin/jupitorLeaves`)
            } catch (error) {
                console.log(error)
                res.redirect(`/admin/editLeave/${req.params.paygrade_level}?error=${error}`)
            }
        }
        static async viewBranches(req,res){
            try {
                const branches=await adminServices.getAllBranchesWithAdress();
                res.render('admin/viewBranches',{
                    user:req.session.user,
                    success:'',
                    error:req.query.error,
                    branches:branches
                })
            } catch (error) {
                res.render('admin/viewBranches',{
                    user:req.session.user,
                    error:error,
                    success:'',
                    branches:[]
                })
            }
        }

        static async addBranch(req,res){
            try {
                const {error, value}= await branchValidator.validate(req.body)
                if(error) throw error
                await adminServices.addBranch(value)
                res.redirect(`/admin/jupitorBranches`)

            } catch (error) {
                res.redirect(`/admin/jupitorBranches?error=${error}`)
            }
        }
        static async editBranchPage(req,res){
            try {
                const Branch=await adminServices.getBranch(req.params.branch_name)
                console.log(Branch)
                res.render('admin/editBranch',{
                    user:req.session.user,
                    error:req.query.error,
                    Branch:Branch
                })
            } catch (error) {
                 res.render('admin/editBranch',{
                     user:req.session.user,
                     error:error,
                     Branch:{}
                 })
            }
        }
        static async editBranch(req,res){
            try {
                const {error , value}=await branchEditValidator.validate(req.body)
                if(error) throw error

                await adminServices.setBranch(req.params.branch_name,value);
                res.redirect(`/admin/jupitorBranches`)
            } catch (error) {
                res.redirect(`/admin/editBranch/${req.params.branch_name}?error=${error}`)
            }
        }


        static async addCustomAttributePage(req,res){
            res.render('admin/customAttributes',{
                user:req.session.user,
                error:req.query.error,
                success:req.query.success
            })
        }


        static async addCustomAttribute(req,res){
            try {
                await adminServices.addCustomAttribute(req.body);
                res.redirect('/admin/viewCustomAttributes');
            } catch (error) {
                res.redirect(`/admin/addCustomAttribute?error=${error}`)
            }
        }
        static async viewCustomAttributes(req,res){
            try {
                const customAttributes=await adminServices.getCustomAttributes();
                res.render('admin/viewCustomAttributes',{
                    user:req.session.user,
                    error:req.query.error,
                    success:req.query.success,
                    customAttributes:customAttributes
                })
            } catch (error) {
                res.render('admin/viewCustomAttributes',{
                    user:req.session.user,
                    error:error,
                    success:req.query.success,
                    customAttributes:""
                })
            }
        }
        static async deleteCustomAttribute(req,res){
            try {
                await adminServices.deleteCustomAttribute(req.params.columnName)
                res.redirect('/admin/viewCustomAttributes')
            } catch (error) {
                res.redirect(`/admin/viewCustomAttributes?error=${error}`)
            }
        }
        static async payGradePage(req,res){
            try {
                const payGrades=await adminServices.getAllPayGradeLevel()
                res.render('admin/payGrades',{
                    user:req.session.user,
                    payGrades:payGrades,
                    error:req.query.error,
                    success:req.query.success
                        })
                } catch (error) {
                    res.render('admin/payGrades',{
                        error:error,
                        payGrades:'',
                        user:req.session.user,
                        success:''
                    })
                }
        }
        static async addPayGrade(req,res){
            try {
                const {error, value}= await payGradeValidator.validate(req.body)
                if(error) throw error
                await adminServices.addPayGrade(value)
                res.redirect(`/admin/jupitorPayGrades`)

            } catch (error) {
                res.redirect(`/admin/jupitorPayGrades?error=${error}`)
            }
        }
        static async editPayGradePage(req,res){
            try {
                const payGrade=await adminServices.getPayGrade(req.params.paygrade_level)
                res.render('admin/editPayGrade',{
                    user:req.session.user,
                    error:req.query.error,
                    payGrade:payGrade
                })
            } catch (error) {
                 res.render('admin/editPayGrade',{
                     user:req.session.user,
                     error:error,
                     payGrade:{}
                 })
            }
        }
        static async editPayGrade(req,res){
            try {
                const {error , value}=await payGradeEditValidator.validate(req.body)
                if(error) throw error

                await adminServices.setPayGrade(req.params.paygrade_level,value);
                res.redirect(`/admin/jupitorPayGrades`)
            } catch (error) {
                res.redirect(`/admin/editPayGrade/${req.params.paygrade_level}?error=${error}`)
            }
        }
        
        static async employeeStatusPage(req,res){
            try {
                const employeeStatus=await adminServices.getEmployeeStatus()
                res.render('admin/employeeStatus',{
                    user:req.session.user,
                    employeeStatus:employeeStatus,
                    error:req.query.error,
                    success:req.query.success
                 })
                } catch (error) {
                    res.render('admin/employeeStatus',{
                        error:error,
                        employeeStatus:"",
                        user:req.session.user,
                        success:''
                    })
                }
        }
        static async addEmployeeStatus(req,res){
            try {
                const {error, value}= await employeeStatusValidator.validate(req.body)
                if(error) throw error
                await adminServices.addEmployeeStatus(value)
                res.redirect(`/admin/jupitorEmployeeStatus`)

            } catch (error) {
                res.redirect(`/admin/jupitorEmployeeStatus?error=${error}`)
            }
        }
        static async editEmployeeStatusPage(req,res){
            try {
                const EmployeeStatus=await adminServices.getEmployeeState(req.params.EmployeeStatus)
                res.render('admin/editEmployeeStatus',{
                    user:req.session.user,
                    error:req.query.error,
                    EmployeeStatus:EmployeeStatus
                })
            } catch (error) {
                 res.render('admin/editEmployeeStatus',{
                     user:req.session.user,
                     error:error,
                     EmployeeStatus:{}
                 })
            }
        }
        static async editEmployeeStatus(req,res){
            try {
                const {error , value}=await EmployeeStatusEditValidator.validate(req.body)
                if(error) throw error
                await adminServices.setEmployeeStatus(req.params.EmployeeStatus,value);
                res.redirect(`/admin/jupitorEmployeeStatus`)
            } catch (error) {
                res.redirect(`/admin/editEmployeeStatus/${req.params.EmployeeStatus}?error=${error}`)
            }
        }
        static async jobTypePage(req,res){
            try {
                const jobTypes=await adminServices.getAllJobTitle()
                res.render('admin/jobTypes',{
                    user:req.session.user,
                    jobTypes:jobTypes,
                    error:req.query.error,
                    success:req.query.success
                 })
                } catch (error) {
                    res.render('admin/jobTypes',{
                        error:error,
                        jobTypes:"",
                        user:req.session.user,
                        success:''
                    })
                }
        } 
        static async editJobTypePage(req,res){
            try {
                const jobType=await adminServices.getJobType(req.params.jobType)
                res.render('admin/editjobType',{
                    user:req.session.user,
                    error:req.query.error,
                    jobType:jobType
                })
            } catch (error) {
                 res.render('admin/editjobType',{
                     user:req.session.user,
                     error:error,
                     jobType:{}
                 })
            }
        }
        static async editJobType(req,res){
            try {
                const {error , value}=await jobTypeEditValidator.validate(req.body)
                if(error) throw error
                await adminServices.setJobType(req.params.jobType,value);
                res.redirect(`/admin/jupitorjobs`)
            } catch (error) {
                res.redirect(`/admin/editjobType/${req.params.jobType}?error=${error}`)
            }
        } 
        static async addJobType(req,res){
            try {
                const {error, value}= await jobTypeValidator.validate(req.body)
                if(error) throw error
                await adminServices.addJobType(value)
                res.redirect(`/admin/jupitorjobs`)

            } catch (error) {
                res.redirect(`/admin/jupitorjobs?error=${error}`)
            }
        }
        static async getBranch(req,res){
            try {
                const branch=await adminServices.getBranch(req.params.branch)
                const HR=await adminServices.getHRData(req.params.branch)
                const empCount=await adminServices.getEmplyeeCount(req.params.branch)
                const departments=await adminServices.getAllDepartment()
               
                res.render('admin/branch',{
                    user:req.session.user,
                    branch:branch,
                    HR:HR ? HR:{},
                    empCount:empCount,
                    departments:departments,
                    error:'',
                    success:''
                })
            } catch (error) {
                console.log(error)
                res.render('admin/branch',{
                    user:req.session.user,
                    departments:'',
                    branch:{},
                    HR:{},
                    empCount:'',
                    error:error,
                    success:''
                })
            }
        }
        static async viewDepartments(req,res){
            try {
                const departments=await adminServices.getAllDepartment();
                res.render('admin/jupitorDepartment',{
                    user:req.session.user,
                    success:'',
                    error:req.query.error,
                    Departments:departments
                })
            } catch (error) {
                res.render('admin/jupitorDepartment',{
                    user:req.session.user,
                    error:error,
                    success:'',
                    Departments:[]
                })
            }
        }
        static async addDepartment(req,res){
            try {
                const {error, value}= await DepartmentValidator.validate(req.body)
                if(error) throw error
                await adminServices.addDepartment(value)
                res.redirect(`/admin/jupitorDepartments`)

            } catch (error) {
                res.redirect(`/admin/jupitorDepartments?error=${error}`)
            }
        }


}

module.exports=AdminController