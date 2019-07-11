import React from 'react';
import SVG from 'svg.js';

interface DailyTrackerProps { };

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
        this.dailyTracker();
    }

    dailyTracker() {
        var draw = SVG('daily-tracker').size('100%', '100%');
        let width = draw.parent().offsetWidth;

        let x = 0;
        let y = 0;
        for (var i = 0; i < 365; i++) {
            if (x + 21 > width) {
                x = 0;
                y += 23;
            }

            draw.rect(21, 21).attr({ x: x, y: y });
            x = x + 23;
        }

        draw.height(y + 23);
    }
}