import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Profile from './pages/Profile/Profile';
import Home from './pages/Home/Home';
import Modal from './components/Modal/Modal';
import CreateGoal from './modals/CreateGoal';
import LogGoal from './modals/Log/LogGoal';
import GoalOverview from './models/GoalOverview';
import GoalService from './services/GoalService';
import { Observable } from 'rxjs';
import { HabitGoal } from './models/HabitGoal';
import { ListGoal } from './models/ListGoal';
import { NumberGoal } from './models/NumberGoal';
import { takeWhile } from 'rxjs/operators';

interface AppProps { };
interface AppState {
  modal: JSX.Element;
  modalActive: boolean;

  goalOverviews: GoalOverview[];
  habitGoals: HabitGoal[];
  listGoals: ListGoal[];
  numberGoals: NumberGoal[];
};

class App extends React.Component<AppProps, AppState> {
  private appAlive: boolean;
  private goalService: GoalService;

  constructor(props: AppProps) {
    super(props);
    this.state = { modal: <div></div>, modalActive: false, goalOverviews: [], habitGoals: [], listGoals: [], numberGoals: [] };

    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.loadData = this.loadData.bind(this);
    this.loadStatePiece = this.loadStatePiece.bind(this);

    this.appAlive = true;
    this.goalService = new GoalService();
  }

  render() {
    return (
      <Router>
        <NavBar />
        <Route path='/' exact render={(props) => <Home {...props} showModal={this.showModal} />} />
        <Route path='/:username' exact render={(props) => <Profile {...props} />} />
        <Modal Active={this.state.modalActive} closeModal={this.closeModal}>
          {this.state.modal}
        </Modal>
      </Router>
    );
  }

  componentDidMount() {
    if (this.context.user) {
      this.loadData(this.context.user.username);
    }
  }

  componentWillUnmount() {
    this.appAlive = false;
  }

  showModal(modalName: string): void {
    let modal = <div></div>;

    if (modalName === "create") {
      modal = <CreateGoal goalService={this.goalService} closeModal={this.closeModal} />
      this.setState({ modalActive: true, modal: modal });
    } else if (modalName === "log") {
      modal = <LogGoal goalService={this.goalService} habitGoals={this.state.habitGoals} listGoals={this.state.listGoals} numberGoals={this.state.numberGoals} closeModal={this.closeModal} />
      this.setState({ modalActive: true, modal: modal });
    }
  }

  closeModal(): void {
    this.setState({ modalActive: false });
  }

  private loadData(username: string): void {
    const service = this.goalService;
    service.loadUser(username).subscribe();

    this.loadStatePiece<GoalOverview[]>(service.GoalOverViews, 'goalOverviews');
    this.loadStatePiece<HabitGoal[]>(service.HabitGoals, 'habitGoals');
    this.loadStatePiece<ListGoal[]>(service.ListGoals, 'listGoals');
    this.loadStatePiece<NumberGoal[]>(service.NumberGoals, 'numberGoals');
  }

  private loadStatePiece<T>(loader: Observable<T>, stateKey: string) {
    loader
      .pipe(takeWhile(() => this.appAlive))
      .subscribe(value => this.setState({ [stateKey]: value } as unknown as AppState));
  }
}

export default App;
