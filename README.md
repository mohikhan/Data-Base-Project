# Data-Base-Project

report link : https://docs.google.com/document/d/1GFombGg-fxLlfj-KvvndfoSsIwFSYAtQ2Yy2kS263bg/edit?usp=sharing

*******************
update account set frequency = 'WEEKLY ISSUANCE' where frequency = 'POPLATEK TYDNE'
update account set frequency = 'MONTHLY ISSUANCE' where frequency = 'POPLATEK MESICNE'
update account set frequency = 'EVERY TRANSACTION' where frequency = 'POPLATEK PO OBRATU'
update account set frequency = 'EVERY TRANSACTION' where frequency = 'POPLATEK PO OBRATU'
alter table account RENAME column frequency to statement_frequency
alter table account RENAME column date to account_opening_date
alter table disp rename to Disposition
alter table disposition rename column type to disposition_type
alter table order1 rename to payments
alter table payments rename column k_symbol to payment_for
update payments set payment_for = 'HOUSEHOLD' where payment_for = 'SIPO'
update payments set payment_for = 'LOAN' where payment_for = 'UVER'
alter table trans rename to transactions
alter table transactions rename column trans_id to transaction_id
alter table transactions rename column date to transaction_date
alter table transactions rename column type to transaction_type
alter table transactions rename column operation to transaction_mode
alter table transactions rename column k_symbol to transaction_for
update transactions set transaction_for = 'INSURANCE' where transaction_for = 'POJISTNE'
update transactions set transaction_for = 'STATEMENT' where transaction_for = 'SLUZBY'
update transactions set transaction_for = 'INTEREST CREDITED' where transaction_for = 'UROK'
update transactions set transaction_for = 'NEGATIVE BALANCE' where transaction_for = 'SANKC. UROK'
update transactions set transaction_for = 'HOUSEHOLD' where transaction_for = 'SIPO'
update transactions set transaction_for = 'PENSION' where transaction_for = 'DUCHOD'
update transactions set transaction_for = 'LOAN' where transaction_for = 'UVER'

ALTER TABLE transactions
ALTER COLUMN transaction_mode TYPE varchar(30);

update transactions set transaction_mode = 'CREDIT CARD WITHDRAWAL' where transaction_mode = 'VYBER KARTOU';
update transactions set transaction_mode = 'CREDIT IN CASH' where transaction_mode = 'VKLAD';
update transactions set transaction_mode = 'COLLECTION FROM ANOTHER BANK' where transaction_mode = 'PREVOD Z UCTU';
update transactions set transaction_mode = 'WITHDRAWAL IN CASH' where transaction_mode = 'VYBER';
update transactions set transaction_mode = 'REMITTANCE TO ANOTHER BANK' where transaction_mode = 'PREVOD NA UCET';
update transactions set transaction_type = 'CREDIT' where transaction_type = 'PRIJEM';
update transactions set transaction_type = 'WITHDRAWAL' where transaction_type = 'VYDAJ';

alter table transactions rename column bank to bank_to;
alter table transactions rename column account to account_to;

alter table transactions rename column amount to transaction_amount;
alter table transactions rename column balance to account_balance;

alter table loan rename column date to loan_granted_on;
alter table loan rename column Amount to loan_amount;
alter table loan rename column Duration to loan_duration;
alter table loan rename column Payments to monthly_payments;
alter table loan rename column Status to loan_status;

ALTER TABLE loan
ALTER COLUMN loan_status TYPE varchar(40);

update loan set loan_status = 'CONTRACT FINISHED, LOAN PAYED' where loan_status = 'A';
update loan set loan_status = 'CONTRACT FINISHED, LOAN NOT PAYED' where loan_status = 'B';
update loan set loan_status = 'RUNNING CONTRACT, OKAY SO FAR' where loan_status = 'C';
update loan set loan_status = 'RUNNING CONTRACT, CLIENT IN DEBT' where loan_status = 'D';

alter table card rename column issued to issued_on;

alter table district rename A2 to district_name;
alter table district rename A3 to district_region;
alter table district rename A4 to number_of_inhabitants;
alter table district rename A9 to number_of_cities;
alter table district rename A10 to ratio;
alter table district rename A11 to avg_salary;
alter table district rename A12 to unemployment_rate_95;
alter table district rename A13 to unemployment_rate_96;
alter table district rename A15 to crimes_in_95;
alter table district rename A16 to crimes_in_96;

ALTER TABLE district DROP COLUMN A5;
ALTER TABLE district DROP COLUMN A6;
ALTER TABLE district DROP COLUMN A7;
ALTER TABLE district DROP COLUMN A8;
ALTER TABLE district DROP COLUMN A14;
![image](https://user-images.githubusercontent.com/20306973/196055368-b1dfade1-7abd-421a-9181-f6970ab96b2a.png)
