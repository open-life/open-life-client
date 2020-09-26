import React, {ChangeEvent, useContext, useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {HabitGoal} from "../models/HabitGoal";
import {NumberGoal} from "../models/NumberGoal";
import Input from "../components/Input";
import {ListGoal} from "../models/ListGoal";
import {useAuth0} from "@auth0/auth0-react";
import {ServiceContext} from "../index";

interface Props {
    closeModal: Function;
}

const CreateGoal: React.FC<Props> = (props) => {
    const {user} = useAuth0();
    const {goalService} = useContext(ServiceContext);

    const [goalType, setGoalType] = useState('Habit');
    const [name, setName] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [goalAmount, setGoalAmount] = useState(0);
    const [listName, setListName] = useState('');

    const {closeModal} = props;

    const saveGoal = () => {
        switch (goalType) {
            case 'Habit':
                goalService.saveHabitGoal(new HabitGoal(name, startDate, endDate, user.UserId));
                break;
            case 'Number':
                goalService.saveNumberGoal(new NumberGoal(name, startDate, endDate, goalAmount, user.UserId));
                break;
            case 'List':
                goalService.saveListGoal(new ListGoal(name, listName, startDate, endDate, goalAmount, user.UserId));
                break;
        }

        closeModal();
    }

    const goalAmountInput = <Input key="goalAmount" handleChange={event => setGoalAmount(Number(event.target.value))}
                                   label="Goal Amount" placeholder="1000"/>;
    const listHeaderInput = <Input key="listName" handleChange={event => setListName(event.target.value)}
                                   label="List Name"
                                   placeholder="ex. Books"/>;

    let goalSpecificFields: JSX.Element[] = [];

    switch (goalType) {
        case 'Number':
            goalSpecificFields.push(goalAmountInput);
            break;
        case 'List':
            goalSpecificFields.push(listHeaderInput);
            goalSpecificFields.push(goalAmountInput);
            break;
        default:
    }

    return (
        <div className="box">
            <h3 className="title is-3">Create a goal</h3>
            <div className="field">
                <label className="label">What kind of goal?</label>
                <div className="control">
                    <div className="select">
                        <select name="goalType" onChange={event => setGoalType(event.target.value)}>
                            <option>Habit</option>
                            <option>Number</option>
                            <option>List</option>
                        </select>
                    </div>
                </div>
            </div>
            <Input label="Name" placeholder="What do you want to accomplish?"
                   handleChange={event => setName(event.target.value)}/>
            <div className="field">
                <label className="label">Start Date</label>
                <div className="control">
                    <DatePicker className="input" selected={startDate}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => setStartDate(new Date(event.target.value))}/>
                </div>
            </div>
            <div className="field">
                <label className="label">End Date</label>
                <div className="control">
                    <DatePicker className="input" selected={endDate}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => setEndDate(new Date(event.target.value))}/>
                </div>
            </div>
            {goalSpecificFields}
            <span className="button is-link" onClick={() => saveGoal()}>Create Goal</span>
        </div>
    );
}

export default CreateGoal;
