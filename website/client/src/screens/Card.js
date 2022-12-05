import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Card() {
    const [cards, setCards] = useState([]);

    const [card_id, setCardID] = useState(12006192);

    const [disp_id, setDispID] = useState("");
    const [type, setType] = useState("");
    const [issued_on, setIssuedDate] = useState("");
    const [modal_data, setModalData] = useState({});

    const [modal_card_id, setModalCard] = useState("");
    const [modal_disp_id, setModalDispID] = useState("");
    const [modal_type, setModalType] = useState("");
    const [modal_issued_on, setModalIssuedDate] = useState("");



    const onSubmit = async e => {
        e.preventDefault();
        try {
            const body = { card_id, disp_id, type, issued_on };
            const response = await fetch("http://localhost:8000/card", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            setDispID("");
            setType("");
            setIssuedDate("");
            getCards();
            toast.success("Card Added")
            // window.location = "/";
        } catch (err) {
            console.error(err.message);
        }
    };


    const getCards = async () => {
        try {
            const response = await fetch("http://localhost:8000/cards");
            const jsonData = await response.json();

            setCards(jsonData);
            card_id++;
        } catch (err) {
            console.error(err.message);
        }
    };

    const deleteCard = async id => {
        try {
            const deleteCard = await fetch(`http://localhost:8000/card/${id}`, {
                method: "DELETE"
            });
            toast.success("Card successfully deleted");
            getCards();
        } catch (err) {
            console.error(err.message);
        }
    };

    const openModal = (e) => {
        setModalData(e);
        setModalCard(e.card_id);
        setModalDispID(e.disp_id);
        setModalIssuedDate(e.issued_on);
        setModalType(e.type);
    }

    const clearData = () => {
        setModalData("");
        setModalCard("");
        setModalDispID("");
        setModalIssuedDate("");
        setModalType("");
    }


    const updateCard = async e => {
        e.preventDefault();
        try {
            const body = {
                card_id: modal_card_id,
                disp_id: modal_disp_id,
                type: modal_type,
                issued_on: modal_issued_on
            };
            const response = await fetch(
                `http://localhost:8000/card/${modal_card_id}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                }
            );
            toast.success("Card successfully updated");
            getCards();
            // window.location = "/";
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getCards();
        // setcardID(card_id + Math.floor(Math.random()));
    }, []);

    return (
        <>
            <div className="container-fluid">
                <h1 className="text-center mt-5" style={{color:'red'}}>Cards List</h1>
                <form className="d-flex mt-5" onSubmit={onSubmit}>
                    <input
                        type="text"
                        className="form-control"
                        value={disp_id}
                        placeholder="Disp ID"
                        onChange={e => setDispID(e.target.value)}
                    />
                    <input
                        type="text"
                        className="form-control"
                        value={type}
                        placeholder="Card Type"
                        onChange={e => setType(e.target.value)}
                    />
                    <input
                        type="text"
                        className="form-control"
                        value={issued_on}
                        placeholder="Card Issue Date"
                        onChange={e => setIssuedDate(e.target.value)}
                    />
                    <button className="btn btn-success">Add</button>
                </form>
                <table class="table mt-5 text-center table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>Card_ID</th>
                            <th>District_ID</th>
                            <th>Type</th>
                            <th>Issued On</th>

                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cards.map(e => (
                            <tr key={e.card_id}>
                                <td>{e.card_id}</td>
                                <td>{e.disp_id}</td>
                                <td>{e.type}</td>
                                <td>{e.issued_on}</td>
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
                                        onClick={() => deleteCard(e.card_id)}
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
                            <h5 class="modal-title" id="exampleModalLabel">Card Id: {modal_data.card_id}</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <input
                                type="text"
                                className="form-control mt-2"
                                value={modal_disp_id}
                                onChange={e => setModalDispID(e.target.value)}
                            />
                            <input
                                type="text"
                                className="form-control mt-2"
                                value={modal_type}
                                onChange={e => setModalType(e.target.value)}
                            />
                            <input
                                type="text"
                                className="form-control mt-2"
                                value={modal_issued_on}
                                onChange={e => setModalIssuedDate(e.target.value)}
                            />
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal"
                                onClick={e => clearData()}>Close</button>
                            <button
                                type="button"
                                class="btn btn-primary"
                                data-dismiss="modal"
                                onClick={e => updateCard(e)}
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

export default Card