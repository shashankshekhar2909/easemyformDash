import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit{
  constructor(private authService: AuthService){}
  ngOnInit(): void {
    this.getUserList();
  }
  userList:any = [];
  getUserList(): void {
    // Fetch job details using the id
    this.authService.getUsers().subscribe({
      next: (resp:any) => {
        console.log(resp);
        this.userList = resp.result;
        console.log(this.userList);

      },
      error: (HttpResponse: HttpErrorResponse) => {
        console.log(HttpResponse);

      }
    });
  }
}
