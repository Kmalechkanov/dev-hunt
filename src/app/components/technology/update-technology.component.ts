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
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-update-technology',
    templateUrl: './update-technology.component.html',
})

export class UpdateTechnologyComponent {
    constructor(
        public dialogRef: MatDialogRef<UpdateTechnologyComponent>,
        public technologyService: TechnologyService,
        @Inject(MAT_DIALOG_DATA) public data: Technology) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onSubmitClick(): void {
        console.log('gm', this.data);
        this.technologyService.update$(this.data).subscribe(res => {
            console.log(res);
        });
    }
}