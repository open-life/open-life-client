import React, { ChangeEvent } from "react";
import DatePicker from "react-datepicker";
import Input from "../../components/Input";
import { NumberGoal, NumberLog } from "../../models/NumberGoal";
import { Auth0Context } from "../../components/Authentication/Auth0";

interface Props {
    goal: NumberGoal;
    closeModal: Function;
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
            <div className="box">
                <h4 className="title is-4">Log Goal - {this.props.goal.Name}</h4>
                <div className="field">
                    <label className="label">Date</label>
                    <div className="control">
                        <DatePicker className="input" selected={this.state.date} onChange={this.setDate} />
                    </div>
                </div>
                <Input name="goalAmount" label="Amount" placeholder="100" handleChange={this.handleChange} />
                <span className="button is-link" onClick={() => this.save()}>Log</span>
            </div>
        )
    }

    handleChange(event: ChangeEvent<any>): void {
        let fieldName = event.target.name;
        let fieldVal = event.target.value;

        this.setState({ [fieldName]: fieldVal } as Pick<State, any>);
    }

    setDate(date: Date): void {
        this.setState({ date: date });
    }

    save(): void {
        this.props.closeModal();
        this.context.userGoals.saveNumberLog(new NumberLog(this.props.goal.NumberGoalId, this.state.date, this.state.goalAmount));
        this.setState({ date: new Date(), goalAmount: 0 });
    }
}

LogNumber.contextType = Auth0Context;