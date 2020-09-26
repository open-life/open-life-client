import React from 'react';

interface OverviewProps {
    goals: string[];
    status: string[];
}

const Overview: React.FC<OverviewProps> = (props) => {
    const {goals, status} = props;

    let goalElements: JSX.Element[], statusElements: JSX.Element[];
    if (goals.length !== 0) {
        goalElements = goals.map(g => <th className="has-text-centered" key={g.toString()}>{g}</th>);
        statusElements = status.map(s => <td key={Math.random()} className="has-text-centered">{s}</td>);
    } else {
        goalElements = [];
        statusElements = [];
    }

    return (
        <div className="box">
            <table className="table is-fullwidth">
                <thead>
                <tr>
                    {goalElements}
                </tr>
                </thead>
                <tbody>
                <tr>
                    {statusElements}
                </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Overview;
