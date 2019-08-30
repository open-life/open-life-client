
import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import { Auth0Context } from '../Authentication/Auth0';

interface Props { }
interface State { }

export default class NavBar extends React.Component<Props, State>  {
    render() {
        return (
            <nav className="navbar" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <a className="navbar-item" href="/">
                        <h1 className="title is-2">Open Life</h1>
                    </a>

                    <span role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </span>
                </div>

                <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-start">
                        <Link className="navbar-item" to="/">Home</Link>
                        <Link className="navbar-item" to="/pchaffee">Profile</Link>
                        <Link className="navbar-item" to="/i/settings">Settings</Link>
                    </div>
                </div>

                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="buttons">
                            <span className="button is-primary">
                                <strong>Sign up</strong>
                            </span>
                            {!this.context.isAuthenticated && (<span onClick={() => this.context.loginWithRedirect({})} className="button is-light">Log in</span>)}
                            {this.context.isAuthenticated && <span onClick={() => this.context.logout()} className="button is-light">Log in</span>}
                        </div>
                    </div>
                </div>
            </nav >
        );
    }
}

NavBar.contextType = Auth0Context;
