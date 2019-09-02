import React from 'react';
import './Home.css';
import { Auth0Context } from '../../components/Authentication/Auth0';
import UserBox from '../../components/UserBox';

interface Props {
    showModal: Function;
};
interface State { };

export default class Home extends React.Component<Props, State> {
    render() {
        if (!this.context.isAuthenticated) {
            return (
                <div>
                    <div className="section">
                        <div className="container has-text-centered">
                            <h1 className="title is-1">Welcome!</h1>
                        </div>
                    </div>
                    <div className="section">
                        <div className="container">
                            <UserBox />
                        </div>
                    </div>
                </div>
            );
        }
        return (
            <div>
                <div className="section">
                    <div className="container has-text-centered">
                        <div className="columns is-centered">
                            <div className="column is-2">
                                <span className="icon is-large log-button">
                                    <i className="fas fa-3x fa-plus-circle" onClick={() => this.props.showModal('create')}></i>
                                </span>
                                <h1 className="title is-4">Create a goal</h1>
                            </div>
                            <div className="column is-2">
                                <span className="icon is-large log-button">
                                    <i className="fas fa-3x fa-plus-circle" onClick={() => this.props.showModal('log')}></i>
                                </span>
                                <h1 className="title is-4">Log a goal</h1>
                            </div>
                        </div>
                    </div>
                    <div className="section">
                        <div className="container">
                            <UserBox />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Home.contextType = Auth0Context;