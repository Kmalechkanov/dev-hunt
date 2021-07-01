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

  getProfile$(id?: number): Observable<User> {
    if (!this.tokenData) {
      this.tokenData = this.getTokenData();
    }
    const profileId = id ? id : this.tokenData?.sub;
    return this.httpClient.get<User>(env.api + '440/users/' + profileId);
  }

  getCompletedProfile$(id?: number): Observable<User> {
    if (!this.tokenData) {
      this.tokenData = this.getTokenData();
    }

    const profileId = id ? id : this.tokenData?.sub;
    const query = '?_expand=technology&_expand=location&_expand=nativeLanguage';
    return this.httpClient.get<User>(env.api + '440/users/' + profileId + query);
  }

  getCompletedWithoutMe$(): Observable<User[]> {
    const query = '?locationId_ne&technologyId_ne&nativeLanguageId_ne&yearsOfExperience_ne&phoneNumber_ne&_expand=technology&_expand=location&_expand=nativeLanguage&id_ne=' + this.tokenData?.sub;
    return this.httpClient.get<User[]>(env.api + '440/users' + query);
  }

  getCompleted$(): Observable<User[]> {
    const query = '?locationId_ne&technologyId_ne&nativeLanguageId_ne&yearsOfExperience_ne&phoneNumber_ne&_expand=technology&_expand=location&_expand=nativeLanguage';
    return this.httpClient.get<User[]>(env.api + '440/users' + query);
  }

  getHires$(): Observable<Hire[]> {
    if (!this.tokenData) {
      this.tokenData = this.getTokenData();
    }

    return this.httpClient.get<Hire[]>(env.api + '440/user/' + this.tokenData?.sub + "/hires");
  }

  updateLocation$(value: number): Observable<User> {
    return this.patch("locationId", value);
  }

  updateTechnology$(value: number): Observable<User> {
    return this.patch("technologyId", value);
  }

  updatePhoneNumber$(value: number): Observable<User> {
    return this.patch("phoneNumber", value);
  }

  updatePrice$(value: number): Observable<User> {
    return this.patch("pricePerHour", value);
  }

  updateExperience$(value: number): Observable<User> {
    return this.patch("yearsOfExperience", value);
  }

  updateNativeLanguage$(value: number): Observable<User> {
    return this.patch("nativeLanguageId", value);
  }

  isCompleted(user: User): boolean {
    if (!user.phoneNumber ||
      !user.locationId ||
      !user.technologyId ||
      !user.pricePerHour ||
      !user.yearsOfExperience ||
      !user.nativeLanguageId)
      return false;
    return true;
  }

  private patch(key: string, value: any): Observable<User> {
    if (!this.tokenData) {
      this.tokenData = this.getTokenData();
    }

    const data = {
      [key.toString()]: value,
    }
    return this.httpClient.patch<User>(env.api + '600/users/' + this.tokenData?.sub, data)
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