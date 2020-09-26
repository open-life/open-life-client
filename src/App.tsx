import React, {useEffect, useState} from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Profile from './pages/Profile/Profile';
import Home from './pages/Home/Home';
import Modal from './components/Modal/Modal';
import CreateGoal from './modals/CreateGoal';
import GoalOverview from './models/GoalOverview';
import {HabitGoal} from './models/HabitGoal';
import {ListGoal} from './models/ListGoal';
import {NumberGoal} from './models/NumberGoal';
import LogHabit from './modals/Log/LogHabit';
import LogList from './modals/Log/LogList';
import LogNumber from './modals/Log/LogNumber';
import {useAuth0} from "@auth0/auth0-react";
import GoalService from "./services/GoalService";

const App: React.FC = () => {
    const [dataLoaded, setDataLoaded] = useState(false);
    const [modal, setModal] = useState(<div/>);
    const [modalActive, setModalActive] = useState(false);
    const [goalOverviews, setGoalOverviews] = useState([] as GoalOverview[]);
    const [habitGoals, setHabitGoals] = useState([] as HabitGoal[]);
    const [listGoals, setListGoals] = useState([] as ListGoal[]);
    const [numberGoals, setNumberGoals] = useState([] as NumberGoal[]);

    const {user, isAuthenticated} = useAuth0();

    const showCreateModal = (): void => {
        setModalActive(true);
        setModal(<CreateGoal closeModal={() => setModalActive(false)}/>);
    }

    const logHabitModal = (habitGoal: HabitGoal): void => {
        setModalActive(true);
        setModal(<LogHabit goal={habitGoal} closeModal={() => setModalActive(false)}/>);
    }

    const logListModal = (listGoal: ListGoal): void => {
        setModalActive(true);
        setModal(<LogList goal={listGoal} closeModal={() => setModalActive(false)}/>);
    }

    const logNumberModal = (numberGoal: NumberGoal): void => {
        setModalActive(true);
        setModal(<LogNumber goal={numberGoal} closeModal={() => setModalActive(false)}/>);
    }

    const loadData = (username: string): void => {
        const goalService = new GoalService();

        goalService.loadUserGoals(username).subscribe();
        goalService.GoalOverViews.subscribe(goalOverviews => setGoalOverviews(goalOverviews));
        goalService.HabitGoals.subscribe(habitGoals => setHabitGoals(habitGoals));
        goalService.ListGoals.subscribe(listGoals => setListGoals(listGoals));
        goalService.NumberGoals.subscribe(numberGoals => setNumberGoals(numberGoals));

        setDataLoaded(true);
    }

    useEffect(() => {
        if (user && user.Username && !dataLoaded) {
            loadData(user.Username);
        }
    }, [user, dataLoaded])

    return (
        <Router>
            <NavBar/>
            <Route path='/' exact render={(props) => <Home {...props} showCreateModal={showCreateModal}
                                                           logHabitModal={logHabitModal}
                                                           logListModal={logListModal}
                                                           logNumberModal={logNumberModal}/>}/>
            <Route path='/:username' exact render={(props) => <Profile {...props} />}/>
            {isAuthenticated &&
            <Modal Active={modalActive} closeModal={() => setModalActive(false)}>
                {modal}
            </Modal>
            }
        </Router>
    );
}

export default App;
