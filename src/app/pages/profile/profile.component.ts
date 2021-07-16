import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
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
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.user = new User;
  }

  ngOnInit(): void {
    let id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) {
      this.router.navigateByUrl('profile');

      this.userService.getProfile$().pipe(take(1)).subscribe((response) => {
        this.user = response;
      });
    }
    else {
      this.userService.getProfile$(id).pipe(take(1)).subscribe((response) => {
        this.user = response;
      });
    }
  }
}
