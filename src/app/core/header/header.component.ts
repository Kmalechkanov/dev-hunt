import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  loggedIn: boolean = false;

  constructor(public authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.isAuthenticated$().subscribe((response)=> {
      this.loggedIn = response;
    })
  }

  logout() {
    this.authService.logout()
  }
}
