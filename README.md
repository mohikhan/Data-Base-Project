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
7. After running these queries go to client folder and run npm start
8. Open two terminals in VSCODE, in one terminal goto server folder and run nodemon index while in other terminal, goto client folder and run npm start
9. After running these commands you will see the web application running in the browser.

<img width="807" alt="image" src="https://github.com/mohikhan/Data-Base-Project/assets/20306973/183057c8-84bd-4a64-a6b7-6bd687943ff9" />
<img width="807" alt="image" src="https://github.com/mohikhan/Data-Base-Project/assets/20306973/c5c44589-1114-4d4a-9bae-7e339e88cc30" />
<img width="801" alt="image" src="https://github.com/mohikhan/Data-Base-Project/assets/20306973/f6c13b30-467c-49ad-84f6-bf97323e4210" />

## Entity relationship diagram (ERD):
<img width="621" alt="image" src="https://github.com/mohikhan/Data-Base-Project/assets/20306973/f7772fe0-df1e-4a82-92db-92f759233a0d" />
