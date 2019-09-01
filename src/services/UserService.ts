import HttpClient from "./HttpClient";
import config from "../auth_config.json";
import User from "../models/User";
import { take } from "rxjs/operators";
import { Observable } from "rxjs";

export default class UserService {
    private _httpClient: HttpClient;

    constructor(token: string = '') {
        this._httpClient = new HttpClient(token);
    }

    postProfilePicture(picUrl: string) {
        //Fix this
        this._httpClient.patch(`https://${config.domain}.auth0.com/api/v2/users`, { picture: picUrl });
    }

    getUserWithEmail(email: string): Observable<User> {
        return this._httpClient.get<User>(`https://localhost:44343/api/User/email/${email}`)
            .pipe(take(1));
    }

    getUserWithUsername(username: string): Observable<User> {
        console.log("this is happening");
        return this._httpClient.get<User>(`https://localhost:44343/api/User/username/${username}`)
            .pipe(take(1));
    }

    saveUser(user: User): Observable<User> {
        return this._httpClient.post<User>('https://localhost:44343/api/User/', user)
            .pipe(take(1));
    }
}