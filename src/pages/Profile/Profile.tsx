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
import { Observable } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import GoalService from '../../services/GoalService';
import User from '../../models/User';

interface Props extends RouteComponentProps<{ [s: string]: string; }> { };
interface State {
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

    this.state = { user: {} as User, goalOverviews: [], habitGoals: [], listGoals: [], numberGoals: [] };

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
    const service = this._goalService;
    service.loadUserGoals(this.props.match.params.username).subscribe();

    this.loadStatePiece<User>(this._userService.getUserWithUsername(this.props.match.params.username), 'user');
    this.loadStatePiece<GoalOverview[]>(service.GoalOverViews, 'goalOverviews');
    this.loadStatePiece<HabitGoal[]>(service.HabitGoals, 'habitGoals');
    this.loadStatePiece<ListGoal[]>(service.ListGoals, 'listGoals');
    this.loadStatePiece<NumberGoal[]>(service.NumberGoals, 'numberGoals');
  }

  private loadStatePiece<T>(loader: Observable<T>, stateKey: string) {
    loader
      .pipe(takeWhile(() => this._appAlive))
      .subscribe(value => {
        if (value !== null) {
          this.setState({ [stateKey]: value } as unknown as State, () => console.log(stateKey, value));
        }
      });
  }
}

Profile.contextType = Auth0Context;