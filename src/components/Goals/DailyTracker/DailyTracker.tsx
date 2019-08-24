import React from 'react';
import SVG from 'svg.js';
import { HabitGoal } from '../../../models/HabitGoal';

interface DailyTrackerProps {
    goal: HabitGoal;
};

interface DailyTrackerState { };

export default class DailyTracker extends React.Component<DailyTrackerProps, DailyTrackerState> {
    constructor(props: DailyTrackerProps) {
        super(props);

        this.buildDaysArray = this.buildDaysArray.bind(this);
        this.dailyTracker = this.dailyTracker.bind(this);
    }
    render() {
        return (
            <div className="box">
                <h5 className="title is-5">{this.props.goal.Name}</h5>
                <div id={this.props.goal.Name.replace(/\s/g, '')}></div>
            </div>
        )
    }

    componentDidMount() {
        const daysArray = this.buildDaysArray(this.props.goal);
        this.dailyTracker(daysArray);
    }

    buildDaysArray(goal: HabitGoal): number[] {
        let days: number[] = [];
        let currentDate = this.removeTime(goal.StartDate);

        console.log("Start date: ", currentDate)

        if (goal.Logs && goal.Logs.length !== 0) {
            for (var i = 0; i < goal.Target; i++) {

                console.log("Looking for date: ", currentDate)
                let log = goal.Logs.find(l => this.compareDates(this.removeTime(l.Date), currentDate) && l.HabitCompleted);
                if (log) {
                    console.log("Found log for date: ", log)
                    days.push(1);
                } else {
                    console.log("No log found")
                    days.push(0);
                }

                currentDate.setDate(currentDate.getDate() + 1);
            }
        } else {
            days = new Array(goal.Target).fill(0);
        }

        return days;
    }

    private removeTime(date: Date): Date {
        date = new Date(date);
        return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    }

    private compareDates(date1: Date, date2: Date): boolean {
        return date1.getTime() === date2.getTime();
    }

    dailyTracker(days: number[]) {
        var draw = SVG(this.props.goal.Name.replace(/\s/g, '')).size('100%', '100%');
        let width = draw.parent().offsetWidth;

        let x = 0;
        let y = 0;
        for (var i = 0; i < days.length; i++) {
            if (x + 21 > width) {
                x = 0;
                y += 23;
            }

            let fill: string;
            if (days[i] === 1) {
                fill = '#000'
            } else {
                fill = '#d3d3d3';
            }

            draw.rect(21, 21).attr({ x: x, y: y, fill: fill });
            x = x + 23;
        }

        draw.height(y + 23);
    }
}