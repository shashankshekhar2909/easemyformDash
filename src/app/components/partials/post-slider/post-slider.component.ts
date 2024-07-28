import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-post-slider',
  templateUrl: './post-slider.component.html',
  styleUrl: './post-slider.component.scss'
})
export class PostSliderComponent implements OnInit{

  constructor(
    private authService: AuthService,
    private router: Router
  ){}
  page = 1;
  pageSize = 3;
  jobPostList: any[] = [];
  jobPostGrid: any[][] = [];
  ngOnInit(): void {
    this.getJobPosts();
  }

  getJobPosts() {
    const filters = {}; // Define your filters here
    this.authService.getUserJobPost().subscribe({
      next: (resp: any) => {
        this.jobPostList = resp.results;
        this.jobPostGrid = this.groupJobsIntoGrid(this.jobPostList, 3);
        console.log(this.jobPostGrid);
      },
      error: (HttpResponse: HttpErrorResponse) => {
        console.log(HttpResponse);
      }
    });
  }

  groupJobsIntoGrid(jobs: any[], itemsPerGroup: number): any[][] {
    return jobs.reduce((acc, curr, index) => {
      if (index % itemsPerGroup === 0) {
        acc.push([curr]);
      } else {
        acc[acc.length - 1].push(curr);
      }
      return acc;
    }, []);
  }

  viewJob = (job:any) => {
    console.log(job);
    const queryParams: any = {
      jobId: job._id
    };
    const navigationExtras: NavigationExtras = {
      queryParams:queryParams
    };
    this.router.navigate(['user/jobDetails'],navigationExtras);
  }
}
