import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
  user!: User;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.user = new User;
  }

  ngOnInit(): void {
    this.authService.loggedIn.subscribe((v) => {
      if (v == false) {
        this.router.navigateByUrl('auth/login');
      }
    });

    this.route.params.subscribe(params => {
      if (!params.id) {
        this.router.navigateByUrl('profile');

        this.userService.getProfile$().subscribe((response) => {
          this.user = response;
        });
      }
      else {
        this.userService.getProfile$(params.id).subscribe((response) => {
          this.user = response;
        });
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
}
