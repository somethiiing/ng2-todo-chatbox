import { Component } from '@angular/core';
import { AuthService } from '../services';
import { Router } from '@angular/router';

@Component({
  selector: 'auth-container',
  styleUrls: ['./auth.component.css'],
  templateUrl: './auth.component.html'
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
