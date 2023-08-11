# Data-Base-Project

report link : https://docs.google.com/document/d/1GFombGg-fxLlfj-KvvndfoSsIwFSYAtQ2Yy2kS263bg/edit?usp=sharing

## Problem Statement: <br />
Our project focuses on solving a problem through a DBMS faced by bank managers and employees to enhance the services of their bank. The bank wants to enhance and improve its services to serve its clients better. The managers and employees in the bank want to identify reliable and good customers to whom they can enhance and provide better services. Additionally, the managers want to identify the customers or clients who are not good so they can monitor them so the bank doesn’t incur huge losses. The bank wants to keep track and information of their clients such as the loans issued, credit cards issued, etc. in order to study and extract information that will help them to improve and enhance their services.

## Relations: <br />
<img width="463" alt="image" src="https://github.com/mohikhan/Data-Base-Project/assets/20306973/3725311a-08ef-47a8-9a90-4c58b075699d" />

## Schema creation: <br/>
To create schema and load data to PostgreSQL we have created .sql files. All the .sql files which contains SQL commands to load data and .csv files that contain the actual data are attached to the zip file.

First copy all the .csv files and start loading the below .sql files in the below sequence.
1.	First load schema.sql to create all the relations/tables
2.	Then load district.sql to load data to district relation
3.	Then load account.sql
4.	Then load client.sql
5.	Then load disp.sql
6.	Then load card.sql
7.	Then load loan.sql
8.	Then load order.sql
9.	Then load trans.sql
10.	Finally, load update_schema.sql to change the schema

## Data source: <br/>
https://web.archive.org/web/20180506035658/http:/lisp.vse.cz/pkdd99/Challenge/berka.htm

