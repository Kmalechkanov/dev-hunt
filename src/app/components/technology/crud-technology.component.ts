import { HttpResponse } from '@angular/common/http';
import { identifierModuleUrl } from '@angular/compiler';
import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { TechnologyService } from 'src/app/services/technology.service';
import { Developer } from 'src/app/shared/models/developer.model';
import { Technology } from 'src/app/shared/models/technology.model'
import { FormsModule } from '@angular/forms';
import { UpdateTechnologyComponent } from 'src/app/components/technology/update-technology.component';
import { DeleteTechnologyComponent } from 'src/app/components/technology/delete-technology.component';
import { CreateTechnologyComponent } from './create-technology.component';
import { ReadTechnologyComponent } from './read-technology.component';

@Component({
    selector: 'app-crud-technologies',
    templateUrl: './crud-technology.component.html',
    styleUrls: ['./crud-technology.component.scss']
})
export class CrudTechnologyComponent implements AfterViewInit {

    displayedColumns: string[] = ['id', 'name', 'imageUrl', 'actions', 'create'];
    data: Technology[] = [];

    resultsLength = 0;
    isLoadingResults = true;
    isRateLimitReached = false;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(
        private technologyService: TechnologyService,
        public dialog: MatDialog,
    ) { }

    updateTechnology(id: number): void {
        const dialogRef = this.dialog.open(UpdateTechnologyComponent, {
            width: '250px',
            data: this.data.find(d => d.id == id),
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed', result);
            this.paginator._changePageSize(this.paginator.pageSize); 
        });
    }

    deleteTechnology(id: number): void {
        const dialogRef = this.dialog.open(DeleteTechnologyComponent, {
            width: '250px',
            data: this.data.find(d => d.id == id),
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed', result);
            this.paginator._changePageSize(this.paginator.pageSize); 
        });
    }

    createTechnology(): void {
        const dialogRef = this.dialog.open(CreateTechnologyComponent, {
            width: '250px',
            data: new Technology(),
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed', result);
            this.paginator._changePageSize(this.paginator.pageSize); 
        });
    }

    readTechnology(id: number): void {
        const dialogRef = this.dialog.open(ReadTechnologyComponent, {
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
                    return this.technologyService.getRange$(this.paginator.pageIndex + 1, this.paginator.pageSize);
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