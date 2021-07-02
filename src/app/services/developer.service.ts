import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { map } from 'rxjs/operators';
import { User } from "../shared/models/user.model";
import { Router } from "@angular/router";
import { identifierModuleUrl, NullTemplateVisitor, ThisReceiver } from "@angular/compiler";
import { Observable } from "rxjs";
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

    getRange$(start: number = 0, take: number = 10): Observable<Developer[]> {
        const query = '';
        return this.httpClient.get<Developer[]>(env.api + '440/developers' + query);
    }

    getRangeExpand$(start: number = 0, take: number = 10): Observable<Developer[]> {
        const query = '?technologyId_ne&locationId_ne&nativeLanguageId_ne&_expand=technology&_expand=location&_expand=nativeLanguage';
        return this.httpClient.get<Developer[]>(env.api + '440/developers' + query);
    }

    get$(id: number): Observable<Developer> {
        const query = '?_expand=technology&_expand=location&_expand=nativeLanguage';
        return this.httpClient.get<Developer>(env.api + '440/developers/' + id + query);
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

    private patch(id: number, key: string, value: any): Observable<Developer> {
        const data = {
            [key.toString()]: value,
        }
        return this.httpClient.patch<Developer>(env.api + '600/developers/' + id, data)
    }
}