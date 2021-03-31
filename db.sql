
-- CREATE DATABASE jupitor;

CREATE ROLE jupitor WITH LOGIN PASSWORD 'password';

-- GRANT ALL PRIVILEGES ON DATABASE jupitor TO jupitor;

-- psql -U jupitor jupitor


--drop tables if exists--------------------------------------------------------------------------------------------

DROP TABLE IF EXISTS country CASCADE;
DROP TABLE IF EXISTS city CASCADE;
DROP TABLE IF EXISTS address CASCADE;
DROP TABLE IF EXISTS personal_information CASCADE;
DROP TABLE IF EXISTS admin CASCADE;
DROP TABLE IF EXISTS branch CASCADE;
DROP TABLE IF EXISTS department CASCADE;
DROP TABLE IF EXISTS emergency_contact_details CASCADE;
DROP TABLE IF EXISTS employee_status CASCADE;
DROP TABLE IF EXISTS job_type CASCADE;
DROP TABLE IF EXISTS pay_grade CASCADE;
DROP TABLE IF EXISTS employee CASCADE;
DROP TABLE IF EXISTS employee_leave CASCADE;
DROP TABLE IF EXISTS employee_phone_number CASCADE;
DROP TABLE IF EXISTS leave CASCADE;
DROP TABLE IF EXISTS leave_record CASCADE;
DROP TABLE IF EXISTS supervisor CASCADE;
DROP TABLE IF EXISTS session;
DROP TABLE IF EXISTS personal_information_custom;
DROP  TABLE IF EXISTS customattributes;

-- create tables-----------------------------------------------------------------------------------------------------

