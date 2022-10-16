/*find the district having average salary of inhabitants >10,000 and the number of accounts of have fully paid their loan*/
select a.district_id, count(a.account_id) as account_count
from loan l, account a
where a.account_id=l.account_id and l.status='A'
group by district_id having a.district_id in
(select district_id from district where A11 > 10000)