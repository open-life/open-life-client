import React from 'react';
import './Home.css';

interface Props { };
interface State { };

export default class Home extends React.Component<Props, State> {
    render() {
        return (
            <div className="section">
                <div className="container has-text-centered">
                    <span className="icon is-large log-button">
                        <i className="fas fa-3x fa-plus-circle"></i>
                    </span>
                    <h1 className="title is-4">Log a goal</h1>
                </div>
            </div>
        );
    }
}