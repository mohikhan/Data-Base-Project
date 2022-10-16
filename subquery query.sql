/*Find account ids, status of loan and loan amount of accounts who are issued credit card by bank*/
select account_id, status, amount from loan where account_id in 
(select account_id from card, disp where card.disp_id=disp.disp_id)