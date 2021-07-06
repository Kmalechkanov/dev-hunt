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
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-read-location',
    templateUrl: './read-location.component.html',
})

export class ReadLocationComponent {
    constructor(
        public dialogRef: MatDialogRef<ReadLocationComponent>,
        public locationService: LocationService,
        @Inject(MAT_DIALOG_DATA) public data: Location) { }

    onNoClick(): void {
        this.dialogRef.close();
    }
}