import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrl: './adminhome.component.scss'
})
export class AdminhomeComponent implements OnInit{
  page = 1;
  pageSize = 10;
  jobPostList:any = [];
  constructor(
    private authService: AuthService,
    private alertService: AlertService
  ){}

  ngOnInit(): void {
    this.getJobs(this.page, this.pageSize);
    // this.getUsers();
  }
  getJobs=(page:any, pageSize:any)=>{
    const filters = {
      page: this.page,
      pageSize: this.pageSize
    }
    this.authService.getJobPost().subscribe({
      next: (resp:any) => {
        this.jobPostList = resp.results;
        console.log(resp);
      },
      error: (HttpResponse: HttpErrorResponse) => {
        console.log(HttpResponse);

      }
    });
  }

  getUsers=(page?:any, pageSize?:any)=>{
    const filters = {
      page: this.page,
      pageSize: this.pageSize
    }
    this.authService.getUserList().subscribe({
      next: (resp:any) => {
        this.jobPostList = resp.results;
        console.log(resp);
      },
      error: (HttpResponse: HttpErrorResponse) => {
        console.log(HttpResponse);

      }
    });
  }
}
