import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ServerService } from 'src/app/services/server.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  public loginInvalid!: boolean;
  private formSubmitAttempt!: boolean;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private routher: Router,
    ) { }

  ngOnInit() {
    if(this.authService.isLoggedIn) {
      this.routher.navigateByUrl('/');
    }

    this.form = this.fb.group({
      email: ['', Validators.compose([Validators.email, Validators.required])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  onSubmit() {
    this.loginInvalid = false;
    this.formSubmitAttempt = false;

    if (this.form.valid) {
      try {
        this.authService.login(this.form.value);
      } catch (err) {
        console.log(err)
        this.loginInvalid = true;
      }
    } else {
      this.formSubmitAttempt = true;
    }
  }
}
