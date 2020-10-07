import React from 'react';
import SVG from 'svg.js';
import {HabitGoal} from '../../../models/HabitGoal';

interface DailyTrackerProps {
    goal: HabitGoal;
}

const DailyTracker: React.FC<DailyTrackerProps> = (props) => {
    const {goal} = props;

    const buildDaysArray = (goal: HabitGoal): number[] => {
        let days: number[] = [];
        let currentDate = removeTime(goal.StartDate);

        if (goal.Logs && goal.Logs.length !== 0) {
            for (let i = 0; i < goal.Target; i++) {
                let log = goal.Logs.find(l => compareDates(removeTime(l.Date), currentDate) && l.HabitCompleted);
                if (log) {
                    days.push(1);
                } else {
                    days.push(0);
                }

                currentDate.setDate(currentDate.getDate() + 1);
            }
        } else {
            days = new Array(goal.Target).fill(0);
        }

        return days;
    }

    const removeTime = (date: Date): Date => {
        date = new Date(date);
        return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    }

    const compareDates = (date1: Date, date2: Date): boolean => {
        return date1.getTime() === date2.getTime();
    }

    const dailyTracker = (days: number[]) => {
        const draw = SVG(goal.Name.replace(/\s/g, '')).size('100%', '100%');
        let width = draw.parent().offsetWidth;

        let x = 0;
        let y = 0;
        for (let i = 0; i < days.length; i++) {
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

            draw.rect(21, 21).attr({x: x, y: y, fill: fill});
            x = x + 23;
        }

        draw.height(y + 23);
    }

    const daysArray = buildDaysArray(goal);
    dailyTracker(daysArray);

    return (
        <div className="box">
            <h5 className="title is-5">{goal.Name}</h5>
            <div id={goal.Name.replace(/\s/g, '')}/>
        </div>
    )
}

export default DailyTracker;
