import React, { ChangeEvent } from "react";
import { ListGoal, Progress, ListItem } from "../../models/ListGoal";
import Input from "../../components/Input";
import MultiSelect from "../../components/MultiSelect";
import { Observable } from "rxjs";

interface Props {
    goal: ListGoal;
    closeModal: Function;
    save: (listItem: ListItem) => Observable<ListGoal>;
}

interface State {
    itemName: string;
    itemProgress: Progress;
}

export default class LogList extends React.Component<Props, State> {
    constructor(props: Readonly<Props>) {
        super(props);

        this.state = { itemName: '', itemProgress: Progress.InProgress };

        this.handleChange = this.handleChange.bind(this);
    }

    render() {
        return (
            <div>
                <Input name="itemName" label="Item Name" placeholder="100" handleChange={this.handleChange} />
                <MultiSelect name="itemProgress" label="Item Progress" options={[Progress.InProgress, Progress.Completed]} handleChange={this.handleChange} />
                <span className="button is-link" onClick={() => this.save()}>Habit Completed</span>
            </div>
        )
    }

    handleChange(event: ChangeEvent<any>): void {
        let fieldName = event.target.name;
        let fieldVal = event.target.value;

        this.setState({ [fieldName]: fieldVal } as Pick<State, any>);
    }

    save(): void {
        this.props.closeModal();
        this.props.save(new ListItem(this.props.goal.ListGoalId, this.state.itemName, this.state.itemProgress));
        this.setState({ itemName: '', itemProgress: Progress.InProgress });
    }
}