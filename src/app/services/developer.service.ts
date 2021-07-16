import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpResponse } from "@angular/common/http";
import { map, take } from 'rxjs/operators';
import { User } from "../shared/models/user.model";
import { Router } from "@angular/router";
import { identifierModuleUrl, NullTemplateVisitor, ThisReceiver } from "@angular/compiler";
import { BehaviorSubject, Observable } from "rxjs";
import { Token } from "../shared/models/token.model";
import { JwtHelperService } from "@auth0/angular-jwt";
import { environment as env } from "../../environments/environment";
import { Hire } from "../shared/models/hire.model";
import { Developer } from "../shared/models/developer.model";


@Injectable({
    providedIn: 'root'
})
export class DeveloperService {
    constructor(private httpClient: HttpClient) { }

    getRange$(page: number = 0, limit: number = 10): Observable<HttpResponse<Developer[]>> {
        let httpParams = new HttpParams();
        httpParams = httpParams.append('technologyId_ne', '');
        httpParams = httpParams.append('locationId_ne', '');
        httpParams = httpParams.append('nativeLanguageId_ne', '');
        httpParams = httpParams.append('_page', page);
        httpParams = httpParams.append('_limit', limit);


        return this.httpClient.get<Developer[]>(env.api + '440/developers', { params: httpParams, observe: "response" });
    }

    getRangeExpand$(page: number = 0, limit: number = 10): Observable<HttpResponse<Developer[]>> {
        let httpParams = new HttpParams();
        httpParams = httpParams.append('technologyId_ne', '');
        httpParams = httpParams.append('locationId_ne', '');
        httpParams = httpParams.append('nativeLanguageId_ne', '');
        httpParams = httpParams.append('_expand', 'technology');
        httpParams = httpParams.append('_expand', 'location');
        httpParams = httpParams.append('_expand', 'nativeLanguage');
        httpParams = httpParams.append('_page', page);
        httpParams = httpParams.append('_limit', limit);

        return this.httpClient.get<Developer[]>(env.api + '440/developers', { params: httpParams, observe: "response" });
    }

    get$(id: number): Observable<Developer> {
        let httpParams = new HttpParams();
        httpParams = httpParams.append('_expand', 'technology');
        httpParams = httpParams.append('_expand', 'location');
        httpParams = httpParams.append('_expand', 'nativeLanguage');

        return this.httpClient.get<Developer>(env.api + '440/developers/' + id, { params: httpParams });
    }

    getWithLocationFirst(locationId: number): Observable<Developer[]> {
        let httpParams = new HttpParams();
        httpParams = httpParams.append('locationId', locationId);
        httpParams = httpParams.append('_limit', 1);
        return this.httpClient.get<Developer[]>(env.api + '440/developers', { params: httpParams })
    }

    getWithTechnologiesFirst(technologyId: number): Observable<Developer[]> {
        let httpParams = new HttpParams();
        httpParams = httpParams.append('technologyId', technologyId);
        httpParams = httpParams.append('_limit', 1);
        return this.httpClient.get<Developer[]>(env.api + '440/developers', { params: httpParams })
    }

    create$(developer: Developer): Observable<Developer> {
        return this.httpClient.post<Developer>(env.api + '660/developers/', this.simplifyDev(developer));
    }

    update$(developer: Developer): Observable<Developer> {
        return this.httpClient.patch<Developer>(env.api + '660/developers/' + developer.id,  this.simplifyDev(developer));
    }

    updateLocation$(id: number, value: number): Observable<Developer> {
        return this.patch(id, "locationId", value);
    }

    updateTechnology$(id: number, value: number): Observable<Developer> {
        return this.patch(id, "technologyId", value);
    }

    updatePhoneNumber$(id: number, value: number): Observable<Developer> {
        return this.patch(id, "phoneNumber", value);
    }

    updatePrice$(id: number, value: number): Observable<Developer> {
        return this.patch(id, "pricePerHour", value);
    }

    updateExperience$(id: number, value: number): Observable<Developer> {
        return this.patch(id, "yearsOfExperience", value);
    }

    updateNativeLanguage$(id: number, value: number): Observable<Developer> {
        return this.patch(id, "nativeLanguageId", value);
    }

    delete$(id: number): Observable<any> {
        return this.httpClient.delete(env.api + 'developers/' + id);
    }

    private simplifyDev(developer: Developer): any {
        let dev = {
            id: developer.id,
            name: developer.name,
            email: developer.email,
            phoneNumber: developer.phoneNumber,
            locationId: developer.locationId,
            technologyId: developer.technologyId,
            pricePerHour: developer.pricePerHour,
            yearsOfExperience: developer.yearsOfExperience,
            nativeLanguageId: developer.nativeLanguageId,
            profilePicture: developer.profilePicture,
            description: developer.description,
            linkedIn: developer.linkedIn,
        }

        return dev;
    }

    private patch(id: number, key: string, value: any): Observable<Developer> {
        const data = {
            [key.toString()]: value,
        }
        return this.httpClient.patch<Developer>(env.api + '600/developers/' + id, data)
    }
}