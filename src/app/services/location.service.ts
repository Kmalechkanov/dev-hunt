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

    update$(location: Location): Observable<Location> {
        return this.httpClient.patch<Location>(env.api + 'locations/' + location.id, location);
    }

    //todo make this **** work
    delete(id: number): void {
        let httpParams = new HttpParams();
        httpParams = httpParams.append('_limit', 1);
        httpParams = httpParams.append('locationId', id);

        console.log("are we even here ?");
        let inUse;
        this.httpClient.get<Location[]>(env.api + "developers", { params: httpParams })
            .subscribe(r => {
                inUse = !!r.length
                console.log("cmon please",!r)
                if (!inUse) {
                    console.log('So here ?')
                    this.httpClient.delete(env.api + 'locations/' + id).subscribe();
                }
                else {
                    this.httpClient.delete(env.api + '444/locations/' + id).subscribe();
                }
            })
    }


    // async delete$(id: number): Promise<Observable<any>> {
    //     let inUse = await this._checkInuse(id);
    //     if (!inUse) {
    //         console.log('So here ?')
    //         return this.httpClient.delete(env.api + 'locations/' + id);
    //     }
    //     else {
    //         return this.httpClient.delete(env.api + '444/locations/' + id);
    //     }
    // }

    // private async _checkInuse(id: number): Promise<boolean> {
    //     let httpParams = new HttpParams();
    //     httpParams = httpParams.append('_limit', 1);
    //     httpParams = httpParams.append('locationId', id);

    //     let res = await this.httpClient.get<Location[]>(env.api + "developers", { params: httpParams })
    //         .pipe(take(1),).toPromise();

    //     return !!res.length;;
    // }
}












