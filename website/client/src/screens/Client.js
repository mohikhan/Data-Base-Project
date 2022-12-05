import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Client() {
    const [clients, setClients] = useState([]);

    const [client_id, setClientID] = useState(10006192);

    const [district_id, setDistrict] = useState("");
    const [gender, setGender] = useState("");
    const [birth_date, setDate] = useState("");
    const [modal_data, setModalData] = useState({});

    const [modal_client_id, setModalClient] = useState("");
    const [modal_district_id, setModalDistrict] = useState("");
    const [modal_gender, setModalGender] = useState("");
    const [modal_birth_date, setModalDate] = useState("");



    const onSubmit = async e => {
        e.preventDefault();
        try {
            const body = { client_id, district_id, gender, birth_date };
            const response = await fetch("http://localhost:8000/client", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            setDistrict("");
            setGender("");
            setDate("");
            getClients();
            toast.success("Client Added")
            // window.location = "/";
        } catch (err) {
            console.error(err.message);
        }
    };


    const getClients = async () => {
        try {
            const response = await fetch("http://localhost:8000/clients");
            const jsonData = await response.json();

            setClients(jsonData);
            client_id++;
        } catch (err) {
            console.error(err.message);
        }
    };

    const deleteClient = async id => {
        try {
            const deleteclient = await fetch(`http://localhost:8000/client/${id}`, {
                method: "DELETE"
            });
            toast.success("Client successfully deleted");
            getClients();
        } catch (err) {
            console.error(err.message);
        }
    };

    const openModal = (e) => {
        setModalData(e);
        setModalClient(e.client_id);
        setModalDistrict(e.district_id);
        setModalDate(e.birth_date);
        setModalGender(e.gender);
    }

    const clearData = () => {
        setModalData("");
        setModalClient("");
        setModalDistrict("");
        setModalDate("");
        setModalGender("");
    }


    const updateClient = async e => {
        e.preventDefault();
        try {
            const body = {
                client_id: modal_client_id,
                district_id: modal_district_id,
                gender: modal_gender,
                birth_date: modal_birth_date
            };
            const response = await fetch(
                `http://localhost:8000/client/${modal_client_id}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                }
            );
            toast.success("Client successfully updated");
            getClients();
            // window.location = "/";
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getClients();
        // setclientID(client_id + Math.floor(Math.random()));
    }, []);

    return (
        <>
            <div className="container-fluid">
                <h1 className="text-center mt-5" style={{color:'red'}}>Clients List</h1>
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
                        value={gender}
                        placeholder="Gender"
                        onChange={e => setGender(e.target.value)}
                    />
                    <input
                        type="text"
                        className="form-control"
                        value={birth_date}
                        placeholder="Birth Date"
                        onChange={e => setDate(e.target.value)}
                    />
                    <button className="btn btn-success">Add</button>
                </form>
                <table class="table mt-5 text-center table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>client_ID</th>
                            <th>District_ID</th>
                            <th>Gender</th>
                            <th>Birth Date</th>

                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clients.map(e => (
                            <tr key={e.client_id}>
                                <td>{e.client_id}</td>
                                <td>{e.district_id}</td>
                                <td>{e.gender}</td>
                                <td>{e.birth_date}</td>
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
                                        onClick={() => deleteClient(e.client_id)}
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
                            <h5 class="modal-title" id="exampleModalLabel">{modal_data.client_id}</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <input
                                type="text"
                                className="form-control"
                                value={modal_district_id}
                                onChange={e => setModalDistrict(e.target.value)}
                            />
                            <input
                                type="text"
                                className="form-control"
                                value={modal_gender}
                                onChange={e => setModalGender(e.target.value)}
                            />
                            <input
                                type="text"
                                className="form-control"
                                value={modal_birth_date}
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
                                onClick={e => updateClient(e)}
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

export default Client