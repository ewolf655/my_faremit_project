import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ScrollToTop from "./helpers/ScrollPage";
import { Auth, Guest } from "./middlewares";
import ContactUs from "./pages/Contact";
import Footer from "./pages/Footer";
import Home from "./pages/Home";
import USAPatriot from "./pages/Legal/USAPatriot";
import Consent from "./pages/Legal/Consent";
import Privacy from "./pages/Legal/Privacy";
import MultiStep from "./pages/MultiStep";
import Login from "./pages/Login";
import RegistrationForm from "./pages/Register";

const App = () => {
    return (
        <Router>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<Home />} />

                <Route
                    path="/privacy"
                    element={
                        <Guest>
                            <Privacy />
                        </Guest>
                    }
                />
                <Route
                    path="/login"
                    element={
                        <Guest>
                            <Login />
                        </Guest>
                    }
                />
                <Route
                    path="/signup"
                    element={
                        <Guest>
                            <RegistrationForm />
                        </Guest>
                    }
                />
                <Route
                    path="/Consent"
                    element={
                        <Guest>
                            <Consent />
                        </Guest>
                    }
                />
                <Route
                    path="/law"
                    element={
                        <Guest>
                            <USAPatriot />
                        </Guest>
                    }
                />

                <Route path="/contact" element={<ContactUs />} />

                <Route
                    path="/send"
                    element={
                        <Auth>
                            <MultiStep />
                        </Auth>
                    }
                />
                <Route path="/*" element={<Home />} />
            </Routes>
        </Router>
    );
};

export default App;
