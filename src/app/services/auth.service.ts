import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from '../shared/models/user.model';
import { ServerService } from './server.service';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(false);
  private token?: string;

  private subscribeResponse = (response: any) => {
    if (response.accessToken !== undefined) {
      this.token = response.accessToken;
      this.server.setLoggedIn(true, this.token);
      this.loggedIn.next(true);
      const userData = {
        token: this.token,
      };
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('data', JSON.stringify(jwtDecode(this.token!)));
      this.router.navigateByUrl('/');
    }
  }

  get isLoggedIn() {
    try {
      const decoded: any = jwtDecode(this.token!);
      if (decoded.exp < (new Date().getTime() + 1) / 1000) {
        return false;
      }
    } catch (err) {
      return false;
    }
    return true;
  }

  constructor(private router: Router, private server: ServerService) {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      this.token = user.token;
      this.server.setLoggedIn(true, this.token);
      this.loggedIn.next(true);
    }
  }

  login(user: { email: string; password: string; }) {
    if (user.email !== '' && user.password !== '') {
      return this.server.request('POST', '/login', {
        email: user.email,
        password: user.password
      }).subscribe(this.subscribeResponse);
    }
  }

  register(user: { email: string; password: string; }) {
    if (user.email !== '' && user.password !== '') {
      return this.server.request('POST', '/register', {
        email: user.email,
        password: user.password
      }).subscribe(this.subscribeResponse);
    }
  }

  logout() {
    this.server.setLoggedIn(false);
    delete this.token;

    this.loggedIn.next(false);
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
