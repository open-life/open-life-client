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
          <div className="box goals-overview">
            <p>📚 1 book per month</p>
            <p>🏋️‍♂️ Run & climb twice a week minimum</p>
            <p>🧗‍♂️ Climb V8</p>
            <p>🏃‍♂️ Run a 10k</p>
            <p>💻 Create a profitable project</p>
            <p>✍️ Write at least once a month</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Profile;
