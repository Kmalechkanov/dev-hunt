import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../../assets/auth.scss']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  errorMessage: string | undefined;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.authService.loggedIn.subscribe((v) => {
      if (v == true) {
        this.router.navigateByUrl('/')
      }
    });

    this.form = this.fb.group({
      email: ['', Validators.compose([Validators.email, Validators.required])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  onSubmit() {
    if (this.form.valid && this.form.errors == null) {
      console.log('trying')
      this.authService.login$(this.form.value).pipe(
        take(1),
        catchError(error => of(this.errorMessage = "Wrong email or password", this.form.reset()))
      ).subscribe(
        {
          next(position) {
            console.log('Current login: ', position);
          }
        }
      );
    }
    else {
      // this.errorMessage = ""
    }
  }
}
