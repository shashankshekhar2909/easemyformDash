import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.service';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-update-cv',
  templateUrl: './update-cv.component.html',
  styleUrls: ['./update-cv.component.scss']
})
export class UpdateCVComponent implements OnInit {
  cvForm: FormGroup;

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
      photo: [''],
      personal_details: this.fb.group({
        date_of_birth: [''],
        address: ['']
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

  userCV: any = null;

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

  createAcademic(academic: any = { degree: '', branch: '', college: '', university: '', joining_date: '', passing_date: '', cgpa: '' }): FormGroup {
    return this.fb.group({
      degree: [academic.degree],
      branch: [academic.branch],
      college: [academic.college],
      university: [academic.university],
      joining_date: [academic.joining_date],
      passing_date: [academic.passing_date],
      cgpa: [academic.cgpa]
    });
  }

  addAcademic(academic?: any): void {
    this.academics.push(this.createAcademic(academic));
  }

  removeAcademic(index: number): void {
    this.academics.removeAt(index);
  }

  createWorkExperience(experience: any = { company: '', role: '', location: '', joining_date: '', leaving_date: '', description: '', tasks_achievements: '' }): FormGroup {
    return this.fb.group({
      company: [experience.company],
      role: [experience.role],
      location: [experience.location],
      joining_date: [experience.joining_date],
      leaving_date: [experience.leaving_date],
      description: [experience.description],
      tasks_achievements: [experience.tasks_achievements]
    });
  }

  addWorkExperience(experience?: any): void {
    this.work_experience.push(this.createWorkExperience(experience));
  }

  removeWorkExperience(index: number): void {
    this.work_experience.removeAt(index);
  }

  createSkill(skill: string = ''): FormGroup {
    return this.fb.group({
      skill: [skill]
    });
  }

  addSkill(skill?: string): void {
    this.skills.push(this.fb.control(skill));
  }

  removeSkill(index: number): void {
    this.skills.removeAt(index);
  }

  createProject(project: any = { title: '', description: '', duration: '' }): FormGroup {
    return this.fb.group({
      title: [project.title],
      description: [project.description],
      duration: [project.duration]
    });
  }

  addProject(project?: any): void {
    this.projects.push(this.createProject(project));
  }

  removeProject(index: number): void {
    this.projects.removeAt(index);
  }

  createCertification(certification: any = { title: '', organization: '', date: '' }): FormGroup {
    return this.fb.group({
      title: [certification.title],
      organization: [certification.organization],
      date: [certification.date]
    });
  }

  addCertification(certification?: any): void {
    this.certifications.push(this.createCertification(certification));
  }

  removeCertification(index: number): void {
    this.certifications.removeAt(index);
  }

  createLanguage(language: any = { language: '', proficiency: '' }): FormGroup {
    return this.fb.group({
      language: [language.language],
      proficiency: [language.proficiency]
    });
  }

  addLanguage(language?: any): void {
    this.languages.push(this.createLanguage(language));
  }

  removeLanguage(index: number): void {
    this.languages.removeAt(index);
  }

  createInterest(interest: string = ''): FormGroup {
    return this.fb.group({
      interest: [interest]
    });
  }

  addInterest(interest?: string): void {
    this.interests.push(this.fb.control(interest));
  }

  removeInterest(index: number): void {
    this.interests.removeAt(index);
  }

  createAchievement(achievement: string = ''): FormGroup {
    return this.fb.group({
      achievement: [achievement]
    });
  }

  addAchievement(achievement?: string): void {
    this.achievements.push(this.fb.control(achievement));
  }

  removeAchievement(index: number): void {
    this.achievements.removeAt(index);
  }

  onSubmit(): void {
    if (this.cvForm.valid) {
      if(this.userCV){
        this.authService.puttCV(this.cvForm.value).subscribe({
          next: (resp: any) => {
            console.log(resp);
            this.alertService.showAlert('success', 'CV update successful!');
          },
          error: (HttpResponse: HttpErrorResponse) => {
            console.log(HttpResponse);
            this.alertService.showAlert('danger', 'CV update failed!');
          }
        });
      } else {
        this.authService.postCV(this.cvForm.value).subscribe({
          next: (resp: any) => {
            console.log(resp);
            this.alertService.showAlert('success', 'CV update successful!');
          },
          error: (HttpResponse: HttpErrorResponse) => {
            console.log(HttpResponse);
            this.alertService.showAlert('danger', 'CV update failed!');
          }
        });

      }
    } else {
      console.log('Form is not valid');
    }
  }

}
