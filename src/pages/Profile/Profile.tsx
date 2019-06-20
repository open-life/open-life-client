import React from 'react';
import './Profile.css';

const Profile: React.FC = () => {
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
                <td className="has-text-centered">0/6</td>
                <td className="has-text-centered">44%</td>
                <td className="has-text-centered">❌</td>
                <td className="has-text-centered">❌</td>
                <td className="has-text-centered">❌</td>
                <td className="has-text-centered">1/6</td>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Profile;
