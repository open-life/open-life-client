import React from 'react';
import { NumberGoal } from '../../../models/NumberGoal';
import { Line } from 'react-chartjs-2';

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
        return (
            <div className="box">
                <h5 className="title is-5">{this.props.goal.Name}</h5>
                <Line data={{
                    labels: this.state.labels,
                    datasets: [{
                        label: 'Value',
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: 'rgba(0,0,0,1)',
                        borderColor: 'rgba(0,0,0,1)',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'rgba(0,0,0,1)',
                        pointBackgroundColor: 'rgba(0,0,0,1)',
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(0,0,0,1)',
                        pointHoverBorderColor: 'rgba(220,220,220,1)',
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: this.buildData()
                    }]
                }} options={{
                    responsive: true,
                    title: {
                        display: false
                    },
                    tooltips: {
                        enabled: false
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
                }} width={600} height={250} />
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
                let month = months[new Date(log.Date).getMonth()];

                dataDictionary[month] += log.Amount;
            });

            return Object.values(dataDictionary);
        } else {
            return new Array(this.state.labels.length).fill(0);
        }
    }
}