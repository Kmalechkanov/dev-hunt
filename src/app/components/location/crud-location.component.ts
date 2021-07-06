import { HttpResponse } from '@angular/common/http';
import { identifierModuleUrl } from '@angular/compiler';
import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { LocationService } from 'src/app/services/location.service';
import { Developer } from 'src/app/shared/models/developer.model';
import { Location } from 'src/app/shared/models/location.model'
import { FormsModule } from '@angular/forms';
import { UpdateLocationComponent } from 'src/app/components/location/update-location.component';
import { DeleteLocationComponent } from 'src/app/components/location/delete-location.component';
import { CreateLocationComponent } from './create-location.component';
import { ReadLocationComponent } from './read-location.component';

@Component({
    selector: 'app-crud-locations',
    templateUrl: './crud-location.component.html',
    styleUrls: ['./crud-location.component.scss']
})
export class CrudLocationComponent implements AfterViewInit {

    displayedColumns: string[] = ['id', 'name', 'mapUrl', 'actions', 'create'];
    data: Location[] = [];

    resultsLength = 0;
    isLoadingResults = true;
    isRateLimitReached = false;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(
        private locationService: LocationService,
        public dialog: MatDialog,
    ) { }

    updateLocation(id: number): void {
        const dialogRef = this.dialog.open(UpdateLocationComponent, {
            width: '250px',
            data: this.data.find(d => d.id == id),
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed', result);
            this.paginator._changePageSize(this.paginator.pageSize); 
        });
    }

    deleteLocation(id: number): void {
        const dialogRef = this.dialog.open(DeleteLocationComponent, {
            width: '250px',
            data: this.data.find(d => d.id == id),
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed', result);
            this.paginator._changePageSize(this.paginator.pageSize); 
        });
    }

    createLocation(): void {
        const dialogRef = this.dialog.open(CreateLocationComponent, {
            width: '250px',
            data: new Location(),
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed', result);
            this.paginator._changePageSize(this.paginator.pageSize); 
        });
    }

    readLocation(id: number): void {
        const dialogRef = this.dialog.open(ReadLocationComponent, {
            width: '250px',
            data: this.data.find(d => d.id == id),
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed', result);
        });
    }

    ngAfterViewInit() {
        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

        merge(this.sort.sortChange, this.paginator.page)
            .pipe(
                startWith({}),
                switchMap(() => {
                    this.isLoadingResults = true;
                    return this.locationService.getRange$(this.paginator.pageIndex + 1, this.paginator.pageSize);
                }),
                map((resposne) => {
                    // Flip flag to show that loading has finished.
                    this.isLoadingResults = false;
                    this.isRateLimitReached = resposne.body === null;

                    if (resposne.body === null) {
                        return [];
                    }

                    this.resultsLength = Number(resposne.headers.get('X-Total-Count')); // total count from request
                    console.log("asd", this.resultsLength)
                    return resposne.body;
                })
            ).subscribe((res) => {
                this.data = res
            });
    }
}