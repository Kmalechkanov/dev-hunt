import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';

import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';

import { LoggedInGuard } from './guards/logged-in.guard';
import { TokenInterceptor } from './interceptors/token.interceptor';

import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { ButtonComponent } from './components/button/button.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { CompleteProfileComponent } from './components/complete-profile/complete-profile.component';
import { HireComponent } from './pages/hire/hire.component';
import { HeatmapComponent } from './components/heatmap/heatmap.component';
import { DataPickerComponent } from './components/data-picker/data-picker.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { DeveloperComponent } from './developer/developer.component';
//locations
import { CreateLocationComponent } from './components/location/create-location.component';
import { ReadLocationComponent } from './components/location/read-location.component';
import { UpdateLocationComponent } from './components/location/update-location.component';
import { DeleteLocationComponent } from './components/location/delete-location.component';
import { CrudLocationComponent } from './components/location/crud-location.component';
//technologies
import { CreateTechnologyComponent } from './components/technology/create-technology.component';
import { ReadTechnologyComponent } from './components/technology/read-technology.component';
import { UpdateTechnologyComponent } from './components/technology/update-technology.component';
import { DeleteTechnologyComponent } from './components/technology/delete-technology.component';
import { CrudTechnologyComponent } from './components/technology/crud-technology.component';
//developers
import { CreateDeveloperComponent } from './components/developer/create-developer.component';
import { ReadDeveloperComponent } from './components/developer/read-developer.component';
import { UpdateDeveloperComponent } from './components/developer/update-developer.component';
import { DeleteDeveloperComponent } from './components/developer/delete-developer.component';
import { CrudDeveloperComponent } from './components/developer/crud-developer.component';
import { HireDeveloperComponent } from './components/developer/hire-developer.component';
import { HireDevelopersComponent } from './components/developer/hire-developers.component';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { CartComponent } from './pages/cart/cart.component';

import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatNativeDateModule } from '@angular/material/core';
import { NgApexchartsModule } from 'ng-apexcharts';

export function tokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ButtonComponent,
    ProfileComponent,
    CompleteProfileComponent,
    HireComponent,
    HeatmapComponent,
    DataPickerComponent,
    DeveloperComponent,
    AdminDashboardComponent,
    CreateLocationComponent,
    ReadLocationComponent,
    UpdateLocationComponent,
    DeleteLocationComponent,
    CrudLocationComponent,
    CreateTechnologyComponent,
    ReadTechnologyComponent,
    UpdateTechnologyComponent,
    DeleteTechnologyComponent,
    CrudTechnologyComponent,
    CreateDeveloperComponent,
    ReadDeveloperComponent,
    UpdateDeveloperComponent,
    DeleteDeveloperComponent,
    CrudDeveloperComponent,
    HireDeveloperComponent,
    HireDevelopersComponent,
    SnackbarComponent,
    CartComponent,
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    NoopAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatDividerModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatDialogModule,
    MatExpansionModule,
    MatSnackBarModule,
    NgApexchartsModule,
  ],
  providers: [
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 3500 } },
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    LoggedInGuard,
  ],
  schemas: [NO_ERRORS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule { }
