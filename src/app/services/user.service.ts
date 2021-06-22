import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { map } from 'rxjs/operators';
import { User } from "../shared/models/user.model";

@Injectable()
export class UserService {
    constructor(private httpClient: HttpClient) { }

    getUser() {
        return this.httpClient.get('/user');
    }
}