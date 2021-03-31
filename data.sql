
INSERT INTO country(
	country_id, country)
	VALUES (1, 'Sri lanka');

INSERT INTO city(
	city_id, city, country_id)
	VALUES (1, 'kelaniya', 1);


	
	
INSERT INTO address(
	address_id, address, city_id, postal_code)
	VALUES (1, 'sinharamulla', 1, 11600);




INSERT INTO branch(
	branch_name, address_id)
	VALUES ('new tel', 1);

INSERT INTO department(
	dept_name)
	VALUES ('HR'), ('software');
	


INSERT INTO employee_status(
	e_status_name, duration, description)
	VALUES ('permanent', '6 months', 'this is dummy description');


insert into job_type (job_title) values('HR') ,('Manager'), ('software engineer');

INSERT INTO pay_grade(
	paygrade_level, description, requirement)
	VALUES ('level 1', 'this is dummy description', '4 years'),  ('level 2', 'this is dummy description','4 years' );

INSERT INTO leave(
	paygrade_level, anual, casual, maternity, no_pay)
	VALUES ('level 1', 104, 22, 255, 22);


-- real password 12345678

INSERT INTO personal_information(
	employee_id, nic, first_name, gender, birth_day, address_id, email, password, photo, registered_date)
	VALUES (1	,'4578999977',	'indunil','male','2016-02-02',1	,'indunil773@gmail.com'	,'$2b$10$jQHLWUqTH16JsVo0VyIw1eJZBWrovYg80BbMI58IM4zdA3JbUMECe'	,'http://res.cloudinary.com/dm36weewi/image/upload/v1614495778/kv55okywbeukso22oapv.png','2021-02-27'),
	(2,'4578998899'	,'indunil','male','2021-02-02',1,'udayangana19958@gmail.com','$2b$10$jQHLWUqTH16JsVo0VyIw1eJZBWrovYg80BbMI58IM4zdA3JbUMECe'	,'http://res.cloudinary.com/dm36weewi/image/upload/v1614499399/rrbbntdyu7zpz0ntgq5f.png','2021-02-28'),
	(3,'524789655V','indunil','Male','1989-01-02'	,1	,'indunil348@gmail.com'	,'$2b$10$jQHLWUqTH16JsVo0VyIw1eJZBWrovYg80BbMI58IM4zdA3JbUMECe','','2021-02-28'),
	(4	,'124578986V','indunil','Male'	,'1986-12-28',	1,	'indunil553@gmail.com',	'$2b$10$jQHLWUqTH16JsVo0VyIw1eJZBWrovYg80BbMI58IM4zdA3JbUMECe','','2021-02-28');
	


INSERT INTO admin(
	employee_id)
	VALUES (1);

INSERT INTO employee(
	employee_id, branch_name, job_title, dept_name, paygrade_level, e_status_name, supervisor)
	VALUES (2,'new tel','HR','HR','level 1','permanent'	,false),
	 (3	,'new tel',	'Manager'	,'software',	'level 1',	'permanent'	,false),
    (4	,'new tel'	,'software engineer',	'software'	,'level 1',	'permanent'	,true);
INSERT INTO personal_information_custom(
	employee_id)
	VALUES (2), (3), (4);

INSERT INTO supervisor(
	employee_id, supervisor_id)
	VALUES (4, 3);

INSERT INTO leave_record(
	leave_id, employee_id, leave_type, apply_date, start_date, duration, reason, approval_state)
	VALUES (1,3,'anual','2021-02-28','2021-02-09',5,'nidimathai','No');


INSERT INTO employee_phone_number(
	employee_id, phone)
	VALUES (3,'0147896534'
), (4,'0714569875');
	





	
	


