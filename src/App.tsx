import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Profile from './pages/Profile/Profile';
import Home from './pages/Home/Home';
import Settings from './pages/Settings/Settings';
import Modal from './components/Modal/Modal';
import CreateGoal from './modals/CreateGoal';
import LogGoal from './modals/LogGoal';

interface AppProps { };
interface AppState {
  modal: JSX.Element;
  modalActive: boolean;
};

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = { modal: <div></div>, modalActive: false };

    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  render() {
    return (
      <Router>
        <Header />
        <Route path='/' exact render={(props) => <Home {...props} showModal={this.showModal} />} />
        <Route path='/:username' exact component={Profile} />
        <Route path='/i/settings' exact component={Settings} />
        <Modal Active={this.state.modalActive} closeModal={this.closeModal}>
          {this.state.modal}
        </Modal>
      </Router>
    );
  }

  showModal(modalName: string): void {
    let modal = <div></div>;

    if (modalName === "create") {
      modal = <CreateGoal />
    } else if (modalName === "log") {
      modal = <LogGoal />
    }

    this.setState({ modalActive: true, modal: modal });
  }

  closeModal(): void {
    this.setState({ modalActive: false });
  }
}

export default App;
