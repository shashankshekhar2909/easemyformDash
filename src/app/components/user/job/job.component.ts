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
    this.route.paramMap.subscribe((params:any) => {
      this.jobId = params.get('id');
      this.loadJobDetails(this.jobId);
    });
  }

  loadJobDetails(id: string): void {
    // Fetch job details using the id
    this.authService.getJobPost().subscribe({
      next: (resp:any) => {
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
