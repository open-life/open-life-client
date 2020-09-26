import React, {useState} from "react";
import DatePicker from "react-datepicker";
import {HabitGoal, HabitLog} from "../../models/HabitGoal";
import HttpClient from "../../clients/HttpClient";

interface Props {
    goal: HabitGoal;
    closeModal: Function;
}

const LogHabit: React.FC<Props> = (props) => {
    const [date, setDate] = useState(new Date());
    const {goal, closeModal} = props;

    const httpClient = new HttpClient();

    const save = (): void => {
        if(!goal.Logs){
            goal.Logs = [];
        }

        goal.Logs.push(new HabitLog(goal.HabitGoalId, date, true));
        httpClient.put<HabitGoal>(`/api/HabitGoal/${goal.HabitGoalId}`, goal);

        setDate(new Date());
        closeModal();
    }

    return (
        <div className="box">
            <h4 className="title is-4">Log Habit - {goal.Name}</h4>
            <div className="field">
                <label className="label">Date</label>
                <div className="control">
                    <DatePicker className="input" selected={date}
                                onChange={date => setDate(date as Date)}/>
                </div>
            </div>
            <span className="button is-link" onClick={() => save()}>Habit Completed</span>
        </div>
    )
}

export default LogHabit;
