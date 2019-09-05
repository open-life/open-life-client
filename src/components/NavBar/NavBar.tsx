
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
                    <Link className="navbar-item" to="/">
                        <h1 className="title is-2">Open Life</h1>
                    </Link>

                    <span role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </span>
                </div>

                {
                    this.context.isAuthenticated &&
                    <div id="navbarBasicExample" className="navbar-menu">
                        <div className="navbar-start">
                            <Link className="navbar-item" to="/">Home</Link>
                            <Link className="navbar-item" to={`/${this.context.user.Username}`}>Profile</Link>
                        </div>
                    </div>
                }

                <div className="navbar-end">
                    <div className="navbar-item">
                        {!this.context.isAuthenticated && (
                            <div className="buttons">
                                <span className="button is-primary" onClick={() => this.context.loginWithRedirect({})}>
                                    <strong>Sign up</strong>
                                </span>
                                <span className="button is-light" onClick={() => this.context.loginWithRedirect({})}>Log in</span>
                            </div>
                        )}
                        {this.context.isAuthenticated && <div className="buttons"><span onClick={() => this.context.logout()} className="button is-light">Log out</span></div>}
                    </div>
                </div>
            </nav >
        );
    }
}

NavBar.contextType = Auth0Context;
