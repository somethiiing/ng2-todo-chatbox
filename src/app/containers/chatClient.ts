import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services';
import * as io from 'socket.io-client';

@Component({
  selector: 'chat-client',
  template: `
    <div class="chatClient">
      <p *ngIf="this.message.user === '' ">To begin, enter your username and hit submit!</p>
      <div
        #messageBox
        class="messageBox"
        [scrollTop]="messageBox.scrollHeight"
        *ngIf="this.message.user !== '' "
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
            *ngIf="message.user !== '' "
            type="submit"
            [disabled]="message.text.length < 1"
          >Send
          </button>
          <button
            *ngIf="message.user === '' "
            type="text"
            [disabled]="message.text.length < 1"
          >Submit
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

  constructor() { }

  ngOnInit() {
    this.socket = io();

    this.socket.on('new-message', function (data) {
      this.messages = data;
    }.bind(this));
  }

  onSubmit() {
    if (this.message.user === '') {
      this.message.user = this.message.text;
      this.socket.emit('add-message', {user: 'ChatBot', text: `${this.message.user} has just joined the room!`})
    } else {
      this.socket.emit('add-message', this.message);
    }
    this.message.text = '';
  }

}
