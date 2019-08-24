import React, { ChangeEvent } from "react";
import DatePicker from "react-datepicker";
import Input from "../../components/Input";
import { NumberGoal, NumberLog } from "../../models/NumberGoal";
import { Observable } from "rxjs";

interface Props {
    goal: NumberGoal;
    save: (numberLog: NumberLog) => Observable<NumberGoal>;
}

interface State {
    date: Date;
    goalAmount: number
}

export default class LogNumber extends React.Component<Props, State> {
    constructor(props: Readonly<Props>) {
        super(props);

        this.state = { date: new Date(), goalAmount: 0 };

        this.handleChange = this.handleChange.bind(this);
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
                <Input name="goalAmount" label="Amount" placeholder="100" handleChange={this.handleChange} />
                <span className="button is-link" onClick={() => this.props.save(new NumberLog(this.props.goal.NumberGoalId, this.state.date, this.state.goalAmount))}>Habit Completed</span>
            </div>
        )
    }

    handleChange(event: ChangeEvent<any>) {
        let fieldName = event.target.name;
        let fieldVal = event.target.value;

        this.setState({ [fieldName]: fieldVal } as Pick<State, any>);
    }

    setDate(date: Date) {
        this.setState({ date: date });
    }
}