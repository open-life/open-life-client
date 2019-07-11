import React from 'react';

interface OverviewProps {
    goals: string[];
    status: string[];
};

interface OverviewState { };

export default class Overview extends React.Component<OverviewProps, OverviewState> {
    render() {
        const goals = this.props.goals.map(g => <th>{g}</th>);
        const status = this.props.status.map(s => <td className="has-text-centered">{s}</td>);

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