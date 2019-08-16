import React from 'react';
import './Profile.css';
import Overview from '../../components/Goals/Overview/Overview';
import DailyTracker from '../../components/Goals/DailyTracker/DailyTracker';
import List from '../../components/Goals/List/List';
import Chart from '../../components/Goals/Chart/Chart';
import Goal from '../../models/Goal';
import GoalsService from '../../services/GoalService';
import { HabitGoal } from '../../models/HabitGoal';
import GoalOverview from '../../models/GoalOverview';

interface Props { };
interface State {
  goals: GoalOverview[],
  habitGoals: HabitGoal[]
};

export default class Profile extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { goals: [], habitGoals: [] };
  }

  render() {
    if (this.state.goals.length === 0) {
      return <h1>Time to create some goals.</h1>;
    }

    let habits: JSX.Element[] = [];
    this.state.habitGoals.forEach(g => {
      habits.push(<DailyTracker goal={g} />);
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
                <h2 className="is-size-2 has-text-white goals">6 goals</h2>
              </div>
            </div>
          </section>
        </header>

        <section className="section">
          <div className="container has-text-centered">

            <h2 className="title is-2">2019 Goals</h2>
            <Overview goals={this.state.goals.map(g => g.Name)}
              status={this.state.goals.map(g => g.Progress)} />

            {habits}

            <div className="columns">
              <div className="column is-half">
                <List name="Projects" headers={["Project", "Progress"]} rows={[["Go Climb To", "✔️"], ["Routine", "✔️"], ["Open Life", "🚧"]]} />
              </div>
              <div className="column is-half">
                <List name="📚 Books" headers={["Book", "Rating", "Progress"]} rows={[["12 Rules for Life - Jordan Peterson", "⭐⭐⭐⭐⭐", "📖"], ["Beyond Good And Evil – Friedrich Nietzsche", "", "Next"]]} />
              </div>
            </div>

            <Chart name="Monthly Recurring Revenue"
              labels={['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']}
              data={[0, 100, 250, 0, 425, 310, 200]} xLabel="Month" yLabel="Value" />
          </div>
        </section>
      </div >
    );
  }

  componentDidMount() {
    const goalService = new GoalsService();
    goalService
      .loadGoalOverviews()
      .then(goals => {
        this.setState({ goals });
      });

    goalService
      .loadHabitGoals()
      .then(habitGoals => {
        this.setState({ habitGoals });
      });
  }
}
