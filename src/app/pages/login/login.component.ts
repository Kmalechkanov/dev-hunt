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

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.authService.loggedIn.subscribe((v)=> {
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
      try {
        console.log('trying')
        this.authService.login$(this.form.value).subscribe(
          {
            next(position) {
              console.log('Current login: ', position);
            },
            error(msg) {
              console.log('Error login: ', msg.error);
              //TODO  somehow store error
            }
          }
        );

        this.authService.getError$().subscribe((v) => {
          this.errorMessage = v;
          console.log(v);
          this.form.reset();
        })
      } catch (err) {
        console.log(err);
      }
    } else {
    }
  }
}
