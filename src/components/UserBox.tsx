import React from "react";

interface UserBoxProps { };
interface UserBoxState { };

export default class UserBox extends React.Component<UserBoxProps, UserBoxState>{
    render() {
        return (
            <div className="box">
                <h1 className="title is-1">User Box Baby</h1>
            </div>
        );
    }
}