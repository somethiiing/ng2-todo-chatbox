import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';

export interface Note {
  color: string,
  title: string,
  value: string,
  createdat?: string,
  updatedat?: string
}

export interface User {
  id?: string,
  jwt?: string,
  user?: string
}

export interface State {
  notes: Array<Note>,
  user: User
}

const defaultState = {
  notes: [],
  user: {}
}

@Injectable()
export class Store {
  _store: BehaviorSubject<State>;
  changes;

  constructor() {
    this._store = new BehaviorSubject<State>(defaultState);
    this.changes = this._store.asObservable().distinctUntilChanged();
  }

  setState(state: State) {
    this._store.next(state);
  };

  getState() {
    return this._store.value;
  };

  purge() {
    this._store.next(defaultState);
  };

};
