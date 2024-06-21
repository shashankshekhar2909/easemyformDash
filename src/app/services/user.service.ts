import { Injectable } from '@angular/core';
import { env } from '../../environment/env';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from 'express';
import { map, catchError, throwError } from 'rxjs';
import { Globals } from '../_globals/endpoints.global';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  httpOptions: any;
  private baseUrl = '/api';
  constructor(
    private http: HttpClient,
    private router: Router,
    public globals: Globals
  ) {
    this.httpOptions = new HttpHeaders({
      'Content-Type': 'form',
    });
  }
  postCV = (cvData:any) => {
    console.log(cvData);
    return this.http.post(`${this.baseUrl}/cv/cv-form`, cvData);
  }

}
