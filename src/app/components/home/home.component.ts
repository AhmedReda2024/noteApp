import { Component, inject, OnInit } from '@angular/core';
import { NoteService } from '../../shared/services/notes/note.service';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NotesData } from '../../shared/interfaces/notes-data';
import { SearchPipe } from '../../shared/pipes/search.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, SearchPipe, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  notesData: NotesData[] = [];

  noteId: any;

  searchNote: string = '';

  private readonly _NoteService = inject(NoteService);

  noteForm: FormGroup = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    content: new FormControl(null, [Validators.required]),
  });

  updateNoteForm: FormGroup = new FormGroup({
    _id: new FormControl(null, [Validators.required]),
    title: new FormControl(null, [Validators.required]),
    content: new FormControl(null, [Validators.required]),
  });

  ngOnInit(): void {
    this.getNotes();
  }

  addDataNotes(): void {
    console.log(this.noteForm.value);

    this._NoteService.addNewNote(this.noteForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this.noteForm.reset(); // reset input to be empty
        this.getNotes(); // to display notes after we add it
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getNotes(): void {
    this._NoteService.getUserNotes().subscribe({
      next: (res) => {
        console.log(res, 'get');
        this.notesData = res.notes;
      },
      error: (err) => {
        console.log(err);
        if (err.error.msg === 'not notes found') {
          this.notesData = [];
        }
      },
    });
  }

  deleteNote(id: string): void {
    this._NoteService.deleteuserNote(id).subscribe({
      next: (res) => {
        console.log(res);
        this.getNotes();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  SetUpdateNote(note: any, id: string): void {
    this.noteId = id;
    this.updateNoteForm.patchValue(note);
  }

  updateNote(): void {
    console.log(this.updateNoteForm.value);

    this._NoteService
      .updateUserNote(this.noteId, this.updateNoteForm.value)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.getNotes();
          this.updateNoteForm.reset();
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
