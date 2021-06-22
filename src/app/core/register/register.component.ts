import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  public registerInvalid!: boolean;
  private formSubmitAttempt!: boolean;

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
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      rePassword: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
    });
  }

  onSubmit() {
    this.registerInvalid = false;
    this.formSubmitAttempt = false;

    if (this.form.valid) {
      try {
        this.authService.register(this.form.value);
      } catch (err) {
        console.log(err)
        this.registerInvalid = true;
      }
    } else {
      this.formSubmitAttempt = true;
    }
  }
}
