import { Observable, from } from "rxjs";

export default class HttpClient {
    get<T>(url: string): Observable<T> {
        return from(fetch(url, { mode: 'cors', headers: { 'Access-Control-Allow-Origin': '*' } })
            .then(function (response) {
                return response.json();
            }));
    }

    post<T>(url: string, body: T): Observable<T> {
        return from(fetch(url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            redirect: 'follow',
            referrer: 'no-referrer',
            body: JSON.stringify(body),
        })
            .then(response => {
                return response.json() as Promise<T>;
            }));
    }
}