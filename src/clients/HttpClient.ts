import config from '../app_config.json';

export default class HttpClient {
    private readonly _token: string;

    constructor(token: string = '') {
        this._token = token;
    }

    get<T>(url: string): Promise<T> {
        return fetch(config.api_url + url, {
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            }
        })
            .then(function (response) {
                if (response.status !== 200) {
                    return null as unknown as T;
                }
                return response.json() as Promise<T>;
            });
    }

    post<T>(url: string, body: T): Promise<T> {
        return fetch(config.api_url + url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${this._token}`
            },
            redirect: 'follow',
            referrer: 'no-referrer',
            body: JSON.stringify(body),
        })
            .then(response => {
                return response.json() as Promise<T>;
            });
    }

    put<T>(url: string, body: T): Promise<T> {
        return fetch(config.api_url + url, {
            method: 'PUT',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${this._token}`
            },
            redirect: 'follow',
            referrer: 'no-referrer',
            body: JSON.stringify(body),
        })
            .then(response => {
                return response.json() as Promise<T>;
            });
    }

    patch<T>(url: string, body: T): Promise<T> {
        return fetch(config.api_url + url, {
            method: 'PATCH',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${this._token}`
            },
            redirect: 'follow',
            referrer: 'no-referrer',
            body: JSON.stringify(body)
        })
            .then(response => {
                return response.json() as Promise<T>;
            });
    }

    delete(url: string): void {
        fetch(config.api_url + url, {
            method: 'DELETE',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${this._token}`
            },
            referrer: 'no-referrer'
        })
    }
}