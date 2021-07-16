import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { take } from 'rxjs/operators';
import { LocationService } from 'src/app/services/location.service';
import { Location } from 'src/app/shared/models/location.model';
import { SnackbarComponent } from 'src/app/snackbar/snackbar.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment as env } from 'src/environments/environment';

@Component({
    selector: 'app-update-location',
    templateUrl: './update-location.component.html',
})

export class UpdateLocationComponent {
    form: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<UpdateLocationComponent>,
        public locationService: LocationService,
        public snackBar: MatSnackBar,
        fb: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: Location) {
        this.form = fb.group({
            name: [data.name, Validators.required],
            mapUrl: [data.mapUrl, Validators.pattern(env.urlRegex)],
        });
    }


    onNoClick(): void {
        this.dialogRef.close();
    }

    onSubmitClick(): void {
        if (this.form.valid && this.form.errors == null) {
            let data = {
                id: this.data.id,
                name: this.form.get('name')?.value,
                mapUrl: this.form.get('mapUrl')?.value,
            }
            this.locationService.update$(data.id, data.name, data.mapUrl).pipe(take(1)).subscribe(res => {
                this.snackBar.openFromComponent(SnackbarComponent, {
                    data: "Successfully updated location!"
                });

                this.dialogRef.close();
            });
        }
    }
}