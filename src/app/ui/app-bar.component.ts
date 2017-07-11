import { Component } from '@angular/core';
import { AuthService } from '../services';

@Component({
  selector: 'app-bar',
  styleUrls: ['app-bar.component.css'],
  templateUrl: './app-bar.component.html'
})

export class AppBar {
  constructor(private authService: AuthService) { }
};
