import { Injectable } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivateChild, CanLoad, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { first } from "rxjs/operators";
import { AuthService } from "../services/auth.service";

@Injectable()
export class LoggedInGuard implements CanActivateChild { //CanLoad
    constructor(
        private authService: AuthService,
        private router: Router,
    ) { }

    canActivateChild(): any {
        if (this.authService.isLoggedIn()) {
            return true;
        } else {
            this.router.navigateByUrl('auth/login');
            return false;
        }
    }
}