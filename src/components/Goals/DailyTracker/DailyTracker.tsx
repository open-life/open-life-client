import React from 'react';
import SVG from 'svg.js';
import Goal from '../../../models/Goal';
import { HabitGoal } from '../../../models/HabitGoal';

interface DailyTrackerProps {
    goal: HabitGoal;
};

interface DailyTrackerState { };

export default class DailyTracker extends React.Component<DailyTrackerProps, DailyTrackerState> {
    render() {
        return (
            <div className="box">
                <h5 className="title is-5">Run & climb twice a week minimum</h5>
                <div id="daily-tracker"></div>
            </div>
        )
    }

    componentDidMount() {
        this.dailyTracker(this.props.goal.Logs.map(l => {
            if (l.HabitCompleted) {
                return 1;
            } else {
                return 0;
            }
        }));
    }

    dailyTracker(days: number[]) {
        var draw = SVG('daily-tracker').size('100%', '100%');
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