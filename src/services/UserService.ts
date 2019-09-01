import HttpClient from "./HttpClient";
import config from "../auth_config.json";

export default class UserService {
    private _httpClient: HttpClient;

    constructor(token: string) {
        this._httpClient = new HttpClient(token);
    }

    postProfilePicture(picUrl: string) {
        //Fix this
        this._httpClient.patch(`https://${config.domain}.auth0.com/api/v2/users`, { picture: picUrl });
    }
}