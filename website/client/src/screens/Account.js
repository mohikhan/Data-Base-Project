import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Account() {
    const [accounts, setAccounts] = useState([]);

    const [account_id, setAccountID] = useState(10056192);

    const [district_id, setDistrict] = useState("");
    const [statement_frequency, setFrequency] = useState("");
    const [account_opening_date, setDate] = useState("");
    const [modal_data, setModalData] = useState({});

    const [modal_account_id, setModalAccount] = useState("");
    const [modal_district_id, setModalDistrict] = useState("");
    const [modal_statement_frequency, setModalFrequency] = useState("");
    const [modal_account_opening_date, setModalDate] = useState("");



    const onSubmit = async e => {
        e.preventDefault();
        try {
            const body = { account_id, district_id, statement_frequency, account_opening_date };
            const response = await fetch("http://localhost:8000/account", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            setDistrict("");
            setFrequency("");
            setDate("");
            getAccounts();
            toast.success("Account Added")
            // window.location = "/";
        } catch (err) {
            console.error(err.message);
        }
    };


    const getAccounts = async () => {
        try {
            const response = await fetch("http://localhost:8000/accounts");
            const jsonData = await response.json();

            setAccounts(jsonData);
            account_id++;
        } catch (err) {
            console.error(err.message);
        }
    };

    const deleteAccount = async id => {
        try {
            const deleteAccount = await fetch(`http://localhost:8000/account/${id}`, {
                method: "DELETE"
            });
            toast.success("Account successfully deleted");
            getAccounts();
        } catch (err) {
            console.error(err.message);
        }
    };

    const openModal = (e) => {
        setModalData(e);
        setModalAccount(e.account_id);
        setModalDistrict(e.district_id);
        setModalDate(e.account_opening_date);
        setModalFrequency(e.statement_frequency);
    }

    const clearData = () => {
        setModalData("");
        setModalAccount("");
        setModalDistrict("");
        setModalDate("");
        setModalFrequency("");
    }


    const updateAccount = async e => {
        e.preventDefault();
        try {
            const body = {
                account_id: modal_account_id,
                district_id: modal_district_id,
                statement_frequency: modal_statement_frequency,
                account_opening_date: modal_account_opening_date
            };
            const response = await fetch(
                `http://localhost:8000/account/${modal_account_id}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                }
            );
            toast.success("Account successfully updated");
            getAccounts();
            // window.location = "/";
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getAccounts();
        // setAccountID(account_id + Math.floor(Math.random()));
    }, []);

    return (
        <>
            <div className="container-fluid">
                <h1 className="text-center mt-5" style={{color:'red'}}>Accounts List</h1>
                <form className="d-flex mt-5" onSubmit={onSubmit}>
                    <input
                        type="text"
                        className="form-control"
                        value={district_id}
                        placeholder="District ID"
                        onChange={e => setDistrict(e.target.value)}
                    />
                    <input
                        type="text"
                        className="form-control"
                        value={statement_frequency}
                        placeholder="Statement Frequency"
                        onChange={e => setFrequency(e.target.value)}
                    />
                    <input
                        type="text"
                        className="form-control"
                        value={account_opening_date}
                        placeholder="Account Opening Date"
                        onChange={e => setDate(e.target.value)}
                    />
                    <button className="btn btn-success">Add</button>
                </form>
                <table class="table mt-5 text-center table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>Account_ID</th>
                            <th>District_ID</th>
                            <th>Statement Frequency</th>
                            <th>Account Opening Date</th>

                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {accounts.map(e => (
                            <tr key={e.account_id}>
                                <td>{e.account_id}</td>
                                <td>{e.district_id}</td>
                                <td>{e.statement_frequency}</td>
                                <td>{e.account_opening_date}</td>
                                <button
                                    type="button"
                                    className="btn btn-primary mt-3"
                                    data-toggle="modal" data-target="#exampleModal"
                                    onClick={() => openModal(e)}
                                >
                                    Edit
                                </button>
                                <td>
                                    <button
                                        className="btn btn-warning"
                                        onClick={() => deleteAccount(e.account_id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div class="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Account Id: {modal_data.account_id}</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <input
                                type="text"
                                className="form-control mt-2"
                                value={modal_district_id}
                                onChange={e => setModalDistrict(e.target.value)}
                            />
                            <input
                                type="text"
                                className="form-control mt-2"
                                value={modal_statement_frequency}
                                onChange={e => setModalFrequency(e.target.value)}
                            />
                            <input
                                type="text"
                                className="form-control mt-2"
                                value={modal_account_opening_date}
                                onChange={e => setModalDate(e.target.value)}
                            />
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal"
                                onClick={e => clearData()}>Close</button>
                            <button
                                type="button"
                                class="btn btn-primary"
                                data-dismiss="modal"
                                onClick={e => updateAccount(e)}
                            >
                                Edit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    )
}

export default Account