CREATE TABLE country
(
    country_id SERIAL NOT NULL ,
    country varchar(100) NOT NULL,
    CONSTRAINT country_pkey PRIMARY KEY (country_id)
);
CREATE TABLE city
(
    city_id SERIAL NOT NULL ,
    city varchar(100) NOT NULL,
    country_id integer NOT NULL,
    CONSTRAINT city_pkey PRIMARY KEY (city_id),
    CONSTRAINT city_country_id_fkey FOREIGN KEY (country_id)
        REFERENCES country (country_id) 
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

CREATE TABLE address
(
    address_id SERIAL NOT NULL ,
    address varchar(100) NOT NULL,
    city_id integer NOT NULL,
    postal_code integer NOT NULL,
    CONSTRAINT address_pkey PRIMARY KEY (address_id),
    CONSTRAINT address_city_id_fkey FOREIGN KEY (city_id)
        REFERENCES city (city_id)  ON UPDATE CASCADE
        ON DELETE CASCADE
);

-- function for birthday
create or replace function check_age(birthday date) returns boolean
language plpgsql
as $$
begin
	if not date_part('year', current_date)- date_part('year',birthday)>=18 then
		RAISE EXCEPTION 'your age should be greater than or equal to 18';
	end if;
		return 1;

end;
$$;

CREATE TABLE personal_information
(
    employee_id SERIAL NOT NULL ,
    nic varchar(50)  NOT NULL,
    first_name varchar(100) ,
    middle_name varchar(100) ,
    last_name varchar(100) ,
    gender varchar(50) ,
    birth_day date check (check_age(birth_day)),
    address_id integer NOT NULL,
    email varchar(100)  NOT NULL,
    password varchar(250) ,
    photo varchar(200),
    registered_date date DEFAULT CURRENT_DATE,
    CONSTRAINT personal_information_pkey PRIMARY KEY (employee_id),
    CONSTRAINT address_id_fkey FOREIGN KEY (address_id)
        REFERENCES address (address_id)  ON UPDATE CASCADE
        ON DELETE CASCADE
    
);


CREATE TABLE admin
(
    employee_id integer NOT NULL,
    CONSTRAINT admin_pkey PRIMARY KEY (employee_id),
    CONSTRAINT admin_employee_id_fkey FOREIGN KEY (employee_id)
        REFERENCES personal_information (employee_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

CREATE TABLE branch
(
    
    branch_name varchar(100) NOT NULL,
    address_id integer NOT NULL,
    CONSTRAINT branch_pkey PRIMARY KEY (branch_name),
    CONSTRAINT branch_address_id_fkey FOREIGN KEY (address_id)
        REFERENCES address (address_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);


CREATE TABLE department
(
    dept_name varchar(100)  NOT NULL,
    employee_count integer NOT NULL DEFAULT 0,
    CONSTRAINT department_pkey PRIMARY KEY (dept_name)
);
INSERT INTO department(dept_name)VALUES ('HR');
	

CREATE TABLE emergency_contact_details
(
    employee_id integer NOT NULL,
    relative_name varchar(100)  NOT NULL,
    contact_no varchar(45)  NOT NULL,
    CONSTRAINT emergency_contact_details_pkey PRIMARY KEY (employee_id),
    CONSTRAINT emergency_contact_details_employee_id_fkey FOREIGN KEY (employee_id)
        REFERENCES personal_information (employee_id) ON UPDATE CASCADE
        ON DELETE CASCADE
);

CREATE TABLE employee_status
(
    e_status_name varchar(50)  NOT NULL,
    duration varchar(50) ,
    description varchar(50) ,
    CONSTRAINT employee_status_pkey PRIMARY KEY (e_status_name)
);


CREATE TABLE job_type
(
    job_title varchar(50)  NOT NULL,
    description varchar(50) ,
    req_qualification varchar(50) ,
    prerequisites varchar(50) ,
    CONSTRAINT job_type_pkey PRIMARY KEY (job_title)
);
insert into job_type (job_title) values('HR') ,('Manager');


CREATE TABLE pay_grade
(
    paygrade_level varchar(50)  NOT NULL,
    description varchar(50) ,
    requirement varchar(50) ,
    CONSTRAINT pay_grade_pkey PRIMARY KEY (paygrade_level)
);

CREATE TABLE employee
(
    employee_id integer NOT NULL,
    branch_name varchar(100) NOT NULL,
    job_title varchar(50)  NOT NULL,
    dept_name varchar(100)  NOT NULL,
    paygrade_level varchar(50)  NOT NULL,
    e_status_name varchar(50)  NOT NULL,
    supervisor boolean default FALSE,
    CONSTRAINT employee_pkey PRIMARY KEY (employee_id),
    CONSTRAINT employee_branch_name_fkey FOREIGN KEY (branch_name)
        REFERENCES branch (branch_name) 
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT employee_dept_name_fkey FOREIGN KEY (dept_name)
        REFERENCES department (dept_name) 
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT employee_e_status_name_fkey FOREIGN KEY (e_status_name)
        REFERENCES employee_status (e_status_name) 
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT employee_employee_id_fkey FOREIGN KEY (employee_id)
        REFERENCES personal_information (employee_id) 
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT employee_job_title_fkey FOREIGN KEY (job_title)
        REFERENCES job_type (job_title) 
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT employee_paygrade_level_fkey FOREIGN KEY (paygrade_level)
        REFERENCES pay_grade (paygrade_level) 
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

CREATE INDEX department_name ON employee(dept_name);  
CREATE INDEX job_type_index ON employee(job_title);  
CREATE INDEX paygrade_index ON employee(paygrade_level);  


CREATE TABLE employee_leave
(
    employee_id integer NOT NULL,
    year integer NOT NULL,
    anual integer DEFAULT 0,
    casual integer DEFAULT 0,
    maternity integer DEFAULT 0,
    no_pay integer DEFAULT 0,
    CONSTRAINT employee_leave_pkey PRIMARY KEY (employee_id, year),
    CONSTRAINT employee_leave_employee_id_fkey FOREIGN KEY (employee_id)
        REFERENCES personal_information (employee_id) 
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

CREATE TABLE employee_phone_number
(
    employee_id integer NOT NULL,
    phone varchar(45)  NOT NULL,
    CONSTRAINT employee_phone_number_pkey PRIMARY KEY (employee_id, phone),
    CONSTRAINT employee_phone_number_employee_id_fkey FOREIGN KEY (employee_id)
        REFERENCES personal_information (employee_id) 
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

CREATE TABLE leave
(
    paygrade_level varchar(50)  NOT NULL,
    anual integer NOT NULL,
    casual integer NOT NULL,
    maternity integer NOT NULL,
    no_pay integer NOT NULL,
    CONSTRAINT leave_pkey PRIMARY KEY (paygrade_level),
    CONSTRAINT leave_paygrade_level_fkey FOREIGN KEY (paygrade_level)
        REFERENCES pay_grade (paygrade_level) 
        ON UPDATE CASCADE
        ON DELETE CASCADE
        
);

CREATE TABLE leave_record
(
    leave_id SERIAL NOT NULL,
    employee_id integer NOT NULL,
    leave_type varchar(50)  NOT NULL,
    apply_date date NOT NULL,
    start_date date NOT NULL,
    duration integer NOT NULL,
    reason varchar(200),
    approval_state varchar(10)  NOT NULL DEFAULT 'No'::varchar,
    CONSTRAINT leave_type_cons CHECK( leave_type IN('anual','casual','maternity','no_pay')),
    CONSTRAINT leave_record_pkey PRIMARY KEY (leave_id),
    CONSTRAINT leave_record_employee_id_fkey FOREIGN KEY (employee_id)
        REFERENCES personal_information (employee_id) 
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

CREATE TABLE supervisor
(
    employee_id integer NOT NULL,
    supervisor_id integer ,
    CONSTRAINT supervisor_pkey PRIMARY KEY (employee_id)
);

CREATE INDEX employee_index ON supervisor(supervisor_id);  

CREATE TABLE customattributes
(
    name character varying(100)  NOT NULL,
    type character varying(100) ,
    size integer,
    default_val character varying(100) ,
    CONSTRAINT "customAttributes_pkey" PRIMARY KEY (name)
);
CREATE TABLE personal_information_custom(
    employee_id integer NOT NULL,
    CONSTRAINT personal_information_custom_pkey PRIMARY KEY (employee_id),
    CONSTRAINT personal_information_custom_employee_id_fkey FOREIGN KEY (employee_id)
    REFERENCES employee (employee_id) 
    ON UPDATE CASCADE
    ON DELETE CASCADE
);


CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
	"sess" json NOT NULL,
	"expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);

ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE INDEX "IDX_session_expire" ON "session" ("expire");

-- Kaveesha Functions--------------------------------------------------------------------------------------------------------------------

CREATE OR REPLACE PROCEDURE addToSupervisorT(
    employee_ids integer[],
    val_supervisor_id int,
    arraylength int

)

LANGUAGE plpgsql
AS $$
DECLARE
    i int;
BEGIN
    DELETE FROM supervisor WHERE supervisor_id = val_supervisor_id;
    for  i in 1..arraylength
    loop
           INSERT INTO supervisor VALUES(employee_ids[i], val_supervisor_id );
    end loop;
    commit;

END;
$$;

CREATE OR REPLACE FUNCTION updateSupervisorTable()
  RETURNS TRIGGER 
  LANGUAGE PLPGSQL
  AS
$$
DECLARE
    supervisr_id int;
BEGIN
	IF (NOT NEW.supervisor) AND OLD.supervisor THEN
		DELETE FROM supervisor WHERE supervisor_id = OLD.employee_id;
        DELETE FROM supervisor WHERE employee_id = OLD.employee_id;
        ELSIF NEW.supervisor AND (NOT OLD.supervisor) THEN
        IF(OLD.job_title != 'Manager') THEN
            SELECT employee_id INTO supervisr_id FROM employee 
            WHERE branch_name=OLD.branch_name AND dept_name=OLD.dept_name AND job_title='Manager';
            INSERT INTO supervisor VALUES(OLD.employee_id, supervisr_id);
        END IF;	    
	END IF;

	RETURN NEW;
END;
$$;
Drop Trigger if exists removeSupervisor on employee;
CREATE TRIGGER removeSupervisor
    AFTER UPDATE
    OF supervisor
    ON employee
    FOR EACH ROW
    EXECUTE PROCEDURE updateSupervisorTable();


 -- get Supervisors----------------------

CREATE OR REPLACE function getSupervisors (branch varchar(100), department varchar(100), JobTitle varchar(100))
returns table(
        employee_id int,
        nic varchar,
        first_name varchar,
        last_name varchar
 	)
 	language plpgsql
as $$
begin
 	return query 
 		select e.employee_id,e.nic,e.first_name,e.last_name from EmployeeData_View e
        where e.branch_name = branch and e.dept_name = department and 
        e.job_title != JobTitle and e.supervisor = true;
end;$$;

 -- get getNoSupervisorEmployees----------------------

CREATE OR REPLACE function getNoSupervisorEmployees (branch varchar(100), department varchar(100), JobTitle varchar(100))
returns table(
        employee_id int,
        first_name varchar,
        last_name varchar
 	)
 	language plpgsql
as $$
begin
 	return query 
 		select e.employee_id,e.first_name,e.last_name from EmployeeData_View e
        where e.branch_name = branch and e.dept_name = department and e.job_title != JobTitle 
        and e.employee_id not in (select distinct(s.employee_id) from supervisor s);
end;$$;

CREATE OR REPLACE VIEW EmployeeData_View AS
SELECT *
FROM  employee left join personal_information using(employee_id) left join personal_information_custom using(employee_id);

-- Sandaruwn Functions--------------------------------------------------------------------------------------------------------------------


CREATE or replace FUNCTION emp_stamp() RETURNS trigger AS $BODY$

 DECLARE
 count1 INTEGER :=0 ;
		
  		BEGIN
   		IF( NEW.leave_type ='anual' AND NEW.approval_state = 'Yes') THEN
 		select anual into count1 from employee_leave where employee_id = NEW.employee_id and year = 2021;
  		UPDATE employee_leave SET anual = count1 - NEW.duration WHERE employee_id = NEW.employee_id  AND year = 2021 ; END IF;
		
   		IF( NEW.leave_type ='casual' AND NEW.approval_state = 'Yes') THEN
  		select casual into count1 from employee_leave where employee_id = NEW.employee_id and year = 2021;
  		UPDATE employee_leave SET casual = count1 - NEW.duration WHERE employee_id = NEW.employee_id  AND year = 2021 ; END IF;
		
   		IF( NEW.leave_type ='maternity' AND NEW.approval_state = 'Yes') THEN
  		select maternity into count1 from employee_leave where employee_id = NEW.employee_id and year = 2021;
  		UPDATE employee_leave SET maternity = count1 - NEW.duration WHERE employee_id = NEW.employee_id  AND year = 2021 ; END IF;
		
  		IF( NEW.leave_type ='no_pay' AND NEW.approval_state = 'Yes') THEN
  		select no_pay into count1 from employee_leave where employee_id = NEW.employee_id and year = 2021;
 		UPDATE employee_leave SET no_pay = count1 - NEW.duration WHERE employee_id = NEW.employee_id  AND year = 2021 ; END IF;
		
		return new;
END;
$BODY$ LANGUAGE plpgsql;

Drop TRIGGER IF EXISTS leave_count on leave_record;
CREATE TRIGGER leave_count AFTER UPDATE ON leave_record FOR EACH ROW EXECUTE PROCEDURE emp_stamp();



 -- get leave requests----------------------

create or replace function getleavea ( s_id numeric)
returns table(
		leave_id int,
		employee_id int,
		first_name varchar ,
 		last_name varchar,
 		leave_type varchar
 	)
 	language plpgsql
as $$
begin
 	return query 
 		select l.leave_id,l.employee_id,p.first_name,p.last_name,l.leave_type
        from supervisor s left outer join leave_record  l on l.employee_id = s.employee_id
 		left outer join personal_information p on s.employee_id = p.employee_id
 		where s.supervisor_id = s_id AND l.approval_state = 'No' ;
end;$$;

-- get all employees--------------------------------
create or replace function getEmployees1 ( s_id numeric)
returns table(
 		employee_id int,
 		first_name varchar ,
  		last_name varchar,
  		count_leaves int,
		total_leaves int
  	)
  	language plpgsql
 as $$
 begin
  	return query 
  		select s.employee_id,p.first_name,
		p.last_name, e.anual+e.casual+e.maternity+e.no_pay AS count_leaves,
		lv.anual + lv.casual + lv.maternity + lv.no_pay AS total_leaves
		from supervisor s left outer join personal_information  p  
	on s.employee_id = p.employee_id
	left outer join employee_leave e on e.employee_id = p.employee_id
	left outer join employee em on em.employee_id = p.employee_id
	left outer join leave lv on em.paygrade_level = lv.paygrade_level
  		where s.supervisor_id = s_id  AND year =2021 ;
end;$$;

-- get employee-----------------------------
create or replace function getEmployee ( e_id numeric)
returns table(
 		employee_id int,
 		first_name varchar ,
  		last_name varchar,
  		count_leaves int,
		total_leaves int
  	)
  	language plpgsql
 as $$
 begin
  	return query 
  		select p.employee_id,p.first_name,p.last_name,
		e.anual+e.casual+e.maternity+e.no_pay AS count_leaves,
		lv.anual + lv.casual + lv.maternity + lv.no_pay AS total_leaves
		from personal_information  p  
		left outer join employee_leave e on e.employee_id = p.employee_id
		left outer join employee em on em.employee_id = p.employee_id
		left outer join leave lv on em.paygrade_level = lv.paygrade_level
  		where p.employee_id = e_id AND year =2021  ;
end;$$;


-- get absents -----------------------
create or replace function getAttendence (In s_id numeric,
						In today date)
returns integer
  	language plpgsql
 as $$
 
 DECLARE
 count1 INTEGER :=0 ;
 begin
		select count(distinct l.employee_id) into count1
from supervisor s left outer join leave_record  l on l.employee_id = s.employee_id
where start_date + duration >= today AND s.supervisor_id = s_id AND start_date < today AND approval_state = 'Yes';
return count1;
end;$$;



CREATE or replace FUNCTION emp_leave()
    RETURNS trigger
    LANGUAGE 'plpgsql'
AS $BODY$
DECLARE
 anual1 INTEGER :=0 ;
 casual1 INTEGER :=0 ;
 maternity1 INTEGER :=0 ;
 no_pay1 INTEGER :=0 ;

		
  		BEGIN
 		select anual, casual , maternity , no_pay into anual1 , casual1, maternity1,no_pay1
		from leave where paygrade_level = NEW.paygrade_level;
  		insert into employee_leave values(NEW.employee_id,2021, anual1, casual1, maternity1, no_pay1 ); 
		return new;
		
END;
$BODY$;

Drop TRIGGER IF EXISTS emp_leave on employee;
CREATE TRIGGER setLeave AFTER INSERT ON employee FOR EACH ROW EXECUTE PROCEDURE emp_leave();


-- Indunil's section---------------------------------------------------------------------------------------------------------------------

CREATE or replace FUNCTION changeempcount()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
BEGIN
      update department set employee_count=employee_count+1 where dept_name=new.dept_name;
	  return new;
   END;
$BODY$;


Drop TRIGGER IF EXISTS incrementempcount on employee;
CREATE TRIGGER incrementempcount
    AFTER INSERT
    ON employee
    FOR EACH ROW
    EXECUTE PROCEDURE changeempcount();





CREATE OR REPLACE FUNCTION changeempcount1() RETURNS TRIGGER AS $department_table$
   BEGIN
      update department set employee_count=employee_count-1 where dept_name=old.dept_name;
      RETURN old;
   END;
$department_table$ LANGUAGE plpgsql;


Drop TRIGGER IF EXISTS deccrementempcount on employee;
CREATE TRIGGER deccrementempcount
    AFTER DELETE
    ON employee
    FOR EACH ROW
    EXECUTE PROCEDURE changeempcount1();


CREATE OR REPLACE FUNCTION setcountry( c varchar(100)) RETURNS integer
	AS $$
    DECLARE
    c_id integer;
    BEGIN 
        SELECT country_id INTO c_id FROM country
        WHERE country=c;

        IF c_id IS NULL THEN 
        INSERT INTO country (country) VALUES (c)
        RETURNING country_id INTO c_id ;

        END IF;

        RETURN c_id;
    END;
    $$ LANGUAGE PLpgSQL;


CREATE OR REPLACE FUNCTION setcity( cityname varchar(100), countryid numeric) RETURNS integer
	AS $$
    DECLARE
    c_id integer;
    BEGIN 
        SELECT city_id INTO c_id FROM city
        WHERE city=cityname and country_id=countryid;

        IF c_id IS NULL THEN 
        INSERT INTO city (city, country_id) VALUES (cityname, countryid)
        RETURNING city_id INTO c_id ;

        END IF;

        RETURN c_id;
    END;
    $$ LANGUAGE PLpgSQL;

CREATE OR REPLACE FUNCTION setaddress( addressname varchar(100), cityid numeric, postalcode numeric) RETURNS integer
	AS $$
    DECLARE
    a_id integer;
    BEGIN 
        SELECT address_id INTO a_id FROM address
        WHERE address=addressname and city_id=cityid and postal_code=postalcode;

        IF a_id IS NULL THEN 
        INSERT INTO address (address, city_id,postal_code) VALUES (addressname, cityid, postalcode)
        RETURNING address_id INTO a_id ;

        END IF;

        RETURN a_id;
    END;
    $$ LANGUAGE PLpgSQL;



Create Or Replace PROCEDURE updateJupitorLeaves(paygradelevel varchar(50), an integer, cas integer, mat integer, nopay integer)
LANGUAGE plpgsql
AS $$
BEGIN 
	UPDATE leave SET anual=an, casual=cas, maternity=mat, no_pay=nopay where paygrade_level=paygradelevel;
	IF NOT FOUND THEN
	INSERT INTO leave(paygrade_level, anual, casual, maternity,no_pay) values (paygradelevel,an,cas, mat, nopay);
	END IF;
END;
$$;


-- views for admin
CREATE OR REPLACE VIEW personal_information_view AS
SELECT employee_id,nic, first_name, middle_name, last_name, gender, address_id, birth_day, email, registered_date, photo
FROM  personal_information;

CREATE OR REPLACE view address_view AS
SELECT address.address_id, address.address, address.postal_code, city.city, country.country
FROM  address left outer join city using(city_id) left outer join country using(country_id);

CREATE OR REPLACE view contact_details_view AS
SELECT *
from emergency_contact_details left outer join employee_phone_number using(employee_id);


Create Or Replace PROCEDURE updateJupitorPayGrade(paygradelevel varchar(50), des varchar(50), req varchar(50))
LANGUAGE plpgsql
AS $$
BEGIN 
	UPDATE pay_grade SET description=des, requirement=req where paygrade_level=paygradelevel;
	
END;
$$;


Create Or Replace PROCEDURE updateJupitorEmployeeStatus(estatusname varchar(50), du varchar(50), des varchar(50))
LANGUAGE plpgsql
AS $$
BEGIN 
	UPDATE employee_status SET duration=du, description=des where e_status_name=estatusname;
	
END;
$$;

Create Or Replace PROCEDURE updateJupitorJobs(jobtitle varchar(50), des varchar(50), req varchar(50), prereq varchar(50))
LANGUAGE plpgsql
AS $$
BEGIN 
	UPDATE job_type SET description=des, req_qualification=req, prerequisites=prereq where job_title=jobtitle;
	
END;
$$;

Create Or Replace PROCEDURE updateJupitorBranch(branchName varchar(50), add integer)
LANGUAGE plpgsql
AS $$
BEGIN 
	UPDATE branch SET address_id=add where branch_name=branchName;
	
END;
$$;

-- trigger to restrict only one admin
create or replace function restrictedAdmin() returns trigger as $$
	declare 
	c_admin integer;
	begin
		select count(*) into c_admin from admin;
		if c_admin>0 then
			        RAISE EXCEPTION 'permission denied';
		end if;
		return new;
	end;
$$ LANGUAGE plpgsql;
Drop TRIGGER IF EXISTS checkAdminTable on admin;
create trigger checkAdminTable before insert on admin for each row execute procedure restrictedAdmin();

-- call updateJupitorLeaves('level 1', 3 ,3 ,4 ,7)


--Kavishka's Functions--
CREATE OR REPLACE VIEW full_employee_detail
    AS
     SELECT personal_information.employee_id,
    personal_information.nic,
    personal_information.first_name,
    personal_information.middle_name,
    personal_information.last_name,
    personal_information.gender,
    personal_information.birth_day,
    personal_information.address_id,
    personal_information.email,
    personal_information.password,
    personal_information.photo,
    personal_information.registered_date,
    employee.branch_name,
    employee.job_title,
    employee.dept_name,
    employee.paygrade_level,
    employee.e_status_name,
    employee.supervisor
   FROM (personal_information
     JOIN employee USING (employee_id));

-- function for get leave records by date range

CREATE OR REPLACE FUNCTION getleavebydate(startD date,endD date)
    RETURNS TABLE(leave_id integer, employee_id integer, leave_type character varying, apply_date date, startdate date, duration integer, reason character varying, approval_state character varying)
    LANGUAGE 'plpgsql'
    VOLATILE
    PARALLEL UNSAFE
    COST 100    ROWS 1000 
    
AS $BODY$
BEGIN
RETURN QUERY
	SELECT * FROM leave_record WHERE start_date BETWEEN startD AND endD;
END;
$BODY$;

--materialized View with olap
CREATE MATERIALIZED VIEW public.departmentleavesummery
TABLESPACE pg_default
AS
 SELECT department.dept_name,
    leave_record.leave_type,
    count(leave_record.leave_id) AS leavecountbydep
   FROM ((leave_record
     JOIN employee USING (employee_id))
     RIGHT JOIN department USING (dept_name))
  GROUP BY CUBE(department.dept_name, leave_record.leave_type)
  ORDER BY department.dept_name
WITH DATA;

ALTER TABLE public.departmentleavesummery
    OWNER TO jupitor;

GRANT ALL ON TABLE public.departmentleavesummery TO jupitor WITH GRANT OPTION;
GRANT ALL ON TABLE public.departmentleavesummery TO jupitorhr WITH GRANT OPTION;

--Materialized view refresh function and necessory views
CREATE OR REPLACE FUNCTION public.refresh_mvw1(
	)
    RETURNS void
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE SECURITY DEFINER PARALLEL UNSAFE
AS $BODY$
BEGIN
REFRESH MATERIALIZED VIEW departmentleavesummery with data;
RETURN;
END;
$BODY$;

ALTER FUNCTION public.refresh_mvw1()
    OWNER TO postgres;

GRANT EXECUTE ON FUNCTION public.refresh_mvw1() TO PUBLIC;

GRANT EXECUTE ON FUNCTION public.refresh_mvw1() TO jupitorhr WITH GRANT OPTION;

GRANT EXECUTE ON FUNCTION public.refresh_mvw1() TO postgres;


CREATE OR REPLACE VIEW public.dept_anual
 AS
 SELECT departmentleavesummery.dept_name,
    departmentleavesummery.leave_type,
    departmentleavesummery.leavecountbydep
   FROM departmentleavesummery
  WHERE ((departmentleavesummery.leave_type)::text = 'anual'::text);

ALTER TABLE public.dept_anual
    OWNER TO postgres;

GRANT ALL ON TABLE public.dept_anual TO postgres;
GRANT ALL ON TABLE public.dept_anual TO jupitorhr;

CREATE OR REPLACE VIEW public.dept_casual
 AS
 SELECT departmentleavesummery.dept_name,
    departmentleavesummery.leave_type,
    departmentleavesummery.leavecountbydep
   FROM departmentleavesummery
  WHERE ((departmentleavesummery.leave_type)::text = 'casual'::text);

ALTER TABLE public.dept_casual
    OWNER TO postgres;

GRANT ALL ON TABLE public.dept_casual TO postgres;
GRANT ALL ON TABLE public.dept_casual TO jupitorhr;

CREATE OR REPLACE VIEW public.dept_maternity
 AS
 SELECT departmentleavesummery.dept_name,
    departmentleavesummery.leave_type,
    departmentleavesummery.leavecountbydep
   FROM departmentleavesummery
  WHERE ((departmentleavesummery.leave_type)::text = 'maternity'::text);

ALTER TABLE public.dept_maternity
    OWNER TO postgres;

GRANT ALL ON TABLE public.dept_maternity TO postgres;
GRANT ALL ON TABLE public.dept_maternity TO jupitorhr;

CREATE OR REPLACE VIEW public.dept_no_pay
 AS
 SELECT departmentleavesummery.dept_name,
    departmentleavesummery.leave_type,
    departmentleavesummery.leavecountbydep
   FROM departmentleavesummery
  WHERE ((departmentleavesummery.leave_type)::text = 'no_pay'::text);

ALTER TABLE public.dept_no_pay
    OWNER TO postgres;

GRANT ALL ON TABLE public.dept_no_pay TO postgres;
GRANT ALL ON TABLE public.dept_no_pay TO jupitorhr;


-- jupitor 

GRANT EXECUTE ON FUNCTION getattendence(s_id numeric, today date) TO jupitor;
GRANT EXECUTE ON FUNCTION getemployee(e_id numeric) TO jupitor;
GRANT EXECUTE ON FUNCTION getemployees1(s_id numeric) TO jupitor;
GRANT EXECUTE ON FUNCTION getleavea(s_id numeric) TO jupitor;
GRANT EXECUTE ON FUNCTION getleavebydate(startd date, endd date) TO jupitor;
GRANT EXECUTE ON FUNCTION getnosupervisoremployees(branch character varying, department character varying, jobtitle character varying) TO jupitor;
GRANT EXECUTE ON FUNCTION getsupervisors(branch character varying, department character varying, jobtitle character varying) TO jupitor;
GRANT EXECUTE ON FUNCTION setaddress(addressname character varying, cityid numeric, postalcode numeric) TO jupitor;
GRANT EXECUTE ON FUNCTION setcity(cityname character varying, countryid numeric) TO jupitor;
GRANT EXECUTE ON FUNCTION setcountry(c character varying) TO jupitor;
GRANT EXECUTE ON PROCEDURE addtosupervisort(employee_ids integer[], val_supervisor_id integer, arraylength integer) TO jupitor;
GRANT EXECUTE ON PROCEDURE updatejupitorbranch(branchname character varying, add integer) TO jupitor;
GRANT EXECUTE ON PROCEDURE updatejupitoremployeestatus(estatusname character varying, du character varying, des character varying) TO jupitor;
GRANT EXECUTE ON PROCEDURE updatejupitorjobs(jobtitle character varying, des character varying, req character varying, prereq character varying) TO jupitor;
GRANT EXECUTE ON PROCEDURE updatejupitorleaves(paygradelevel character varying, an integer, cas integer, mat integer, nopay integer) TO jupitor;
GRANT EXECUTE ON PROCEDURE updatejupitorpaygrade(paygradelevel character varying, des character varying, req character varying) TO jupitor;
GRANT EXECUTE ON FUNCTION changeempcount() TO jupitor;
GRANT EXECUTE ON FUNCTION changeempcount1() TO jupitor;
GRANT EXECUTE ON FUNCTION check_age(birthday date) TO jupitor;
GRANT EXECUTE ON FUNCTION emp_leave() TO jupitor;
GRANT EXECUTE ON FUNCTION emp_stamp() TO jupitor;
GRANT EXECUTE ON FUNCTION restrictedadmin() TO jupitor;
GRANT EXECUTE ON FUNCTION updatesupervisortable() TO jupitor;
GRANT ALL ON SEQUENCE address_address_id_seq TO jupitor;
GRANT ALL ON SEQUENCE city_city_id_seq TO jupitor;
GRANT ALL ON SEQUENCE country_country_id_seq TO jupitor;
GRANT ALL ON SEQUENCE leave_record_leave_id_seq TO jupitor;
GRANT ALL ON SEQUENCE personal_information_employee_id_seq TO jupitor;
GRANT ALL ON TABLE address TO jupitor;
GRANT ALL ON TABLE admin TO jupitor;
GRANT ALL ON TABLE branch TO jupitor;
GRANT ALL ON TABLE city TO jupitor;
GRANT ALL ON TABLE country TO jupitor;
GRANT ALL ON TABLE customattributes TO jupitor;
GRANT ALL ON TABLE department TO jupitor;
GRANT ALL ON TABLE emergency_contact_details TO jupitor;
GRANT ALL ON TABLE employee TO jupitor;
GRANT ALL ON TABLE employee_leave TO jupitor;
GRANT ALL ON TABLE employee_phone_number TO jupitor;
GRANT ALL ON TABLE employee_status TO jupitor;
GRANT ALL ON TABLE job_type TO jupitor;
GRANT ALL ON TABLE leave TO jupitor;
GRANT ALL ON TABLE leave_record TO jupitor;
GRANT ALL ON TABLE pay_grade TO jupitor;
GRANT ALL ON TABLE personal_information TO jupitor;
GRANT ALL ON TABLE personal_information_custom TO jupitor;
GRANT ALL ON TABLE session TO jupitor;
GRANT ALL ON TABLE supervisor TO jupitor;
GRANT ALL ON TABLE employeedata_view TO jupitor;
GRANT ALL ON TABLE full_employee_detail TO jupitor;







-- admin role
drop role if exists admin;
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
Grant select,insert,update on employee_leave to admin;
Grant select,insert,update on employee_phone_number to admin;
Grant select,insert,update on leave to admin;
GRANT ALL ON TABLE admin TO admin;
Grant select on information_schema.columns to admin;
GRANT ALL ON SEQUENCE address_address_id_seq TO admin;
GRANT ALL ON SEQUENCE city_city_id_seq TO admin;
GRANT ALL ON SEQUENCE country_country_id_seq TO admin;
GRANT ALL ON SEQUENCE personal_information_employee_id_seq TO admin;
GRANT SELECT ON TABLE public.address_view TO admin;
GRANT SELECT ON TABLE public.contact_details_view TO admin;
GRANT SELECT ON TABLE public.personal_information_view TO admin;
GRANT EXECUTE ON FUNCTION check_age(birthday date) TO admin;
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
drop role if exists jupitorhr;
CREATE ROLE jupitorhr WITH LOGIN PASSWORD 'passwordjupitorhr';
GRANT INSERT, SELECT, UPDATE, TRIGGER ON TABLE address TO jupitorhr;
GRANT SELECT, TRIGGER ON TABLE branch TO jupitorhr;
GRANT INSERT, SELECT, UPDATE, TRIGGER ON TABLE city TO jupitorhr;
GRANT INSERT, SELECT, UPDATE, TRIGGER ON TABLE country TO jupitorhr;
GRANT INSERT, SELECT, UPDATE, TRIGGER ON TABLE customattributes TO jupitorhr;
GRANT SELECT, TRIGGER ON TABLE department TO jupitorhr;
GRANT ALL ON TABLE public.department TO jupitorhr;
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
GRANT EXECUTE ON FUNCTION check_age(birthday date) TO jupitorhr;
GRANT EXECUTE ON FUNCTION updatesupervisortable() TO jupitorhr;
GRANT EXECUTE ON FUNCTION getleavebydate(date, date) TO jupitorhr;
GRANT INSERT, SELECT, UPDATE, TRIGGER ON TABLE public.employeedata_view TO jupitorhr;
GRANT INSERT, SELECT, UPDATE, TRIGGER ON TABLE public.full_employee_detail TO jupitorhr;
GRANT INSERT, SELECT, UPDATE, TRIGGER ON TABLE public.employee_leave TO jupitorhr;


-------------------- manager role ----------------------------------------------------------------------------------------
drop role if exists jupitormanager;
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
GRANT EXECUTE ON FUNCTION check_age(birthday date) TO jupitormanager;
GRANT EXECUTE ON PROCEDURE public.addtosupervisort(employee_ids integer[], val_supervisor_id integer, arraylength integer) TO jupitormanager;
GRANT EXECUTE ON FUNCTION public.updateSupervisorTable() TO jupitormanager;
GRANT EXECUTE ON FUNCTION public.getsupervisors(branch character varying, department character varying, jobtitle character varying) TO jupitormanager;
GRANT EXECUTE ON FUNCTION public.getnosupervisoremployees(branch character varying, department character varying, jobtitle character varying) TO jupitormanager;
GRANT EXECUTE ON FUNCTION public.setcity(cityname character varying, countryid numeric) TO jupitormanager;
GRANT EXECUTE ON FUNCTION public.setaddress(addressname character varying, cityid numeric, postalcode numeric) TO jupitormanager;
GRANT EXECUTE ON FUNCTION public.setcountry(c character varying) TO jupitormanager;

-- Supervisor Role -------------------------------------------------------------------------------------------------
drop role if exists jupitorSupervisor;
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
drop role if exists jupitorEmployee;
CREATE ROLE jupitorEmployee WITH LOGIN PASSWORD 'password';
GRANT SELECT, UPDATE, INSERT, TRIGGER ON TABLE leave_record TO jupitorEmployee;
GRANT SELECT ON TABLE EmployeeData_View TO jupitorEmployee;
GRANT SELECT ON TABLE employee_phone_number TO jupitorEmployee;
GRANT SELECT ON TABLE address TO jupitorEmployee;
GRANT SELECT ON TABLE city TO jupitorEmployee;
GRANT SELECT ON TABLE country TO jupitorEmployee;
GRANT ALL ON SEQUENCE leave_record_leave_id_seq TO jupitorEmployee;
