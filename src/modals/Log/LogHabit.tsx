import React from "react";
import DatePicker from "react-datepicker";
import { HabitGoal, HabitLog } from "../../models/HabitGoal";
import { Observable } from "rxjs";

interface Props {
    goal: HabitGoal;
    save: (habitLog: HabitLog) => Observable<HabitGoal>;
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
            <div>
                <div className="field">
                    <label className="label">Date</label>
                    <div className="control">
                        <DatePicker className="input" selected={this.state.date} onChange={this.setDate} />
                    </div>
                </div>
                <span className="button is-link" onClick={() => this.props.save(new HabitLog(this.props.goal.HabitGoalId, this.state.date, true))}>Habit Completed</span>
            </div>
        )
    }

    setDate(date: Date) {
        this.setState({ date: date });
    }
}