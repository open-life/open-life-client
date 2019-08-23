import React from "react";
import DatePicker from "react-datepicker";
import GoalService from "../../services/GoalService";
import { HabitGoal } from "../../models/HabitGoal";

interface Props {
    goal: HabitGoal;
    save: Function;
}

interface State {
    goalName: string;
    date: Date;
}

export default class LogHabit extends React.Component<Props, State> {
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
                <a className="button is-link" onClick={() => this.props.goalService.logHabit(goalId, new HabitLog(goalId, this.state.date, true))}>Habit Completed</a>
            </div>
        )
    }

    setDate(date: Date) {
        this.setState({ date: date });
    }
}