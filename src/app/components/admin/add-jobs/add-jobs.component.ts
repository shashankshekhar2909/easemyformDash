import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from '../../../services/alert.service';
declare var $: any;
@Component({
  selector: 'app-add-jobs',
  templateUrl: './add-jobs.component.html',
  styleUrls: ['./add-jobs.component.scss']
})
export class AddJobsComponent implements OnInit{
  jobForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private alertService: AlertService,

  ) {
    this.jobForm = this.fb.group({
      designation: ['', Validators.required],
      company: ['', Validators.required],
      companyWebsite: ['', [Validators.required, Validators.pattern('https?://.+')]],
      companyDescription: ['', Validators.required],
      location: ['', Validators.required],
      salary: ['', Validators.required],
      jobType: ['', Validators.required],
      experience: ['', Validators.required],
      jobDescription: ['', Validators.required],
      dateOfPosting: ['', Validators.required],
      lastDateToApply: ['', Validators.required],
      workMode: ['', Validators.required],
      active: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params:any) => {
      console.log(params);
      if(params){
        this.getJobs(params.jobId);
      }
    });
  }

  getJobs=(id:any)=>{
    const data={
      _id:id
    }
    this.authService.getJobDetails(data).subscribe({
      next: (resp:any) => {
        console.log(resp);
        this.fillFormWithData(resp.results[0]);
      },
      error: (HttpResponse: HttpErrorResponse) => {
        console.log(HttpResponse);
      }
    });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  fillFormWithData(rawData:any) {
    console.log(rawData);
    const jobData = {
      designation: rawData.designation,
      company: rawData.company,
      companyWebsite: rawData.company_website,
      companyDescription: rawData.company_description,
      location: rawData.location,
      salary: rawData.salary,
      jobType: rawData.job_type,
      experience: rawData.experience,
      jobDescription: rawData.job_description_text,
      dateOfPosting: rawData.date_of_posting,
      lastDateToApply: rawData.last_date_to_apply,
      workMode: rawData.work_mode,
      active: rawData.active
    };

    console.log(jobData);
    jobData.dateOfPosting = this.formatDate(jobData.dateOfPosting);
    jobData.lastDateToApply = this.formatDate(jobData.lastDateToApply);
    this.jobForm.patchValue(jobData);
  }

  onSubmit() {
    this.authService.postJob(this.jobForm.value).subscribe({
      next: (resp:any) => {
        console.log(resp);
        // this.submitting = false;
        // this.signUpForm.reset();
      },
      error: (HttpResponse: HttpErrorResponse) => {
        // this._snackBar.open(`${HttpResponse.error.detail}`, 'OK', {
        //   duration: 3000,
        //   panelClass: ['error-snackbar']
        // });
      }
    });
    // if (this.jobForm.valid) {
    //   console.log('Job Post:', this.jobForm.value);
    //   // Handle form submission logic here
    // } else {
    //   console.error('Form is invalid');
    // }
  }
}
