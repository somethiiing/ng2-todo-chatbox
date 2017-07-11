import { Component, OnInit } from '@angular/core';
import { NoteService, StoreService } from '../services';
import { Store } from '../store';

@Component({
  selector: 'notes-container',
  template: `
    <div class="row center-xs notes">
      <div class="col-xs-6 creator">
        <note-creator
        (submitted)="addNewNote($event)"
        >
        </note-creator>
      </div>
      <div class="notes col-xs-8">
        <div class="row between-xs">
          <note-card
            class="col-xs-4"
            [note]="note"
            *ngFor="let note of notes; let i = index"
            (checked)="onNoteChecked($event, i)"
          >
          </note-card>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./notes.css']
})

export class NoteCardContainer implements OnInit {
  notes = [];
  token = '';

  constructor(
    private noteService: NoteService,
    private storeService: StoreService,
    private store: Store
  ) { }

  ngOnInit() {
    this.store.changes
      .map(data => data.notes)
      .subscribe(notes => this.notes = notes );

    this.token = window.localStorage.getItem('notes_token');
    this.noteService.getNotes(this.token).subscribe();
  }

  addNewNote(note) {
    this.noteService.createNote(this.token, note).subscribe()
  }

  onNoteChecked(note, index) {
    this.noteService.completeNote(this.token, note).subscribe();
  }

}
