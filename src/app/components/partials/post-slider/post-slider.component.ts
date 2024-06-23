import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-post-slider',
  templateUrl: './post-slider.component.html',
  styleUrl: './post-slider.component.scss'
})
export class PostSliderComponent implements OnInit{

  constructor(
    private authService: AuthService
  ){}
  page = 1;
  pageSize = 3;
  jobPostList:any = [];
  ngOnInit(): void {
      this.getJobs(this.page, this.pageSize);
  }

  getJobs=(page:any, pageSize:any)=>{
    const filters = {
      page: this.page,
      pageSize: this.pageSize
    }
    this.authService.getJobPost(filters).subscribe({
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
