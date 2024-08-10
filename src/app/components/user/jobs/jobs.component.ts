import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.scss'
})
export class JobsComponent implements OnInit{
  constructor(
    private authService: AuthService,
    private router: Router
  ){
  }
  jobPostList:any = [];

  jobPage = 1;
  jobCount = 0;
  jobPageCount = 0;
  showCount = 12;
  ngOnInit(): void {
    const filter = {
      page: this.jobPage,
      pageSize: this.showCount
    }
    this.getJobs(filter)
  }

  getJobs=(filter:any)=>{
    this.authService.getUserJobPost(filter).subscribe({
      next: (resp:any) => {
        this.jobPostList = resp.results;
        this.jobPageCount = resp.total_pages;
        console.log(resp);
      },
      error: (HttpResponse: HttpErrorResponse) => {
        console.log(HttpResponse);

      }
    });
  }
  filter = {
    page: this.jobPage,
    pageSize: this.showCount
  }
  changePage(op:any){
    console.log(op);
    if(op== '+'){
      this.jobPage++;
      this.filter.page = this.jobPage;
      this.getJobs(this.filter);
    } else if(op == '-'){
      this.jobPage--;
      this.filter.page = this.jobPage;
      this.getJobs(this.filter);
    } else{
      console.log('here');
      this.jobPage = op;
      this.filter.page = this.jobPage;
      this.getJobs(this.filter);
    }
  }

  viewJob = (job:any) => {
    console.log(job);
    const queryParams: any = {
      jobId: job._id
    };
    const navigationExtras: NavigationExtras = {
      queryParams:queryParams
    };
    console.log(navigationExtras);

    this.router.navigate(['user/jobDetails'],navigationExtras);
  }
}
