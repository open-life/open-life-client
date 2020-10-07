import React, {useEffect, useState} from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Profile from './pages/Profile/Profile';
import Home from './pages/Home/Home';
import Modal from './components/Modal/Modal';
import CreateGoal from './modals/CreateGoal';
import {HabitGoal} from './models/HabitGoal';
import {ListGoal} from './models/ListGoal';
import {NumberGoal} from './models/NumberGoal';
import LogHabit from './modals/Log/LogHabit';
import LogList from './modals/Log/LogList';
import LogNumber from './modals/Log/LogNumber';
import User from "./models/User";
import HttpClient from "./clients/HttpClient";
import {AuthenticationContext} from './context/AuthenticationContext';

const App: React.FC = () => {
    const [modal, setModal] = useState(<div/>);
    const [modalActive, setModalActive] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [currentUser, setCurrentUser] = useState({} as User);

    useEffect(() => {
        const httpClient = new HttpClient();
        httpClient.get<User>('/users/current')
            .then(user => {
                if (user) {
                    setCurrentUser(user);
                    setIsAuthenticated(true);
                }
            });
    }, []);

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

    return (
        <AuthenticationContext.Provider value={{currentUser: currentUser, isAuthenticated: isAuthenticated}}>
            <Router>
                <NavBar/>
                <Route path='/' exact render={(props) => <Home {...props} showCreateModal={showCreateModal}
                                                               logHabitModal={logHabitModal}
                                                               logListModal={logListModal}
                                                               logNumberModal={logNumberModal}/>}/>
                <Route path='/:id' exact render={(props) => <Profile {...props} />}/>
                {isAuthenticated &&
                <Modal active={modalActive} closeModal={() => setModalActive(false)}>
                    {modal}
                </Modal>
                }
            </Router>
        </AuthenticationContext.Provider>
    );
}

export default App;
