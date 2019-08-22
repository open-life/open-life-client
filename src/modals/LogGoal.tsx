import React, { ChangeEvent } from "react";
import DatePicker from "react-datepicker";
import { HabitGoal, HabitLog } from "../models/HabitGoal";
import { ListGoal } from "../models/ListGoal";
import { NumberGoal } from "../models/NumberGoal";
import GoalService from "../services/GoalService";
import MultiSelect from "../components/MultiSelect";
import Input from "../components/Input";

interface Props {
    closeModal: Function;
    goalService: GoalService;

    habitGoals: HabitGoal[];
    listGoals: ListGoal[];
    numberGoals: NumberGoal[];
}

interface State {
    goalName: string;
    goalType: string;

    date: Date;
}

export default class LogGoal extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = { goalName: '', goalType: 'Habit', date: new Date() };

        this.setDate = this.setDate.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getGoalIdByName = this.getGoalIdByName.bind(this);
    }

    render() {
        let goals: string[] = [];
        let goalInputs: JSX.Element = <div></div>;

        let habitLogInputs: JSX.Element =
            <div>
                <div className="field">
                    <label className="label">Date</label>
                    <div className="control">
                        <DatePicker className="input" selected={this.state.date} onChange={this.setDate} />
                    </div>
                </div>
                <a className="button is-link" onClick={() => this.props.goalService.logHabit(this.getGoalIdByName(this.state.goalName), new HabitLog(this.state.date, true))}>Habit Completed</a>
            </div>;

        let numberLogInputs: JSX.Element =
            <div>
                <div className="field">
                    <label className="label">Date</label>
                    <div className="control">
                        <DatePicker className="input" selected={this.state.date} onChange={this.setDate} />
                    </div>
                </div>
                <Input name="amount" label="Amount" placeholder="100" handleChange={this.handleChange} />
                <a className="button is-link" onClick={() => this.props.goalService.logHabit(this.getGoalIdByName(this.state.goalName), new HabitLog(this.state.date, true))}>Habit Completed</a>
            </div>;

        let listItemInputs: JSX.Element =
            <div>
                <div className="field">
                    <label className="label">Date</label>
                    <div className="control">
                        <DatePicker className="input" selected={this.state.date} onChange={this.setDate} />
                    </div>
                </div>
                <Input name="amount" label="Amount" placeholder="100" handleChange={this.handleChange} />
                <a className="button is-link" onClick={() => this.props.goalService.logHabit(this.getGoalIdByName(this.state.goalName), new HabitLog(this.state.date, true))}>Habit Completed</a>
            </div>;

        if (this.state.goalType === 'Habit') {
            this.props.habitGoals.forEach(g => goals.push(g.Name));
            goalInputs = habitLogInputs;
        } else if (this.state.goalType === 'Number') {
            this.props.numberGoals.forEach(g => goals.push(g.Name));
            goalInputs = numberLogInputs;
        } else if (this.state.goalType === 'List') {
            this.props.listGoals.forEach(g => goals.push(g.Name));
        }

        return (
            <div className="box">
                <h3 className="title is-3">Log a goal</h3>
                <MultiSelect name="goalType" label="Goal Type" options={['Habit', 'Number', 'List']} handleChange={this.handleChange} />
                <MultiSelect name="goalName" label="Which goal?" options={goals} handleChange={this.handleChange} />
                {goalInputs}
            </div>
        );
    }

    handleChange(event: ChangeEvent<any>) {
        let fieldName = event.target.name;
        let fieldVal = event.target.value;

        this.setState({ [fieldName]: fieldVal } as Pick<State, any>, () => console.log(`${fieldName}: `, fieldVal));
    }

    setDate(date: Date) {
        this.setState({ date: date });
    }

    getGoalIdByName(goalName: string): number {
        if (this.state.goalType === 'Habit') {
            return this.props.habitGoals[this.props.habitGoals.findIndex(g => g.Name === goalName)].HabitGoalId;
        } else if (this.state.goalType === 'Number') {
            return this.props.numberGoals[this.props.numberGoals.findIndex(g => g.Name === goalName)].NumberGoalId;
        } else if (this.state.goalType === 'List') {
            return this.props.listGoals[this.props.listGoals.findIndex(g => g.Name === goalName)].ListGoalId;
        }

        return 0;
    }
}