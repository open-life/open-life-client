import React from 'react';
import './Home.css';
import { Auth0Context } from '../../components/Authentication/Auth0';
import UserBox from '../../components/UserBox/UserBox';
import GoalOverview from '../../models/GoalOverview';
import GoalService from '../../services/GoalService';
import UserService from '../../services/UserService';
import { Observable, combineLatest } from 'rxjs';
import { take } from 'rxjs/operators';
import AdminBox from '../../components/Admin/AdminBox';
import { HabitGoal } from '../../models/HabitGoal';
import { ListGoal } from '../../models/ListGoal';
import { NumberGoal } from '../../models/NumberGoal';

interface Props {
    showCreateModal: Function;
    logHabitModal: (goal: HabitGoal) => void;
    logListModal: (goal: ListGoal) => void;
    logNumberModal: (goal: NumberGoal) => void;
}

interface State {
    loading: boolean;
    userBoxes: JSX.Element[];
}

export default class Home extends React.Component<Props, State> {
    private _goalService: GoalService;
    private _userService: UserService;

    constructor(props: Props) {
        super(props);

        this.state = { userBoxes: [], loading: true };

        this._goalService = new GoalService();
        this._userService = new UserService();

        this.adminOrWelcome = this.adminOrWelcome.bind(this);
    }

    render() {
        let adminOrWelcome = this.adminOrWelcome();

        return (
            <div className="home">
                <div className="section">
                    {adminOrWelcome}
                </div>
                <div className="section">
                    <div className="container userBoxes">
                        <h2 className="title is-2 has-text-centered">Users</h2>
                        {!this.state.loading && this.state.userBoxes}
                    </div>
                </div>
            </div>
        );
    }

    adminOrWelcome(): JSX.Element {
        if (this.context.isAuthenticated) {
            return <AdminBox showCreateModal={this.props.showCreateModal} logHabitModal={this.props.logHabitModal} logListModal={this.props.logListModal} logNumberModal={this.props.logNumberModal} />
        }

        return (
            <div className="container has-text-centered">
                <h1 className="title is-1">Welcome!</h1>
            </div>
        )
    }

    componentDidMount() {
        let userBoxes: JSX.Element[] = [];

        this._userService
            .getUsers()
            .subscribe(users => {
                let overviewTasks: Observable<GoalOverview[]>[] = [];
                users.forEach(user => {
                    overviewTasks.push(
                        this._goalService
                            .loadGoalOverviews(user.Username)
                            .pipe(take(1))
                    )
                })

                combineLatest(overviewTasks)
                    .subscribe(overviews => {
                        overviews.forEach(overview => {
                            if (overview.length !== 0) {
                                const userId = overview[0].UserId;
                                const user = users.filter(u => u.UserId === userId)[0];

                                userBoxes.push(<UserBox key={user.UserId} user={user} userGoals={overview} />);
                            }
                        })

                        this.setState({ userBoxes: userBoxes, loading: false });
                    })
            });
    }
}

Home.contextType = Auth0Context;