import React, { useEffect } from "react";

import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
    // use location
    let location = useLocation();
    // dynamic navigation menu item highlighting
    // useEffect(() => {
    // }, [location]);
    const authToken = localStorage.getItem("authtoken");

    const handleLogout = () => {
        // Clear the "authtoken" from local storage
        localStorage.removeItem("authtoken");
        window.location.reload();
    };
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-dark navbar-dark" >
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        AKTI
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div
                        className="collapse navbar-collapse"
                        id="navbarSupportedContent"
                    >
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link
                                    className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
                                    aria-current="page"
                                    to="/"
                                >
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/addnote" ? "active" : ""}`} to="/addnote">
                                    Add Note
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/notes" ? "active" : ""}`} to="/notes">
                                    See Notes
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/my-notes" ? "active" : ""}`} to="/my-notes">
                                    My Notes
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/contact" ? "active" : ""}`} to="/contact">
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                        {/* if browser local storage has "authtoken", replace login and register button with logout button*/}
                        <ul className="d-flex">
                            {authToken ? (
                                // If authtoken exists, display the Logout button
                                <li>
                                    <button onClick={handleLogout} className="me-2 btn btn-danger">
                                        Logout
                                    </button>
                                </li>
                            ) : (
                                // If authtoken doesn't exist, display the Login and Register buttons
                                <>
                                    {/* adminLogin */}
                                    <li>
                                        <Link
                                            className={`nav-link ${location.pathname === "/login"
                                                ? "active"
                                                : ""
                                                }`}
                                                to="/admin-login"
                                        >
                                            <button className="me-2 btn btn-warning">
                                                Admin Login
                                            </button>
                                        </Link>
                                    </li>
                                    {/* login */}
                                    <li>
                                        <Link
                                            className={`nav-link ${location.pathname === "/login"
                                                ? "active"
                                                : ""
                                                }`}
                                            to="/login"
                                        >
                                            <button className="me-2 btn btn-primary">
                                                Login
                                            </button>
                                        </Link>
                                    </li>
                                    {/* register */}
                                    <li>
                                        <Link
                                            className={`nav-link ${location.pathname === "/register"
                                                ? "active"
                                                : ""
                                                }`}
                                            to="/register"
                                        >
                                            <button
                                                className="me-2 btn btn-success"
                                                type="submit"
                                            >
                                                Register
                                            </button>
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
