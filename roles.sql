

-- admin role

CREATE ROLE admin WITH LOGIN PASSWORD 'passwordAdmin';
Grant select,insert on personal_information to admin;
Grant select,insert on employee to admin;
Grant select,insert,delete on personal_information_custom to admin;
Grant select,insert,delete on customattributes to admin;
Grant select,insert,update on branch to admin;
Grant select,insert,update on address to admin;
Grant select,insert,update on city to admin;
Grant select,insert,update on country to admin;
Grant select,insert,update on job_type to admin;
Grant select,insert,update on pay_grade to admin;
Grant select,insert,update on department to admin;
Grant select,insert,update on employee_status to admin;
Grant select,insert,update on employee_phone_number to admin;
Grant select,update on leave to admin;
GRANT ALL ON TABLE admin TO admin;
Grant select on information_schema.columns to admin;
GRANT ALL ON SEQUENCE address_address_id_seq TO admin;
GRANT ALL ON SEQUENCE city_city_id_seq TO admin;
GRANT ALL ON SEQUENCE country_country_id_seq TO admin;
GRANT ALL ON SEQUENCE personal_information_employee_id_seq TO admin;
GRANT SELECT ON TABLE public.address_view TO admin;
GRANT SELECT ON TABLE public.contact_details_view TO admin;
GRANT SELECT ON TABLE public.personal_information_view TO admin;
GRANT EXECUTE ON PROCEDURE updatejupitorleaves(paygradelevel character varying, an integer, cas integer, mat integer, nopay integer) TO admin;
GRANT EXECUTE ON PROCEDURE updatejupitorbranch(branchname character varying, add integer) TO admin;
GRANT EXECUTE ON PROCEDURE updatejupitoremployeestatus(estatusname character varying, du character varying, des character varying) TO admin;
GRANT EXECUTE ON PROCEDURE updatejupitorjobs(jobtitle character varying, des character varying, req character varying, prereq character varying) TO admin;
GRANT EXECUTE ON PROCEDURE updatejupitorpaygrade(paygradelevel character varying, des character varying, req character varying) TO admin;
GRANT EXECUTE ON FUNCTION setaddress(addressname character varying, cityid numeric, postalcode numeric) TO admin;
GRANT EXECUTE ON FUNCTION setcity(cityname character varying, countryid numeric) TO admin;
GRANT EXECUTE ON FUNCTION setcountry(c character varying) TO admin;

ALTER TABLE personal_information_custom
    OWNER TO admin;




-- hr role

CREATE ROLE jupitorhr WITH LOGIN PASSWORD 'passwordjupitorhr';
GRANT INSERT, SELECT, UPDATE, TRIGGER ON TABLE address TO jupitorhr;
GRANT SELECT, TRIGGER ON TABLE branch TO jupitorhr;
GRANT INSERT, SELECT, UPDATE, TRIGGER ON TABLE city TO jupitorhr;
GRANT INSERT, SELECT, UPDATE, TRIGGER ON TABLE country TO jupitorhr;
GRANT INSERT, SELECT, UPDATE, TRIGGER ON TABLE customattributes TO jupitorhr;
GRANT SELECT, TRIGGER ON TABLE department TO jupitorhr;
GRANT INSERT, SELECT, UPDATE, TRIGGER ON TABLE emergency_contact_details TO jupitorhr;
GRANT INSERT, SELECT, UPDATE, TRIGGER ON TABLE employee TO jupitorhr;
GRANT UPDATE, INSERT, SELECT, TRIGGER ON TABLE employee_phone_number TO jupitorhr;
GRANT SELECT, TRIGGER ON TABLE employee_status TO jupitorhr;
GRANT SELECT, TRIGGER ON TABLE job_type TO jupitorhr;
GRANT SELECT, TRIGGER ON TABLE leave TO jupitorhr;
GRANT INSERT, SELECT, UPDATE, TRIGGER ON TABLE leave_record TO jupitorhr;
GRANT SELECT, TRIGGER ON TABLE pay_grade TO jupitorhr;
GRANT INSERT, SELECT, UPDATE, TRIGGER ON TABLE personal_information TO jupitorhr;
GRANT ALL ON TABLE session TO jupitorhr;
GRANT INSERT, SELECT, UPDATE, TRIGGER ON TABLE supervisor TO jupitorhr;
GRANT ALL ON SEQUENCE address_address_id_seq TO jupitorhr;
GRANT ALL ON SEQUENCE city_city_id_seq TO jupitorhr;
GRANT ALL ON SEQUENCE country_country_id_seq TO jupitorhr;
GRANT ALL ON SEQUENCE leave_record_leave_id_seq TO jupitorhr;
GRANT ALL ON SEQUENCE personal_information_employee_id_seq TO jupitorhr;
GRANT INSERT, SELECT, UPDATE, TRIGGER ON TABLE personal_information_custom TO jupitorhr;
GRANT INSERT, SELECT, UPDATE, TRIGGER ON TABLE full_employee_detail TO jupitorhr;
GRANT EXECUTE ON FUNCTION changeempcount() TO jupitorhr;
GRANT EXECUTE ON FUNCTION changeempcount1() TO jupitorhr;
GRANT EXECUTE ON FUNCTION emp_leave() TO jupitorhr;
GRANT EXECUTE ON FUNCTION emp_stamp() TO jupitorhr;
GRANT EXECUTE ON FUNCTION updatesupervisortable() TO jupitorhr;
GRANT EXECUTE ON FUNCTION getleavebydate(date, date) TO jupitorhr;
GRANT INSERT, SELECT, UPDATE, TRIGGER ON TABLE public.employeedata_view TO jupitorhr;
GRANT INSERT, SELECT, UPDATE, TRIGGER ON TABLE public.full_employee_detail TO jupitorhr;
GRANT INSERT, SELECT, UPDATE, TRIGGER ON TABLE public.employee_leave TO jupitorhr;


