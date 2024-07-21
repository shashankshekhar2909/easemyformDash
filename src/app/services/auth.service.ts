import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError, throwError, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Globals } from '../_globals/endpoints.global';
import { environment } from '../../environments/env';

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
  private baseUrl = 'api';
  // private baseUrl = environment.baseUrl;


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

  userCV(email?:any): Observable<any> {
    let params = new HttpParams();
    if (email) {
      if (email !== undefined && email !== null) {
        params = params.append('email', email);
      };
    }

    return this.http.get(`${this.baseUrl}/cv/cv-form`, { params });
  }

  getUsers(user?:any): Observable<any> {
    user = 'all';
    let params = new HttpParams();
    if (user) {
      if (user !== undefined && user !== null) {
        params = params.append('email', user);
      };
    }

    return this.http.get(`${this.baseUrl}/user/user-info`, { params });
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

  puttCV = (cvData:any) => {
    console.log(cvData);
    return this.http.put(`${this.baseUrl}/cv/cv-form`, cvData);
  }

  postJob = (jobData:any) => {
    jobData = [jobData];
    console.log(jobData);
    return this.http.post(`${this.baseUrl}/job/job-feeds`, jobData);
  }

  formSubmitted = false;

  signUp(userForm: any): Observable<any> {
    this.formSubmitted = true;
    console.log(userForm);
    const formData = new FormData();
    formData.append('email', userForm.email);
    formData.append('password1', userForm.password1);
    formData.append('password2', userForm.password2);
    formData.append('first_name', userForm.first_name);
    formData.append('last_name', userForm.last_name || '');
    formData.append('is_staff','false');
    formData.append('gender', userForm.gender || '');
    formData.append('date_of_birth', userForm.date_of_birth || '2000-01-01');
    formData.append('phone_number', userForm.phone_number || '');
    formData.append('address', userForm.address || '');
    formData.append('city', userForm.city || '');
    formData.append('state', userForm.state || '');
    formData.append('country', userForm.country || '');
    formData.append('zip_code', userForm.zip_code || '');
    return this.http.post(`${this.baseUrl}/user/register`, formData);
  }

  getJobPost = (filters?:any) => {
    // const endPoint = this.baseUrl + this.globals.urlJoin('jobs', 'jobFeeds');
    // return this.http.get(`${this.baseUrl}/job/job-feeds`);
    const params = new URLSearchParams();

    // if (filters) {
    //   Object.keys(filters).forEach(key => {
    //     if (filters[key] !== undefined && filters[key] !== null) {
    //       params.append(key, filters[key]);
    //     }
    //   });
    // }

    if(filters){
      if (filters.page !== undefined && filters.page !== null) {
        params.append('page', filters.page.toString());
      }

      if (filters.pageSize !== undefined && filters.pageSize !== null) {
        params.append('size', filters.pageSize.toString());
      }
    }
    // const endPoint = this.baseUrl + this.globals.urlJoin('jobs', 'jobFeeds');
    return this.http.get(`${this.baseUrl}/job/job-feeds?${params.toString()}`);
  }

  getUserList = (filters?:any) => {
    const params = new URLSearchParams();
    if(filters){
      if (filters.page !== undefined && filters.page !== null) {
        params.append('page', filters.page.toString());
      }

      if (filters.pageSize !== undefined && filters.pageSize !== null) {
        params.append('size', filters.pageSize.toString());
      }
    }
    // const endPoint = this.baseUrl + this.globals.urlJoin('jobs', 'jobFeeds');
    return this.http.get(`${this.baseUrl}/user/?${params.toString()}`);
  }

}
