import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Profile from './pages/Profile/Profile';
import Home from './pages/Home/Home';
import Modal from './components/Modal/Modal';
import CreateGoal from './modals/CreateGoal';
import GoalOverview from './models/GoalOverview';
import { Observable } from 'rxjs';
import { HabitGoal } from './models/HabitGoal';
import { ListGoal } from './models/ListGoal';
import { NumberGoal } from './models/NumberGoal';
import { takeWhile } from 'rxjs/operators';
import { Auth0Context } from './components/Authentication/Auth0';
import LogHabit from './modals/Log/LogHabit';
import LogList from './modals/Log/LogList';
import LogNumber from './modals/Log/LogNumber';

interface AppProps { };
interface AppState {
  dataLoaded: boolean;
  modal: JSX.Element;
  modalActive: boolean;

  goalOverviews: GoalOverview[];
  habitGoals: HabitGoal[];
  listGoals: ListGoal[];
  numberGoals: NumberGoal[];
};

export default class App extends React.Component<AppProps, AppState> {
  private appAlive: boolean;

  constructor(props: AppProps) {
    super(props);
    this.state = { dataLoaded: false, modal: <div></div>, modalActive: false, goalOverviews: [], habitGoals: [], listGoals: [], numberGoals: [] };

    this.showCreateModal = this.showCreateModal.bind(this);
    this.logHabitModal = this.logHabitModal.bind(this);
    this.logListModal = this.logListModal.bind(this);
    this.logNumberModal = this.logNumberModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.loadData = this.loadData.bind(this);
    this.loadStatePiece = this.loadStatePiece.bind(this);

    this.appAlive = true;
  }

  render() {
    return (
      <Router>
        <NavBar />
        <Route path='/' exact render={(props) => <Home {...props} showCreateModal={this.showCreateModal} logHabitModal={this.logHabitModal} logListModal={this.logListModal} logNumberModal={this.logNumberModal} />} />
        <Route path='/:username' exact render={(props) => <Profile {...props} />} />
        {this.context.isAuthenticated &&
          <Modal Active={this.state.modalActive} closeModal={this.closeModal}>
            {this.state.modal}
          </Modal>
        }
      </Router>
    );
  }

  componentDidMount() {
    if (this.context.user && this.context.user.Username) {
      this.loadData(this.context.user.Username);
    }
  }

  componentDidUpdate() {
    const user = this.context.user;
    if (user && user.Username && !this.state.dataLoaded) {
      this.loadData(user.Username);
    }
  }

  componentWillUnmount() {
    this.appAlive = false;
  }

  showCreateModal(): void {
    this.setState({ modalActive: true, modal: <CreateGoal closeModal={this.closeModal} /> });
  }

  logHabitModal(habitGoal: HabitGoal): void {
    this.setState({ modalActive: true, modal: <LogHabit goal={habitGoal} closeModal={this.closeModal} /> });
  }

  logListModal(listGoal: ListGoal): void {
    this.setState({ modalActive: true, modal: <LogList goal={listGoal} closeModal={this.closeModal} /> });
  }

  logNumberModal(numberGoal: NumberGoal): void {
    this.setState({ modalActive: true, modal: <LogNumber goal={numberGoal} closeModal={this.closeModal} /> });
  }

  closeModal(): void {
    this.setState({ modalActive: false });
  }

  private loadData(username: string): void {
    this.setState({ dataLoaded: true });
    const userGoals = this.context.userGoals;

    userGoals.loadUserGoals(username).subscribe();
    this.loadStatePiece<GoalOverview[]>(userGoals.GoalOverViews, 'goalOverviews');
    this.loadStatePiece<HabitGoal[]>(userGoals.HabitGoals, 'habitGoals');
    this.loadStatePiece<ListGoal[]>(userGoals.ListGoals, 'listGoals');
    this.loadStatePiece<NumberGoal[]>(userGoals.NumberGoals, 'numberGoals');
  }

  private loadStatePiece<T>(loader: Observable<T>, stateKey: string) {
    loader
      .pipe(takeWhile(() => this.appAlive))
      .subscribe(value => this.setState({ [stateKey]: value } as unknown as AppState));
  }
}

App.contextType = Auth0Context;
