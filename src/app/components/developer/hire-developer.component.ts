import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { take } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService } from 'src/app/services/user.service';
import { Developer } from 'src/app/shared/models/developer.model';
import { Hire } from 'src/app/shared/models/hire.model';
import { HireService } from 'src/app/services/hire.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from 'src/app/snackbar/snackbar.component';

@Component({
    selector: 'app-hire-developer',
    templateUrl: './hire-developer.component.html',
    styleUrls: ['./crud-developer.component.scss']
})
export class HireDeveloperComponent implements OnInit {
    form!: FormGroup;
    disabledDates!: Date[];
    minDate!: Date;
    maxDate!: Date;

    constructor(
        private fb: FormBuilder,
        public snackBar: MatSnackBar,
        private userService: UserService,
        private hireService: HireService,
        public dialogRef: MatDialogRef<HireDeveloperComponent>,
        @Inject(MAT_DIALOG_DATA) public developer: Developer
    ) {
        this.disabledDates = [];
    }

    ngOnInit(): void {
        if (!this.minDate) {
            this.minDate = new Date(Date.now());
        }
        if (!this.maxDate) {
            this.maxDate = new Date(this.minDate);
            this.maxDate.setFullYear(this.minDate.getFullYear() + 3);
        }

        this.form = this.fb.group(
            {
                end: ['', Validators.required],
                start: ['', Validators.min(0)],
            }
        );

        this.hireService.getAllMatching$(undefined, this.developer.id)
            .pipe(take(1)).subscribe(res => {
                this.hiresToData(res);
            });
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    dataChanged() {
        let start: number = this.form.get('start')?.value;
        let end: number = this.form.get('end')?.value;
        console.log('checkin\'')
        let dateNumber: number;
        for (let i = 0; i < this.disabledDates.length!; i++) {
            dateNumber = this.disabledDates[i].getTime();
            if (dateNumber >= start && dateNumber <= end) {
                this.form.get('end')?.setErrors({ 'invalidRange': true });
                break;
            }
        }
    }

    onSubmitClick(): void {
        console.log('valid', this.form.valid)
        if (this.form.valid && this.form.errors == null) {
            console.log("dev value", this.developer);
            const hire = {
                userId: this.userService.getId(),
                developerId: this.developer.id,
                startDate: new Date(this.form.get('start')?.value).getTime(),
                endDate: new Date(this.form.get('end')?.value).getTime(),
            }
            console.log('hire fire', hire);
            this.hireService.create$(hire.userId, hire.developerId, hire.startDate, hire.endDate)
                .pipe(take(1)).subscribe(() => {
                    this.snackBar.openFromComponent(SnackbarComponent, {
                        data: "Successfully hired developer!"
                    });
                    this.dialogRef.close();
                });
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
