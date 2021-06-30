import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { LocationService } from 'src/app/services/location.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/user.model';
import { Location } from '../../shared/models/location.model'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user!: User;
  completedProfile: boolean = true;
  missingLocation: boolean = false;
  myControl = new FormControl();
  locations!: Location[];
  filteredLocations!: Observable<Location[]>;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
  ) {
    this.user = new User;
  }

  ngOnInit(): void {
    this.authService.loggedIn.subscribe((v) => {
      if (v == false) {
        this.router.navigateByUrl('/login');
      }
    });

    this.userService.getProfile$().subscribe((response) => {
      this.user = response;
      console.log(this.user);

      this.completedProfile = !this.missingData();
      if(this.completedProfile) {
        this.userService.getCompletedProfile$().subscribe(response=> this.user = response);
      }
    });
  }

  private missingData(): boolean {
    if (!this.user.phoneNumber ||
      !this.user.locationId ||
      !this.user.technologyId ||
      !this.user.pricePerHour ||
      !this.user.yearsOfExperience ||
      !this.user.nativeLanguageId)
      return true;
    return false;
  }

}
