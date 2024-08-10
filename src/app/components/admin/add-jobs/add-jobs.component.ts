import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-add-jobs',
  templateUrl: './add-jobs.component.html',
  styleUrls: ['./add-jobs.component.scss']
})
export class AddJobsComponent implements OnInit {
  jobForm: FormGroup;
  jobId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private alertService: AlertService
  ) {
    this.jobForm = this.fb.group({
      designation: ['', Validators.required],
      company: ['', Validators.required],
      company_website: ['', [Validators.pattern('https?://.+')]], // Remove Validators.required
      company_description: [''], // Remove Validators.required
      location: [''], // Remove Validators.required
      salary: [''], // Remove Validators.required
      job_type: [''], // Remove Validators.required
      experience: [''], // Remove Validators.required
      job_description_text: [''], // Remove Validators.required
      date_of_posting: [''], // Remove Validators.required
      last_date_to_apply: [''], // Remove Validators.required
      work_mode: [''], // Remove Validators.required
      active: [true, Validators.required],
      skills: this.fb.array([]),
      qualification: this.fb.array([]),
      responsibilities: this.fb.array([]),
      contact_info: this.fb.group({
        email: [''], // Remove Validators.required
        phone: [''], // Remove Validators.required
        linkedin: [''] // Remove Validators.required
      }),
      keywords: this.fb.array([]),
      why_work_here: this.fb.array([]),
      extra: ['']
    });
  }

  get skills() {
    return this.jobForm.get('skills') as FormArray;
  }

  get qualification() {
    return this.jobForm.get('qualification') as FormArray;
  }

  get responsibilities() {
    return this.jobForm.get('responsibilities') as FormArray;
  }

  get keywords() {
    return this.jobForm.get('keywords') as FormArray;
  }

  get whyWorkHere() {
    return this.jobForm.get('why_work_here') as FormArray;
  }

  addSkill() {
    this.skills.push(this.fb.control(''));
  }

  removeSkill(index: number) {
    this.skills.removeAt(index);
  }

  addQualification() {
    this.qualification.push(this.fb.control(''));
  }

  removeQualification(index: number) {
    this.qualification.removeAt(index);
  }

  addResponsibility() {
    this.responsibilities.push(this.fb.control(''));
  }

  removeResponsibility(index: number) {
    this.responsibilities.removeAt(index);
  }

  addKeyword() {
    this.keywords.push(this.fb.control(''));
  }

  removeKeyword(index: number) {
    this.keywords.removeAt(index);
  }

  addWhyWorkHere() {
    this.whyWorkHere.push(this.fb.control(''));
  }

  removeWhyWorkHere(index: number) {
    this.whyWorkHere.removeAt(index);
  }

  updateMode = false;

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      if (params.jobId) {
        this.updateMode = true;
        this.getJobs(params.jobId);
        this.jobId = params.jobId;
      }
    });
  }

  getJobs(id: string): void {
    const data = { _id: id };
    this.authService.getJobDetailsAdmin(data).subscribe({
      next: (resp: any) => {
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

  fillFormWithData(rawData: any): void {
    this.jobForm.patchValue({
      designation: rawData.designation,
      company: rawData.company,
      company_website: rawData.company_website,
      company_description: rawData.company_description,
      location: rawData.location,
      salary: rawData.salary,
      job_type: rawData.job_type,
      experience: rawData.experience,
      job_description_text: rawData.job_description_text,
      date_of_posting: this.formatDate(rawData.date_of_posting),
      last_date_to_apply: this.formatDate(rawData.last_date_to_apply),
      work_mode: rawData.work_mode,
      active: rawData.active,
      contact_info: {
        email: rawData.contact_info.email,
        phone: rawData.contact_info.phone,
        linkedin: rawData.contact_info.linkedin
      },
      extra: rawData.extra
    });

    this.clearFormArray(this.skills);
    this.clearFormArray(this.qualification);
    this.clearFormArray(this.responsibilities);
    this.clearFormArray(this.keywords);
    this.clearFormArray(this.whyWorkHere);

    rawData.skills.forEach((skill: string) => this.skills.push(this.fb.control(skill)));
    rawData.qualification.forEach((qual: string) => this.qualification.push(this.fb.control(qual)));
    rawData.responsibilities.forEach((responsibility: string) => this.responsibilities.push(this.fb.control(responsibility)));
    rawData.keywords.forEach((keyword: string) => this.keywords.push(this.fb.control(keyword)));
    rawData.why_work_here.forEach((reason: string) => this.whyWorkHere.push(this.fb.control(reason)));
  }

  clearFormArray(formArray: FormArray) {
    while (formArray.length !== 0) {
      formArray.removeAt(0);
    }
  }

  onSubmit(): void {
    if (this.jobForm.valid) {
      this.authService.postJob(this.jobForm.value).subscribe({
        next: (resp: any) => {
          this.alertService.showAlert('success', 'Job post Created.');
        },
        error: (HttpResponse: HttpErrorResponse) => {
          this.alertService.showAlert('danger', HttpResponse.error.message);
        }
      });
    } else {
      console.error('Form is invalid');
      this.jobForm.markAllAsTouched(); // Mark all fields as touched to trigger validation
    }
  }

  update(): void {
    if (this.jobForm.valid) {
      this.jobForm.addControl('_id', this.fb.control(this.jobId, Validators.required));
      this.authService.updateJob(this.jobForm.value).subscribe({
        next: (resp: any) => {
          this.alertService.showAlert('success', 'Job post Updated.');
        },
        error: (HttpResponse: HttpErrorResponse) => {
          this.alertService.showAlert('danger', HttpResponse.error.message);
        }
      });
    } else {
      console.error('Form is invalid');
      this.jobForm.markAllAsTouched(); // Mark all fields as touched to trigger validation
    }
  }

  resetForm(): void {
    this.jobForm.reset({
      designation: '',
      company: '',
      company_website: '',
      company_description: '',
      location: '',
      salary: '',
      job_type: '',
      experience: '',
      job_description_text: '',
      date_of_posting: '',
      last_date_to_apply: '',
      work_mode: '',
      active: true,
      contact_info: {
        email: '',
        phone: '',
        linkedin: ''
      },
      extra: ''
    });

    // Clear all FormArrays
    this.clearFormArray(this.skills);
    this.clearFormArray(this.qualification);
    this.clearFormArray(this.responsibilities);
    this.clearFormArray(this.keywords);
    this.clearFormArray(this.whyWorkHere);
  }
}
