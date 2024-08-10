import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../../services/auth.service';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-update-cv',
  templateUrl: './update-cv.component.html',
  styleUrls: ['./update-cv.component.scss']
})
export class UpdateCVComponent implements OnInit {
  cvForm: FormGroup;
  userCV: any = null;
  selectedFile: File | null = null;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private alertService: AlertService
  ) {
    this.cvForm = this.fb.group({
      full_name: ['', Validators.required],
      email_id: ['', [Validators.required, Validators.email]],
      phone_number: ['', Validators.required],
      linkedin_id: [''],
      personal_details: this.fb.group({
        date_of_birth: ['', Validators.required],
        address: ['', Validators.required]
      }),
      other_details: [''],
      academics: this.fb.array([]),
      work_experience: this.fb.array([]),
      skills: this.fb.array([]),
      projects: this.fb.array([]),
      certifications: this.fb.array([]),
      languages: this.fb.array([]),
      interests: this.fb.array([]),
      achievements: this.fb.array([]),
      agree: [false, Validators.requiredTrue]
    });
  }

  ngOnInit(): void {
    this.getUserCV();
  }

  getUserCV() {
    this.authService.userCV().subscribe({
      next: (resp: any) => {
        this.userCV = resp.results[0];
        this.populateForm();
      },
      error: (HttpResponse: HttpErrorResponse) => {
        console.log(HttpResponse);
      }
    });
  }

  populateForm(): void {
    if (this.userCV) {
      this.cvForm.patchValue({
        full_name: this.userCV.full_name,
        email_id: this.userCV.email_id,
        phone_number: this.userCV.phone_number,
        linkedin_id: this.userCV.linkedin_id,
        personal_details: this.userCV.personal_details,
        other_details: this.userCV.other_details,
        agree: this.userCV.agree
      });

      this.userCV.academics.forEach((academic: any) => this.addAcademic(academic));
      this.userCV.work_experience.forEach((experience: any) => this.addWorkExperience(experience));
      this.userCV.skills.forEach((skill: any) => this.addSkill(skill));
      this.userCV.projects.forEach((project: any) => this.addProject(project));
      this.userCV.certifications.forEach((certification: any) => this.addCertification(certification));
      this.userCV.languages.forEach((language: any) => this.addLanguage(language));
      this.userCV.interests.forEach((interest: any) => this.addInterest(interest));
      this.userCV.achievements.forEach((achievement: any) => this.addAchievement(achievement));
    }
  }

  get academics(): FormArray {
    return this.cvForm.get('academics') as FormArray;
  }

  get work_experience(): FormArray {
    return this.cvForm.get('work_experience') as FormArray;
  }

  get skills(): FormArray {
    return this.cvForm.get('skills') as FormArray;
  }

  get projects(): FormArray {
    return this.cvForm.get('projects') as FormArray;
  }

  get certifications(): FormArray {
    return this.cvForm.get('certifications') as FormArray;
  }

  get languages(): FormArray {
    return this.cvForm.get('languages') as FormArray;
  }

  get interests(): FormArray {
    return this.cvForm.get('interests') as FormArray;
  }

  get achievements(): FormArray {
    return this.cvForm.get('achievements') as FormArray;
  }

  addAcademic(academic?: any): void {
    this.academics.push(this.fb.group({
      degree: [academic?.degree || '', Validators.required],
      branch: [academic?.branch || '', Validators.required],
      college: [academic?.college || '', Validators.required],
      university: [academic?.university || '', Validators.required],
      joining_date: [academic?.joining_date || '', Validators.required],
      passing_date: [academic?.passing_date || '', Validators.required],
      cgpa: [academic?.cgpa || '', Validators.required]
    }));
  }

  removeAcademic(index: number): void {
    this.academics.removeAt(index);
  }

  addWorkExperience(experience?: any): void {
    this.work_experience.push(this.fb.group({
      company: [experience?.company || '', Validators.required],
      role: [experience?.role || '', Validators.required],
      location: [experience?.location || '', Validators.required],
      joining_date: [experience?.joining_date || '', Validators.required],
      leaving_date: [experience?.leaving_date || '', Validators.required],
      description: [experience?.description || '', Validators.required],
      tasks_achievements: [experience?.tasks_achievements || '', Validators.required]
    }));
  }

  removeWorkExperience(index: number): void {
    this.work_experience.removeAt(index);
  }

  addSkill(skill?: string): void {
    this.skills.push(this.fb.control(skill || '', Validators.required));
  }

  removeSkill(index: number): void {
    this.skills.removeAt(index);
  }

  addProject(project?: any): void {
    this.projects.push(this.fb.group({
      title: [project?.title || '', Validators.required],
      description: [project?.description || '', Validators.required]
    }));
  }

  removeProject(index: number): void {
    this.projects.removeAt(index);
  }

  addCertification(certification?: any): void {
    this.certifications.push(this.fb.group({
      title: [certification?.title || '', Validators.required],
      organization: [certification?.organization || '', Validators.required],
      date: [certification?.date || '', Validators.required]
    }));
  }

  removeCertification(index: number): void {
    this.certifications.removeAt(index);
  }

  addLanguage(language?: any): void {
    this.languages.push(this.fb.group({
      language: [language?.language || '', Validators.required],
      proficiency: [language?.proficiency || '', Validators.required]
    }));
  }

  removeLanguage(index: number): void {
    this.languages.removeAt(index);
  }

  addInterest(interest?: string): void {
    this.interests.push(this.fb.control(interest || '', Validators.required));
  }

  removeInterest(index: number): void {
    this.interests.removeAt(index);
  }

  addAchievement(achievement?: string): void {
    this.achievements.push(this.fb.control(achievement || '', Validators.required));
  }

  removeAchievement(index: number): void {
    this.achievements.removeAt(index);
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.cvForm.valid) {
      // Perform form submission logic here
      if (this.userCV) {
        this.authService.puttCV(this.cvForm.value).subscribe({
          next: (resp: any) => {
            this.alertService.showAlert('success', 'CV update successful!');
          },
          error: (HttpResponse: HttpErrorResponse) => {
            console.log(HttpResponse);
            this.alertService.showAlert('danger', HttpResponse.error.message);
          }
        });
      } else {
        this.authService.postCV(this.cvForm.value).subscribe({
          next: (resp: any) => {
            this.alertService.showAlert('success', 'CV update successful!');
          },
          error: (HttpResponse: HttpErrorResponse) => {
            console.log(HttpResponse);
            this.alertService.showAlert('danger', HttpResponse.error.message);
          }
        });
      }
    }
  }

  onReset(): void {
    this.cvForm.reset();
    this.submitted = false;
    // If you want to re-populate the form with initial user data
    this.populateForm();
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  uploadCV() {
    if (this.selectedFile && this.userCV?.email_id) {
      const formData = new FormData();
      formData.append('category', 'user_cv');
      formData.append('userProfile', this.userCV.email_id);
      formData.append('file', this.selectedFile);
      this.authService.uploadCV(formData).subscribe({
        next: (resp: any) => {
          if (resp) {
            const data = { cv_file_url: resp };
            this.authService.puttCV(data).subscribe({
              next: (resp: any) => {
                this.alertService.showAlert('success', 'CV update successful!');
              },
              error: (HttpResponse: HttpErrorResponse) => {
                console.log(HttpResponse);
                this.alertService.showAlert('danger', 'CV update failed!');
              }
            });
          }
        },
        error: (HttpResponse: HttpErrorResponse) => {
          this.alertService.showAlert('danger', HttpResponse.error.message);
        }
      });
    }
  }
}
