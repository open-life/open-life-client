import React, { ChangeEvent } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './Home.css';
import { HabitGoal } from '../../models/HabitGoal';

interface Props {
    showModal: Function;
};
interface State {
    habitType: string;
    name: string;
    startDate: Date;
    endDate: Date;
};

export default class Home extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = { habitType: '', name: '', startDate: new Date(), endDate: new Date() };

        this.handleChange = this.handleChange.bind(this);
        this.startDate = this.startDate.bind(this);
        this.endDate = this.endDate.bind(this);
    }

    render() {
        let createModal =
            <div className="box">
                <h3 className="title is-3">Create a goal</h3>
                <div className="field">
                    <label className="label">What kind of goal?</label>
                    <div className="control">
                        <div className="select">
                            <select name="habitType" onChange={this.handleChange}>
                                <option>Habit</option>
                                <option>Number</option>
                                <option>List</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Name</label>
                    <div className="control">
                        <input name="name" className="input" type="text" placeholder="What do you want to accomplish?" onChange={this.handleChange} />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Start Date</label>
                    <div className="control">
                        <DatePicker className="input" selected={this.state.startDate} onChange={this.startDate} />
                    </div>
                </div>
                <div className="field">
                    <label className="label">End Date</label>
                    <div className="control">
                        <DatePicker className="input" selected={this.state.endDate} onChange={this.endDate} />
                    </div>
                </div>
                <a className="button is-link">Create Goal</a>
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

    handleChange(event: ChangeEvent<any>) {
        let fieldName = event.target.name;
        let fieldVal = event.target.value;
        console.log('Field name: ', fieldName);
        console.log('Field value: ', fieldVal);
        this.setState({ [fieldName]: fieldVal } as Pick<State, any>);
    }

    startDate(date: Date) {
        console.log('Start date: ', date);
        this.setState({ startDate: date }, () => console.log('State start date: ', this.state.startDate));
    }

    endDate(date: Date) {
        console.log('End date: ', date);
        this.setState({ endDate: date });
    }
}