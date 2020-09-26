import React from 'react';
import {ListGoal} from '../../../models/ListGoal';

interface ListProps {
    goal: ListGoal;
}

const List: React.FC<ListProps> = (props) => {
    const {goal} = props;

    const rows = goal.Items ? goal.Items.map(i => <tr key={i.ListItemId}>
        <td>{i.Name}</td>
        <td>{i.Progress}</td>
    </tr>) : null;

    return (
        <div className="box">
            <h5 className="title is-5">{goal.Name}</h5>
            <table className="table is-fullwidth">
                <thead>
                <tr>
                    <th>Item</th>
                    <th>Progress</th>
                </tr>
                </thead>
                <tbody>
                {rows}
                </tbody>
            </table>
        </div>
    )
}

export default List;
