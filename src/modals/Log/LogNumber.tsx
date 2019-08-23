import React from "react";
import DatePicker from "react-datepicker";
import Input from "../components/Input";
import { NumberGoal } from "../../models/NumberGoal";

interface Props {
    goal: NumberGoal;
    save: Function;
}

interface State {
    goalName: string;
    date: Date;
}

export default class LogNumber extends React.Component<Props, State> {
    constructor(props: Readonly<Props>) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="field">
                    <label className="label">Date</label>
                    <div className="control">
                        <DatePicker className="input" selected={this.state.date} onChange={this.setDate} />
                    </div>
                </div>
                <Input name="goalAmount" label="Amount" placeholder="100" handleChange={this.handleChange} />
                <a className="button is-link" onClick={() => this.props.goalService.logNumber(goalId, new NumberLog(this.state.date, this.state.goalAmount))}>Habit Completed</a>
            </div>
        )
    }

    setDate(date: Date) {
        this.setState({ date: date });
    }
}