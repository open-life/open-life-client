import React, {useContext, useEffect, useState} from "react";
import {HabitGoal} from "../../models/HabitGoal";
import {ListGoal, Progress} from "../../models/ListGoal";
import {NumberGoal} from "../../models/NumberGoal";
import './AdminBox.css';
import {ServiceContext} from "../../index";

interface Props {
    showCreateModal: Function;
    logHabitModal: (goal: HabitGoal) => void;
    logListModal: (goal: ListGoal) => void;
    logNumberModal: (goal: NumberGoal) => void;
}

const AdminBox: React.FC<Props> = (props) => {
    const {goalService} = useContext(ServiceContext);

    const [habitGoals, setHabitGoals] = useState([] as HabitGoal[]);
    const [listGoals, setListGoals] = useState([] as ListGoal[]);
    const [numberGoals, setNumberGoals] = useState([] as NumberGoal[]);

    const {showCreateModal, logHabitModal, logListModal, logNumberModal} = props;

    useEffect(() => {
        goalService.HabitGoals.subscribe(value => setHabitGoals(value));
        goalService.ListGoals.subscribe(value => setListGoals(value));
        goalService.NumberGoals.subscribe(value => setNumberGoals(value));
    }, [])

    const loadGoalRows = (): JSX.Element[] => {
        let goalRows: JSX.Element[] = [];

        habitGoals.forEach(g => {
            const progress = g.Logs.filter(l => l.HabitCompleted).length;
            goalRows.push(createGoalRow(g.Name, progress, g.Target, () => logHabitModal(g), () => goalService.deleteHabitGoal(g.HabitGoalId)));
        });

        listGoals.forEach(g => {
            const progress = g.Items.filter(i => i.Progress === Progress.Completed).length;
            goalRows.push(createGoalRow(g.Name, progress, g.Target, () => logListModal(g), () => goalService.deleteListGoal(g.ListGoalId)));
        });

        numberGoals.forEach(g => {
            const progress = g.Logs.map(l => l.Amount).reduce((a, b) => a + b, 0);
            goalRows.push(createGoalRow(g.Name, progress, g.Target, () => logNumberModal(g), () => goalService.deleteNumberGoal(g.NumberGoalId)));
        });

        return goalRows;
    }

    const createGoalRow = (name: string, progress: number, target: number, showModal: Function, deleteGoal: Function): JSX.Element => {
        return (
            <tr key={name}>
                <td>{name}</td>
                <td>
                    <progress className="progress" value={progress} max={target}/>
                </td>
                <td>
                    <span className="button is-link" onClick={() => showModal()}>Log Goal</span>
                </td>
                <td>
                    <span className="button is-danger" onClick={() => deleteGoal()}>Delete Goal</span>
                </td>
            </tr>
        );
    }

    const userHasGoals = (): boolean => {
        return habitGoals.length !== 0 || listGoals.length !== 0 || numberGoals.length !== 0;
    }

    const adminGoalRows = loadGoalRows();

    return (
        <div className="container has-text-centered">
            <div className="box admin">
                <div className="columns is-centered">
                    <div className="column is-2">
                            <span className="icon is-large log-button">
                                <i className="fas fa-3x fa-plus-circle"
                                   onClick={() => showCreateModal('create')}/>
                            </span>
                        <h4 className="title is-4">New goal</h4>
                    </div>
                </div>
                {userHasGoals() &&
                <table className="table is-bordered is-fullwidth">
                    <thead>
                    <tr>
                        <th colSpan={4}>Your Goals</th>
                    </tr>
                    </thead>
                    <tbody>
                    {adminGoalRows}
                    </tbody>
                </table>
                }
            </div>
        </div>
    );
}

export default AdminBox;
