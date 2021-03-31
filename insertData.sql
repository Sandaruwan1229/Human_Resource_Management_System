--insert into job_type (job_title) values('HR') ,('Manager');
--insert into department (dept_name) values('HR');

INSERT INTO public.job_type(
	job_title, description, req_qualification, prerequisites)
	VALUES ('HR', 'head of HR department', '5 years expirience','degree or diploma in HR'),
	('Manager', 'manager of the relevant department', '5 years expirience','3 passes in advance level'),
	('Supervisor', 'managed a line', '2 years expirience','2 passes in advance level'),
	('operator', 'operates a sewing machine', 'sit to OL exam','');


INSERT INTO public.department(
	dept_name, employee_count, building)
	VALUES ('hr', '20', 'main'),
	('cutting', '30', 'cutting'),
	('stock', '30', 'stock'),
	('sewing', '200', 'sewing');

INSERT INTO public.pay_grade(
	paygrade_level, description, requirement)
	VALUES ('level_01', 'executive level', 'appointment'),
	('level_02', 'manager level', 'managerial appointment'),
	('level_03', 'supervisor level', 'supervisor appointment'),
	('level_04', 'staff level', 'staff appointment'),
	('level_05', 'senior level', '2 years servie'),
	('level_06', 'permenant level', 'appointment'),
	('level_07', 'trainee level', ''),
	('level_08', 'contract level', 'contract');

INSERT INTO public.country(
	country_id, country)
	VALUES ('1', 'SriLanka'),
	('2', 'India');

INSERT INTO public.city(
	city_id, city, country_id)
	VALUES  ('1', 'kurunegala', '1'),
	('2', 'gampaha', '1'),
	('3', 'kelaniya', '1'),
	('4', 'nikaweratiya', '1'),
	('5', 'madras', '2');


INSERT INTO public.address(
	address_id, address, city_id, postal_code)
	VALUES ('1', 'no 5 colombo road', '1','10400'),
	('2', 'no 23 colombo road', '2','20500'),
	('3', 'no 124 temple road', '3','30320'),
	('4', 'no 1 puttalam road', '4','45800'),
	('5', 'no 56 industrial estate', '5','430320');

INSERT INTO public.branch(
	branch_name, address_id)
	VALUES ('kurunegala','1' ),
	('gampaha','2' ),
	('kelaniya','3' ),
	('madras','5' ),
	('nikaweratiya','4' );

INSERT INTO public.employee_status(
	e_status_name, duration, description)
	VALUES ('permenant', '20 years', 'permenant employee'),
	('trainee', '6 months', 'training employee'),
	('temporary', '6 months', 'working for a temperory time period'),
	('contract', '3 months', 'working for a agreed contract');

