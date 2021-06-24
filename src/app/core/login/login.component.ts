import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../../assets/auth.scss']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  errorMessage: string | undefined;

  // public loginInvalid!: boolean;
  // private formSubmitAttempt!: boolean;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private routher: Router,
  ) { }

  ngOnInit() {
    if (this.authService.isLoggedIn) {
      this.routher.navigateByUrl('/');
    }

    this.form = this.fb.group({
      email: ['', Validators.compose([Validators.email, Validators.required])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  onSubmit() {
    // this.loginInvalid = false;
    // this.formSubmitAttempt = false;

    if (this.form.valid || this.form.errors == null) {
      try {
        this.authService.login(this.form.value);

        this.authService.error.subscribe((v) => {
          this.errorMessage = v
          console.log(v)
          this.form.reset()
        })
      } catch (err) {
        console.log(err);
        // this.registerInvalid = true;
      }
    } else {
      // this.formSubmitAttempt = true;
    }
  }
}
