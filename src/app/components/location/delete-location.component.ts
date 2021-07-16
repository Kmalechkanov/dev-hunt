import { HttpResponse } from '@angular/common/http';
import { identifierModuleUrl } from '@angular/compiler';
import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, Observable } from 'rxjs';
import { catchError, map, startWith, switchMap, take } from 'rxjs/operators';
import { LocationService } from 'src/app/services/location.service';
import { Developer } from 'src/app/shared/models/developer.model';
import { Location } from 'src/app/shared/models/location.model'
import { FormsModule } from '@angular/forms';
import { SnackbarComponent } from 'src/app/snackbar/snackbar.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeveloperService } from 'src/app/services/developer.service';

@Component({
    selector: 'app-delete-location',
    templateUrl: './delete-location.component.html',
})

export class DeleteLocationComponent {
    constructor(
        public dialogRef: MatDialogRef<DeleteLocationComponent>,
        public locationService: LocationService,
        public developerService: DeveloperService,
        public snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) public data: Location) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onSubmitClick(): void {
        this.developerService.getWithLocationFirst(this.data.id)
            .pipe(take(1)).subscribe((res) => {
                if (!!res.length) {
                    this.snackBar.openFromComponent(SnackbarComponent, {
                        data: "Cannot delete used location!"
                    });

                    this.dialogRef.close(res);
                    return;
                }

                this.locationService.delete$(this.data.id)
                    .pipe(take(1)).subscribe((res) => {

                        if (res) {
                            this.snackBar.openFromComponent(SnackbarComponent, {
                                data: "Successfully deleted location!"
                            });

                            this.dialogRef.close(res);
                        }
                    });
            });
    }
}