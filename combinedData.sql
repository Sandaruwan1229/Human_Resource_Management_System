--insert into job_type (job_title) values('HR') ,('Manager');
--insert into department (dept_name) values('HR');

INSERT INTO public.job_type(
	job_title, description, req_qualification, prerequisites)
	VALUES ('HR', 'head of HR department', '5 years expirience','degree or diploma in HR'),
	('Manager', 'manager of the relevant department', '5 years expirience','3 passes in advance level'),
	('Supervisor', 'managed a line', '2 years expirience','2 passes in advance level'),
	('operator', 'operates a sewing machine', 'sit to OL exam',''),
    ('software engineer', 'manage software problems', 'relevant degree','');


INSERT INTO public.department(
	dept_name)
	VALUES ('HR'),
	('cutting'),
    ('software'),
	('stock'),
	('sewing');

INSERT INTO public.pay_grade(
	paygrade_level, description, requirement)
	VALUES ('level 1', 'executive level', 'appointment'),
	('level 2', 'manager level', 'managerial appointment'),
	('level 3', 'supervisor level', 'supervisor appointment'),
	('level 4', 'staff level', 'staff appointment'),
	('level 5', 'senior level', '2 years servie'),
	('level 6', 'permanent level', 'appointment'),
	('level 7', 'trainee level', ''),
	('level 8', 'contract level', 'contract');

INSERT INTO public.country(
	country_id, country)
	VALUES ('1', 'Sri Lanka'),
	('2', 'India');

INSERT INTO public.city(
	city_id, city, country_id)
	VALUES  ('1', 'kelaniya', '1'),
	('2', 'gampaha', '1'),
	('3', 'kurunegala', '1'),
	('4', 'nikaweratiya', '1'),
	('5', 'madras', '2');


INSERT INTO public.address(
	address_id, address, city_id, postal_code)
	VALUES ('1', 'sinharamulla', '1','11600'),
	('2', 'no 23 colombo road', '2','20500'),
	('3', 'no 124 temple road', '3','30320'),
	('4', 'no 1 puttalam road', '4','45800'),
	('5', 'no 56 industrial estate', '5','430320');

INSERT INTO public.branch(
	branch_name, address_id)
	VALUES ('new tel','1' ),
	('gampaha','2' ),
	('kelaniya','3' ),
	('madras','5' ),
	('nikaweratiya','4' );

INSERT INTO public.employee_status(
	e_status_name, duration, description)
	VALUES ('permanent', '20 years', 'permanent employee'),
	('trainee', '6 months', 'training employee'),
	('temporary', '6 months', 'working for a temperory time period'),
	('contract', '3 months', 'working for a agreed contract');

INSERT INTO public.leave(
	paygrade_level, anual, casual, maternity, no_pay)
	VALUES ('level 1', '120','30' ,'90','25'),
	('level 2',  '120','30' ,'90','25'),
	('level 3', '100','25' ,'90','20'),
	('level 4', '100','20' ,'90','20'),
	('level 5', '90','20' ,'90','20'),
	('level 6',  '80','20' ,'90','15'),
	('level 7', '75','15' ,'90','10'),
	('level 8',  '80','20' ,'90','15');

	INSERT INTO public.address(
	address_id, address, city_id, postal_code)
	VALUES ('6', 'no 32 colombo road', '1','10400'),
	('7', 'no 123 colombo road', '2','20500'),
	('8', 'no 224 temple road', '3','30320'),
	('9', 'no 12 puttalam road', '4','45800'),
	('10', 'no 456 industrial estate', '5','430320'),
	('11', 'no 19 puttalam road', '4','45800'),
	('12', 'no 256 industrial estate', '5','430320')	;


