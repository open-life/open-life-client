import User from "../models/User";
import React from "react";

interface AuthenticationContext {
    currentUser: User;
    isAuthenticated: boolean;
}

export const AuthenticationContext = React.createContext({
    currentUser: {},
    isAuthenticated: false
} as AuthenticationContext);

