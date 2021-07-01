import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Hire } from 'src/app/shared/models/hire.model';

@Component({
  selector: 'app-data-picker',
  templateUrl: './data-picker.component.html',
  styleUrls: ['./data-picker.component.scss']
})

export class DataPickerComponent implements OnInit {
  disabledDates?: Date[] = [];
  minDate!: Date;
  maxDate!: Date;

  range = new FormGroup({
    start: new FormControl(''),
    end: new FormControl('',)
  });

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.minDate = new Date(Date.now());
    this.maxDate =  new Date(this.minDate);
    this.maxDate.setFullYear(this.minDate.getFullYear() + 3);

    this.userService.getHires$().subscribe(response => {
      console.log(response)
      this.hiresToData(response)
    });
  }

  disabledDaysFilter = (d: Date | null): boolean => {
    return !this.disabledDates?.find(x => x.getTime() == d?.getTime());
  }

  private hiresToData(hires: Hire[]): any {
    hires.forEach(hire => {
      const dates = this.getDates(hire.startDate!, hire.endDate!);
    });
  }

  private getDates(startDateUnix: number, stopDateUnix: number) {
    var dateArray = new Array();
    var currentDate = startDateUnix;
    const day = 60 * 60 * 24;

    while (currentDate <= stopDateUnix) {
      this.disabledDates?.push(new Date(currentDate * 1000));
      dateArray.push({ [currentDate]: 1 });
      currentDate += day;
    }

    return dateArray;
  }
}
