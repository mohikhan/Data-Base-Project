create table district(district_id int, A2 varchar(20), A3 varchar(30), A4 int,
					 A5 int, A6 int, A7 int, A8 int, A9 int, A10 real, A11 int,
					 A12 real, A13 real, A14 int, A15 int, A16 int,
					 Primary key(district_id));
					 
create table account(account_id int, district_id int, frequency varchar(20), 
					 date Date,
					Primary key(account_id),
					foreign key(district_id) REFERENCES district);
					 
create table loan(loan_id int, account_id int, date Date, amount int, duration int,
				 payments real, status varchar(20),
				 Primary key(loan_id),
				 foreign key(account_id) REFERENCES account);
				 
create table order1 (order_id int, account_id int, bank_to varchar(20),
				  account_to int, amount real, k_symbol varchar(20),
				  Primary key(order_id),
				  foreign key(account_id) REFERENCES account);
				  
create table trans(trans_id int, account_id int, date Date, type varchar(20),
				  operation varchar(20), amount int, balance int,
				  k_symbol varchar(20), bank varchar(20), account int,
				  primary key(trans_id),
				  foreign key(account_id) REFERENCES account);
				  
create table client(client_id int, gender varchar(20), birth_date Date, 
				   district_id int,
				   primary key(client_id),
				   foreign key(district_id) REFERENCES district);
				  
create table disp(disp_id int, client_id int, account_id int, type varchar(20),
				 primary key(disp_id),
				 foreign key(account_id) REFERENCES account,
				 foreign key(client_id) references client);
				 
create table card(card_id int, disp_id int, type varchar(20), issued Date,
				primary key(card_id),
				foreign key(disp_id) references disp);
				