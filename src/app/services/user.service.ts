import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { map } from 'rxjs/operators';
import { User } from "../shared/models/user.model";
import { Router } from "@angular/router";
import { NullTemplateVisitor, ThisReceiver } from "@angular/compiler";
import { Observable } from "rxjs";
import { Token } from "../shared/models/token.model";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  tokenData: Token | null;

  constructor(private httpClient: HttpClient) {
    this.tokenData = this.getTokenData();
  }


  getProfile$(): Observable<User> {
    if(!this.tokenData) {
      this.tokenData = this.getTokenData();
    }

    return this.httpClient.get<User>('http://localhost:4000/600/users/' + this.tokenData?.sub)
    // return this.server.request<User>('GET', '/600/users/' + this.tokenData?.sub);
  }

  private getTokenData(): Token | null {
    try {
      const token = localStorage.getItem('token');

      if(!token){
        console.log('Token missin\'')
      }

      const helper = new JwtHelperService();
      return helper.decodeToken(token!);
    }
    catch (err) {
      console.error(err);
      return null;
    }
  }
}