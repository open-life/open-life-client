import React from "react";
import User from "../../models/User";
import GoalOverview from "../../models/GoalOverview";
import { Link } from "react-router-dom";
import './UserBox.css';

interface UserBoxProps {
    user: User;
    userGoals: GoalOverview[];
};
interface UserBoxState { };

export default class UserBox extends React.Component<UserBoxProps, UserBoxState>{
    render() {
        const user = this.props.user;
        const goals: JSX.Element[] = this.props.userGoals.map(g => <li key={g.Name}>{g.Name}</li>);

        return (
            <Link to={`/${user.Username}`}>
                <div className="box">
                    <div className="columns">
                        <div className="column is-2">
                            <figure className="image">
                                <img alt="Profile Pic" className="is-rounded" src={user.ImageUrl} />
                            </figure>
                        </div>
                        <div className="column is-4">
                            <h1 className="title is-1">{user.Name}</h1>
                            <h3 className="subtitle is-3">{this.props.userGoals.length} {this.props.userGoals.length === 1 ? "goal" : "goals"}</h3>
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
}