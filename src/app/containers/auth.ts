import { Component } from '@angular/core';
import { AuthService } from '../services';
import { Router } from '@angular/router';

@Component({
  selector: 'auth-container',
  styleUrls: ['./auth.css'],
  template: `
    <div class="auth row center-xs middle-xs">
      <form class="col-xs-6 shadow-2" #authForm="ngForm" (submit)=authenticate() >
        <div class="inputs row center-xs middle-xs">
          <h3 class="col-xs-8 title">
            {{mode}}
          </h3>
          <input
            class="col-xs-8"
            type="email"
            name="email"
            required
            [(ngModel)]="user.email"
            placeholder="email"
            #email="ngModel"
          >
          <div
            [hidden]="email.valid || email.pristine"
            class="error"
          >
            email is invalid
          </div>
          <input
            class="col-xs-8"
            type="password"
            name="password"
            required
            [(ngModel)]="user.password"
            placeholder="password"
            #password="ngModel"
          >
          <div
            class="error"
            [hidden]="password.valid || password.pristine"
          >
            password is required
          </div>
          <div class="actions col-xs-12">
            <div class="row center-xs">
              <button
                type="submit"
                class="btn-light"
                [disabled]="!authForm.form.valid"
              >
                {{mode}}
              </button>
              <a (click)="changeMode()" class="btn-light link">
                {{linkText}}
              </a>
            </div>
          </div>
          <div>{{errorMessage}}</div>
        </div>
      </form>
    </div>
  `
})

export class Auth {
  user = {
    email: '',
    password: ''
  }

  mode: string = 'signin';
  linkText: string = 'Don\'t have an account?';
  errorMessage: string = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  changeMode() {
    this.errorMessage = '';
    if (this.mode === 'signin') {
      this.mode = 'signup';
      this.linkText = 'Already have an account?';
    } else {
      this.mode = 'signin';
      this.linkText = 'Don\'t have an account?';
    }
  }

  authenticate() {
    this.authService.authenticate(this.mode, this.user)
      .subscribe( res => {
        if (res === 'INCORRECTPASSWORD' || res === 'USERDOESNOTEXIST' ) {
          this.errorMessage = 'Wrong username or password. Please try again!';
        } else if (res === 'USEREXISTS') {
          this.errorMessage = 'User already exists!';
        } else if (res === 'SUCCESS' ) {
          this.router.navigate([''])
        }
      });
  }


}
