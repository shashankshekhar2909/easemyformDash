import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-update-cv',
  templateUrl: './update-cv.component.html',
  styleUrls: ['./update-cv.component.scss']
})
export class UpdateCVComponent implements OnInit {
  cvForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
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

    this.populateForm();
  }

  populateForm(): void {
    const data: any = {};

    this.cvForm.patchValue({
      full_name: data.full_name,
      email_id: data.email_id,
      phone_number: data.phone_number,
      linkedin_id: data.linkedin_id,
      personal_details: data.personal_details,
      other_details: data.other_details,
      agree: data.agree
    });

    // data.academics.forEach((academic: any) => this.addAcademic(academic));
    // data.work_experience.forEach((experience: any) => this.addWorkExperience(experience));
    // data.skills.forEach((skill: any) => this.addSkill(skill));
    // data.projects.forEach((project: any) => this.addProject(project));
    // data.certifications.forEach((certification: any) => this.addCertification(certification));
    // data.languages.forEach((language: any) => this.addLanguage(language));
    // data.interests.forEach((interest: any) => this.addInterest(interest));
    // data.achievements.forEach((achievement: any) => this.addAchievement(achievement));
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
      tasks_achievements: [experience.task]
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
      this.authService.postCV(this.cvForm.value).subscribe({
        next: (resp:any) => {
          console.log(resp);
        },
        error: (HttpResponse: HttpErrorResponse) => {
        }
      });
    } else {
      console.log('Form is not valid');
    }
  }
}
