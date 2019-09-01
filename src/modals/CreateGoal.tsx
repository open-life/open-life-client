import React, { ChangeEvent } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import GoalService from "../services/GoalService";
import { HabitGoal } from "../models/HabitGoal";
import { NumberGoal } from "../models/NumberGoal";
import Input from "../components/Input";
import { ListGoal } from "../models/ListGoal";
import { Auth0Context } from "../components/Authentication/Auth0";

interface Props {
    closeModal: Function;
    goalService: GoalService;
};
interface State {
    goalType: string;
    name: string;
    startDate: Date;
    endDate: Date;

    goalAmount: number;

    listName: string;
};

export default class CreateGoal extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = { goalType: 'Habit', name: '', startDate: new Date(), endDate: new Date(), goalAmount: 0, listName: '' };

        this.handleChange = this.handleChange.bind(this);
        this.startDate = this.startDate.bind(this);
        this.endDate = this.endDate.bind(this);
        this.saveGoal = this.saveGoal.bind(this);
    }

    render() {
        const goalAmountInput = <Input key="goalAmount" name="goalAmount" handleChange={this.handleChange} label="Goal Amount" placeholder="1000" />;
        const listHeaderInput = <Input key="listName" name="listName" handleChange={this.handleChange} label="List Name" placeholder="ex. Books" />;

        let goalSpecificFields: JSX.Element[] = [];

        switch (this.state.goalType) {
            case 'Number':
                goalSpecificFields.push(goalAmountInput);
                break;
            case 'List':
                goalSpecificFields.push(listHeaderInput);
                goalSpecificFields.push(goalAmountInput);
                break;
            default:
        }

        return (
            <div className="box">
                <h3 className="title is-3">Create a goal</h3>
                <div className="field">
                    <label className="label">What kind of goal?</label>
                    <div className="control">
                        <div className="select">
                            <select name="goalType" onChange={this.handleChange}>
                                <option>Habit</option>
                                <option>Number</option>
                                <option>List</option>
                            </select>
                        </div>
                    </div>
                </div>
                <Input label="Name" name="name" placeholder="What do you want to accomplish?" handleChange={this.handleChange} />
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
                {goalSpecificFields}
                <span className="button is-link" onClick={() => this.saveGoal()}>Create Goal</span>
            </div>
        );
    }

    handleChange(event: ChangeEvent<any>) {
        let fieldName = event.target.name;
        let fieldVal = event.target.value;

        this.setState({ [fieldName]: fieldVal } as Pick<State, any>);
    }

    startDate(date: Date) {
        this.setState({ startDate: date });
    }

    endDate(date: Date) {
        this.setState({ endDate: date });
    }

    saveGoal() {
        const service = this.props.goalService;

        switch (this.state.goalType) {
            case 'Habit':
                service.saveHabitGoal(new HabitGoal(this.state.name, this.state.startDate, this.state.endDate, this.context.user.UserId));
                break;
            case 'Number':
                service.saveNumberGoal(new NumberGoal(this.state.name, this.state.startDate, this.state.endDate, this.state.goalAmount, this.context.user.UserId));
                break;
            case 'List':
                service.saveListGoal(new ListGoal(this.state.name, this.state.listName, this.state.startDate, this.state.endDate, this.state.goalAmount, this.context.user.UserId));
                break;
        }

        this.props.closeModal();
    }
}

CreateGoal.contextType = Auth0Context;