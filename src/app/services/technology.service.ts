import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Technology } from "../shared/models/technology.model"
import { environment as env } from "../../environments/environment"

@Injectable({
    providedIn: 'root'
})
export class TechnologyService {
    constructor(private httpClient: HttpClient) { }

    getAll$(): Observable<Technology[]> {
        return this.httpClient.get<Technology[]>(env.api + '440/technologies/');
    }

    create$(name: string, imageUrl: string): Observable<Technology> {
        let data = {
            name,
            imageUrl,
        }
        return this.httpClient.post<Technology>(env.api + '660/technologies/', data);
    }
}












