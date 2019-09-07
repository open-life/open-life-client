import React from "react";
import DatePicker from "react-datepicker";
import { HabitGoal, HabitLog } from "../../models/HabitGoal";
import { Auth0Context } from "../../components/Authentication/Auth0";

interface Props {
    goal: HabitGoal;
    closeModal: Function;
}

interface State {
    date: Date;
}

export default class LogHabit extends React.Component<Props, State> {
    constructor(props: Readonly<Props>) {
        super(props);

        this.state = { date: new Date() };

        this.setDate = this.setDate.bind(this);
    }

    render() {
        return (
            <div className="box">
                <h4 className="title is-4">Log Habit - {this.props.goal.Name}</h4>
                <div className="field">
                    <label className="label">Date</label>
                    <div className="control">
                        <DatePicker className="input" selected={this.state.date} onChange={this.setDate} />
                    </div>
                </div>
                <span className="button is-link" onClick={() => this.save()}>Habit Completed</span>
            </div>
        )
    }

    setDate(date: Date): void {
        this.setState({ date: date });
    }

    save(): void {
        this.props.closeModal();
        this.context.userGoals.saveHabitLog(new HabitLog(this.props.goal.HabitGoalId, this.state.date, true));
        this.setState({ date: new Date() });
    }
}

LogHabit.contextType = Auth0Context;