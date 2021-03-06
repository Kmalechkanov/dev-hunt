import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { Developer } from 'src/app/shared/models/developer.model';
import { CreateDeveloperComponent } from './create-developer.component';
import { DeveloperService } from 'src/app/services/developer.service';
import { DeleteDeveloperComponent } from './delete-developer.component';
import { ReadDeveloperComponent } from './read-developer.component';
import { UpdateDeveloperComponent } from './update-developer.component';

@Component({
    selector: 'app-crud-developers',
    templateUrl: './crud-developer.component.html',
    styleUrls: ['./crud-developer.component.scss']
})
export class CrudDeveloperComponent implements AfterViewInit {

    displayedColumns: string[] = ['id', 'name', 'location', 'technology', 'language', 'actions', 'create'];
    data: Developer[] = [];

    resultsLength = 0;
    isLoadingResults = true;
    isRateLimitReached = false;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(
        private developerService: DeveloperService,
        public dialog: MatDialog,
    ) { }

    updateDeveloper(id: number): void {
        const dialogRef = this.dialog.open(UpdateDeveloperComponent, {
            width: '600px',
            data: this.data.find(d => d.id == id),
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed', result);
            this.paginator._changePageSize(this.paginator.pageSize); 
        });
    }

    deleteDeveloper(id: number): void {
        const dialogRef = this.dialog.open(DeleteDeveloperComponent, {
            width: '600px',
            data: this.data.find(d => d.id == id),
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed', result);
            this.paginator._changePageSize(this.paginator.pageSize); 
        });
    }

    createDeveloper(): void {
        const dialogRef = this.dialog.open(CreateDeveloperComponent, {
            width: '600px',
            data: new Developer(),
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed', result);
            this.paginator._changePageSize(this.paginator.pageSize);
        });
    }

    readDeveloper(id: number): void {
        const dialogRef = this.dialog.open(ReadDeveloperComponent, {
            width: '600px',
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
                    return this.developerService.getRangeExpand$(this.paginator.pageIndex + 1, this.paginator.pageSize);
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