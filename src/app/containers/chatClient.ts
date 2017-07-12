import { Component, OnInit } from '@angular/core';
import { ApiService, StoreService, NoteService } from '../services';
import { Store } from '../store';
import * as io from 'socket.io-client';

@Component({
  selector: 'chat-client',
  template: `
    <div class="chatClient">
      <div
        #messageBox
        class="messageBox"
        [scrollTop]="messageBox.scrollHeight"
      >
        <p *ngFor="let message of messages">{{message.user}}: {{message.text}}</p>
      </div>
      <div class="chatInput">
        <form (submit)="onSubmit()">
          <input
            class ="textBox"
            autocomplete="off"
            type="text"
            [(ngModel)]="message.text"
            name="message"
          >
          <button
            type="text"
            [disabled]="message.text.length < 1"
          >Send!
          </button>
        </form>
      </div>
    </div>
  `,
  styleUrls: ['chatClient.css']
})

export class ChatClient implements OnInit {
  messages = [];
  message = {
    text: '',
    user: ''
  }
  socket;
  token;

  constructor(
    private store: Store,
    private storeService: StoreService,
    private noteService: NoteService
  ) { }

  ngOnInit() {
    this.store.changes
      .do(data => console.log(data))
      .filter(data => data && data.user && data.user.user)
      .map(data => data.user.user)
      .subscribe(username => this.message.user = username );

    this.token = window.localStorage.getItem('notes_token');
    this.noteService.getUser(this.token).subscribe();

    this.socket = io();
    this.socket.on('new-message', function (data) {
      this.messages = data;
      console.log(data);
    }.bind(this));
  }

  onSubmit() {
    this.socket.emit('add-message', this.message);
    this.message.text = '';
  }

}
