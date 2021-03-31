const {loginValidator}=require("../validaters/loginValidater")
const {registerValidator}=require("../validaters/registerValidator")
const userServices=require('../services/userServices')
const OrganizationServices=require('../services/organizationServices')
const idForm=require("../helpers/idChecker")


class RootController{
    static async indexPage(req,res){
        res.render('index',{
        })
    }

    static async employeeloginPage(req,res){
        
        res.render('employeelogin', {
            user:'',
            success:req.query.success,
            error:req.query.error,
            email:'',
            password:''
        })
    }
    static async employeelogin(req,res){
        try {
            const {error, value} =await loginValidator.validate(req.body)
            if(error) throw error
            const user=await userServices.login(value);
            if(user.job_title=="admin") {
                res.redirect(`/login?error=you don't have acess to this account`)
                return
            }
            req.session.user={}
            req.session.user.type="employee"
            req.session.user.uid=user.employee_id
            req.session.user.NIC=user.NIC
            req.session.user.first_name=user.first_name
            req.session.user.middle_name=user.middle_name
            req.session.user.last_name=user.last_name
            req.session.user.email=user.email
            req.session.user.department=user.dept_name
            req.session.user.branch_name=user.branch_name
            req.session.user.job_title=user.job_title
            res.redirect(`/employee/`)
        } catch (error) {
            res.redirect(`/employeelogin?error=${error}`)
        }
    }

    static async loginPage(req,res){
        
        res.render('login', {
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
            const user=await userServices.login(value); 
            let type;
            if(user.job_title=="admin") {
                type='admin'
            }
            else if(user.job_title=="HR"){
                type='HR'
            }
            else if(user.job_title=="Manager"){
                type="Manager"
            }
            else{
                res.redirect(`/login?error=you don't have acess to this account`)
                return
            }

            req.session.user={}

            req.session.user.type=type
            req.session.user.uid=user.employee_id
            req.session.user.NIC=user.NIC
            req.session.user.first_name=user.first_name
            req.session.user.middle_name=user.middle_name
            req.session.user.last_name=user.last_name
            req.session.user.email=user.email
            req.session.user.department=user.dept_name
            req.session.user.branch_name=user.branch_name
            req.session.user.job_title=user.job_title
            req.session.user.photo=user.photo

            res.redirect(`/${type}`)
            


        } catch (error) {
            res.redirect(`/login?error=${error}`)
        }
    }


    static async signupPage(req,res){
        try {
            const branches=await OrganizationServices.getAllBranches()
            const Jobtypes=await OrganizationServices.getAllJobTitle()
            const departments=await OrganizationServices.getAllDepartment();
            const payGrades=await OrganizationServices.getAllPayGradeLevel()
            const employee_statuses=await OrganizationServices.getEmployeeStatus();
            console.log(payGrades)
            res.render('signup',{
                user:'',
                NIC:req.query.NIC,
                first_name:req.query.first_name,
                middle_name:req.query.middle_name,
                last_name:req.query.last_name,
                gender:req.query.gender,
                birthday:req.query.birthday,
                address:req.query.address,
                city:req.query.city,
                postal_code:req.query.postal_code,
                country:req.query.country,
                email:req.query.email,
                password:req.query.password,
                branches:branches,
                Jobtypes:Jobtypes,
                departments:departments,
                payGrades:payGrades,
                employee_statuses:employee_statuses,
                error:req.query.error,
                success:''
    
            })
        } catch (error) {
            res.render('signup',{
                user:'',
                NIC:'',
                first_name:'',
                middle_name:'',
                last_name:'',
                gender:'',
                birthday:'',
                address:'',
                city:'',
                address:'',
                postal_code:'',
                country:'',
                email:'',
                password:'',
                branches:"",
                Jobtypes:"",
                departments:"",
                payGrades:"",
                employee_statuses:"",
                error:error,
                success:''
    
            })
        }
    }

    static async signup(req,res){
        try {
            const {error, value} =await registerValidator.validate(req.body)
            if(error) throw error;
            const user=await userServices.register(value)
            res.redirect(`/login?success=user added successfully. user id is ${idForm.idForm(user.employee_id)}`);


        } catch (error) {
            res.redirect(`/signup?error=${error}&NIC=${req.body.NIC}&first_name=${req.body.first_name}&
                middle_name=${req.body.middle_name}&last_name=${req.body.last_name}&gender=${req.body.gender}&birthday=${req.body.birthday}&
                address=${req.body.address}&city=${req.body.city}&postal_code=${req.body.postal_code}&country=${req.body.country}&email=${req.body.email}&password=${req.body.password}&branch_id=${req.body.branch_name}&job_title=${req.body.job_title}&
                dept_name=${req.body.dept_name}&paygrade_level=${req.body.paygrade_level}&e_status_name=${req.body.e_status_name}`)
            
        }
    }
    
    

   
    static async logout(req,res){
        try {
            req.session.destroy();
            res.redirect('/')
        } catch (error) {
            res.redirect('/')
            
        }
    }


}

module.exports=RootController