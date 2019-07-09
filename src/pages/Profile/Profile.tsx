import React from 'react';
import SVG from 'svg.js';
import './Profile.css';
import Overview from '../../components/Goals/Overview/Overview';

interface Props { };
interface State { };

export default class Profile extends React.Component<Props, State> {

  dailyTracker() {
    var draw = SVG('daily-tracker').size('100%', '100%');
    let width = draw.parent().offsetWidth;

    let x = 0;
    let y = 0;
    for (var i = 0; i < 365; i++) {
      if (x + 21 > width) {
        x = 0;
        y += 23;
      }

      draw.rect(21, 21).attr({ x: x, y: y });
      x = x + 23;
    }

    draw.height(y + 23);
  }

  rand(min: number, max: number) {
    var seed = 7;
    min = min === undefined ? 0 : min;
    max = max === undefined ? 1 : max;
    seed = (seed * 9301 + 49297) % 233280;
    return min + (seed / 233280) * (max - min);
  }

  componentDidMount() {
    this.dailyTracker();
  }

  render() {
    var LineChart = require("react-chartjs").Line;
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
            <div className="box">
              <h5 className="title is-5">Run & climb twice a week minimum</h5>
              <div id="daily-tracker"></div>
            </div>
            <div className="columns">
              <div className="column is-half">
                <div className="box">
                  <h5 className="title is-5">Projects</h5>
                  <table className="table is-fullwidth">
                    <thead>
                      <tr>
                        <th>Project</th>
                        <th>Progress</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Go Climb To</td>
                        <td>✔️</td>
                      </tr>
                      <tr>
                        <td>Routine</td>
                        <td>✔️</td>
                      </tr>
                      <tr>
                        <td>Open Life</td>
                        <td>🚧</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="column is-half">
                <div className="box">
                  <h5 className="title is-5">📚 Books</h5>
                  <table className="table is-fullwidth">
                    <thead>
                      <tr>
                        <th>Book</th>
                        <th>Rating</th>
                        <th>Progress</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>12 Rules for Life - Jordan Peterson</td>
                        <td>⭐⭐⭐⭐⭐</td>
                        <td>📖</td>
                      </tr>
                      <tr>
                        <td>Beyond Good And Evil – Friedrich Nietzsche</td>
                        <td></td>
                        <td>⏭️</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="box">
              <h5 className="title is-5">Monthly Recurring Revenue</h5>
              <LineChart data={{
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                datasets: [{
                  label: 'Filled',
                  backgroundColor: '#FFFFFF',
                  borderColor: '#FFFFFF',
                  data: [0, 100, 250, 0, 425, 310, 200],
                  fill: true
                }]
              }} options={{
                responsive: true,
                title: {
                  display: true,
                  text: 'Chart.js Line Chart'
                },
                tooltips: {
                  mode: 'index',
                  intersect: false,
                },
                hover: {
                  mode: 'nearest',
                  intersect: true
                },
                scales: {
                  xAxes: [{
                    display: true,
                    scaleLabel: {
                      display: true,
                      labelString: 'Month'
                    }
                  }],
                  yAxes: [{
                    display: true,
                    scaleLabel: {
                      display: true,
                      labelString: 'Value'
                    }
                  }]
                }
              }} width="600" height="250" />
            </div>
          </div>
        </section>
      </div>
    );
  }
}
