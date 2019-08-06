import React from 'react';
import './Home.css';

interface Props {
    showModal: Function;
};
interface State { };

export default class Home extends React.Component<Props, State> {
    render() {
        let logModal = <div className="field has-background-white">
            <label className="label">Log a goal</label>
            <div className="control">
                <input className="input" type="text" placeholder="Text input" />
            </div>
            <p className="help">This is a help text</p>
        </div>;

        let createModal = <div className="field has-background-white">
            <label className="label">Create a goal</label>
            <div className="control">
                <input className="input" type="text" placeholder="Text input" />
            </div>
            <p className="help">This is a help text</p>
        </div>;

        return (
            <div className="section">
                <div className="container has-text-centered">
                    <div className="columns is-centered">
                        <div className="column is-2">
                            <span className="icon is-large log-button">
                                <i className="fas fa-3x fa-plus-circle" onClick={() => this.props.showModal(createModal)}></i>
                            </span>
                            <h1 className="title is-4">Create a goal</h1>
                        </div>
                        <div className="column is-2">
                            <span className="icon is-large log-button">
                                <i className="fas fa-3x fa-plus-circle" onClick={() => this.props.showModal(logModal)}></i>
                            </span>
                            <h1 className="title is-4">Log a goal</h1>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}