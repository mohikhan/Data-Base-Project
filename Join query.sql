/*find the client(account owner) having loan status as A(loan payed full and loan contract finished)*/
select account_id, client_id, status, type 
from (account join loan using(account_id)) Natural Join disp
where loan.status='A' and type='OWNER';