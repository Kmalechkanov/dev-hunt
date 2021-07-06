import { HttpResponse } from '@angular/common/http';
import { identifierModuleUrl } from '@angular/compiler';
import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, Observable } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { LocationService } from 'src/app/services/location.service';
import { Developer } from 'src/app/shared/models/developer.model';
import { Location } from 'src/app/shared/models/location.model'
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { environment as env } from 'src/environments/environment';

@Component({
    selector: 'app-update-location',
    templateUrl: './update-location.component.html',
})

export class CreateLocationComponent {
    form: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<CreateLocationComponent>,
        public locationService: LocationService,
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
        console.log('gm', this.data);
        this.locationService.create$(this.data.name, this.data.mapUrl!).subscribe(res => {
            console.log(res);
        });
    }
}