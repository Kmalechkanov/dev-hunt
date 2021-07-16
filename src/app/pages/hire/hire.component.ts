import { Identifiers } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { take } from 'rxjs/operators';
import { HireDeveloperComponent } from 'src/app/components/developer/hire-developer.component';
import { CartService } from 'src/app/services/cart.service';
import { DeveloperService } from 'src/app/services/developer.service';
import { Developer } from 'src/app/shared/models/developer.model';
import { SnackbarComponent } from 'src/app/snackbar/snackbar.component';

@Component({
  selector: 'app-hire',
  templateUrl: './hire.component.html',
  styleUrls: ['./hire.component.scss']
})
export class HireComponent implements OnInit {
  developers!: Developer[];
  inCart: { [name: number]: boolean } = {};

  constructor(
    private developerService: DeveloperService,
    private cartService: CartService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.developerService.getRangeExpand$(0,).pipe(take(1)).subscribe(res => {
      this.developers = res.body!

      this.developers.forEach(developer => {
        this.inCart[developer.id] = this.cartService.isCartified(developer.id);
      });
    });
  }

  hire(id: number): void {
    const dialogRef = this.dialog.open(HireDeveloperComponent, {
      width: '320px',
      data: this.developers.find(d => d.id == id),
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      // this.paginator._changePageSize(this.paginator.pageSize); 
    });
  }

  cartify(id: number): void {
    //todo add dialog
    if (this.cartService.isCartified(id)) {
      this.snackBar.openFromComponent(SnackbarComponent, {
        data: "Developer already in cart!"
      });
      return;
    }

    this.cartService.add(id);
    this.inCart[id] = this.cartService.isCartified(id);

    this.snackBar.openFromComponent(SnackbarComponent, {
      data: "Added developer to cart!"
    });
  }

  uncartify(id: number): void {
    //todo add dialog
    this.cartService.remove(id);
    this.inCart[id] = this.cartService.isCartified(id);

    this.snackBar.openFromComponent(SnackbarComponent, {
      data: "Removed developer to cart!"
    });
  }
}
