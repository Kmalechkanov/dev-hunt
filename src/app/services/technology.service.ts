import { HttpClient, HttpParams, HttpResponse } from "@angular/common/http";
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

    update$(technology: Technology): Observable<Technology> {
        return this.httpClient.patch<Technology>(env.api + 'technologies/' + technology.id, technology);
    }

    //todo make this **** work
    delete(id: number): void {
        let httpParams = new HttpParams();
        httpParams = httpParams.append('_limit', 1);
        httpParams = httpParams.append('technologyId', id);

        console.log("are we even here ?");
        let inUse;
        this.httpClient.get<Technology[]>(env.api + "developers", { params: httpParams })
            .subscribe(r => {
                inUse = !!r.length
                console.log("cmon please",!r)
                if (!inUse) {
                    console.log('So here ?')
                    this.httpClient.delete(env.api + 'technologies/' + id).subscribe();
                }
                else {
                    this.httpClient.delete(env.api + '444/technologies/' + id).subscribe();
                }
            })
    }
}












