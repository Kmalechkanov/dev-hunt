import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LocationService } from 'src/app/services/location.service';
import { Developer } from 'src/app/shared/models/developer.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DeveloperService } from 'src/app/services/developer.service';
import { take } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from 'src/app/snackbar/snackbar.component';
import { HireService } from 'src/app/services/hire.service';

@Component({
    selector: 'app-delete-developer',
    templateUrl: './delete-developer.component.html',
    styleUrls: ['./crud-developer.component.scss'],
})

export class DeleteDeveloperComponent implements OnInit {
    form!: FormGroup;

    constructor(
        private fb: FormBuilder,
        public snackBar: MatSnackBar,
        public dialogRef: MatDialogRef<DeleteDeveloperComponent>,
        public locationService: LocationService,
        public developerService: DeveloperService,
        public hireService: HireService,
        @Inject(MAT_DIALOG_DATA) public data: Developer) { }

    ngOnInit(): void {
        this.form = this.fb.group(
            {
                name: [{ value: this.data.name, disabled: true }],
                email: [{ value: this.data.email, disabled: true }],
                linkedIn: [{ value: this.data.linkedIn, disabled: true }],
                description: [{ value: this.data.description, disabled: true }],
                profilePicture: [{ value: this.data.profilePicture, disabled: true }],
                phoneNumber: [{ value: this.data.phoneNumber, disabled: true }],
                location: [{ value: this.data.location?.name, disabled: true }],
                mapUrl: [{ value: this.data.location?.mapUrl, disabled: true }],
                technology: [{ value: this.data.technology?.name, disabled: true }],
                imageUrl: [{ value: this.data.technology?.imageUrl, disabled: true }],
                nativeLanguage: [{ value: this.data.nativeLanguage?.name, disabled: true }],
                pricePerHour: [{ value: this.data.pricePerHour, disabled: true }],
                yearsOfExperience: [{ value: this.data.yearsOfExperience, disabled: true }],
            }
        );
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onSubmitClick(): void {
        console.log('gm', this.data);

        this.hireService.isHired$(this.data.id).pipe(take(1)).subscribe(res => {
            if (!!res.length) {
                this.form.setErrors({ "hired": "Cannot delete hired developers" })

                this.snackBar.openFromComponent(SnackbarComponent, {
                    data: "Cannot delete hired developers!"
                });

                // this.dialogRef.close(res);
                return;
            }

            this.developerService.delete$(this.data.id).pipe(take(1)).subscribe((res) => {
                    this.snackBar.openFromComponent(SnackbarComponent, {
                        data: "Successfully deleted developer!"
                    });

                    this.dialogRef.close(res);
            });
        })
    }
}