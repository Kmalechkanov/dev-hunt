import { HttpClient, HttpParams, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Location } from "../shared/models/location.model"
import { environment as env } from "../../environments/environment"
import { NumberValueAccessor } from "@angular/forms";
import { take } from "rxjs/operators";
import { Hire } from "../shared/models/hire.model";

@Injectable({
    providedIn: 'root'
})
export class HireService {
    constructor(private httpClient: HttpClient) { }

    getAll$(): Observable<Hire[]> {
        return this.httpClient.get<Hire[]>(env.api + '440/hires/');
    }

    getAllMatching$(userId?: number, developerId?: number): Observable<Hire[]> {
        let httpParams = new HttpParams();
        if (userId) {
            httpParams = httpParams.append('userId', userId);
        }
        if (developerId) {
            httpParams = httpParams.append('developerId', developerId);
        }

        return this.httpClient.get<Hire[]>(env.api + '440/hires/', { params: httpParams });
    }

    getRange$(page: number = 0, limit: number = 10): Observable<HttpResponse<Hire[]>> {
        let httpParams = new HttpParams();
        httpParams = httpParams.append('_page', page);
        httpParams = httpParams.append('_limit', limit);

        return this.httpClient.get<Hire[]>(env.api + '440/hires', { params: httpParams, observe: "response" });
    }

    create$(userId: number, developerId: number, start: number, end: number): Observable<Hire> {
        let data = {
            userId,
            developerId,
            startDate: start,
            endDate: end,
        }
        return this.httpClient.post<Hire>(env.api + '660/hires/', data);
    }

    isHired$(developerId: number): Observable<Hire[]> {
        let httpParams = new HttpParams();
        httpParams = httpParams.append('_limit', 1);
        httpParams = httpParams.append('developerId', developerId);

        return this.httpClient.get<Hire[]>(env.api + '440/hires', { params: httpParams });
    }
}












