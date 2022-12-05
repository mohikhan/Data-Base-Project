import React from "react";
import { BrowserRouter as Router, Switch, Route, Link, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Account from "./screens/Account";
import Card from "./screens/Card";
import Client from "./screens/Client";
import Disposition from "./screens/Disposition";
import Home from "./screens/Home";

function RoutesComponent() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route element={<Home />} path="/" />
                <Route element={<Account />} path="/account" />
                <Route element={<Disposition />} path="/disposition" />
                <Route element={<Card />} path="/card" />
                <Route element={<Client />} path="/client" />



            </Routes>
            {/* <Footer /> */}
        </Router>
    );
}

export default RoutesComponent;