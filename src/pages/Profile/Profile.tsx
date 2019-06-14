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
              <h2 className="is-size-2 has-text-white goals">8 goals</h2>
            </div>
          </div>
        </section>
      </header>

      <section className="section">
        <div className="container has-text-centered">
          <h2 className="title is-2">2019 Goals</h2>
        </div>
      </section>
    </div>
  );
}

export default Profile;