-- real password 12345678


	INSERT INTO public.personal_information(
	employee_id, nic, first_name, middle_name, last_name, gender, birth_day, address_id, email, password, photo, registered_date)
	VALUES (1, '971650834v', 'admin', '', '', 'male', '1997/06/13', '1', 'theekshanamadumal@gmail.com', 'jQHLWUqTH16JsVo0VyIw1eJZBWrovYg80BbMI58IM4zdA3JbUMECe', '', '2020/05/05'),
	(2, '457899889V', 'theekshana', 'madumal', 'samaradiwakara', 'male', '1997/05/23', '6', 'theekshana@gmail.com', 'jQHLWUqTH16JsVo0VyIw1eJZBWrovYg80BbMI58IM4zdA3JbUMECe', '', '2020/05/05'),
	(3, '222222222v', 'sadaruwan', 'kalum', 'dissanayaka', 'male', '1998/06/04', '7', 'sadaruwan11@gmail.com', 'jQHLWUqTH16JsVo0VyIw1eJZBWrovYg80BbMI58IM4zdA3JbUMECe', '', '2020/05/05'),
	(4, '333333333v', 'idunil', 'udayanga', 'ariyapala', 'male', '1998/06/13', '8', 'udatangaaruya@gmail.com', 'jQHLWUqTH16JsVo0VyIw1eJZBWrovYg80BbMI58IM4zdA3JbUMECe', '', '2020/05/05'),
	(5, '444444444v', 'idunil', 'priyashan', 'rathnavibhushana', 'male', '1998/06/28', '9', 'andunilpriya12@gmail.com', 'jQHLWUqTH16JsVo0VyIw1eJZBWrovYg80BbMI58IM4zdA3JbUMECe', '', '2020/05/05'),
	(6, '555555555v', 'kaveesha', 'lakmal', 'perera', 'male', '1999/06/02', '10', 'kaveesha1999@gmail.com', 'jQHLWUqTH16JsVo0VyIw1eJZBWrovYg80BbMI58IM4zdA3JbUMECe', '', '2020/05/05'),
	(7, '666666666v', 'gimntha', 'dahami', 'karunarathna', 'male', '1987/02/13', '11', 'gimanthadahami@gmail.com', 'jQHLWUqTH16JsVo0VyIw1eJZBWrovYg80BbMI58IM4zdA3JbUMECe', '', '2020/05/05'),
	(8, '777777777v', 'rashmi', 'hasarali', 'gamage', 'female', '1982/11/20', '12', 'rcrashmih@gmail.com', 'jQHLWUqTH16JsVo0VyIw1eJZBWrovYg80BbMI58IM4zdA3JbUMECe', '', '2020/05/05'),
	(9, '888888888v', 'sayuri', 'asma', 'perera', 'female', '1971/06/25', '5', 'asmasayuri19@gmail.com', 'jQHLWUqTH16JsVo0VyIw1eJZBWrovYg80BbMI58IM4zdA3JbUMECe', '', '2020/05/05'),
	(10, '999999999v', 'chirath', 'menaka', 'vandabona', 'male', '1988/06/11', '8', 'vcvndabona24@gmail.com', 'jQHLWUqTH16JsVo0VyIw1eJZBWrovYg80BbMI58IM4zdA3JbUMECe', '', '2020/05/05')	;

	INSERT INTO public.employee(
	employee_id, branch_name, job_title, dept_name, paygrade_level, e_status_name, supervisor)
	VALUES (1, 'new tel', 'HR', 'HR', 'level 2', 'permanent',false),
	(2, 'new tel', 'HR', 'HR', 'level 2', 'permanent', false),
	(3, 'new tel', 'Manager', 'sewing', 'level 2', 'permanent', false),
	(4, 'gampaha', 'software engineer', 'sewing', 'level 3', 'permanent', true),
	(5, 'gampaha', 'operator', 'sewing', 'level 6', 'permanent', true),
	(6, 'gampaha', 'Supervisor', 'sewing', 'level 3', 'permanent', false),
	(7, 'gampaha', 'operator', 'sewing', 'level 6', 'permanent',true),
	(8, 'nikaweratiya', 'HR', 'HR', 'level 2', 'permanent', false),
	(9, 'kelaniya', 'HR', 'HR', 'level 2', 'permanent', false),
	(10, 'gampaha', 'HR', 'HR', 'level 2', 'permanent', false)	;

                                                                
INSERT INTO public.supervisor(
	employee_id, supervisor_id)
	VALUES (5, 3),
	(4,3);

INSERT INTO public.employee_phone_number(
	employee_id, phone)
	VALUES (2,'070622522'),
	(3,'0147896534'),
	(4,'0714569875'),
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


INSERT INTO leave_record(
	leave_id, employee_id, leave_type, apply_date, start_date, duration, reason, approval_state)
	VALUES (1,3,'anual','2021-02-28','2021-02-09',5,'nidimathai','No');

--custom_attributes
--employee_leave


