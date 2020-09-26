import React, {useContext, useEffect, useState} from 'react';
import './Home.css';
import UserBox from '../../components/UserBox/UserBox';
import GoalOverview from '../../models/GoalOverview';
import {Observable, combineLatest} from 'rxjs';
import {take} from 'rxjs/operators';
import AdminBox from '../../components/Admin/AdminBox';
import {HabitGoal} from '../../models/HabitGoal';
import {ListGoal} from '../../models/ListGoal';
import {NumberGoal} from '../../models/NumberGoal';
import {useAuth0} from "@auth0/auth0-react";
import {ServiceContext} from "../../index";

interface Props {
    showCreateModal: Function;
    logHabitModal: (goal: HabitGoal) => void;
    logListModal: (goal: ListGoal) => void;
    logNumberModal: (goal: NumberGoal) => void;
}

const Home: React.FC<Props> = (props) => {
    const {isAuthenticated} = useAuth0();
    const {goalService, userService} = useContext(ServiceContext);

    const [userBoxes, setUserBoxes] = useState([] as JSX.Element[]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let userBoxes: JSX.Element[] = [];

        userService
            .getUsers()
            .subscribe(users => {
                let overviewTasks: Observable<GoalOverview[]>[] = [];
                users.forEach(user => {
                    overviewTasks.push(
                        goalService
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

                                userBoxes.push(<UserBox key={user.UserId} user={user} userGoals={overview}/>);
                            }
                        })

                        setUserBoxes(userBoxes);
                        setLoading(false);
                    })
            });
    })

    const {showCreateModal, logHabitModal, logListModal, logNumberModal} = props;

    let adminOrWelcome: JSX.Element;
    if (isAuthenticated) {
        adminOrWelcome =
            <AdminBox showCreateModal={showCreateModal} logHabitModal={logHabitModal} logListModal={logListModal}
                      logNumberModal={logNumberModal}/>
    } else {
        adminOrWelcome = <div className="container has-text-centered">
            <h1 className="title is-1">Welcome!</h1>
        </div>
    }

    return (
        <div className="home">
            <div className="section">
                {adminOrWelcome}
            </div>
            <div className="section">
                <div className="container userBoxes">
                    <h2 className="title is-2 has-text-centered">Users</h2>
                    {!loading && userBoxes}
                </div>
            </div>
        </div>
    );
}

export default Home;
