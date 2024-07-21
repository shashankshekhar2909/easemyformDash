import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit{
  constructor(
    private authService: AuthService,
    private router: Router
  ){}
  ngOnInit(): void {
    this.getUserList();
  }
  userList:any = [];
  getUserList(): void {
    // Fetch job details using the id
    this.authService.getUsers('all').subscribe({
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

  viewUserDetails = (user:any) => {
    console.log(user);
    localStorage.setItem('selectedUser',JSON.stringify(user));
    this.router.navigate(['admin/view-user-details'])

  }
}
