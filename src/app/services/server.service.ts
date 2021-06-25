import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import jwtDecode from 'jwt-decode';
import { User } from '../shared/models/user.model';
import { Observable } from 'rxjs';
import { Token } from '../shared/models/token.model';

const baseUrl = 'http://localhost:4000';

@Injectable({
    providedIn: 'root'
})
export class ServerService {
    private loggedIn = false;
    token?: string | null;
    
    constructor(private http: HttpClient) { }
    
    tokenData(): Token | null {
        try {
            this.token = localStorage.getItem('token');
            return jwtDecode(this.token!);
        }
        catch (err) {
            console.error(err);
            return null;
        }
    }

    setLoggedIn(loggedIn: boolean, token?: string) {
        this.loggedIn = loggedIn;
        this.token = token;
    }

    request<T = any>(method: string, route: string, data?: any): Observable<T> {
        if (method === 'GET') {
            return this.get<T>(route, data);
        }

        const header = (this.loggedIn) ? { Authorization: `Bearer ${this.token}` } : undefined;

        return this.http.request<T>(method, baseUrl + route, {
            body: data,
            responseType: 'json',
            observe: 'body',
            headers: header
        });
    }

    get<T = any>(route: string, data?: any): Observable<T> {
        const header = (this.loggedIn) ? { Authorization: `Bearer ${this.token}` } : undefined;

        let params = new HttpParams();
        if (data !== undefined) {
            Object.getOwnPropertyNames(data).forEach(key => {
                params = params.set(key, data[key]);
            });
        }

        return this.http.get<T>(baseUrl + route, {
            responseType: 'json',
            headers: header,
            params
        });
    }
}