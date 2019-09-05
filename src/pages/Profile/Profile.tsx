import React, { ChangeEvent } from 'react';
import './Profile.css';
import Overview from '../../components/Goals/Overview/Overview';
import DailyTracker from '../../components/Goals/DailyTracker/DailyTracker';
import List from '../../components/Goals/List/List';
import Chart from '../../components/Goals/Chart/Chart';
import { HabitGoal } from '../../models/HabitGoal';
import GoalOverview from '../../models/GoalOverview';
import { ListGoal } from '../../models/ListGoal';
import { NumberGoal } from '../../models/NumberGoal';
import { Auth0Context } from '../../components/Authentication/Auth0';
import UserService from '../../services/UserService';
import { RouteComponentProps } from 'react-router';
import { combineLatest } from 'rxjs';
import GoalService from '../../services/GoalService';
import User from '../../models/User';
import { takeWhile } from 'rxjs/operators';

interface Props extends RouteComponentProps<{ [s: string]: string; }> { };
interface State {
  loading: boolean;
  user: User;

  goalOverviews: GoalOverview[];
  habitGoals: HabitGoal[];
  listGoals: ListGoal[];
  numberGoals: NumberGoal[];
};

export default class Profile extends React.Component<Props, State> {
  private _appAlive: boolean;
  private _goalService: GoalService;
  private _userService: UserService;
  private _profilePicUpload: React.RefObject<HTMLInputElement>;

  constructor(props: Props) {
    super(props);

    this.state = { loading: true, user: {} as User, goalOverviews: [], habitGoals: [], listGoals: [], numberGoals: [] };

    this._appAlive = true;
    this._goalService = new GoalService();
    this._userService = new UserService();
    this._profilePicUpload = React.createRef();

    this.buildHeader = this.buildHeader.bind(this);
    this.buildProfilePic = this.buildProfilePic.bind(this);
    this.buildGoals = this.buildGoals.bind(this);
    this.uploadProfilePic = this.uploadProfilePic.bind(this);
    this.saveProfilePic = this.saveProfilePic.bind(this);
  }

  render() {
    if (this.state.loading) {
      return (
        <section className="section">
          <div className="container has-text-centered">
          </div>
        </section>
      );
    }

    const profilePic = this.buildProfilePic();
    const header = this.buildHeader(profilePic);
    const goals = this.buildGoals();

    return (
      <div>
        {header}

        <section className="section">
          <div className="container has-text-centered">

            <h2 className="title is-2">Goals</h2>
            <Overview goals={this.state.goalOverviews.map(g => g.Name)}
              status={this.state.goalOverviews.map(g => g.Progress)} />

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

  buildProfilePic(): JSX.Element {
    if (this.state.user && (this.state.user.ImageUrl === '' || !this.state.user.ImageUrl)) {
      return (
        <div className="add-avatar-image" onClick={() => this.uploadProfilePic()}>
          <input id="fileInput" type="file" ref={this._profilePicUpload} style={{ display: 'none' }} onChange={this.saveProfilePic} />
          <span className="icon is-large">
            <i className="fas fa-3x fa-plus-circle"></i>
          </span>
        </div>
      );
    } else {
      return <img alt="Profile Pic" className="is-rounded avatar-image" src={this.state.user.ImageUrl} />;
    }
  }

  uploadProfilePic() {
    const element = this._profilePicUpload.current;

    if (element) {
      element.click();
    }
  }

  async saveProfilePic(e: ChangeEvent<HTMLInputElement>) {
    const target = e.target;

    if (target) {
      const files = target.files;
      if (files) {
        const token = this.context.getTokenSilently();
        const userService = new UserService(await token);
        userService.postProfilePicture("FIx this");
      }
    }
  }

  buildHeader(profilePic: JSX.Element): JSX.Element {
    return (
      <header>
        <section className="info-strip">
          <figure className="image avatar">
            {profilePic}
          </figure>
          <div className="name-stats">
            <h2 className="is-size-2 has-text-white name">{this.state.user.Name}</h2>
            {this.state.goalOverviews.length !== 0 &&
              <div className="stats">
                <h2 className="is-size-2 has-text-white goals">{this.state.goalOverviews.length} goals</h2>
              </div>
            }
          </div>
        </section>
      </header>
    );
  }

  buildGoals(): { habitGoals: JSX.Element[], listGoals: JSX.Element[], numberGoals: JSX.Element[] } {
    let habitGoals: JSX.Element[] = [];
    this.state.habitGoals.forEach(g => {
      habitGoals.push(<DailyTracker key={g.HabitGoalId} goal={g} />);
    });

    let listGoals: JSX.Element[] = [];
    this.state.listGoals.forEach(g => {
      listGoals.push(<div key={g.ListGoalId} className="column is-half"><List goal={g} /></div>);
    });

    let numberGoals: JSX.Element[] = [];
    this.state.numberGoals.forEach(g => {
      numberGoals.push(<Chart key={g.NumberGoalId} goal={g} />);
    });

    return { habitGoals: habitGoals, listGoals: listGoals, numberGoals: numberGoals };
  }

  componentDidMount() {
    this.loadData();
  }

  componentWillUnmount() {
    this._appAlive = false;
  }

  private loadData(): void {
    this.loadState();
    this._goalService
      .loadUserGoals(this.props.match.params.username)
      .subscribe(() => this.setState({ loading: false }));
  }

  private loadState() {
    const service = this._goalService;

    combineLatest(
      this._userService.getUserWithUsername(this.props.match.params.username),
      service.GoalOverViews,
      service.HabitGoals,
      service.ListGoals,
      service.NumberGoals
    )
      .pipe(takeWhile(() => this._appAlive))
      .subscribe(state => {
        this.setState({ user: state[0], goalOverviews: state[1], habitGoals: state[2], listGoals: state[3], numberGoals: state[4] });
      })
  }
}

Profile.contextType = Auth0Context;