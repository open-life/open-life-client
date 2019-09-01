import React from 'react';
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

interface Props {
  goals: GoalOverview[];
  habitGoals: HabitGoal[];
  listGoals: ListGoal[];
  numberGoals: NumberGoal[];
};
interface State { };

export default class Profile extends React.Component<Props, State> {
  render() {
    let profilePic: JSX.Element;
    if (this.context.user && (this.context.user.picture === '' || !this.context.user.picture)) {
      profilePic =
        <div className="add-avatar-image">
          <span className="icon is-large">
            <i className="fas fa-3x fa-plus-circle" onClick={() => console.log("Pic clicked.")}></i>
          </span>
        </div>;
    } else {
      profilePic = <img alt="Profile Pic" className="is-rounded avatar-image" src={this.context.user.picture} />;
    }

    if (this.props.goals.length === 0) {
      return (
        <header>
          <section className="info-strip">
            <figure className="image avatar">
              {profilePic}
            </figure>
            <div className="name-stats">
              <h2 className="is-size-2 has-text-white name">{this.context.user.name}</h2>
            </div>
          </section>
        </header>
      );
    }

    let habitGoals: JSX.Element[] = [];
    this.props.habitGoals.forEach(g => {
      habitGoals.push(<DailyTracker key={g.HabitGoalId} goal={g} />);
    });

    let listGoals: JSX.Element[] = [];
    this.props.listGoals.forEach(g => {
      listGoals.push(<div key={g.ListGoalId} className="column is-half"><List goal={g} /></div>);
    });

    let numberGoals: JSX.Element[] = [];
    this.props.numberGoals.forEach(g => {
      numberGoals.push(<Chart key={g.NumberGoalId} goal={g} />);
    });

    return (
      <div>
        <header>
          <section className="info-strip">
            <figure className="image avatar">
              {profilePic}
            </figure>
            <div className="name-stats">
              <h2 className="is-size-2 has-text-white name">{this.context.user.name}</h2>
              <div className="stats">
                <h2 className="is-size-2 has-text-white goals">{this.props.goals.length} goals</h2>
              </div>
            </div>
          </section>
        </header>

        <section className="section">
          <div className="container has-text-centered">

            <h2 className="title is-2">Goals</h2>
            <Overview goals={this.props.goals.map(g => g.Name)}
              status={this.props.goals.map(g => g.Progress)} />

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
}

Profile.contextType = Auth0Context;