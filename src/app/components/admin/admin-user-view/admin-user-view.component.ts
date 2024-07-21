import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-admin-user-view',
  templateUrl: './admin-user-view.component.html',
  styleUrl: './admin-user-view.component.scss'
})
export class AdminUserViewComponent implements OnInit{
  constructor(private authService:AuthService){}
  selectedUser:any = null;
  userCV:any = null;
  ngOnInit(): void {
    if(localStorage.getItem('selectedUser')){
      this.selectedUser = JSON.parse(localStorage.getItem('selectedUser')||'');
      console.log(this.selectedUser);
      this.getUserCV(this.selectedUser);
    }
  }

  getUserCV(user:any){
    console.log(user);
    this.authService.userCV(user.email).subscribe({
      next: (resp:any) => {
        console.log(resp.results[0]);
        this.userCV = resp.results[0];
        console.log(this.userCV);
      },
      error: (HttpResponse: HttpErrorResponse) => {
        console.log(HttpResponse);

      }
    });
  }

}
