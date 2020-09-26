import React, {useContext, useState} from "react";
import {ListGoal, ListItem, Progress} from "../../models/ListGoal";
import Input from "../../components/Input";
import MultiSelect from "../../components/MultiSelect";
import {ServiceContext} from "../../index";

interface Props {
    goal: ListGoal;
    closeModal: Function;
}

const LogList: React.FC<Props> = (props) => {
    const {goalService} = useContext(ServiceContext);
    const [itemName, setItemName] = useState('');
    const [itemProgress, setItemProgress] = useState(Progress.InProgress);

    const {goal, closeModal} = props;

    const save = (): void => {
        closeModal();
        goalService.saveListItem(new ListItem(goal.ListGoalId, itemName, itemProgress));
        setItemName('');
        setItemProgress(Progress.InProgress);
    }

    return (
        <div className="box">
            <h4 className="title is-4">Log Goal - {goal.Name}</h4>
            <Input label="Item Name" placeholder="e.g. Wuthering Heights"
                   handleChange={event => setItemName(event.target.value)}/>
            <MultiSelect name="itemProgress" label="Item Progress"
                         options={[Progress.InProgress, Progress.Completed]}
                         handleChange={event => setItemProgress(event.target.value as Progress)}/>
            <span className="button is-link" onClick={() => save()}>Log</span>
        </div>
    )
}

export default LogList;