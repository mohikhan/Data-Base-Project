import React, { useState, useEffect } from "react";

function Navbar() {


    return (
        <nav
            className="navbar navbar-expand-md navbar-dark bg-dark"
            aria-label="Fourth navbar example"
        >
            <div className="container-fluid">

                <a className="navbar-brand" href="/">
                    DBZ
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarsExample04"
                    aria-controls="navbarsExample04"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarsExample04">
                    <ul className="navbar-nav me-auto mb-2 mb-md-0">

                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/card">
                                Card
                            </a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/client">
                                Client
                            </a>
                        </li>


                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/disposition">
                                Disposition
                            </a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/account">
                                Account
                            </a>
                        </li>
                    </ul>

                </div>
            </div>
        </nav>
    );
}

export default Navbar;