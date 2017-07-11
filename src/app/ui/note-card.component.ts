import {
  Component,
  Input,
  Output,
  EventEmitter
 } from '@angular/core';

@Component({
  selector: 'note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.css']
})

export class NoteCard {
  @Input() note = {
    title: '',
    value: '',
    color: ''
  };
  @Output() checked = new EventEmitter();
  showCheck = false;

  onChecked() {
    this.checked.next(this.note);
  }

  toggleCheck() {
    this.showCheck = !this.showCheck;
  }

};
