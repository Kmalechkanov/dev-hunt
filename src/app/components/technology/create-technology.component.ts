import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { take } from 'rxjs/operators';
import { TechnologyService } from 'src/app/services/technology.service';
import { Technology } from 'src/app/shared/models/technology.model'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment as env } from 'src/environments/environment';
import { SnackbarComponent } from 'src/app/snackbar/snackbar.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-create-technology',
    templateUrl: './create-technology.component.html',
})

export class CreateTechnologyComponent {
    form: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<CreateTechnologyComponent>,
        public technologyService: TechnologyService,
        public snackBar: MatSnackBar,
        fb: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: Technology) {
        this.form = fb.group({
            name: [data.name, Validators.required],
            imageUrl: [data.imageUrl, Validators.pattern(env.urlRegex)],
        });
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onSubmitClick(): void {
        if (this.form.valid && this.form.errors == null) {
            let data = {
                name: this.form.get('name')?.value,
                imageUrl: this.form.get('imageUrl')?.value,
            }

            this.technologyService.create$(data.name, data.imageUrl).pipe(take(1)).subscribe(res => {
                this.snackBar.openFromComponent(SnackbarComponent, {
                    data: "Successfully created technology!"
                });

                this.dialogRef.close();
            });
        }
    }
}