import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { map } from 'rxjs/operators';
import { User } from "../shared/models/user.model";
import { Router } from "@angular/router";
import { NullTemplateVisitor, ThisReceiver } from "@angular/compiler";
import { Observable } from "rxjs";
import { Token } from "../shared/models/token.model";
import { JwtHelperService } from "@auth0/angular-jwt";
import { environment as env } from "../../environments/environment";
import { Hire } from "../shared/models/hire.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  tokenData: Token | null;

  constructor(private httpClient: HttpClient) {
    this.tokenData = this.getTokenData();
  }

  getId(): number {
    return +this.tokenData?.sub!;
  }

  getProfile$(id?: number): Observable<User> {
    if (!this.tokenData) {
      this.tokenData = this.getTokenData();
    }
    const profileId = id ? id : this.tokenData?.sub;
    return this.httpClient.get<User>(env.api + '440/users/' + profileId);
  }

  getHires$(): Observable<Hire[]> {
    if (!this.tokenData) {
      this.tokenData = this.getTokenData();
    }

    return this.httpClient.get<Hire[]>(env.api + '440/user/' + this.tokenData?.sub + "/hires");
  }

  private getTokenData(): Token | null {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
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