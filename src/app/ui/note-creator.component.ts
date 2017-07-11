import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'note-creator',
  templateUrl: './note-creator.component.html',
  styleUrls: ['./note-creator.component.css']
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
