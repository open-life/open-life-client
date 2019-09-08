import HttpClient from "./HttpClient";
import config from "../app_config.json";
import User from "../models/User";
import { take } from "rxjs/operators";
import { Observable } from "rxjs";

export default class UserService {
    private _httpClient: HttpClient;

    constructor(token: string = '') {
        this._httpClient = new HttpClient(token);
    }

    getUsers(): Observable<User[]> {
        return this._httpClient.get<User[]>(config.api_url + '/api/User').pipe(take(1));
    }

    getUserWithEmail(email: string): Observable<User> {
        return this._httpClient.get<User>(config.api_url + `/api/User/email/${email}`)
            .pipe(take(1));
    }

    getUserWithUsername(username: string): Observable<User> {
        return this._httpClient.get<User>(config.api_url + `/api/User/username/${username}`)
            .pipe(take(1));
    }

    saveUser(user: User): Observable<User> {
        return this._httpClient.post<User>(config.api_url + '/api/User/', user)
            .pipe(take(1));
    }
}