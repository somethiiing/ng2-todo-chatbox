import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CanActivate, Router } from '@angular/router';
import { StoreService } from './store';
import { Store } from '../store';
import { ApiService } from './api';
import 'rxjs/Rx';

@Injectable()
export class AuthService implements CanActivate {

  JWT_KEY: string = 'notes_token';

  constructor(
    private router: Router,
    private storeService: StoreService,
    private store: Store,
    private apiService: ApiService
  ) {
    const token = window.localStorage.getItem(this.JWT_KEY);

    if (token) { this.setJwt(token) }
  }

  setJwt(jwt: string) {
    window.localStorage.setItem(this.JWT_KEY, jwt);
    this.apiService.setHeaders({Authorization: `Bearer ${jwt}`});
  }

  isAuthorized(): boolean {
    return Boolean(window.localStorage.getItem(this.JWT_KEY));
  }

  canActivate(): boolean {
    const canActivate = this.isAuthorized();
    this.onCanActivate(canActivate);
    return canActivate;
  }

  onCanActivate(canActivate: boolean) {
    if (!canActivate) {
      this.router.navigate(['auth']);
    }
  }

  authenticate(path, credits): Observable<any> {
    return this.apiService.post(`/${path}`, credits)
      .do(res => {
        if (res.token !== null) {
          this.setJwt(res.token)
          const data = { user: res.data, jwt: res.token };
          this.storeService.update('user', data);
        }
      })
      .map(res => res.status);
  }

  signout() {
    window.localStorage.removeItem(this.JWT_KEY);
    this.store.purge();
    this.router.navigate(['auth']);
  }

}
