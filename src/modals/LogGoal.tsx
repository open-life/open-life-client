import React, { ChangeEvent } from "react";
import { HabitGoal } from "../models/HabitGoal";
import { ListGoal } from "../models/ListGoal";
import { NumberGoal } from "../models/NumberGoal";

interface Props {
    closeModal: Function;
    habitGoals: HabitGoal[];
    listGoals: ListGoal[];
    numberGoals: NumberGoal[];
};
interface State { };

export default class LogGoal extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <div className="box">
                <h3 className="title is-3">Log a goal</h3>
                <div className="field">
                    <label className="label">Which goal?</label>
                    <div className="control">
                        <div className="select">
                            <select>
                                <option>Run/Climb</option>
                                <option>1 book per month</option>
                                <option>Climb v8</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}