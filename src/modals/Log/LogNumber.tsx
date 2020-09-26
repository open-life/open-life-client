import React, {ChangeEvent, useContext, useState} from "react";
import DatePicker from "react-datepicker";
import Input from "../../components/Input";
import {NumberGoal, NumberLog} from "../../models/NumberGoal";
import {ServiceContext} from "../../index";

interface Props {
    goal: NumberGoal;
    closeModal: Function;
}

const LogNumber: React.FC<Props> = (props) => {
    const {goalService} = useContext(ServiceContext);
    const [date, setDate] = useState(new Date());
    const [goalAmount, setGoalAmount] = useState(0);

    const {goal, closeModal} = props;


    const save = (): void => {
        closeModal();
        goalService.saveNumberLog(new NumberLog(goal.NumberGoalId, date, goalAmount));
        setDate(new Date());
        setGoalAmount(0);
    }

    return (
        <div className="box">
            <h4 className="title is-4">Log Goal - {goal.Name}</h4>
            <div className="field">
                <label className="label">Date</label>
                <div className="control">
                    <DatePicker className="input" selected={date}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => setDate(new Date(event.target.value))}/>
                </div>
            </div>
            <Input label="Amount" placeholder="100" handleChange={event => setGoalAmount(Number(event.target.value))}/>
            <span className="button is-link" onClick={() => save()}>Log</span>
        </div>
    )
}

export default LogNumber;
