import React from 'react';
import './Settings.css';

interface SettingsProps { };
interface SettingsState { };

export default class Settings extends React.Component<SettingsProps, SettingsState> {
    render() {
        return (
            <div className="section">
                <div className="container has-text-centered">
                    <h2 className="title is-2">Settings</h2>
                    <div className="box">
                        <div className="container">
                            <table className="table is-bordered is-fullwidth has-text-centered">
                                <thead>
                                    <tr>
                                        <th className="has-text-centered">Habit Tracking</th>
                                        <th className="has-text-centered" rowSpan={2}>⏱️</th>
                                        <th className="has-text-centered" colSpan={7}>Week 1</th>
                                        <th className="has-text-centered" colSpan={7}>Week 2</th>
                                        <th className="has-text-centered" colSpan={7}>Week 3</th>
                                    </tr>
                                    <tr>
                                        <th>Habits:</th>
                                        <th className="has-text-centered">1</th>
                                        <th className="has-text-centered">2</th>
                                        <th className="has-text-centered">3</th>
                                        <th className="has-text-centered">4</th>
                                        <th className="has-text-centered">5</th>
                                        <th className="has-text-centered">6</th>
                                        <th className="has-text-centered">7</th>
                                        <th className="has-text-centered">1</th>
                                        <th className="has-text-centered">2</th>
                                        <th className="has-text-centered">3</th>
                                        <th className="has-text-centered">4</th>
                                        <th className="has-text-centered">5</th>
                                        <th className="has-text-centered">6</th>
                                        <th className="has-text-centered">7</th>
                                        <th className="has-text-centered">1</th>
                                        <th className="has-text-centered">2</th>
                                        <th className="has-text-centered">3</th>
                                        <th className="has-text-centered">4</th>
                                        <th className="has-text-centered">5</th>
                                        <th className="has-text-centered">6</th>
                                        <th className="has-text-centered">7</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th>Run</th>
                                        <td className="has-text-centered">2</td>
                                        <td className="has-text-centered">✔️</td>
                                        <td className="has-text-centered">✔️</td>
                                        <td className="has-text-centered">✔️</td>
                                        <td className="has-text-centered">✔️</td>
                                        <td className="has-text-centered">❌</td>
                                        <td className="has-text-centered">✔️</td>
                                        <td className="has-text-centered">✔️</td>
                                        <td className="has-text-centered">✔️</td>
                                        <td className="has-text-centered">✔️</td>
                                        <td className="has-text-centered">✔️</td>
                                        <td className="has-text-centered">✔️</td>
                                        <td className="has-text-centered">✔️</td>
                                        <td className="has-text-centered">✔️</td>
                                        <td className="has-text-centered">✔️</td>
                                        <td className="has-text-centered">❌</td>
                                        <td className="has-text-centered">✔️</td>
                                        <td className="has-text-centered">✔️</td>
                                        <td className="has-text-centered">✔️</td>
                                        <td className="has-text-centered">✔️</td>
                                        <td className="has-text-centered">✔️</td>
                                        <td className="has-text-centered">✔️</td>
                                    </tr>
                                    <tr>
                                        <th>Climb</th>
                                        <td className="has-text-centered">2</td>
                                        <td className="has-text-centered">✔️</td>
                                        <td className="has-text-centered">❌</td>
                                        <td className="has-text-centered">✔️</td>
                                        <td className="has-text-centered">✔️</td>
                                        <td className="has-text-centered">✔️</td>
                                        <td className="has-text-centered">❌</td>
                                        <td className="has-text-centered">✔️</td>
                                        <td className="has-text-centered">✔️</td>
                                        <td className="has-text-centered">✔️</td>
                                        <td className="has-text-centered">✔️</td>
                                        <td className="has-text-centered">✔️</td>
                                        <td className="has-text-centered">✔️</td>
                                        <td className="has-text-centered">❌</td>
                                        <td className="has-text-centered">✔️</td>
                                        <td className="has-text-centered">✔️</td>
                                        <td className="has-text-centered">✔️</td>
                                        <td className="has-text-centered">✔️</td>
                                        <td className="has-text-centered">✔️</td>
                                        <td className="has-text-centered">✔️</td>
                                        <td className="has-text-centered">✔️</td>
                                        <td className="has-text-centered">✔️</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