-------------------- manager role ----------------------------------------------------------------------------------------
CREATE ROLE jupitormanager WITH LOGIN PASSWORD 'passwordmanager';
GRANT SELECT ON TABLE public.branch TO jupitormanager;
GRANT SELECT ON TABLE public.job_type TO jupitormanager;
GRANT SELECT ON TABLE public.department TO jupitormanager;
GRANT SELECT ON TABLE public.customattributes TO jupitormanager;
GRANT SELECT ON TABLE public.EmployeeData_View TO jupitormanager;
GRANT SELECT ON TABLE public.pay_grade TO jupitormanager;
GRANT SELECT ON TABLE public.employee_status TO jupitormanager;
GRANT SELECT, UPDATE ON TABLE public.personal_information TO jupitormanager;
GRANT SELECT, UPDATE ON TABLE public.personal_information_custom TO jupitormanager;
GRANT SELECT, UPDATE, TRIGGER ON TABLE public.employee TO jupitormanager;
GRANT SELECT, INSERT ON TABLE public.city TO jupitormanager;
GRANT SELECT, INSERT ON TABLE public.country TO jupitormanager;
GRANT SELECT, UPDATE, INSERT ON TABLE public.address TO jupitormanager;
GRANT SELECT, UPDATE, INSERT, DELETE ON TABLE public.supervisor TO jupitormanager;
GRANT SELECT, UPDATE, INSERT ON TABLE public.employee_phone_number TO jupitormanager;
GRANT SELECT, UPDATE, INSERT ON TABLE public.emergency_contact_details TO jupitormanager;

-- GRANT SELECT ON TABLE public.leave TO jupitormanager;
-- GRANT UPDATE, INSERT ON TABLE public.employee_leave TO jupitormanager;

GRANT ALL ON TABLE public.session TO jupitormanager;
GRANT ALL ON SEQUENCE public.address_address_id_seq TO jupitormanager;
GRANT ALL ON SEQUENCE public.city_city_id_seq TO jupitormanager;
GRANT ALL ON SEQUENCE public.country_country_id_seq TO jupitormanager;
GRANT ALL ON SEQUENCE public.personal_information_employee_id_seq TO jupitormanager;

GRANT EXECUTE ON PROCEDURE public.addtosupervisort(employee_ids integer[], val_supervisor_id integer, arraylength integer) TO jupitormanager;
GRANT EXECUTE ON FUNCTION public.updateSupervisorTable() TO jupitormanager;
GRANT EXECUTE ON FUNCTION public.getsupervisors(branch character varying, department character varying, jobtitle character varying) TO jupitormanager;
GRANT EXECUTE ON FUNCTION public.getnosupervisoremployees(branch character varying, department character varying, jobtitle character varying) TO jupitormanager;
GRANT EXECUTE ON FUNCTION public.setcity(cityname character varying, countryid numeric) TO jupitormanager;
GRANT EXECUTE ON FUNCTION public.setaddress(addressname character varying, cityid numeric, postalcode numeric) TO jupitormanager;
GRANT EXECUTE ON FUNCTION public.setcountry(c character varying) TO jupitormanager;

-- Supervisor Role -------------------------------------------------------------------------------------------------
CREATE ROLE jupitorSupervisor WITH LOGIN PASSWORD 'password';
GRANT  SELECT  ON TABLE personal_information TO jupitorSupervisor;
GRANT  SELECT  ON TABLE supervisor TO jupitorSupervisor;
GRANT  SELECT,UPDATE, TRIGGER ON TABLE leave_record TO jupitorSupervisor;
GRANT  SELECT,UPDATE, TRIGGER  ON TABLE employee_leave TO jupitorSupervisor;
GRANT  SELECT ON TABLE leave TO jupitorSupervisor;
GRANT  SELECT ON TABLE employee TO jupitorSupervisor;
GRANT ALL ON TABLE session TO jupitorSupervisor;

GRANT EXECUTE ON FUNCTION getAttendence(s_id numeric, today date ) TO jupitorSupervisor;
GRANT EXECUTE ON FUNCTION getEmployee(e_id numeric) TO jupitorSupervisor;
GRANT EXECUTE ON FUNCTION getEmployees1(s_id numeric) TO jupitorSupervisor;
GRANT EXECUTE ON FUNCTION getleavea(s_id numeric) TO jupitorSupervisor;

---------------------------------------------------------------------------------------------------------------------
----- Employee Role--------------------------------------------------------------------------------------------------
CREATE ROLE jupitorEmployee WITH LOGIN PASSWORD 'password';
GRANT SELECT, UPDATE, INSERT, TRIGGER ON TABLE leave_record TO jupitorEmployee;
GRANT SELECT ON TABLE EmployeeData_View TO jupitorEmployee;
GRANT SELECT ON TABLE employee_phone_number TO jupitorEmployee;
GRANT SELECT ON TABLE address TO jupitorEmployee;
GRANT SELECT ON TABLE city TO jupitorEmployee;
GRANT SELECT ON TABLE country TO jupitorEmployee;
GRANT ALL ON SEQUENCE leave_record_leave_id_seq TO jupitorEmployee;