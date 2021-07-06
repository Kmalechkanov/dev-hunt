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
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { DeveloperService } from 'src/app/services/developer.service';

@Component({
    selector: 'app-delete-developer',
    templateUrl: './delete-developer.component.html',
    styleUrls: ['./crud-developer.component.scss'],
})

export class DeleteDeveloperComponent implements OnInit {
    form!: FormGroup;

    constructor(
        private fb: FormBuilder,
        public dialogRef: MatDialogRef<DeleteDeveloperComponent>,
        public locationService: LocationService,
        public developerService: DeveloperService,
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

        this.developerService.delete(this.data.id);
        this.dialogRef.close();
    }
}