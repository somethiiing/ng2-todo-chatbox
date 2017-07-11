import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'note-creator',
  template: `
    <div class="note-creator shadow-2" [ngStyle]="{'background-color': newNote.color}">
      <form class="row" (submit)="onSubmitted()">
        <input
          type="text"
          [(ngModel)]="newNote.title"
          name="newNoteTitle"
          placeholder="Title"
          class="col-xs-10 title"
          *ngIf="fullForm"
        >
        <input
          type="text"
          (focus)="toggleFullForm(true)"
          [(ngModel)]="newNote.value"
          name="newNoteValue"
          placeholder="Take a note..."
          class="col-xs-10"
        >
        <div
          class="actions col-xs-12 row between-xs"
          *ngIf="fullForm"
        >
          <color-picker
            [colors]="colors"
            (selectedColor)="onColorSelect($event)"
          >
          </color-picker>
          <button
            type="submit"
            class="btn-light"
            >
            Done
          </button>
        </div>
      </form>
    </div>

  `,
  styleUrls: ['./note-creator.css']
})

export class NoteCreator {
  @Output() submitted = new EventEmitter();

  colors: string[] = ['#b19cd9', '#ff9691', '#77dd77', '#aec6cf', '#f49ac2', 'white']
  newNote = {
    title: '',
    value: '',
    color: 'white'
  }

  fullForm = false;

  onSubmitted() {
    const {title, value, color} = this.newNote;

    if (title && value) {
      this.submitted.next({title, value, color});
      this.reset();
    }
    this.toggleFullForm(false);
  }

  reset() {
    this.newNote = {
      title: '',
      value: '',
      color: 'white'
    }
  }

  toggleFullForm(value) {
    this.fullForm = value;
  }

  onColorSelect(color: string) {
    this.newNote.color = color;
  }

};
