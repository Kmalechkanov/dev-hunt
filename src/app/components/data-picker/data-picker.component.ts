import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import { Hire } from 'src/app/shared/models/hire.model';

@Component({
  selector: 'app-data-picker',
  templateUrl: './data-picker.component.html',
  styleUrls: ['./data-picker.component.scss']
})

export class DataPickerComponent implements OnInit {
  @Input() dataRange!: FormGroup;
  @Input() minDate?: Date;
  @Input() maxDate?: Date;
  @Input() hireRequest!: Observable<Hire[]>;
  disabledDates: Date[] = [];

  constructor(private userService: UserService) {
    if (!this.minDate) {
      this.minDate = new Date(Date.now());
    }
    if (!this.maxDate) {
      this.maxDate = new Date(this.minDate);
      this.maxDate.setFullYear(this.minDate.getFullYear() + 3);
    }

  }

  ngOnInit(): void {
    this.hireRequest.pipe(take(1)).subscribe(res => {
      this.hiresToData(res);
    });
  }

  dataChanged() {
    let start: number = this.dataRange.get('start')?.value;
    let end: number = this.dataRange.get('end')?.value;

    let dateNumber: number;
    for (let i = 0; i < this.disabledDates.length!; i++) {
      dateNumber = +this.disabledDates[i].toUTCString();
      if (dateNumber >= start && dateNumber <= end) {
        this.dataRange.setErrors({ 'invalidRange': true });
        break;
      }
    }
  }

  disabledDaysFilter = (d: Date | null): boolean => {
    return !this.disabledDates.find(x => x.getTime() == d?.getTime());
  }

  private hiresToData(hires: Hire[]): any {
    hires.forEach(hire => {
      this.getDates(hire.startDate!, hire.endDate!);
    });
  }

  private getDates(startDateUnix: number, stopDateUnix: number) {
    var currentDate = startDateUnix;
    const day = 60 * 60 * 24;

    while (currentDate <= stopDateUnix) {
      this.disabledDates.push(new Date(currentDate));
      currentDate += day;
    }
  }
}
