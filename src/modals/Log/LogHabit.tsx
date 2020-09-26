import React, {ChangeEvent, useContext, useState} from "react";
import DatePicker from "react-datepicker";
import {HabitGoal, HabitLog} from "../../models/HabitGoal";
import {ServiceContext} from "../../index";

interface Props {
    goal: HabitGoal;
    closeModal: Function;
}

const LogHabit: React.FC<Props> = (props) => {
    const {goalService} = useContext(ServiceContext);
    const [date, setDate] = useState(new Date());
    const {goal, closeModal} = props;

    const save = (): void => {
        closeModal();
        goalService.saveHabitLog(new HabitLog(goal.HabitGoalId, date, true));
        setDate(new Date());
    }

    return (
        <div className="box">
            <h4 className="title is-4">Log Habit - {goal.Name}</h4>
            <div className="field">
                <label className="label">Date</label>
                <div className="control">
                    <DatePicker className="input" selected={date}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => setDate(new Date(event.target.value))}/>
                </div>
            </div>
            <span className="button is-link" onClick={() => save()}>Habit Completed</span>
        </div>
    )
}

export default LogHabit;
