import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Profile from './pages/Profile/Profile';
import Home from './pages/Home/Home';
import Settings from './pages/Settings/Settings';

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Route path='/' exact component={Home} />
      <Route path='/:username' exact component={Profile} />
      <Route path='/i/settings' exact component={Settings} />
    </Router>
  );
}

export default App;
