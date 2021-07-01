import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-profile-id',
  templateUrl: './profile-id.component.html',
  styleUrls: ['./profile-id.component.scss']
})
export class ProfileIdComponent implements OnInit {
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
        this.router.navigateByUrl('/login');
      }
    });

    this.route.params.subscribe(params => {
      if (!params.id) {
        this.router.navigateByUrl('/profile');
      }

      this.userService.getProfile$(params.id).subscribe((response) => {
        this.user = response;
  
        if (this.userService.isCompleted(this.user)) {
          this.userService.getCompletedProfile$(params.id).subscribe(response => this.user = response);
        }
      });
    });
  }
}