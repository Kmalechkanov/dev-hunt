
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LocationService } from 'src/app/services/location.service';
import { Location } from 'src/app/shared/models/location.model';

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