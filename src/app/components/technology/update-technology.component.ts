import { HttpResponse } from '@angular/common/http';
import { identifierModuleUrl } from '@angular/compiler';
import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, Observable } from 'rxjs';
import { catchError, map, startWith, switchMap, take } from 'rxjs/operators';
import { TechnologyService } from 'src/app/services/technology.service';
import { Developer } from 'src/app/shared/models/developer.model';
import { Technology } from 'src/app/shared/models/technology.model'
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from 'src/app/snackbar/snackbar.component';
import { environment as env } from 'src/environments/environment';

@Component({
    selector: 'app-update-technology',
    templateUrl: './update-technology.component.html',
})

export class UpdateTechnologyComponent {
    form: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<UpdateTechnologyComponent>,
        public technologyService: TechnologyService,
        fb: FormBuilder,
        public snackBar: MatSnackBar,
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
                id: this.data.id,
                name: this.form.get('name')?.value,
                imageUrl: this.form.get('imageUrl')?.value,
            }
            this.technologyService.update$(data.id, data.name, data.imageUrl).pipe(take(1)).subscribe(res => {
                this.snackBar.openFromComponent(SnackbarComponent, {
                    data: "Successfully updated technology!"
                });

                this.dialogRef.close();
            });
        }
    }
}