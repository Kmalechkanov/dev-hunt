import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';
import { take } from 'rxjs/operators';
import { HireDevelopersComponent } from 'src/app/components/developer/hire-developers.component';
import { CartService } from 'src/app/services/cart.service';
import { DeveloperService } from 'src/app/services/developer.service';
import { Developer } from 'src/app/shared/models/developer.model';
import { SnackbarComponent } from 'src/app/snackbar/snackbar.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements AfterViewInit {
  developers: Developer[] = [];
  displayedColumns: string[] = ['id', 'name', 'technology', 'location', 'action'];

  @ViewChild(MatTable) table!: MatTable<any>;

  constructor(
    private cartService: CartService,
    private developerService: DeveloperService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) { }

  ngAfterViewInit(): void {
    this.initCart();
  }
  hireAll(): void {
    const dialogRef = this.dialog.open(HireDevelopersComponent, {
      width: '320px',
      data: this.developers,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      this.initCart();
    });
  }

  remove(id: number): void {
    //todo add dialog
    let devId = this.developers.find(dev => dev.id == id)!;
    let devIndex = this.developers.indexOf(devId);
    this.developers.splice(devIndex, 1);
    this.cartService.remove(id);
    this.table.renderRows();

    this.snackBar.openFromComponent(SnackbarComponent, {
      data: "Removed developer to cart!"
    });
  }

  private initCart() {
    let devIds = this.cartService.get();
    this.developers = [];
    devIds.forEach(dev => {
      this.developerService.get$(dev)
        .pipe(take(1)).subscribe(res => {
          this.developers.push(res);
          this.table.renderRows();
        });
    });
    console.log(devIds);
  }
}
