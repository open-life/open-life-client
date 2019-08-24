import React from 'react';
import { NumberGoal } from '../../../models/NumberGoal';

interface ChartProps {
    goal: NumberGoal;
};

interface ChartState {
    labels: string[];
};

export default class Chart extends React.Component<ChartProps, ChartState> {
    constructor(props: ChartProps) {
        super(props);

        this.getMonthLabels = this.getMonthLabels.bind(this);
        this.buildData = this.buildData.bind(this);

        this.state = { labels: [] };
    }

    render() {
        var LineChart = require("react-chartjs").Line;

        return (
            <div className="box">
                <h5 className="title is-5">{this.props.goal.Name}</h5>
                <LineChart data={{
                    labels: this.state.labels,
                    datasets: [{
                        label: 'Filled',
                        backgroundColor: '#FFFFFF',
                        borderColor: '#FFFFFF',
                        data: this.buildData(),
                        fill: false
                    }]
                }} options={{
                    responsive: true,
                    title: {
                        display: true,
                        text: 'Chart.js Line Chart'
                    },
                    scales: {
                        xAxes: [{
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: "Month"
                            }
                        }],
                        yAxes: [{
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: "Value"
                            }
                        }]
                    }
                }} width="600" height="250" />
            </div>
        )
    }

    componentDidMount() {
        this.setState({ labels: this.getMonthLabels() });
    }

    getMonthLabels() {
        const months = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];

        let labels: string[] = [];

        const startMonth = new Date(this.props.goal.StartDate).getMonth();
        const endMonth = new Date(this.props.goal.EndDate).getMonth();

        for (var i = startMonth; i < endMonth; i++) {
            labels.push(months[i]);
        }

        return labels;
    }

    buildData() {
        const months = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];

        let dataDictionary: { [key: string]: number } = {};
        let logs = this.props.goal.Logs;

        if (logs && logs.length !== 0) {
            this.state.labels.forEach(month => {
                dataDictionary[month] = 0;
            })

            logs.forEach(log => {
                let month = months[log.Date.getMonth() - 1];

                dataDictionary[month] += log.Amount;
            });

            return Object.values(dataDictionary);
        } else {
            return new Array(this.state.labels.length).fill(0);
        }
    }
}