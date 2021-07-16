import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthResponse } from '../shared/models/authResponse.model';
import { environment as env } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  loggedIn = new BehaviorSubject<boolean>(false);
  private error = new BehaviorSubject<string>("");

  constructor(private httpClient: HttpClient, private router: Router) {
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getError$(): Observable<string> {
    return this.error.asObservable();
  }

  isLoggedIn(): boolean {
    const valid = this.checkValidToken();
    this.loggedIn.next(valid);
    if (!valid) {
      this.logout();
    }

    return valid;
  }

  isAuthenticated$(): Observable<boolean> {
    const valid = this.checkValidToken();
    this.loggedIn.next(valid);
    if (!valid) {
      this.logout();
    }

    return this.loggedIn.asObservable();
  }

  login$(user: { email: string; password: string; }): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(env.api + 'login', {
      email: user.email,
      password: user.password
    }).pipe(
      tap((result) => this.saveToken(result)),
    );
  }

  register$(user: { email: string; password: string; firstName: string; lastName: string; }): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(env.api + 'register', {
      email: user.email,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
    }).pipe(
      tap((result) => this.saveToken(result)),
    );
  }

  logout() {
    this.loggedIn.next(false);
    localStorage.clear();
    // window.location.reload();
    this.router.navigate(['/']);
  }

  private checkValidToken() {
    const token = this.getToken();
    const helper = new JwtHelperService();

    if (token === null || helper.isTokenExpired(token)) {
      return false;
    }

    return true
  }

  private saveToken(data: AuthResponse) {
    if (data.accessToken) {
      localStorage.setItem('token', data.accessToken);
      this.loggedIn.next(true);
      return;
    }
  }
}