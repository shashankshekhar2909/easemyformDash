import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrl: './job.component.scss'
})
export class JobComponent  implements OnInit{
  jobId: string = '';
  jobPostList:[] = [];
  jobDetail:any = null;
  jobChips:any = [];
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params:any) => {
      console.log(params);
      if(params){
        this.jobId = params.jobId;
        this.loadJobDetails(this.jobId);
        }
    });
  }

  loadJobDetails(id: string): void {
    console.log(id);
    // Fetch job details using the id
    const jobId = {
      _id:id
    }
    this.authService.getJobDetails(jobId).subscribe({
      next: (resp:any) => {
        console.log(resp);
        this.jobPostList = resp.results;
        this.jobDetail = this.jobPostList.find((job:any) => job._id === id);
        this.jobChips = this.jobDetail.keywords[0].split(',').map((chip:any) => chip.trim());
        console.log(this.jobDetail);
        console.log(resp);
      },
      error: (HttpResponse: HttpErrorResponse) => {
        console.log(HttpResponse);

      }
    });
  }

}
