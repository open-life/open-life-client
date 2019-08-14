import React from 'react';
import ListItem from './models/ListItem';

interface ListProps {
  name: string;
  headers: string[];
  rows: Array<string[]>;
};

interface ListState { };

export default class List extends React.Component<ListProps, ListState> {
  render() {
    const headerColumns = this.props.headers.map(h => <th key={h}>{h}</th>);
    const bodyRows = this.props.rows.map(r => <tr key={r.toString()}>{r.map(i => <td key={i.toString()}>{i}</td>)}</tr>);

    return (
      <div className="box">
        <h5 className="title is-5">{this.props.name}</h5>
        <table className="table is-fullwidth">
          <thead>
            <tr>
              {headerColumns}
            </tr>
          </thead>
          <tbody>
            {bodyRows}
          </tbody>
        </table>
      </div>
    )
  }
}