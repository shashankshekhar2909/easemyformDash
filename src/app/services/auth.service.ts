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

  postJob = (jobData:any) => {
    jobData = {
      designation: "Data Scientist",
    company: "Facebook",
    company_website: "https://www.facebook.com",
    company_description: "Facebook, Inc. is an American technology conglomerate based in Menlo Park, California. It was founded by Mark Zuckerberg, along with his roommates and fellow Harvard University students.",
    location: "San Francisco",
    salary: "15LPA",
    experience: "3 years",
    skills: [
        "Python, R, SQL"
    ],
    qualification: [
        "Proficiency in Python, R, and SQL. Strong analytical skills."
    ],
    responsibilities: [
        "Analyze user data and create data-driven solutions to improve Facebook's user experience."
    ],
    job_type: "Full Time",
    job_description_text: "Facebook is hiring Data Scientist for San Francisco location with 3 years of experience. The candidate should have good knowledge of Python, R, SQL and should have a relevant degree.",
    job_description_file: "https://www.facebook.com/job_description.pdf",
    date_of_posting: "2024-06-01",
    last_date_to_apply: "2024-07-15",
    contact_info: {
        email: "john.doe@facebook.com",
        phone: "1234567890",
        linkedin: "https://www.linkedin.com/in/john-doe"
    },
    keywords: [
        "Data Scientist, Facebook, San Francisco, Python, R, SQL, Full Time"
    ],
    why_work_here: [
        "Facebook offers a dynamic work environment with a lot of opportunities for growth and learning."
    ],
    work_mode: "On-site",
    extra: "Competitive salary and benefits package",
    active: true
    }
    console.log(jobData);
    return this.http.post(`${this.baseUrl}/job/job-feeds`, jobData);
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
