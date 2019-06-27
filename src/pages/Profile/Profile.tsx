import React from 'react';
import SVG from 'svg.js';
import './Profile.css';

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

      var rect = draw.rect(21, 21).attr({ x: x, y: y });
      x = x + 23;
    }

    draw.height(y + 23);
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
            <div className="box">
              <table className="table is-fullwidth">
                <thead>
                  <tr>
                    <th>📚 1 book per month</th>
                    <th>🏋️‍♂️ Run & climb twice a week minimum</th>
                    <th>🧗‍♂️ Climb V8</th>
                    <th>🏃‍♂️ Run a 10k</th>
                    <th>💻 Create a profitable project</th>
                    <th>✍️ Write at least once a month</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="has-text-centered">0/6</td>
                    <td className="has-text-centered">44%</td>
                    <td className="has-text-centered">❌</td>
                    <td className="has-text-centered">❌</td>
                    <td className="has-text-centered">❌</td>
                    <td className="has-text-centered">1/6</td>
                  </tr>
                </tbody>
              </table>
            </div>
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
            </div>
          </div>
        </section>
      </div>
    );
  }
}
