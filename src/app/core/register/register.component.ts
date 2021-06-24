import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthService } from 'src/app/services/auth.service';
import { ThisReceiver, ThrowStmt } from '@angular/compiler';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control
      && control.invalid
      && (control.dirty || control.touched || control.errors?.notMatching));
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../../../assets/auth.scss']
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  errorMessage: string | undefined;
  // public registerInvalid!: boolean;
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

    this.form = this.fb.group(
      {
        email: ['', Validators.compose(
          [Validators.email, Validators.required])],
        firstName: ['', Validators.compose(
          [Validators.minLength(2), Validators.required])],
        lastName: ['', Validators.compose(
          [Validators.minLength(2), Validators.required])],
        password: ['', Validators.compose(
          [Validators.minLength(6), Validators.required])],
        rePassword: ['', Validators.compose(
          [Validators.minLength(6), Validators.required])],
      }, { validator: this.checkSame }
    );

  }

  checkSame(form: FormGroup) {
    console.log('checking')
    if (form.controls.password.value == form.controls.rePassword.value) {
      console.log('Machin\'')
      return null
    } else {
      console.log('Not machin\'')
      form.controls['rePassword'].setErrors({ notMatching: true });
      return { notMatching: true }
    }
  }

  matcher = new MyErrorStateMatcher();

  onSubmit() {
    // this.registerInvalid = false;
    // this.formSubmitAttempt = false;
    if (this.form.valid || this.form.errors == null) {
      try {
        this.authService.register(this.form.value);

        this.authService.error.subscribe((v) => {
          this.errorMessage = v
          console.log(v)
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
