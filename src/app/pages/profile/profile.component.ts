import { HttpParams } from '@angular/common/http';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { LocationService } from 'src/app/services/location.service';
import { UserService } from 'src/app/services/user.service';
import { Hire } from 'src/app/shared/models/hire.model';
import { User } from 'src/app/shared/models/user.model';
import { Location } from '../../shared/models/location.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
  user!: User;
  completedProfile: boolean = true;

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
      
      if (this.userService.isCompleted(this.user)) {
        this.userService.getCompletedProfile$().subscribe(response => this.user = response);
      }
    });
  }

  // private hiresToData(hires: Hire[]): any {
  //   hires.forEach(hire => {
  //     const dates = this.getDates(hire.startDate!, hire.endDate!);
  //   });
  // }

  // private getDates(startDateUnix: number, stopDateUnix: number) {
  //   var dateArray = new Array();
  //   var currentDate = startDateUnix;
  //   const day = 60 * 60 * 24;

  //   while (currentDate <= stopDateUnix) {
  //     console.log(this.disabledDates)
  //     this.disabledDates?.push(new Date(currentDate * 1000));
  //     dateArray.push({ [currentDate]: 1 });
  //     currentDate += day;
  //   }

  //   return dateArray;
  // }

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
