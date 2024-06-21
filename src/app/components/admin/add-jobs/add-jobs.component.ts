import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-jobs',
  templateUrl: './add-jobs.component.html',
  styleUrls: ['./add-jobs.component.scss']
})
export class AddJobsComponent {
  jobForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
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
