import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError, throwError, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Globals } from '../_globals/endpoints.global';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  httpOptions: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    public globals: Globals
  ) {
    this.httpOptions = new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }
  private baseUrl = '/api';


  login(userForm: { email: string; password: string }): Observable<any> {
    const formData = new FormData();
    formData.append('email', userForm.email);
    formData.append('password', userForm.password);
    const endPoint = this.globals.urlJoin('users', 'signIn');
    return this.http.post(`${this.baseUrl}/user/login`, formData);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('user');
  }

  userProfile(): Observable<any> {
    const endPoint = this.baseUrl + this.globals.urlJoin('users', 'userInfo');
    return this.http.get(endPoint).pipe(
      map((response: any) => response),
      catchError((error) => throwError(error))
    );
  }

  getUserInfo(): Observable<any> {
    return this.http.get(`${this.baseUrl}/user/user-info`);
  }

  logout(): Observable<any> {
    return this.http.get(`${this.baseUrl}/user/logout`);
  }

  postCV = (cvData:any) => {
    console.log(cvData);
    return this.http.post(`${this.baseUrl}/cv/cv-form`, cvData);
  }

  formSubmitted = false;

  // signUp(userForm: any): Observable<any> {
  //   this.formSubmitted = true;
  //   console.log(userForm);
  //   const formData = new FormData();
  //   formData.append('email', userForm.email);
  //   formData.append('password1', userForm.password1);
  //   formData.append('password2', userForm.password2);
  //   formData.append('first_name', userForm.first_name);
  //   formData.append('last_name', userForm.last_name || '');
  //   formData.append('gender', userForm.gender || '');
  //   formData.append('date_of_birth', userForm.date_of_birth || '');
  //   formData.append('phone_number', userForm.phone_number || '');
  //   formData.append('address', userForm.address || '');
  //   formData.append('city', userForm.city || '');
  //   formData.append('state', userForm.state || '');
  //   formData.append('country', userForm.country || '');
  //   formData.append('zip_code', userForm.zip_code || '');

  //   const endPoint = this.globals.urlJoin('users', 'signUp');
  //   return this.http.post(endPoint, formData).pipe(
  //     map((response: any) => {
  //       this.formSubmitted = false;
  //       return response;
  //     }),
  //     catchError((error) => throwError(error))
  //   );
  // }

  signUp(userForm: any): Observable<any> {
    this.formSubmitted = true;
    console.log(userForm);
    const formData = new FormData();
    formData.append('email', userForm.email);
    formData.append('password1', userForm.password1);
    formData.append('password2', userForm.password2);
    formData.append('first_name', userForm.first_name);
    formData.append('last_name', userForm.last_name || '');
    formData.append('is_staff','true');
    formData.append('gender', userForm.gender || '');
    formData.append('date_of_birth', userForm.date_of_birth || '');
    formData.append('phone_number', userForm.phone_number || '');
    formData.append('address', userForm.address || '');
    formData.append('city', userForm.city || '');
    formData.append('state', userForm.state || '');
    formData.append('country', userForm.country || '');
    formData.append('zip_code', userForm.zip_code || '');
    return this.http.post(`${this.baseUrl}/user/register`, formData);
  }
}
