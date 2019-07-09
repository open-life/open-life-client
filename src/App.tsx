import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Profile from './pages/Profile/Profile';
import Home from './pages/Home/Home';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Header />
        <Route path='/' exact component={Home} />
        <Route path='/:username' component={Profile} />
      </div>
    </Router>
  );
}

export default App;
