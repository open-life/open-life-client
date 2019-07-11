import React from 'react';

interface ChartProps {
    name: string;
    labels: string[];
    data: number[];
    xLabel: string;
    yLabel: string;
};

interface ChartState { };

export default class Chart extends React.Component<ChartProps, ChartState> {
    render() {
        var LineChart = require("react-chartjs").Line;

        return (
            <div className="box">
                <h5 className="title is-5">{this.props.name}</h5>
                <LineChart data={{
                    labels: this.props.labels,
                    datasets: [{
                        label: 'Filled',
                        backgroundColor: '#FFFFFF',
                        borderColor: '#FFFFFF',
                        data: this.props.data,
                        fill: false
                    }]
                }} options={{
                    responsive: true,
                    title: {
                        display: true,
                        text: 'Chart.js Line Chart'
                    },
                    tooltips: {
                        mode: 'index',
                        intersect: false,
                    },
                    hover: {
                        mode: 'nearest',
                        intersect: true
                    },
                    scales: {
                        xAxes: [{
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: this.props.xLabel
                            }
                        }],
                        yAxes: [{
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: this.props.yLabel
                            }
                        }]
                    }
                }} width="600" height="250" />
            </div>
        )
    }
}