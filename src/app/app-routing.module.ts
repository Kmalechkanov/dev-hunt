import { registerLocaleData } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { HireComponent } from './pages/hire/hire.component';
import { DeveloperComponent } from './developer/developer.component';
import { LoggedInGuard } from './guards/logged-in.guard';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { CartComponent } from './pages/cart/cart.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent,
  },
  {
    path: '',
    canActivateChild: [LoggedInGuard],
    // data: { roles : ['ROLE_USER'] },
    children: [
      { path: 'profile', component: ProfileComponent },
      { path: 'profile/:id', component: ProfileComponent },
      { path: 'developer/:id', component: DeveloperComponent },
      { path: 'hire', component: HireComponent },
      { path: 'cart', component: CartComponent },
    ],
  },
  {
    path: 'auth',
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ]
  },
  {
    path: 'admin',
    canActivateChild: [LoggedInGuard], //TODO add RoleGuard
    // data: { roles : ['ROLE_USER'] },
    children: [
      {
        path: '',
        redirectTo: 'admin/dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: AdminDashboardComponent,
      }
    ]
  },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
