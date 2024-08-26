import { Pipe, PipeTransform } from '@angular/core';
import { NotesData } from '../interfaces/notes-data';

@Pipe({
  name: 'search',
  standalone: true,
})
export class SearchPipe implements PipeTransform {
  transform(notes: NotesData[], term: string): NotesData[] {
    return notes.filter((note) =>
      note.title.toLowerCase().includes(term.toLowerCase())
    );
  }
}
