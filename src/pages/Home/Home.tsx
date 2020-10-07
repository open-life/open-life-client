import React, {useContext, useEffect, useState} from 'react';
import './Home.css';
import UserBox from '../../components/UserBox/UserBox';
import GoalOverview from '../../models/GoalOverview';
import AdminBox from '../../components/Admin/AdminBox';
import {HabitGoal} from '../../models/HabitGoal';
import {ListGoal} from '../../models/ListGoal';
import {NumberGoal} from '../../models/NumberGoal';
import HttpClient from "../../clients/HttpClient";
import {AuthenticationContext} from "../../context/AuthenticationContext";

interface Props {
    showCreateModal: Function;
    logHabitModal: (goal: HabitGoal) => void;
    logListModal: (goal: ListGoal) => void;
    logNumberModal: (goal: NumberGoal) => void;
}

const Home: React.FC<Props> = (props) => {
    const {isAuthenticated} = useContext(AuthenticationContext);

    const [userBoxes, setUserBoxes] = useState([] as JSX.Element[]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let httpClient = new HttpClient();
        let userBoxes: JSX.Element[] = [];
        httpClient.get<GoalOverview[]>("/api/Goals").then(overviews => {
            if (!overviews) {
                return;
            }

            let overviewsByUser = new Map<string, GoalOverview[]>();
            overviews.forEach(overview => {
                if (!overviewsByUser.get(overview.UserId)) {
                    overviewsByUser.set(overview.UserId, []);
                }

                let newValue = overviewsByUser.get(overview.UserId) || [];
                newValue.push(overview);
                overviewsByUser.set(overview.UserId, newValue);
            })

            overviewsByUser.forEach(((value, key) => {
                userBoxes.push(<UserBox userId={key} userGoals={value}/>);
            }))

            setUserBoxes(userBoxes);
            setLoading(false);
        });
    }, [isAuthenticated])

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
