import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Language } from "../shared/models/language.model"
import { environment as env } from "../../environments/environment"

@Injectable({
    providedIn: 'root'
})
export class EnumService {
    constructor(private httpClient: HttpClient) { }

    getLanguages$(): Observable<Language[]> {
        return this.httpClient.get<Language[]>(env.api + '440/nativeLanguages/');
    }
}