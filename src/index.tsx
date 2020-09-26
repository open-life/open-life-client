import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import config from "./auth_config.json";
import {Auth0Provider} from "@auth0/auth0-react";

ReactDOM.render(
    <Auth0Provider
        clientId={config.clientId}
        domain={config.domain}
        redirectUri={window.location.origin}
    >
            <App/>
    </Auth0Provider>,
    document.getElementById('root')
);
