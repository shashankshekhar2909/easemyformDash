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

  ngOnInit(): void {
      this.getJobs();
  }

  getJobs=()=>{
    this.authService.getUserJobPost().subscribe({
      next: (resp:any) => {
        this.jobPostList = resp.results;
        console.log(resp);
      },
      error: (HttpResponse: HttpErrorResponse) => {
        console.log(HttpResponse);

      }
    });
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
