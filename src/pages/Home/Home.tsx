import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './Home.css';

interface Props {
    showModal: Function;
};
interface State {
    startDate: Date;
};

export default class Home extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = { startDate: new Date(Date.now()) };

        this.handleChange = this.handleChange.bind(this);
    }

    render() {
        let createModal =
            <div className="box">
                <h3 className="title is-3">Create a goal</h3>
                <div className="field">
                    <label className="label">Name</label>
                    <div className="control">
                        <input className="input" type="text" placeholder="What do you want to accomplish?" />
                    </div>
                    <div className="field">
                        <label className="label">Type</label>
                        <div className="control">
                            <div className="select">
                                <select>
                                    <option>Habit</option>
                                    <option>Number</option>
                                    <option>List</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Start Date</label>
                        <div className="control">
                            <DatePicker className="input" selected={this.state.startDate} onChange={this.handleChange} />
                        </div>
                    </div>
                </div>
            </div>;

        let logModal =
            <div className="box">
                <h3 className="title is-3">Log a goal</h3>
                <div className="field">
                    <label className="label">Which goal?</label>
                    <div className="control">
                        <div className="select">
                            <select>
                                <option>Run/Climb</option>
                                <option>1 book per month</option>
                                <option>Climb v8</option>
                            </select>
                        </div>
                    </div>
                </div>
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

    handleChange(date: Date) {
        this.setState({
            startDate: date
        });
    }
}