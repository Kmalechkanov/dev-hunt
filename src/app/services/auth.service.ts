import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
import { BehaviorSubject, Observable, VirtualTimeScheduler } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthResponse } from '../shared/models/authResponse.model';
import { Token } from '../shared/models/token.model';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  loggedIn = new BehaviorSubject<boolean>(false);
  error = new BehaviorSubject<string>("");

  constructor(private httpClient: HttpClient) {
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getError$(): Observable<string> {
    return this.error;
  }

  isAuthenticated$(): Observable<boolean> {
    const token = this.getToken();
    const helper = new JwtHelperService();
    if (token === null) {
      this.logout();
    }
    else if (helper.isTokenExpired(token!)) {
      this.logout();
    }
    else {
      this.loggedIn.next(true);
    }

    return this.loggedIn;
  }

  login$(user: { email: string; password: string; }): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>('http://localhost:4000/login', {
      email: user.email,
      password: user.password
    }).pipe(
      tap((result) => this.saveToken(result)),
    );
  }

  register$(user: { email: string; password: string; firstName: string; lastName: string; }): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>('http://localhost:4000/register', {
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
    // this.router.navigate(['/']);
  }

  private saveToken(data: AuthResponse) {
    if (data.accessToken) {
      localStorage.setItem('token', data.accessToken);
      this.loggedIn.next(true);
      return;
    }
  }
}


// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
// import { BehaviorSubject } from 'rxjs';
// import { User } from '../shared/models/user.model';
// import { ServerService } from './server.service';
// import jwtDecode from 'jwt-decode';
// import { AuthResponse } from '../shared/models/authResponse.model';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private loggedIn = new BehaviorSubject<boolean>(false);
//   private errorMessage = new BehaviorSubject<string>("");

//   // Todo remove subscribe from service
//   private subscribeResponse = (response: AuthResponse) => {
//     if (response.accessToken !== undefined) {
//       this.server.token = response.accessToken;
//       this.server.setLoggedIn(true, this.server.token);
//       this.loggedIn.next(true);
//       localStorage.setItem('token', JSON.stringify(this.server.token));
//       this.router.navigateByUrl('/');
//     }
//   }

//   private subscribeError = (error: any) => {
//     this.errorMessage.next(error.error);
//   }

//   get error() {
//     return this.errorMessage;
//   }

//   get isLoggedIn() {
//     try {
//       if(this.server.token === undefined && localStorage.getItem('token') != null) {
//         this.server.token = localStorage.getItem('token')!;
//       }

//       const decoded: any = jwtDecode(this.server.token!);
//       if (decoded.exp < (new Date().getTime() + 1) / 1000) {
//         return false;
//       }
//     } catch (err) {
//       return false;
//     }
//     return true;
//   }

//   constructor(private router: Router, private server: ServerService) {
//     const token = localStorage.getItem('token');
//     if (token) {
//       this.server.setLoggedIn(true, token);
//       this.loggedIn.next(true);
//     }
//   }

//   login(user: { email: string; password: string; }) {
//     if (user.email !== '' && user.password !== '') {
//       return this.server.request('POST', '/login', {
//         email: user.email,
//         password: user.password
//       }).subscribe(this.subscribeResponse, this.subscribeError);
//     }
//   }

//   register(user: { email: string; password: string; firstName: string; lastName: string; }) {
//     if (user.email !== '' && user.password !== '') {
//       return this.server.request('POST', '/register', {
//         email: user.email,
//         password: user.password,
//         firstName: user.firstName,
//         lastName: user.lastName,
//       }).subscribe(this.subscribeResponse, this.subscribeError);
//     }
//   }

//   logout() {
//     this.server.setLoggedIn(false);
//     delete this.server.token;

//     this.loggedIn.next(false);
//     localStorage.clear();
//     this.router.navigate(['/']);
//   }
// }
