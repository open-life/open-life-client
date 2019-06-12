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
          <h2 className="title is-2 has-text-white">Phillip Chaffee</h2>
        </section>
      </header>
    </div>
  );
}

export default Profile;
