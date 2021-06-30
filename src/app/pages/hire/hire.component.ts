import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-hire',
  templateUrl: './hire.component.html',
  styleUrls: ['./hire.component.scss']
})
export class HireComponent implements OnInit {
  users!: User[];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getCompletedWithoutMe$().subscribe(res =>this.users = res);
  }

}
