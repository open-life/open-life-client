import React from "react";
import createAuth0Client from "@auth0/auth0-spa-js";
import IAuth0Context from "./IAuth0Context";
import Auth0Client from "@auth0/auth0-spa-js/dist/typings/Auth0Client";
import { getIdTokenClaimsOptions, Auth0ClientOptions, RedirectLoginOptions, GetTokenSilentlyOptions, GetTokenWithPopupOptions, LogoutOptions, AuthUser } from "./Auth0Interfaces";
import UserService from "../../services/UserService";
import User from "../../models/User";
import GoalService from "../../services/GoalService";

export const Auth0Context = React.createContext<IAuth0Context>({} as IAuth0Context);
export const Auth0Provider = Auth0Context.Provider;
export const Auth0Consumer = Auth0Context.Consumer;

interface Auth0Props {
    onRedirectCallback: (state: any) => void;
    initOptions: Auth0ClientOptions;
}

interface Auth0State {
    userGoals: GoalService;
    isAuthenticated: boolean;
    user: User;
    auth0Client: Auth0Client;
    loading: boolean;
    popupOpen: boolean;
}

export default class Auth0 extends React.Component<Auth0Props, Auth0State> {
    private readonly _userService: UserService;

    constructor(props: Auth0Props) {
        super(props);

        this._userService = new UserService();

        this.state = { userGoals: new GoalService(), isAuthenticated: false, user: {} as User, auth0Client: {} as Auth0Client, loading: true, popupOpen: false };

        this.getContext = this.getContext.bind(this);
        this.initAuth0 = this.initAuth0.bind(this);
        this.loginWithPopup = this.loginWithPopup.bind(this);
        this.handleRedirectCallback = this.handleRedirectCallback.bind(this);
        this.setUser = this.setUser.bind(this);
    }

    render() {
        return (
            <Auth0Provider value={this.getContext()}>
                {this.props.children}
            </Auth0Provider>
        );
    }

    getContext(): IAuth0Context {
        let isAuthenticated = this.state.isAuthenticated;
        let user = this.state.user;
        let userGoals = this.state.userGoals;
        let loading = this.state.loading;
        let popupOpen = this.state.popupOpen;
        let loginWithPopup = this.loginWithPopup;
        let handleRedirectCallback = this.handleRedirectCallback;
        let auth0Client = this.state.auth0Client;

        return {
            isAuthenticated,
            user,
            userGoals,
            loading,
            popupOpen,
            loginWithPopup,
            handleRedirectCallback,
            getIdTokenClaims: (options: getIdTokenClaimsOptions) => auth0Client.getIdTokenClaims(options),
            loginWithRedirect: (options: RedirectLoginOptions) => auth0Client.loginWithRedirect(options),
            getTokenSilently: (options: GetTokenSilentlyOptions) => auth0Client.getTokenSilently(options),
            getTokenWithPopup: (options: GetTokenWithPopupOptions) => auth0Client.getTokenWithPopup(options),
            logout: (options: LogoutOptions) => auth0Client.logout(options)
        }
    }

    componentDidMount() {
        this.initAuth0();
    }

    componentWillUnmount() {
        this.initAuth0();
    }

    async initAuth0() {
        const auth0FromHook = await createAuth0Client(this.props.initOptions);

        if (window.location.search.includes("code=")) {
            const { appState } = await auth0FromHook.handleRedirectCallback();
            this.props.onRedirectCallback(appState);
        }

        const isAuthenticated = await auth0FromHook.isAuthenticated();

        if (isAuthenticated) {
            this.setUser(await auth0FromHook.getUser());
        }

        this.setState({ auth0Client: auth0FromHook, isAuthenticated: isAuthenticated, loading: false });
    };

    async loginWithPopup(params = {}): Promise<void> {
        this.setState({ popupOpen: true });
        try {
            await this.state.auth0Client.loginWithPopup(params);
        } catch (error) {
            console.error(error);
        } finally {
            this.setState({ popupOpen: false });
        }
        this.setUser(await this.state.auth0Client.getUser());
        this.setState({ isAuthenticated: true });
    };

    async handleRedirectCallback() {
        this.setState({ loading: true });
        await this.state.auth0Client.handleRedirectCallback();
        this.setUser(await this.state.auth0Client.getUser());
        this.setState({ loading: false, isAuthenticated: true });
    };

    private setUser(authUser: AuthUser): void {
        const user = this.map(authUser);
        this._userService.getUserWithEmail(user.Email)
            .subscribe(savedUser => {
                if (!savedUser) {
                    this._userService.saveUser(user)
                        .subscribe(newUser => {
                            user.UserId = newUser.UserId;
                            this.setState({ user: user });
                        });
                } else {
                    user.UserId = savedUser.UserId;
                    this.setState({ user: user });
                }
            });
    }

    private map(authUser: AuthUser): User {
        return new User(
            authUser.name,
            authUser.family_name,
            authUser.given_name,
            authUser.nickname,
            authUser.email,
            authUser.email_verified,
            authUser.picture,
            authUser.locale,
            authUser.nickname,
            authUser.sub,
            authUser.updated_at
        );
    }
}