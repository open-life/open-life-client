import React, {useEffect, useState} from "react";
import User from "../../models/User";
import GoalOverview from "../../models/GoalOverview";
import {Link} from "react-router-dom";
import './UserBox.css';
import HttpClient from "../../clients/HttpClient";
import config from "../../auth_config.json";

interface UserBoxProps {
    userId: string;
    userGoals: GoalOverview[];
}

const UserBox: React.FC<UserBoxProps> = (props) => {
    const [user, setUser] = useState({} as User);

    const {userId, userGoals} = props;

    useEffect(() => {
        const httpClient = new HttpClient();

        httpClient.get<User>(`https://${config.domain}/api/v2/users/${userId}`).then(user => {
            setUser(user);
        })
    }, [userId])

    if (!user.providerId) {
        return <></>;
    }

    const goals: JSX.Element[] = userGoals.map(g => <li key={g.Name}>{g.Name}</li>);
    return (
        <Link to={`/${user.providerId}`}>
            <div className="box">
                <div className="columns">
                    <div className="column is-2">
                        <figure className="image">
                            <img alt="Profile Pic" className="is-rounded" src={user.photoUrl}/>
                        </figure>
                    </div>
                    <div className="column is-4">
                        <h1 className="title is-1">{user.displayName}</h1>
                        <h3 className="subtitle is-3">{userGoals.length} {userGoals.length === 1 ? "goal" : "goals"}</h3>
                    </div>
                    <div className="column is-6">
                        <h4 className="title is-4">Goals</h4>
                        <div className="content">
                            <ul>
                                {goals}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default UserBox;