INSERT INTO public.leave(
	paygrade_level, anual, casual, maternity, no_pay)
	VALUES ('level_01', '120','30' ,'90','25'),
	('level_02',  '120','30' ,'90','25'),
	('level_03', '100','25' ,'90','20'),
	('level_04', '100','20' ,'90','20'),
	('level_05', '90','20' ,'90','20'),
	('level_06',  '80','20' ,'90','15'),
	('level_07', '75','15' ,'90','10'),
	('level_08',  '80','20' ,'90','15');

	INSERT INTO public.address(
	address_id, address, city_id, postal_code)
	VALUES ('6', 'no 32 colombo road', '1','10400'),
	('7', 'no 123 colombo road', '2','20500'),
	('8', 'no 224 temple road', '3','30320'),
	('9', 'no 12 puttalam road', '4','45800'),
	('10', 'no 456 industrial estate', '5','430320'),
	('11', 'no 19 puttalam road', '4','45800'),
	('12', 'no 256 industrial estate', '5','430320')	;

	INSERT INTO public.personal_information(
	employee_id, nic, first_name, middle_name, last_name, gender, birth_day, address_id, email, password, photo, registered_date)
	VALUES (1, '971650834v', 'admin', '', '', 'male', '1997/06/13', '1', 'theekshanamadumal@gmail.com', '11111111', '', '2020/05/05'),
	(2, '111111111v', 'theekshana', 'madumal', 'samaradiwakara', 'male', '1997/05/23', '6', 'theekshana@gmail.com', '11111111', '', '2020/05/05'),
	(3, '222222222v', 'sadaruwan', 'kalum', 'dissanayaka', 'male', '1998/06/04', '7', 'sadaruwan11@gmail.com', '11111111', '', '2020/05/05'),
	(4, '333333333v', 'idunil', 'udayanga', 'ariyapala', 'male', '1998/06/13', '8', 'udatangaaruya@gmail.com', '11111111', '', '2020/05/05'),
	(5, '444444444v', 'idunil', 'priyashan', 'rathnavibhushana', 'male', '1998/06/28', '9', 'andunilpriya12@gmail.com', '11111111', '', '2020/05/05'),
	(6, '555555555v', 'kaveesha', 'lakmal', 'perera', 'male', '1999/06/02', '10', 'kaveesha1999@gmail.com', '11111111', '', '2020/05/05'),
	(7, '666666666v', 'gimntha', 'dahami', 'karunarathna', 'male', '1987/02/13', '11', 'gimanthadahami@gmail.com', '11111111', '', '2020/05/05'),
	(8, '777777777v', 'rashmi', 'hasarali', 'gamage', 'female', '1982/11/20', '12', 'rcrashmih@gmail.com', '11111111', '', '2020/05/05'),
	(9, '888888888v', 'sayuri', 'asma', 'perera', 'female', '1971/06/25', '5', 'asmasayuri19@gmail.com', '11111111', '', '2020/05/05'),
	(10, '999999999v', 'chirath', 'menaka', 'vandabona', 'male', '1988/06/11', '8', 'vcvndabona24@gmail.com', '11111111', '', '2020/05/05')	;

	INSERT INTO public.employee(
	employee_id, branch_name, job_title, dept_name, paygrade_level, e_status_name, supervisor)
	VALUES (1, 'gampaha', 'HR', 'hr', 'level_02', 'permenant',false),
	(2, 'gampaha', 'HR', 'hr', 'level_02', 'permenant', false),
	(3, 'gampaha', 'Manager', 'sewing', 'level_02', 'permenant', false),
	(4, 'gampaha', 'Supervisor', 'sewing', 'level_03', 'permenant', false),
	(5, 'gampaha', 'operator', 'sewing', 'level_06', 'permenant', true),
	(6, 'gampaha', 'Supervisor', 'sewing', 'level_03', 'permenant', false),
	(7, 'gampaha', 'operator', 'sewing', 'level_06', 'permenant',true),
	(8, 'nikaweratiya', 'HR', 'hr', 'level_02', 'permenant', false),
	(9, 'kelaniya', 'HR', 'hr', 'level_02', 'permenant', false),
	(10, 'kurunegala', 'HR', 'hr', 'level_02', 'permenant', false)	;
	
INSERT INTO public.personal_information_custom(
	employee_id, nationality)
	VALUES (2, 'SriLankan'),
	(3, 'SriLankan'),
	(4, 'SriLankan'),
	(5, 'SriLankan'),
	(6, 'SriLankan'),
	(7, 'SriLankan'),
	(8, 'SriLankan'),
	(9, 'SriLankan'),
	(10, 'SriLankan')	;

                                                                
INSERT INTO public.supervisor(
	employee_id, supervisor_id)
	VALUES (5, 4),
	(7,4);

INSERT INTO public.employee_phone_number(
	employee_id, phone)
	VALUES (2,'070622522'),
	(2,'071622522'),
	(4,'072622522'),
	(5,'07730622522'),
	(6,'074622522'),
	(7,'075622522'),
	(8,'076622522'),
	(9,'077622522'),
	(10,'078622522');

INSERT INTO public.emergency_contact_details(
	employee_id, relative_name, contact_no)
	VALUES (2, 'samantha', '0701234567'),
	(3, 'samantha', '0711234567'),
	(4, 'samantha', '0721234567'),
	(5, 'samantha', '0731234567'),
	(6, 'samantha', '0741234567'),
	(7, 'samantha', '0751234567'),
	(8, 'samantha', '0761234567'),
	(9, 'samantha', '0771234567'),
	(10, 'samantha', '0781234567')	;

INSERT INTO public.admin(
	employee_id)
	VALUES (1);




--custom_attributes
--employee_leave
--leave_record

--hashed password