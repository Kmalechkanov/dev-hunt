import { HttpClient, HttpParams, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Location } from "../shared/models/location.model"
import { environment as env } from "../../environments/environment"
import { NumberValueAccessor } from "@angular/forms";
import { take } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class LocationService {
    constructor(private httpClient: HttpClient) { }

    getAll$(): Observable<Location[]> {
        return this.httpClient.get<Location[]>(env.api + '440/locations/');
    }

    getRange$(page: number = 0, limit: number = 10): Observable<HttpResponse<Location[]>> {
        let httpParams = new HttpParams();
        httpParams = httpParams.append('_page', page);
        httpParams = httpParams.append('_limit', limit);

        return this.httpClient.get<Location[]>(env.api + '440/locations', { params: httpParams, observe: "response" });
    }

    create$(name: string, mapUrl: string | null): Observable<Location> {
        let data = {
            name,
            mapUrl,
        }
        return this.httpClient.post<Location>(env.api + '660/locations/', data);
    }

    update$(id: number, name: string, mapUrl: string): Observable<Location> {
        let data = {
            name,
            mapUrl,
        }
        return this.httpClient.patch<Location>(env.api + '660/locations/' + id, data);
    }

    delete$(id: number): Observable<any> {
        return this.httpClient.delete(env.api + 'locations/' + id);
    }
}












