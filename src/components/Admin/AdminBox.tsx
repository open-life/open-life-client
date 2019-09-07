import React from "react";
import { HabitGoal } from "../../models/HabitGoal";
import { ListGoal, Progress } from "../../models/ListGoal";
import { NumberGoal } from "../../models/NumberGoal";
import { Auth0Context } from "../Authentication/Auth0";
import { Observable } from "rxjs";
import { takeWhile } from "rxjs/operators";
import './AdminBox.css';

interface Props {
    showCreateModal: Function;
    logHabitModal: (goal: HabitGoal) => void;
    logListModal: (goal: ListGoal) => void;
    logNumberModal: (goal: NumberGoal) => void;
}
interface State {
    habitGoals: HabitGoal[];
    listGoals: ListGoal[];
    numberGoals: NumberGoal[];
}

export default class AdminBox extends React.Component<Props, State>{
    private _alive: boolean;

    constructor(props: Props) {
        super(props);

        this._alive = true;

        this.state = { habitGoals: [], listGoals: [], numberGoals: [] };

        this.userHasGoals = this.userHasGoals.bind(this);
        this.loadStatePiece = this.loadStatePiece.bind(this);
        this.loadGoalRows = this.loadGoalRows.bind(this);
    }

    render() {
        const adminGoalRows = this.loadGoalRows();

        return (
            <div className="container has-text-centered">
                <div className="box admin">
                    <div className="columns is-centered">
                        <div className="column is-2">
                            <span className="icon is-large log-button">
                                <i className="fas fa-3x fa-plus-circle" onClick={() => this.props.showCreateModal('create')}></i>
                            </span>
                            <h4 className="title is-4">New goal</h4>
                        </div>
                    </div>
                    {this.userHasGoals() &&
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

    loadGoalRows(): JSX.Element[] {
        let goalRows: JSX.Element[] = [];
        let service = this.context.userGoals;

        this.state.habitGoals.forEach(g => {
            const progress = g.Logs.filter(l => l.HabitCompleted).length;
            goalRows.push(this.createGoalRow(g.Name, progress, g.Target, () => this.props.logHabitModal(g), () => service.deleteHabitGoal(g.HabitGoalId)));
        });

        this.state.listGoals.forEach(g => {
            const progress = g.Items.filter(i => i.Progress === Progress.Completed).length;
            goalRows.push(this.createGoalRow(g.Name, progress, g.Target, () => this.props.logListModal(g), () => service.deleteListGoal(g.ListGoalId)));
        });

        this.state.numberGoals.forEach(g => {
            const progress = g.Logs.map(l => l.Amount).reduce((a, b) => a + b, 0);
            goalRows.push(this.createGoalRow(g.Name, progress, g.Target, () => this.props.logNumberModal(g), () => service.deleteNumberGoal(g.NumberGoalId)));
        });

        return goalRows;
    }

    createGoalRow(name: string, progress: number, target: number, showModal: Function, deleteGoal: Function): JSX.Element {
        return (
            <tr key={name}>
                <td>{name}</td>
                <td><progress className="progress" value={progress} max={target}></progress></td>
                <td>
                    <span className="button is-link" onClick={() => showModal()}>Log Goal</span>
                </td>
                <td>
                    <span className="button is-danger" onClick={() => deleteGoal()}>Delete Goal</span>
                </td>
            </tr>
        );
    }

    userHasGoals(): boolean {
        return this.state.habitGoals.length !== 0 || this.state.listGoals.length !== 0 || this.state.numberGoals.length !== 0;
    }

    componentDidMount() {
        const userGoals = this.context.userGoals;
        this.loadStatePiece<HabitGoal[]>(userGoals.HabitGoals, 'habitGoals');
        this.loadStatePiece<ListGoal[]>(userGoals.ListGoals, 'listGoals');
        this.loadStatePiece<NumberGoal[]>(userGoals.NumberGoals, 'numberGoals');

        this.loadGoalRows();
    }

    private loadStatePiece<T>(loader: Observable<T>, stateKey: string) {
        loader.pipe(takeWhile(() => this._alive))
            .subscribe(value => this.setState({ [stateKey]: value } as unknown as State));
    }
}

AdminBox.contextType = Auth0Context;