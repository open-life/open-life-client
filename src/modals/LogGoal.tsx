import React, { ChangeEvent } from "react";
import { HabitGoal } from "../models/HabitGoal";
import { ListGoal } from "../models/ListGoal";
import { NumberGoal } from "../models/NumberGoal";

interface Props {
    closeModal: Function;

    habitGoals: HabitGoal[];
    listGoals: ListGoal[];
    numberGoals: NumberGoal[];
}

interface State { }

export default class LogGoal extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        let goals: JSX.Element[] = [];

        this.props.habitGoals.forEach(g => goals.push(<option>{g.Name}</option>));
        this.props.listGoals.forEach(g => goals.push(<option>{g.Name}</option>));
        this.props.numberGoals.forEach(g => goals.push(<option>{g.Name}</option>));

        return (
            <div className="box">
                <h3 className="title is-3">Log a goal</h3>
                <div className="field">
                    <label className="label">Which goal?</label>
                    <div className="control">
                        <div className="select">
                            <select>
                                {goals}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}