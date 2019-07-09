import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
    return (
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="container">
                <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-start">
                        <Link className="navbar-item" to="/">Home</Link>
                        <Link className="navbar-item" to="/pchaffee">Profile</Link>
                    </div>


                    <div className="navbar-brand">
                        <a className="open-life navbar-item" href="/">
                            <h3 className="title is-3">Open Life</h3>
                        </a>

                        <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                        </a>
                    </div>

                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">
                                <a className="button is-primary">
                                    <strong>Sign up</strong>
                                </a>
                                <a className="button is-light">
                                    Log in
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Header;
