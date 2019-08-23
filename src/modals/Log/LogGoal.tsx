import React, { ChangeEvent, SyntheticEvent } from "react";
import GoalService from "../../services/GoalService";
import MultiSelect from "../components/MultiSelect";
import { HabitGoal, HabitLog } from "../../models/HabitGoal";
import { ListGoal, Progress, ListItem } from "../../models/ListGoal";
import { NumberGoal, NumberLog } from "../../models/NumberGoal";
import LogHabit from "./LogHabit";
import LogList from "./LogList";
import LogNumber from "./LogNumber";

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
}

export default class LogGoal extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = { goalName: '', goalType: '' };

        this.handleChange = this.handleChange.bind(this);
    }

    render() {
        let goals = this.setGoals();
        let goalInputs: JSX.Element = <div></div>;

        if (this.state.goalName !== '') {
            goalInputs = this.getLogInputs();
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

    setGoals() {
        let goals: string[] = [];

        if (this.state.goalType === 'Habit') {
            this.props.habitGoals.forEach(g => goals.push(g.Name));
        } else if (this.state.goalType === 'Number') {
            this.props.numberGoals.forEach(g => goals.push(g.Name));
        } else if (this.state.goalType === 'List') {
            this.props.listGoals.forEach(g => goals.push(g.Name));
        }

        return goals;
    }

    getLogInputs(): JSX.Element {
        if (this.state.goalType === '') {
            return <div></div>;
        } else if (this.state.goalType === 'Habit') {
            const goal = this.props.habitGoals[this.props.habitGoals.findIndex(g => g.Name === this.state.goalName)];
            return <LogHabit goal={goal} save={new Function} />;
        } else if (this.state.goalType === 'Number') {
            const goal = this.props.numberGoals[this.props.numberGoals.findIndex(g => g.Name === this.state.goalName)];
            return <LogNumber goal={goal} save={new Function} />;
        } else if (this.state.goalType === 'List') {
            const goal = this.props.listGoals[this.props.listGoals.findIndex(g => g.Name === this.state.goalName)];
            return <LogList goal={goal} save={new Function} />;
        }

        return <div></div>;
    }

    handleChange(event: ChangeEvent<any>) {
        let fieldName = event.target.name;
        let fieldVal = event.target.value;

        this.setState({ [fieldName]: fieldVal } as Pick<State, any>);
    }
}