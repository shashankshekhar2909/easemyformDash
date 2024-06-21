import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userheader',
  templateUrl: './userheader.component.html',
  styleUrl: './userheader.component.scss'
})
export class UserheaderComponent implements OnInit{
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

      }
    });
  }
}
