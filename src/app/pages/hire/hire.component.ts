import { Component, OnInit } from '@angular/core';
import { DeveloperService } from 'src/app/services/developer.service';
import { UserService } from 'src/app/services/user.service';
import { Developer } from 'src/app/shared/models/developer.model';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-hire',
  templateUrl: './hire.component.html',
  styleUrls: ['./hire.component.scss']
})
export class HireComponent implements OnInit {
  developers!: Developer[];

  constructor(private developerService: DeveloperService) { }

  ngOnInit(): void {
    this.developerService.getRangeExpand$(0,).subscribe(res => this.developers = res.body!);
  }
}
