import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../../services/alert.service';
import { AuthService } from '../../../services/auth.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-view-job',
  templateUrl: './view-job.component.html',
  styleUrls: ['./view-job.component.scss']
})
export class ViewJobComponent implements OnInit {
  page = 1;
  pageSize = 10;
  jobPostList: any = [];
  paginatedJobPosts: any = [];
  totalPages: number[] = [];
  selectedJob: any = null;
  totalJobs = 0;

  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.getJobs(this.page, this.pageSize);
  }

  getJobs(page: number, pageSize: number): void {
    const filters = {
      page,
      pageSize
    };

    this.authService.getJobPost(filters).subscribe({
      next: (resp: any) => {
        console.log('API Response:', resp);
        this.jobPostList = resp.results;
        this.totalJobs = resp.total; // Assuming the API response includes total number of jobs
        this.calculatePagination();
        this.updatePaginatedJobPosts();
      },
      error: (HttpResponse: HttpErrorResponse) => {
        console.error('Error fetching job posts:', HttpResponse.message);
      }
    });
  }

  calculatePagination(): void {
    if (this.totalJobs <= 0 || isNaN(this.totalJobs)) {
      this.totalPages = [];
    } else {
      const pageCount = Math.ceil(this.totalJobs / this.pageSize);
      this.totalPages = Array(pageCount).fill(0).map((_, i) => i + 1);
      console.log('Total Pages:', this.totalPages);
    }
  }

  updatePaginatedJobPosts(): void {
    console.log(this.jobPostList);

    if (this.jobPostList && this.jobPostList.length > 0) {
      const startIndex = (this.page - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      this.paginatedJobPosts = this.jobPostList.slice(startIndex, endIndex);
      console.log('Paginated Job Posts:', this.paginatedJobPosts);
    } else {
      this.paginatedJobPosts = [];
    }
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages.length) return;
    this.page = page;
    this.getJobs(this.page, this.pageSize);
  }

  selectJob(id: number): void {
    this.selectedJob = this.jobPostList[id];
    const queryParams: any = {
      jobId: this.selectedJob._id
    };
    const navigationExtras: NavigationExtras = {
      queryParams
    };
    this.router.navigate(['admin/add-job-post'], navigationExtras);
  }

  hideJob(id: number): void {
    this.selectedJob = this.jobPostList[id];
    const jobId = this.selectedJob._id;
    if (jobId) {
      this.selectedJob.active = !this.selectedJob.active;
      this.authService.updateJob(this.selectedJob).subscribe({
        next: (resp: any) => {
          this.alertService.showAlert('success', 'Job post Updated.');
          this.getJobs(this.page, this.pageSize); // Refresh the job list after update
        },
        error: (HttpResponse: HttpErrorResponse) => {
          this.alertService.showAlert('danger', HttpResponse.error.message);
        }
      });
    }
  }
}
