import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { AlertService } from '../../../services/alert.service';
import { AuthService } from '../../../services/auth.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-view-job',
  templateUrl: './view-job.component.html',
  styleUrl: './view-job.component.scss'
})
export class ViewJobComponent {
  page = 1;
  pageSize = 10;
  jobPostList:any = [];
  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router
  ){}

  selectedJob:any = null;

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

  selectJob(id:any){
    console.log(id);
    console.log(this.jobPostList[id]);
    this.selectedJob = this.jobPostList[id];
    const queryParams: any = {
      jobId: this.selectedJob._id
    };
    const navigationExtras: NavigationExtras = {
      queryParams:queryParams
    };
    this.router.navigate(['admin/add-job-post'],navigationExtras)
  }
}
