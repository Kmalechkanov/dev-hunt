import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TechnologyService } from 'src/app/services/technology.service';
import { Technology } from 'src/app/shared/models/technology.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from 'src/app/snackbar/snackbar.component';
import { DeveloperService } from 'src/app/services/developer.service';
import { take } from 'rxjs/operators';
import { pipe } from 'rxjs';

@Component({
    selector: 'app-delete-technology',
    templateUrl: './delete-technology.component.html',
})

export class DeleteTechnologyComponent {
    constructor(
        public dialogRef: MatDialogRef<DeleteTechnologyComponent>,
        public technologyService: TechnologyService,
        public developerService: DeveloperService,
        public snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) public data: Technology) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onSubmitClick(): void {
        this.developerService.getWithTechnologiesFirst(this.data.id)
            .pipe(take(1)).subscribe((res) => {
                console.log('res', !!res.length)
                console.log('1')
                if (!!res.length) {
                    this.snackBar.openFromComponent(SnackbarComponent, {
                        data: "Cannot delete used technology!"
                    });
                    console.log('2')

                    this.dialogRef.close(res);
                    return;
                }
                console.log('3')

                this.technologyService.delete$(this.data.id)
                    .pipe(take(1)).subscribe((res) => {
                        if (res) {
                            this.snackBar.openFromComponent(SnackbarComponent, {
                                data: "Successfully deleted technology!"
                            });
                            console.log('4')

                            this.dialogRef.close(res);
                        }
                    });
            })
    }
}