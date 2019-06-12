import React from 'react';
import './App.css';
import Profile from './pages/Profile/Profile';
import Header from './components/Header/Header';

const App: React.FC = () => {
  return (
    <div>
      <Header />
      <Profile />
    </div>
  );
}

export default App;
