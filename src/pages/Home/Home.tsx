import React from 'react';
import './Home.css';

interface Props {
    showModal: Function;
};
interface State { };

export default class Home extends React.Component<Props, State> {
    render() {
        return (
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
            </div>
        );
    }
}