import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import config from "./auth_config.json";
import {Auth0Provider} from "@auth0/auth0-react";
import GoalService from "./services/GoalService";
import UserService from "./services/UserService";

interface ServiceContext {
    goalService: GoalService;
    userService: UserService;
}

export const ServiceContext = React.createContext({
    goalService: new GoalService(),
    userService: new UserService()
} as ServiceContext);

ReactDOM.render(
    <Auth0Provider
        clientId={config.clientId}
        domain={config.domain}
        redirectUri={window.location.origin}
    >
        <ServiceContext.Provider value={{goalService: new GoalService(), userService: new UserService()}}>
            <App/>
        </ServiceContext.Provider>
    </Auth0Provider>,
    document.getElementById('root')
);
