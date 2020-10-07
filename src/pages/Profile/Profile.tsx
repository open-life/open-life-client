import React, {ChangeEvent, useEffect, useState} from 'react';
import './Profile.css';
import Overview from '../../components/Goals/Overview/Overview';
import DailyTracker from '../../components/Goals/DailyTracker/DailyTracker';
import List from '../../components/Goals/List/List';
import Chart from '../../components/Goals/Chart/Chart';
import {HabitGoal} from '../../models/HabitGoal';
import GoalOverview from '../../models/GoalOverview';
import {ListGoal} from '../../models/ListGoal';
import {NumberGoal} from '../../models/NumberGoal';
import {RouteComponentProps} from 'react-router';
import User from '../../models/User';
import HttpClient from "../../clients/HttpClient";

interface Props extends RouteComponentProps<{ [s: string]: string; }> {
}

const Profile: React.FC<Props> = (props) => {
    const profilePicUpload = React.createRef<HTMLInputElement>();

    const {match} = props;

    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState({} as User);
    const [goalOverviews, setGoalOverviews] = useState([] as GoalOverview[]);
    const [habitGoals, setHabitGoals] = useState([] as HabitGoal[]);
    const [listGoals, setListGoals] = useState([] as ListGoal[]);
    const [numberGoals, setNumberGoals] = useState([] as NumberGoal[]);

    const buildProfilePic = (): JSX.Element => {
        if (user && (user.photoUrl === '' || !user.photoUrl)) {
            return (
                <div className="add-avatar-image" onClick={() => uploadProfilePic()}>
                    <input id="fileInput" type="file" ref={profilePicUpload} style={{display: 'none'}}
                           onChange={saveProfilePic}/>
                    <span className="icon is-large">
            <i className="fas fa-3x fa-plus-circle"/>
          </span>
                </div>
            );
        } else {
            return <img alt="Profile Pic" className="is-rounded avatar-image" src={user.photoUrl}/>;
        }
    }

    const uploadProfilePic = () => {
        const element = profilePicUpload.current;

        if (element) {
            element.click();
        }
    }

    const saveProfilePic = async (e: ChangeEvent<HTMLInputElement>) => {
        const target = e.target;

        if (target) {
            const files = target.files;
            if (files) {
                // const token = getAccessTokenSilently();
                // const userService = new UserService(await token);
                //userService.postProfilePicture("FIx this");
            }
        }
    }

    const buildHeader = (profilePic: JSX.Element): JSX.Element => {
        return (
            <header>
                <section className="info-strip">
                    <figure className="image avatar">
                        {profilePic}
                    </figure>
                    <div className="name-stats">
                        <h2 className="is-size-2 has-text-white name">{user.displayName}</h2>
                        <div className="stats">
                            <h2 className="is-size-2 has-text-white goals">{goalOverviews ? goalOverviews.length : 0} goals</h2>
                        </div>
                    </div>
                </section>
            </header>
        );
    }

    const buildGoals = (): {
        habitGoals: JSX.Element[],
        listGoals: JSX.Element[],
        numberGoals: JSX.Element[]
    } => {
        let habitGoalElements: JSX.Element[] = [];
        if (habitGoals) {
            habitGoals.forEach(g => {
                habitGoalElements.push(<DailyTracker key={g.HabitGoalId} goal={g}/>);
            });
        }

        let listGoalElements: JSX.Element[] = [];
        if (listGoals) {
            listGoals.forEach(g => {
                listGoalElements.push(<div key={g.ListGoalId} className="column is-half"><List goal={g}/></div>);
            });
        }

        let numberGoalElements: JSX.Element[] = [];
        if (numberGoals) {
            numberGoals.forEach(g => {
                numberGoalElements.push(<Chart key={g.NumberGoalId} goal={g}/>);
            });
        }

        return {habitGoals: habitGoalElements, listGoals: listGoalElements, numberGoals: numberGoalElements};
    }

    useEffect(() => {
        const httpClient = new HttpClient();

        httpClient.get<User>(`/users/${match.params.id}`).then(user => {
            setUser(user);
        })
    }, [match])

    useEffect(() => {
        if (!user.id) {
            return
        }

        const httpClient = new HttpClient();

        const overviews = httpClient.get<GoalOverview[]>(`/api/Goals/${user.id}`);
        const habits = httpClient.get<HabitGoal[]>(`/api/HabitGoal/${user.id}`);
        const lists = httpClient.get<ListGoal[]>(`/api/ListGoal/${user.id}`);
        const numbers = httpClient.get<NumberGoal[]>(`/api/NumberGoal/${user.id}`);

        Promise.all([overviews, habits, lists, numbers])
            .then(values => {
                setGoalOverviews(values[0]);
                setHabitGoals(values[1]);
                setListGoals(values[2]);
                setNumberGoals(values[3]);
                setLoading(false);
            });
    }, [user])

    if (loading) {
        return <></>
    }

    const profilePic = buildProfilePic();
    const header = buildHeader(profilePic);
    const goals = buildGoals();

    return (
        <div>
            {header}

            <section className="section">
                <div className="container has-text-centered">

                    <h2 className="title is-2">Goals</h2>
                    {goalOverviews &&
                    <Overview goals={goalOverviews.map(g => g.Name)}
                              status={goalOverviews.map(g => `${+(g.Progress / g.Target).toFixed(2)}%`)}/>}

                    {goals.habitGoals}

                    <div className="columns">
                        {goals.listGoals}
                    </div>

                    {goals.numberGoals}
                </div>
            </section>
        </div>
    );
}

export default Profile;
