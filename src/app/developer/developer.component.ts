import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { DeveloperService } from '../services/developer.service';
import { Developer } from '../shared/models/developer.model';

@Component({
  selector: 'app-developer',
  templateUrl: './developer.component.html',
  styleUrls: ['./developer.component.scss']
})
export class DeveloperComponent implements OnInit {
  developer!: Developer;

  constructor(
    private developerService: DeveloperService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.developer = new Developer();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (!params.id) {
        this.router.navigateByUrl('/hire');
      }
      else {
        this.developerService.get$(params.id).subscribe(response => this.developer = response);
      }
    });
  }
}