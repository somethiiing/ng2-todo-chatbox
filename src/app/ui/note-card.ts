import {
  Component,
  Input,
  Output,
  EventEmitter
 } from '@angular/core';

@Component({
  selector: 'note-card',
  template: `
    <div
      class="note-card row shadow-1"
      [ngStyle]="{'background-color': note.color}"
      (mouseenter)="toggleCheck()"
      (mouseleave)="toggleCheck()"
    >
      <div
        class="icon"
        (click)="onChecked()"
        *ngIf="showCheck"
      >
        <i class="material-icons">check</i>
      </div>
      <div class="col-xs-12 title">
        {{ note.title }}
      </div>
      <div class="col-xs-12 value">
        {{ note.value }}
      </div>
    </div>

  `,
  styleUrls: ['./note-card.css']
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
