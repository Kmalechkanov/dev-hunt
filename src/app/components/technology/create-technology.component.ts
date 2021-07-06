import { HttpResponse } from '@angular/common/http';
import { identifierModuleUrl } from '@angular/compiler';
import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, Observable } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { TechnologyService } from 'src/app/services/technology.service';
import { Developer } from 'src/app/shared/models/developer.model';
import { Technology } from 'src/app/shared/models/technology.model'
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { environment as env } from 'src/environments/environment';

@Component({
    selector: 'app-update-technology',
    templateUrl: './update-technology.component.html',
})

export class CreateTechnologyComponent {
    form: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<CreateTechnologyComponent>,
        public technologyService: TechnologyService,
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
        console.log('gm', this.data);
        this.technologyService.create$(this.data.name, this.data.imageUrl!).subscribe(res => {
            console.log(res);
        });
    }
}