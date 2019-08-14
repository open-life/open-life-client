import React from 'react';

interface OverviewProps {
    goals: string[];
    status: string[];
};

interface OverviewState { };

export default class Overview extends React.Component<OverviewProps, OverviewState> {
    render() {
        let goals: JSX.Element[];
        let status: JSX.Element[];

        if (this.props.goals.length !== 0) {
            goals = this.props.goals.map(g => <th className="has-text-centered" key={g.toString()}>{g}</th>);
            status = this.props.status.map(s => <td key={Math.random()} className="has-text-centered">{s}</td>);
        } else {
            goals = [];
            status = [];
        }

        return (
            <div className="box">
                <table className="table is-fullwidth">
                    <thead>
                        <tr>
                            {goals}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {status}
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}