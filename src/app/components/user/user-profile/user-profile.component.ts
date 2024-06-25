import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit{
  constructor(
    private authService:AuthService,
    private router: Router
  ){}
  ngOnInit(): void {
      this.getUserDetails();
      this.getUserCV();
  }
  userProfile:any = null;
  userCV:any = null;
  getUserDetails(){
    this.authService.userProfile().subscribe({
      next: (resp:any) => {
        console.log(resp);
        this.userProfile = resp.result[0];
      },
      error: (HttpResponse: HttpErrorResponse) => {
        console.log(HttpResponse);

      }
    });
  }

  getUserCV(){
    this.authService.userCV().subscribe({
      next: (resp:any) => {
        console.log(resp);
        this.userCV = resp.results[0];
        console.log(this.userCV);
      },
      error: (HttpResponse: HttpErrorResponse) => {
        console.log(HttpResponse);

      }
    });
  }

  editCV(){
    this.router.navigate(['user/user-fill-cv-form'])
  }
}
