import React from 'react';
import { ListGoal } from '../../../models/ListGoal';

interface ListProps {
  goal: ListGoal;
};

interface ListState { };

export default class List extends React.Component<ListProps, ListState> {
  render() {

    const rows = this.props.goal.Items ? this.props.goal.Items.map(i => <tr key={this.props.goal.ListGoalId}><td>{i.Name}</td><td>{i.Progress}</td></tr>) : null;

    return (
      <div className="box">
        <h5 className="title is-5">{this.props.goal.Name}</h5>
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
}