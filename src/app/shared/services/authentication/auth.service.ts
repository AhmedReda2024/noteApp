import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { loginData, UserData } from '../../interfaces/user-data';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  decodedData: BehaviorSubject<any> = new BehaviorSubject(null);
  constructor(private _HttpClient: HttpClient) {}

  setRegisterData(data: UserData): Observable<any> {
    return this._HttpClient.post(
      `${environment.baseUrl}/api/v1/users/signUp`,
      data
    );
  }
  setLoginData(_loginData: loginData): Observable<any> {
    return this._HttpClient.post(
      `${environment.baseUrl}/api/v1/users/signIn`,
      _loginData
    );
  }

  shareUserData(): void {
    const token = JSON.stringify(localStorage.getItem('userToken'));
    this.decodedData.next(jwtDecode(token));
    console.log(this.decodedData.getValue());
  }
}
