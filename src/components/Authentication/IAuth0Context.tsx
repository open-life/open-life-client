import User from "../../models/User";

export default interface IAuth0Context {
    isAuthenticated: boolean;
    user: User;
    loading: boolean;
    popupOpen: boolean;
    loginWithPopup: ({ }) => Promise<void>;
    handleRedirectCallback: () => Promise<void>;
    getIdTokenClaims: (options: getIdTokenClaimsOptions) => Promise<IdToken>;
    loginWithRedirect: (options: RedirectLoginOptions) => Promise<void>;
    getTokenSilently: (options: GetTokenSilentlyOptions) => Promise<any>;
    getTokenWithPopup: (options: GetTokenWithPopupOptions) => Promise<string>;
    logout: (options: LogoutOptions) => void;
}