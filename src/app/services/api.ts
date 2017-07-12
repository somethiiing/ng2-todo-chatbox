import { Injectable } from '@angular/core'
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ApiService {
  headers: Headers = new Headers({
    'Content-type': 'application/json',
    Accept: 'application/json'
  });

  api_url: String = 'https://quiet-badlands-27534.herokuapp.com/api';

  constructor(private http: Http) { }

  private getJson(resp: Response) {
    return resp.json();
  }

  private checkForError(resp: Response): Response {
    if (resp.status >= 200 && resp.status < 300) {
      return resp;
    } else {
      const error = new Error(resp.statusText);
      error['response'] = resp;
      console.error(error);
      throw error;
    }
  }

  get(path: string): Observable<any> {
    return this.http.get(`${this.api_url}${path}`, this.headers)
      .map(this.checkForError)
      .catch(err => Observable.throw(err))
      .map(this.getJson)
  }

  post(path, data) {
    return this.http.post(
      `${this.api_url}${path}`,
      JSON.stringify(data),
      {headers: this.headers}
    )
      .map(this.checkForError)
      .catch(err => Observable.throw(err))
      .map(this.getJson);
  }

  delete(path: string, data): Observable<any> {
    const options = {
      headers: this.headers,
      body: data
    };

    return this.http.delete(`${this.api_url}${path}`, options)
      .map(this.checkForError)
      .catch(err => Observable.throw(err))
      .map(this.getJson)
  }

  setHeaders(headers) {
    Object.keys(headers)
      .forEach(header => this.headers.set(header, headers[header]))
  }

};
