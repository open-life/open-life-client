import HttpClient from "./HttpClient";

export default class UserService {
    private _httpClient: HttpClient;

    constructor() {
        this._httpClient = new HttpClient();
    }
}