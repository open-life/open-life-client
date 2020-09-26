import React, {useContext, useEffect, useState} from 'react';
import './Home.css';
import UserBox from '../../components/UserBox/UserBox';
import GoalOverview from '../../models/GoalOverview';
import AdminBox from '../../components/Admin/AdminBox';
import {HabitGoal} from '../../models/HabitGoal';
import {ListGoal} from '../../models/ListGoal';
import {NumberGoal} from '../../models/NumberGoal';
import {useAuth0} from "@auth0/auth0-react";
import HttpClient from "../../clients/HttpClient";
import User from "../../models/User";

interface Props {
    showCreateModal: Function;
    logHabitModal: (goal: HabitGoal) => void;
    logListModal: (goal: ListGoal) => void;
    logNumberModal: (goal: NumberGoal) => void;
}

const Home: React.FC<Props> = (props) => {
    const {isAuthenticated} = useAuth0();

    const [userBoxes, setUserBoxes] = useState([] as JSX.Element[]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUserBoxers = async () => {
            let httpClient = new HttpClient();
            let userBoxes: JSX.Element[] = [];
            let users = await httpClient.get<User[]>(`/api/User/`);

            await Promise.all(users.map(async (user) => {
                const overviews = await httpClient.get<GoalOverview[]>(`/api/Goals/${user.Username}`);
                userBoxes.push(<UserBox key={user.UserId} user={user} userGoals={overviews}/>);
            }))

            setUserBoxes(userBoxes);
            setLoading(false);
        }

        loadUserBoxers()
    }, [])

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
