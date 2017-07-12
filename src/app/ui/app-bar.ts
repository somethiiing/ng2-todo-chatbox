import { Component } from '@angular/core';
import { AuthService } from '../services';
import { Store } from '../store';

@Component({
  selector: 'app-bar',
  styleUrls: ['app-bar.css'],
  template: `
    <header class="app-bar middle-xs">
    <span [routerLink]="[linkMode]" (click)="togglePage()" class="logo row col-xs-2">
      {{currentPage}}
    </span>
    <nav class="col-xs-3 navbar">
      <div class="row middle-xs between-xs">
        <li *ngIf="status" [routerLink]="[linkMode]" (click)="togglePage()" class="link">{{linkMode}}</li>
        <li (click)="signout()" class="link">{{signInOutButtonText}}</li>
      </div>
    </nav>
  </header>
  `
})

export class AppBar {
  status = window.localStorage.getItem('ng2_chall_token');
  signInOutButtonText = 'signin.'
  currentPage = 'chat';
  linkMode = 'notes';

  constructor(
    private authService: AuthService,
    private store: Store
  ) {
    this.store.changes
      .filter(data => data && data.user && data.user.user)
      .map( data => data.user.user)
      .do(data => {
        this.status = data;
        this.updateButtonText();
      })
      .subscribe()
  }

  updateButtonText() {
    this.signInOutButtonText = !this.status ? 'signin.' : 'signout.';
  }

  togglePage() {
    if (this.currentPage === 'chat') {
      this.currentPage = 'notes';
      this.linkMode = 'chat';
    } else if (this.currentPage === 'notes') {
      this.currentPage = 'chat';
      this.linkMode = 'notes';
    }
  }

  signout() {
    this.authService.signout();
    this.signInOutButtonText = 'signin';
  }
};
