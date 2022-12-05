const express = require('express');
const app = express();
const cors = require('cors');
const pool = require("./db");


app.use(cors());
app.use(express.json());


//POST

app.post("/account", async (req, res) => {
    try {
        const { account_id, district_id, statement_frequency, account_opening_date } = req.body;
        // console.log(req.body)
        const newAccount = await pool.query(
            "INSERT INTO account (account_id, district_id, statement_frequency, account_opening_date) VALUES ($1, $2, $3, $4) RETURNING *",
            [account_id, district_id, statement_frequency, account_opening_date]
        );

        res.json(newAccount.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});
app.post("/card", async (req, res) => {
    try {
        const {  card_id, disp_id, type, issued_on } = req.body;
        const newCard = await pool.query(
            "INSERT INTO card (card_id, disp_id, type, issued_on) VALUES ($1, $2, $3, $4) RETURNING *",
            [card_id, disp_id, type, issued_on]
        );

        res.json(newCard.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});
app.post("/client", async (req, res) => {
    try {
        const { client_id, district_id, gender, birth_date } = req.body;
        const newClient = await pool.query(
            "INSERT INTO client (client_id, district_id, gender, birth_date) VALUES ($1, $2, $3, $4) RETURNING *",
            [client_id, district_id, gender, birth_date]
        );

        res.json(newClient.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});
app.post("/disposition", async (req, res) => {
    try {
        const { disp_id,client_id,  account_id, disposition_type } = req.body;
        const newDisposition = await pool.query(
            "INSERT INTO disposition (disp_id,client_id,  account_id, disposition_type) VALUES($1, $2, $3, $4) RETURNING *",
            [disp_id,client_id,  account_id, disposition_type]
        );

        res.json(newDisposition.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});
app.post("/district", async (req, res) => {
    try {
        const { district_id, district_name, number_of_inhabitants, number_of_cities, ratio, avg_salary, unemployement_rate_95,  unemployement_rate_96, crimes_in_95, crimes_in_96} = req.body;
        const newDistrict = await pool.query(
            "INSERT INTO district (district_id, district_name, number_of_inhabitants, number_of_cities, ratio, avg_salary, unemployement_rate_95,  unemployement_rate_96, crimes_in_95, crimes_in_96) VALUES($1, $2, $3, $4, $5, $6, $7, $8 $9, $10) RETURNING *",
            [district_id, district_name, number_of_inhabitants, number_of_cities, ratio, avg_salary, unemployement_rate_95,  unemployement_rate_96, crimes_in_95, crimes_in_96]
        );

        res.json(newDistrict.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});
app.post("/loan", async (req, res) => {
    try {
        const { loan_id, account_id, loan_granted_on, loan_amount, loan_duration, monthly_payments, loan_status } = req.body;
        const newLoan = await pool.query(
            "INSERT INTO loan (loan_id, account_id, loan_granted_on, loan_amount, loan_duration, monthly_payments, loan_status) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *",
            [loan_id, account_id, loan_granted_on, loan_amount, loan_duration, monthly_payments, loan_status]
        );

        res.json(newLoan.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});
app.post("/payments", async (req, res) => {
    try {
        const { order_id, account_id, bank_to, account_to, amount, payment_for } = req.body;
        const newPayment = await pool.query(
            "INSERT INTO payments (order_id, account_id, bank_to, account_to, amount, payment_for) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
            [order_id, account_id, bank_to, account_to, amount, payment_for]
        );

        res.json(newPayment.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});
app.post("/transactions", async (req, res) => {
    try {
        const { transaction_id, account_id, transaction_date, transaction_type, transaction_mode, transaction_amount, account_balance, transaction_for, bank_to, account_to } = req.body;
        const newTransaction = await pool.query(
            "INSERT INTO transactions (transaction_id, account_id, transaction_date, transaction_type, transaction_mode, transaction_amount, account_balance, transaction_for, bank_to, account_to) VALUES($1) RETURNING *",
            [transaction_id, account_id, transaction_date, transaction_type, transaction_mode, transaction_amount, account_balance, transaction_for, bank_to, account_to]
        );

        res.json(newTransaction.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//GET ALL

app.get("/accounts", async (req, res) => {
    try {
        const allAccounts = await pool.query("SELECT * FROM account");
        res.json(allAccounts.rows);
    } catch (err) {
        console.error(err.message);
    }
});
app.get("/cards", async (req, res) => {
    try {
        const allCards = await pool.query("SELECT * FROM card");
        res.json(allCards.rows);
    } catch (err) {
        console.error(err.message);
    }
});
app.get("/clients", async (req, res) => {
    try {
        const allClients = await pool.query("SELECT * FROM client");
        res.json(allClients.rows);
    } catch (err) {
        console.error(err.message);
    }
});
app.get("/dispositions", async (req, res) => {
    try {
        const allDispositions = await pool.query("SELECT * FROM disposition");
        res.json(allDispositions.rows);
    } catch (err) {
        console.error(err.message);
    }
});
app.get("/districts", async (req, res) => {
    try {
        const allDistricts = await pool.query("SELECT * FROM district");
        res.json(allDistricts.rows);
    } catch (err) {
        console.error(err.message);
    }
});
app.get("/loans", async (req, res) => {
    try {
        const allLoans = await pool.query("SELECT * FROM loan");
        res.json(allLoans.rows);
    } catch (err) {
        console.error(err.message);
    }
});
app.get("/payments", async (req, res) => {
    try {
        const allPayments = await pool.query("SELECT * FROM payments");
        res.json(allPayments.rows);
    } catch (err) {
        console.error(err.message);
    }
});
app.get("/transactions", async (req, res) => {
    try {
        const allTransactions = await pool.query("SELECT * FROM transactions");
        res.json(allTransactions.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// GET BY ID

app.get("/account/:account_id", async (req, res) => {
    try {
        const { account_id } = req.params;
        const account = await pool.query("SELECT * FROM account WHERE account_id = $1", [
            account_id
        ]);

        res.json(account.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/card/:card_id", async (req, res) => {
    try {
        const { card_id } = req.params;
        const card = await pool.query("SELECT * FROM card WHERE card_id = $1", [
            card_id
        ]);

        res.json(card.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/client/:client_id", async (req, res) => {
    try {
        const { client_id } = req.params;
        const client = await pool.query("SELECT * FROM client WHERE client_id = $1", [
            client_id
        ]);

        res.json(client.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/disposition/:disp_id", async (req, res) => {
    try {
        const { disp_id } = req.params;
        const disposition = await pool.query("SELECT * FROM disposition WHERE disp_id = $1", [
            disp_id
        ]);

        res.json(disposition.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/district/:district_id", async (req, res) => {
    try {
        const { district_id } = req.params;
        const district = await pool.query("SELECT * FROM district WHERE district_id = $1", [
            district_id
        ]);

        res.json(district.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/loan/:loan_id", async (req, res) => {
    try {
        const { loan_id } = req.params;
        const loan = await pool.query("SELECT * FROM loan WHERE loan_id = $1", [
            loan_id
        ]);

        res.json(loan.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/payments/:payment_id", async (req, res) => {
    try {
        const { payment_id } = req.params;
        const payment = await pool.query("SELECT * FROM payments WHERE order_id = $1", [
            payment_id
        ]);

        res.json(payment.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/transactions/:transaction_id", async (req, res) => {
    try {
        const { transaction_id } = req.params;
        const transaction = await pool.query("SELECT * FROM transactions WHERE transaction_id = $1", [
            transaction_id
        ]);

        res.json(transaction.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});


//PUT

app.put("/account/:id", async (req, res) => {
    try {
        // const { account_id } = req.params;
        const { account_id, district_id, statement_frequency, account_opening_date } = req.body;
        const updateAccount = await pool.query(
            "UPDATE account SET district_id = $2, statement_frequency = $3, account_opening_date = $4  WHERE account_id = $1",
            [account_id,district_id, statement_frequency, account_opening_date]
        );

        res.json("Account was updated!");
    } catch (err) {
        console.error(err.message);
    }
});
app.put("/card/:id", async (req, res) => {
    try {
        // const { account_id } = req.params;
        const { card_id, disp_id, type, issued_on } = req.body;
        const updateAccount = await pool.query(
            "UPDATE card SET disp_id = $2, type = $3, issued_on = $4  WHERE card_id = $1",
            [card_id, disp_id, type, issued_on]
        );

        res.json("card was updated!");
    } catch (err) {
        console.error(err.message);
    }
});
app.put("/client/:id", async (req, res) => {
    try {
        const { client_id, district_id, gender, birth_date } = req.body;
        const updateClient = await pool.query(
            "UPDATE client SET district_id = $2, gender = $3, birth_date = $4 WHERE client_id = $1",
            [client_id, district_id, gender, birth_date]
        );

        res.json("Client was updated!");
    } catch (err) {
        console.error(err.message);
    }
});

app.put("/disposition/:id", async (req, res) => {
    try {
        const { disp_id, client_id,  account_id, disposition_type } = req.body;
        const updateDisposition = await pool.query(
            "UPDATE disposition SET client_id = $2, account_id = $3, disposition_type = $4 WHERE disp_id = $1",
            [disp_id, client_id,  account_id, disposition_type]
        );

        res.json("Disposition was updated!");
    } catch (err) {
        console.error(err.message);
    }
});

app.put("/district/:id", async (req, res) => {
    try {
        const { district_id, district_name, number_of_inhabitants, number_of_cities, ratio, avg_salary, unemployement_rate_95,  unemployement_rate_96, crimes_in_95, crimes_in_96 } = req.body;
        const updateDistrict = await pool.query(
            "UPDATE client SET district_name = $2, number_of_inhabitants = $3, number_of_cities = $4, ratio = $5, avg_salary = $6, unemployement_rate_95 = $7,  unemployement_rate_96 = $8, crimes_in_95 =$9, crimes_in_96 = $10   WHERE district_id = $1",
            [district_id, district_name, number_of_inhabitants, number_of_cities, ratio, avg_salary, unemployement_rate_95,  unemployement_rate_96, crimes_in_95, crimes_in_96]
        );

        res.json("District was updated!");
    } catch (err) {
        console.error(err.message);
    }
});

app.put("/loan/:id", async (req, res) => {
    try {
        const { loan_id, account_id, loan_granted_on, loan_amount, loan_duration, monthly_payments, loan_status } = req.body;
        const updateLoan = await pool.query(
            "UPDATE loan SET  account_id = $2, loan_granted_on = $3, loan_amount = $4, loan_duration = $5, monthly_payments = $6, loan_status = $7 WHERE loan_id = $1",
            [loan_id, account_id, loan_granted_on, loan_amount, loan_duration, monthly_payments, loan_status]
        );

        res.json("Loan was updated!");
    } catch (err) {
        console.error(err.message);
    }
});

app.put("/payments/:id", async (req, res) => {
    try {
        const { order_id, account_id, bank_to, account_to, amount, payment_for } = req.body;
        const updatePayment = await pool.query(
            "UPDATE payments SET account_id = $2, bank_to = $3, account_to = $4, amount = $5, payment_for = $6 WHERE order_id = $1",
            [order_id, account_id, bank_to, account_to, amount, payment_for]
        );

        res.json("Payment was updated!");
    } catch (err) {
        console.error(err.message);
    }
});

app.put("/transactions/:id", async (req, res) => {
    try {
        const { transaction_id, account_id, transaction_date, transaction_type, transaction_mode, transaction_amount, account_balance, transaction_for, bank_to, account_to } = req.body;
        const updateTransaction = await pool.query(
            "UPDATE transactions SET account_id = $2, transaction_date = $3, transaction_type = $4, transaction_mode = $5, transaction_amount = $6, account_balance = $7, transaction_for = $8, bank_to = $9, account_to = $10 WHERE transaction_id = $2",
            [transaction_id, account_id, transaction_date, transaction_type, transaction_mode, transaction_amount, account_balance, transaction_for, bank_to, account_to]
        );

        res.json("Transaction was updated!");
    } catch (err) {
        console.error(err.message);
    }
});

//DELETE


app.delete("/account/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteAccount = await pool.query("DELETE FROM account WHERE account_id = $1", [
            id
        ]);
        res.json("Account was deleted!");
    } catch (err) {
        console.log(err.message);
    }
});

app.delete("/card/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteAccount = await pool.query("DELETE FROM card WHERE card_id = $1", [
            id
        ]);
        res.json("Card was deleted!");
    } catch (err) {
        console.log(err.message);
    }
});

app.delete("/client/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteClient = await pool.query("DELETE FROM client WHERE client_id = $1", [
            id
        ]);
        res.json("Client was deleted!");
    } catch (err) {
        console.log(err.message);
    }
});

app.delete("/disposition/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteDisposition = await pool.query("DELETE FROM disposition WHERE disp_id = $1", [
            id
        ]);
        res.json("Disposition was deleted!");
    } catch (err) {
        console.log(err.message);
    }
});

app.delete("/district/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteClient = await pool.query("DELETE FROM district WHERE district_id = $1", [
            id
        ]);
        res.json("District was deleted!");
    } catch (err) {
        console.log(err.message);
    }
});
app.delete("/loan/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteClient = await pool.query("DELETE FROM loan WHERE loan_id = $1", [
            id
        ]);
        res.json("Loan was deleted!");
    } catch (err) {
        console.log(err.message);
    }
});

app.delete("/payment/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteClient = await pool.query("DELETE FROM payments WHERE order_id = $1", [
            id
        ]);
        res.json("Payment was deleted!");
    } catch (err) {
        console.log(err.message);
    }
});

app.delete("/transaction/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteClient = await pool.query("DELETE FROM transactions WHERE transaction_id = $1", [
            id
        ]);
        res.json("Transaction was deleted!");
    } catch (err) {
        console.log(err.message);
    }
});

app.listen(8000, () => {
    console.log('Server has started on port 8000');
});