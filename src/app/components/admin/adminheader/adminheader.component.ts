import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-adminheader',
  templateUrl: './adminheader.component.html',
  styleUrl: './adminheader.component.scss'
})
export class AdminheaderComponent implements OnInit{

  constructor(
    private authService: AuthService,
    private router: Router
  ){}

  userProfile:any = null;

  ngOnInit(): void {
    this.getUserDetails();
  }
  logout(){
    this.authService.logout().subscribe({
      next: (resp:any) => {
        console.log(resp);
        this.router.navigate(['']);
      },
      error: (HttpResponse: HttpErrorResponse) => {
        console.log(HttpResponse);

      }
    });
  }

  getUserDetails(){
    this.authService.userProfile().subscribe({
      next: (resp:any) => {
        console.log(resp);
        this.userProfile = resp.result[0];
      },
      error: (HttpResponse: HttpErrorResponse) => {
        console.log(HttpResponse);
        this.router.navigate(['']);
      }
    });
  }
}
