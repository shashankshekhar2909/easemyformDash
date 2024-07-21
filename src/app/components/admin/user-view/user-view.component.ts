import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrl: './user-view.component.scss'
})
export class UserViewComponent implements OnInit{

  constructor(){}
  ngOnInit(): void {
    console.log(localStorage.getItem('selectedUser'));
  }
  // getUserList(): void {
  //   // Fetch job details using the id
  //   this.authService.getUsers('all').subscribe({
  //     next: (resp:any) => {
  //       console.log(resp);
  //       this.userList = resp.result;
  //       console.log(this.userList);

  //     },
  //     error: (HttpResponse: HttpErrorResponse) => {
  //       console.log(HttpResponse);

  //     }
  //   });
  // }
}
