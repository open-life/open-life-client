import React from 'react';
import './Profile.css';
import Overview from '../../components/Goals/Overview/Overview';
import DailyTracker from '../../components/Goals/DailyTracker/DailyTracker';
import List from '../../components/Goals/List/List';
import Chart from '../../components/Goals/Chart/Chart';
import GoalsService from '../../services/GoalService';
import { HabitGoal } from '../../models/HabitGoal';
import GoalOverview from '../../models/GoalOverview';
import { ListGoal } from '../../models/ListGoal';
import { number } from 'prop-types';
import { NumberGoal } from '../../models/NumberGoal';

interface Props { };
interface State {
  goals: GoalOverview[];
  habitGoals: HabitGoal[];
  listGoals: ListGoal[];
  numberGoals: NumberGoal[];
};

export default class Profile extends React.Component<Props, State> {
  private goalService: GoalsService;

  constructor(props: Props) {
    super(props);

    this.goalService = new GoalsService();

    this.state = { goals: [], habitGoals: [], listGoals: [], numberGoals: [] };

    this.loadAllGoals = this.loadAllGoals.bind(this);
  }

  render() {
    if (this.state.goals.length === 0) {
      return (
        <header>
          <section className="info-strip">
            <figure className="image avatar">
              <img className="is-rounded avatar-image" src="/profile.jpg" />
            </figure>
            <div className="name-stats">
              <h2 className="is-size-2 has-text-white name">Phillip Chaffee</h2>
            </div>
          </section>
        </header>
      );
    }

    let habitGoals: JSX.Element[] = [];
    this.state.habitGoals.forEach(g => {
      habitGoals.push(<DailyTracker goal={g} />);
    });

    let listGoals: JSX.Element[] = [];
    this.state.listGoals.forEach(g => {
      listGoals.push(<div className="column is-half"><List goal={g} /></div>);
    });

    let numberGoals: JSX.Element[] = [];
    this.state.numberGoals.forEach(g => {
      numberGoals.push(<Chart goal={g} />);
    });

    return (
      <div>
        <header>
          <section className="info-strip">
            <figure className="image avatar">
              <img className="is-rounded avatar-image" src="/profile.jpg" />
            </figure>
            <div className="name-stats">
              <h2 className="is-size-2 has-text-white name">Phillip Chaffee</h2>
              <div className="stats">
                <h2 className="is-size-2 has-text-white goals">{this.state.goals.length} goals</h2>
              </div>
            </div>
          </section>
        </header>

        <section className="section">
          <div className="container has-text-centered">

            <h2 className="title is-2">Goals</h2>
            <Overview goals={this.state.goals.map(g => g.Name)}
              status={this.state.goals.map(g => g.Progress)} />

            {habitGoals}

            <div className="columns">
              {listGoals}
            </div>

            {numberGoals}
          </div>
        </section>
      </div>
    );
  }

  componentDidMount() {
    this.loadAllGoals();
  }

  loadAllGoals() {
    this.goalService
      .loadGoalOverviews()
      .then(goals => {
        this.setState({ goals });
      });

    this.goalService
      .loadHabitGoals()
      .then(habitGoals => {
        this.setState({ habitGoals });
      });

    this.goalService
      .loadListGoals()
      .then(listGoals => {
        this.setState({ listGoals });
      });

    this.goalService
      .loadNumberGoals()
      .then(numberGoals => {
        this.setState({ numberGoals })
      });
  }
}
