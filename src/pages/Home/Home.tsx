import React from 'react';
import './Home.css';
import { Auth0Context } from '../../components/Authentication/Auth0';
import UserBox from '../../components/UserBox/UserBox';
import GoalOverview from '../../models/GoalOverview';
import GoalService from '../../services/GoalService';
import UserService from '../../services/UserService';
import { Observable, combineLatest } from 'rxjs';
import { take } from 'rxjs/operators';

interface Props {
    showModal: Function;
};
interface State {
    loading: boolean;
    overviews: GoalOverview[];
    userBoxes: JSX.Element[];
};

export default class Home extends React.Component<Props, State> {
    private _goalService: GoalService;
    private _userService: UserService;

    constructor(props: Props) {
        super(props);

        this.state = { overviews: [], userBoxes: [], loading: true };

        this._goalService = new GoalService();
        this._userService = new UserService();

        this.addOrWelcome = this.addOrWelcome.bind(this);
    }

    render() {
        let addOrWelcome = this.addOrWelcome();

        return (
            <div className="section home">
                {addOrWelcome}
                <div className="container">
                    <h2 className="title is-2">Users</h2>
                    {!this.state.loading && this.state.userBoxes}
                </div>
            </div>
        );
    }

    addOrWelcome(): JSX.Element {
        if (this.context.isAuthenticated) {
            return (
                <div className="container has-text-centered">
                    <div className="columns is-centered">
                        <div className="column is-2">
                            <span className="icon is-large log-button">
                                <i className="fas fa-3x fa-plus-circle" onClick={() => this.props.showModal('create')}></i>
                            </span>
                            <h1 className="title is-4">Create a goal</h1>
                        </div>
                        <div className="column is-2">
                            <span className="icon is-large log-button">
                                <i className="fas fa-3x fa-plus-circle" onClick={() => this.props.showModal('log')}></i>
                            </span>
                            <h1 className="title is-4">Log a goal</h1>
                        </div>
                    </div>
                </div>
            )
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
                            const userId = overview[0].UserId;
                            const user = users.filter(u => u.UserId === userId)[0];

                            userBoxes.push(<UserBox user={user} userGoals={overview} />);
                        })

                        this.setState({ userBoxes: userBoxes, loading: false });
                    })
            });
    }
}

Home.contextType = Auth0Context;