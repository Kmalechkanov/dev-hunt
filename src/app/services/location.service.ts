import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Location } from "../shared/models/location.model"
import { environment as env } from "../../environments/environment"

@Injectable({
    providedIn: 'root'
})
export class LocationService {
    constructor(private httpClient: HttpClient) { }

    getAll$(): Observable<Location[]> {
        return this.httpClient.get<Location[]>(env.api + '440/locations/');
    }

    create$(name: string, mapUrl: string): Observable<Location> {
        let data = {
            name,
            mapUrl,
        }
        return this.httpClient.post<Location>(env.api + '660/locations/', data);
    }
}












