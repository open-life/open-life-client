import React from "react";
import { ListGoal, Progress } from "../../models/ListGoal";
import Input from "../../components/Input";
import MultiSelect from "../../components/MultiSelect";

interface Props {
    goal: ListGoal;
    save: Function;
}

interface State {
    itemName: string;
    itemProgress: string;
}

export default class LogList extends React.Component<Props, State> {
    constructor(props: Readonly<Props>) {
        super(props);
    }

    render() {
        return (
            <div>
                <Input name="itemName" label="Item Name" placeholder="100" handleChange={this.handleChange} />
                <MultiSelect name="itemProgress" label="Item Progress" options={[Progress.InProgress, Progress.Completed]} handleChange={this.handleChange} />
                <a className="button is-link" onClick={() => this.props.goalService.logListItem(goalId, new ListItem(this.state.itemName))}>Habit Completed</a>
            </div>
        )
    }

    handleChange(event: ChangeEvent<any>) {
        let fieldName = event.target.name;
        let fieldVal = event.target.value;

        this.setState({ [fieldName]: fieldVal } as Pick<State, any>);
    }
}