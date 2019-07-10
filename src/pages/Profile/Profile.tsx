import React from 'react';
import './Profile.css';
import Overview from '../../components/Goals/Overview/Overview';
import DailyTracker from '../../components/Goals/DailyTracker/DailyTracker';
import List from '../../components/Goals/List/List';
import Chart from '../../components/Goals/Chart/Chart';

interface Props { };
interface State { };

export default class Profile extends React.Component<Props, State> {
  render() {
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
            <Overview goals={["📚 1 book per month", "🏋️‍♂️ Run & climb twice a week minimum", "🧗‍♂️ Climb V8", "🏃‍♂️ Run a 10k", "💻 Create a profitable project", "✍️ Write at least once a month"]}
              status={["0/6", "44%", "❌", "❌", "❌", "1/6"]} />

            <DailyTracker />

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
}
