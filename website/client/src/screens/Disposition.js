import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Disposition() {
    const [dispositions, setDispositions] = useState([]);

    const [disp_id, setDispID] = useState(10006192);

    const [client_id, setClient] = useState("");
    const [account, setAccount] = useState("");
    const [type, setType] = useState("");
    const [modal_data, setModalData] = useState({});

    const [modal_disp_id, setModaldisposition] = useState("");
    const [modal_client_id, setModalClient] = useState("");
    const [modal_account, setModalAccount] = useState("");
    const [modal_type, setModalType] = useState("");



    const onSubmit = async e => {
        e.preventDefault();
        try {
            const body = { disp_id, client_id, account, type };
            const response = await fetch("http://localhost:8000/disposition", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            setClient("");
            setAccount("");
            setType("");
            getDispositions();
            toast.success("Disposition Added")
            // window.location = "/";
        } catch (err) {
            console.error(err.message);
        }
    };


    const getDispositions = async () => {
        try {
            const response = await fetch("http://localhost:8000/dispositions");
            const jsonData = await response.json();

            setDispositions(jsonData);
            disp_id++;
        } catch (err) {
            console.error(err.message);
        }
    };

    const deleteDisposition = async id => {
        try {
            const deleteDisposition = await fetch(`http://localhost:8000/disposition/${id}`, {
                method: "DELETE"
            });
            toast.success("Disposition successfully deleted");
            getDispositions();
        } catch (err) {
            console.error(err.message);
        }
    };

    const openModal = (e) => {
        setModalData(e);
        setModaldisposition(e.disp_id);
        setModalAccount(e.account_id);
        setModalType(e.disposition_type);
        setModalClient(e.client_id);
    }

    const clearData = () => {
        setModalData("");
        setModaldisposition("");
        setModalAccount("");
        setModalType("");
        setModalClient("");
    }


    const updateDisposition = async e => {
        e.preventDefault();
        try {
            const body = {
                disp_id: modal_disp_id,
                account_id: modal_account,
                client_id: modal_client_id,
                disposition_type: modal_type
            };
            const response = await fetch(
                `http://localhost:8000/disposition/${modal_disp_id}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                }
            );
            toast.success("Disposition successfully updated");
            getDispositions();
            // window.location = "/";
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getDispositions();
        // setdispositionID(disposition_id + Math.floor(Math.random()));
    }, []);

    return (
        <>
            <div className="container-fluid">
                <h1 className="text-center mt-5" style={{color:'red'}}>Dispositions List</h1>
                <form className="d-flex mt-5" onSubmit={onSubmit}>
                    <input
                        type="text"
                        className="form-control"
                        value={client_id}
                        placeholder="Client ID"
                        onChange={e => setClient(e.target.value)}
                    />
                    <input
                        type="text"
                        className="form-control"
                        value={account}
                        placeholder="Account ID"
                        onChange={e => setAccount(e.target.value)}
                    />
                    <input
                        type="text"
                        className="form-control"
                        value={type}
                        placeholder="Disposition Type"
                        onChange={e => setType(e.target.value)}
                    />
                    <button className="btn btn-success">Add</button>
                </form>
                <table class="table mt-5 text-center table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>Disposition_ID</th>
                            <th>Client_ID</th>
                            <th>Account_ID</th>
                            <th>Type</th>

                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dispositions.map(e => (
                            <tr key={e.disp_id}>
                                <td>{e.disp_id}</td>
                                <td>{e.account_id}</td>
                                <td>{e.client_id}</td>
                                <td>{e.disposition_type}</td>
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
                                        onClick={() => deleteDisposition(e.disp_id)}
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
                            <h5 class="modal-title" id="exampleModalLabel">{modal_data.disp_id}</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <input
                                type="text"
                                className="form-control"
                                value={modal_client_id}
                                onChange={e => setModalClient(e.target.value)}
                            />
                            <input
                                type="text"
                                className="form-control"
                                value={modal_account}
                                onChange={e => setModalAccount(e.target.value)}
                            />
                            <input
                                type="text"
                                className="form-control"
                                value={modal_type}
                                onChange={e => setModalType(e.target.value)}
                            />
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal"
                                onClick={e => clearData()}>Close</button>
                            <button
                                type="button"
                                class="btn btn-primary"
                                data-dismiss="modal"
                                onClick={e => updateDisposition(e)}
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

export default Disposition