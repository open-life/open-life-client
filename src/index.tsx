import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import config from "./auth_config.json";
import Auth0 from './components/Authentication/Auth0';

const onRedirectCallback = (appState: { targetUrl: string | null | undefined; }) => {
    window.history.replaceState(
        {},
        document.title,
        appState && appState.targetUrl
            ? appState.targetUrl
            : window.location.pathname
    );
};

ReactDOM.render(<Auth0
    initOptions={{ domain: config.domain, client_id: config.clientId, redirect_uri: window.location.origin }}
    onRedirectCallback={onRedirectCallback}>
    <App />
</Auth0>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
