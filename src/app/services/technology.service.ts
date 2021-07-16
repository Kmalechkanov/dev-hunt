import { HttpClient, HttpParams, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Technology } from "../shared/models/technology.model"
import { environment as env } from "../../environments/environment"
import { take } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class TechnologyService {
    constructor(private httpClient: HttpClient) { }

    getAll$(): Observable<Technology[]> {
        return this.httpClient.get<Technology[]>(env.api + '440/technologies/');
    }

    getRange$(page: number = 0, limit: number = 10): Observable<HttpResponse<Technology[]>> {
        let httpParams = new HttpParams();
        httpParams = httpParams.append('_page', page);
        httpParams = httpParams.append('_limit', limit);

        return this.httpClient.get<Technology[]>(env.api + '440/technologies', { params: httpParams, observe: "response" });
    }

    create$(name: string, imageUrl: string): Observable<Technology> {
        let data = {
            name,
            imageUrl,
        }
        return this.httpClient.post<Technology>(env.api + '660/technologies/', data);
    }

    update$(id: number, name: string, imageUrl: string): Observable<Technology> {
        let data = {
            id,
            name,
            imageUrl,
        }
        return this.httpClient.patch<Technology>(env.api + 'technologies/' + id, data);
    }

    delete$(id: number): Observable<any> {
        return this.httpClient.delete(env.api + 'technologies/' + id);
    }
}












