import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import './NavBar.css';
import {useAuth0} from "@auth0/auth0-react";
import {CurrentUserContext} from "../../App";

const NavBar: React.FC = () => {
    const {isAuthenticated, loginWithRedirect, logout} = useAuth0();
    const currentUser = useContext(CurrentUserContext);

    return (
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <Link className="navbar-item" to="/">
                    <h1 className="title is-2">Open Life</h1>
                </Link>

                <span role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false"
                      data-target="navbarBasicExample">
                        <span aria-hidden="true"/>
                        <span aria-hidden="true"/>
                        <span aria-hidden="true"/>
                    </span>
            </div>

            {
                isAuthenticated &&
                <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-start">
                        <Link className="navbar-item" to="/">Home</Link>
                        {currentUser && currentUser.Username &&
                        <Link className="navbar-item" to={`/${currentUser.Username}`}>Profile</Link>}
                        <a className="navbar-item" href="http://issues.myopen.life/projects/open-life/issues/new"
                           target="_blank" rel="noopener noreferrer">Provide Feedback</a>
                    </div>
                </div>
            }

            {
                !isAuthenticated &&
                <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-start">
                        <a className="navbar-item" href="http://issues.myopen.life/projects/open-life/issues/new"
                           target="_blank" rel="noopener noreferrer">Provide Feedback</a>
                    </div>
                </div>
            }

            <div className="navbar-end">
                <div className="navbar-item">
                    {!isAuthenticated && (
                        <div className="buttons">
                                <span className="button is-primary" onClick={() => loginWithRedirect()}>
                                    <strong>Sign up</strong>
                                </span>
                            <span className="button is-light"
                                  onClick={() => loginWithRedirect()}>Log in</span>
                        </div>
                    )}
                    {isAuthenticated &&
                    <div className="buttons"><span onClick={() => logout()} className="button is-light">Log out</span>
                    </div>}
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
