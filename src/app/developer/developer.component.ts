import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { DeleteDeveloperComponent } from '../components/developer/delete-developer.component';
import { HireDeveloperComponent } from '../components/developer/hire-developer.component';
import { UpdateDeveloperComponent } from '../components/developer/update-developer.component';
import { CartService } from '../services/cart.service';
import { DeveloperService } from '../services/developer.service';
import { Developer } from '../shared/models/developer.model';
import { SnackbarComponent } from '../snackbar/snackbar.component';
import 'cal-heatmap'
import * as d3 from 'd3';

@Component({
  selector: 'app-developer',
  templateUrl: './developer.component.html',
  styleUrls: ['./developer.component.scss']
})

export class DeveloperComponent implements OnInit {
  developer!: Developer;
  inCart: boolean = false;
  heatmap: any;

  constructor(
    private developerService: DeveloperService,
    private cartService: CartService,
    private router: Router,
    private route: ActivatedRoute,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) {
    this.developer = new Developer();
    // this.heatmap = new CalHeatMap().init({});
    // formatNumber: d3.format(",g"),
  }

  onSelect(): void {
    this.heatmap.init(
      { itemSelector: "#heatmap", formatNumber: d3.format(",g") },
    )
  };

  ngOnInit(): void {
    let id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) {
      this.router.navigateByUrl('/hire');
    }
    else {
      this.developerService.get$(id).pipe(take(1)).subscribe(response => {
        this.developer = response;
        this.inCart = this.cartService.isCartified(this.developer.id);
      });
    }

  }

  edit(): void {
    const dialogRef = this.dialog.open(UpdateDeveloperComponent, {
      width: '600px',
      data: this.developer,
    });

    dialogRef.afterClosed().subscribe(res => {
      console.log('The dialog was closed', res);
      if (res) {
        this.developer = res;
      }
    });
  }

  delete(): void {
    const dialogRef = this.dialog.open(DeleteDeveloperComponent, {
      width: '600px',
      data: this.developer,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      // TODO reload page if deleted!
    });
  }

  hire(): void {
    const dialogRef = this.dialog.open(HireDeveloperComponent, {
      width: '320px',
      data: this.developer,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }

  cartify(): void {
    //todo add dialog
    if (this.cartService.isCartified(this.developer.id)) {
      this.snackBar.openFromComponent(SnackbarComponent, {
        data: "Developer already in cart!"
      });
      return;
    }

    this.cartService.add(this.developer.id);
    this.inCart = this.cartService.isCartified(this.developer.id);

    this.snackBar.openFromComponent(SnackbarComponent, {
      data: "Added developer to cart!"
    });
  }

  uncartify(): void {
    //todo add dialog

    this.cartService.remove(this.developer.id);
    this.inCart = this.cartService.isCartified(this.developer.id);

    this.snackBar.openFromComponent(SnackbarComponent, {
      data: "Removed developer to cart!"
    });
  }
}