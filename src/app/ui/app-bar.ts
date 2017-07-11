import { Component } from '@angular/core';
import { AuthService } from '../services';

@Component({
  selector: 'app-bar',
  styleUrls: ['app-bar.css'],
  template: `
    <header class="app-bar middle-xs">
    <span [routerLink]="['']" class="logo row col-xs-5">
      notes.
    </span>
    <nav class="col-xs-2 navbar">
      <div class="row middle-xs between-xs">
        <li [routerLink]="['about']" class="link">about</li>
        <li (click)="authService.signout()" class="link">signout</li>
      </div>
    </nav>
  </header>
  `
})

export class AppBar {
  constructor(private authService: AuthService) { }
};