## Web application: <br />
For web application, we need to have following things installed: 
npm, SQL, table plus.
### Set up: <br/>
1. Extract the zip file in that we 2 folders: client and server.
2. Go in each folder and run npm install
3. Now open table plus 
4. create a new PostgreSQL connection in that enter details similar to db.js in server folder.
5. Open terminal, enter psql postgres
6. Now run following queries in the same terminal
   <details>
     <summary>Click me!</summary>
     create table district(district_id int, A2 varchar(20), A3 varchar(30), A4 int,
					 A5 int, A6 int, A7 int, A8 int, A9 int, A10 real, A11 int,
					 A12 real, A13 real, A14 int, A15 int, A16 int,
					 Primary key(district_id));
     
     create table account(account_id int, district_id int, frequency varchar(20), 
    					 date Date,
    					Primary key(account_id),
    					foreign key(district_id) REFERENCES district on delete set NULL);
       				 
      create table loan(loan_id int, account_id int, date Date, amount int, duration int,
      				 payments real, status varchar(20),
      				 Primary key(loan_id),
      				 foreign key(account_id) REFERENCES account on delete cascade);
      				 
      create table order1 (order_id int, account_id int, bank_to varchar(20),
      				  account_to int, amount real, k_symbol varchar(20),
      				  Primary key(order_id),
      				  foreign key(account_id) REFERENCES account on delete cascade);
    				  
      create table trans(trans_id int, account_id int, date Date, type varchar(20),
      				  operation varchar(20), amount int, balance int,
      				  k_symbol varchar(20), bank varchar(20), account int,
      				  primary key(trans_id),
      				  foreign key(account_id) REFERENCES account on delete cascade);
      				  
      create table client(client_id int, gender varchar(20), birth_date Date, 
      				   district_id int,
      				   primary key(client_id),
      				   foreign key(district_id) REFERENCES district on delete set NULL);
      				  
      create table disp(disp_id int, client_id int, account_id int, type varchar(20),
      				 primary key(disp_id),
      				 foreign key(account_id) REFERENCES account on delete cascade,
      				 foreign key(client_id) references client on delete cascade);
      				 
      create table card(card_id int, disp_id int, type varchar(20), issued Date,
      				primary key(card_id),
      				foreign key(disp_id) references disp on delete cascade);
      
      update account set frequency = 'WEEKLY ISSUANCE' where frequency = 'POPLATEK TYDNE'; <br/>
      update account set frequency = 'MONTHLY ISSUANCE' where frequency = 'POPLATEK MESICNE'; <br/>
      update account set frequency = 'EVERY TRANSACTION' where frequency = 'POPLATEK PO OBRATU'; <br/>
      update account set frequency = 'EVERY TRANSACTION' where frequency = 'POPLATEK PO OBRATU'; <br/>
   
      alter table account RENAME column frequency to statement_frequency; <br/>
      alter table account RENAME column date to account_opening_date; <br/>
      
      alter table disp rename to Disposition; <br/>
      alter table disposition rename column type to disposition_type; <br/>

      alter table order1 rename to payments; <br/>
   
      alter table payments rename column k_symbol to payment_for; <br/>
      update payments set payment_for = 'HOUSEHOLD' where payment_for = 'SIPO'; <br/>
      update payments set payment_for = 'LOAN' where payment_for = 'UVER'; <br/>
   
      alter table trans rename to transactions; <br/>
      alter table transactions rename column trans_id to transaction_id; <br/>
      alter table transactions rename column date to transaction_date; <br/>
      alter table transactions rename column type to transaction_type; <br/>
      alter table transactions rename column operation to transaction_mode; <br/>
      alter table transactions rename column k_symbol to transaction_for; <br/>
      
      update transactions set transaction_for = 'INSURANCE' where transaction_for = 'POJISTNE'; <br/>
      update transactions set transaction_for = 'STATEMENT' where transaction_for = 'SLUZBY'; <br/>
      update transactions set transaction_for = 'INTEREST CREDITED' where transaction_for = 'UROK'; <br/>
      update transactions set transaction_for = 'NEGATIVE BALANCE' where transaction_for = 'SANKC. UROK'; <br/>
      update transactions set transaction_for = 'HOUSEHOLD' where transaction_for = 'SIPO'; <br/>
      update transactions set transaction_for = 'PENSION' where transaction_for = 'DUCHOD'; <br/>
      update transactions set transaction_for = 'LOAN' where transaction_for = 'UVER'; <br/>
      
      ALTER TABLE transactions ALTER COLUMN transaction_mode TYPE varchar(30); <br/>
      
      update transactions set transaction_mode = 'CREDIT CARD WITHDRAWAL' where transaction_mode = 'VYBER KARTOU'; <br/>
      update transactions set transaction_mode = 'CREDIT IN CASH' where transaction_mode = 'VKLAD'; <br/>
      update transactions set transaction_mode = 'COLLECTION FROM ANOTHER BANK' where transaction_mode = 'PREVOD Z UCTU'; <br/>
      update transactions set transaction_mode = 'WITHDRAWAL IN CASH' where transaction_mode = 'VYBER'; <br/>
      update transactions set transaction_mode = 'REMITTANCE TO ANOTHER BANK' where transaction_mode = 'PREVOD NA UCET'; <br/>
      update transactions set transaction_type = 'CREDIT' where transaction_type = 'PRIJEM'; <br/>
      update transactions set transaction_type = 'WITHDRAWAL' where transaction_type = 'VYDAJ'; <br/>
      
      alter table transactions rename column bank to bank_to; <br/>
      alter table transactions rename column account to account_to; <br/>
      alter table transactions rename column amount to transaction_amount; <br/>
      alter table transactions rename column balance to account_balance; <br/>
      
      alter table loan rename column date to loan_granted_on; <br/>
      alter table loan rename column Amount to loan_amount; <br/>
      alter table loan rename column Duration to loan_duration; <br/>
      alter table loan rename column Payments to monthly_payments; <br/>
      alter table loan rename column Status to loan_status; <br/>
      
      ALTER TABLE loan ALTER COLUMN loan_status TYPE varchar(40); <br/>
      
      update loan set loan_status = 'CONTRACT FINISHED, LOAN PAYED' where loan_status = 'A'; <br/>
      update loan set loan_status = 'CONTRACT FINISHED, LOAN NOT PAYED' where loan_status = 'B'; <br/>
      update loan set loan_status = 'RUNNING CONTRACT, OKAY SO FAR' where loan_status = 'C'; <br/>
      update loan set loan_status = 'RUNNING CONTRACT, CLIENT IN DEBT' where loan_status = 'D'; <br/>
      
      alter table card rename column issued to issued_on; <br/>
      
      alter table district rename A2 to district_name; <br/>
      alter table district rename A3 to district_region; <br/>
      alter table district rename A4 to number_of_inhabitants; <br/>
      alter table district rename A9 to number_of_cities; <br/>
      alter table district rename A10 to ratio; <br/>
      alter table district rename A11 to avg_salary; <br/>
      alter table district rename A12 to unemployment_rate_95; <br/>
      alter table district rename A13 to unemployment_rate_96; <br/>
      alter table district rename A15 to crimes_in_95; <br/>
      alter table district rename A16 to crimes_in_96; <br/>
      
      ALTER TABLE district DROP COLUMN A5; <br/>
      ALTER TABLE district DROP COLUMN A6; <br/>
      ALTER TABLE district DROP COLUMN A7; <br/>
      ALTER TABLE district DROP COLUMN A8; <br/>
      ALTER TABLE district DROP COLUMN A14; <br/>
   </details>
   
8. After running these queries go to client folder and run npm start
9. Open two terminals in VSCODE, in one terminal goto server folder and run nodemon index while in other terminal, goto client folder and run npm start
10. After running these commands you will see the web application running in the browser.

<img width="807" alt="image" src="https://github.com/mohikhan/Data-Base-Project/assets/20306973/183057c8-84bd-4a64-a6b7-6bd687943ff9" />
<img width="807" alt="image" src="https://github.com/mohikhan/Data-Base-Project/assets/20306973/c5c44589-1114-4d4a-9bae-7e339e88cc30" />
<img width="801" alt="image" src="https://github.com/mohikhan/Data-Base-Project/assets/20306973/f6c13b30-467c-49ad-84f6-bf97323e4210" />

## Entity relationship diagram (ERD):
<img width="621" alt="image" src="https://github.com/mohikhan/Data-Base-Project/assets/20306973/f7772fe0-df1e-4a82-92db-92f759233a0d" />
