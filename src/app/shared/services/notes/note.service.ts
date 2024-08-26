import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  constructor(private _HttpClient: HttpClient) {}

  addNewNote(data: object): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/notes`, data, {
      headers: { token: '3b8ny__' + localStorage.getItem('userToken') },
    });
  }

  getUserNotes(): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/notes`, {
      headers: { token: '3b8ny__' + localStorage.getItem('userToken') },
    });
  }

  deleteuserNote(id: string): Observable<any> {
    return this._HttpClient.delete(
      `${environment.baseUrl}/api/v1/notes/${id}`,
      {
        headers: { token: '3b8ny__' + localStorage.getItem('userToken') },
      }
    );
  }

  updateUserNote(id: string, data: object): Observable<any> {
    return this._HttpClient.put(
      `${environment.baseUrl}/api/v1/notes/${id}`,
      data,
      {
        headers: { token: '3b8ny__' + localStorage.getItem('userToken') },
      }
    );
  }
}
