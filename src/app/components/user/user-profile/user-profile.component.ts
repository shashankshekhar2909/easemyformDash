import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit{
  constructor(
    private authService:AuthService,
    private router: Router,
    private alertService: AlertService
  ){}
  ngOnInit(): void {
      this.getUserDetails();
      this.getUserCV();
  }
  userProfile:any = null;
  userCV:any = null;
  getUserDetails(){
    this.authService.userProfile().subscribe({
      next: (resp:any) => {
        console.log(resp);
        this.userProfile = resp.result[0];
      },
      error: (HttpResponse: HttpErrorResponse) => {
        console.log(HttpResponse);

      }
    });
  }

  getUserCV(){
    this.authService.userCV().subscribe({
      next: (resp:any) => {
        console.log(resp);
        this.userCV = resp.results[0];
        console.log(this.userCV);
      },
      error: (HttpResponse: HttpErrorResponse) => {
        console.log(HttpResponse);

      }
    });
  }

  selectedFile: File | null = null;

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }


  uploadCV(){
    console.log('Upload');
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('category', 'user_cv');
      formData.append('userProfile', this.userCV.email_id);
      formData.append('file', this.selectedFile);
      this.authService.uploadCV(formData).subscribe({
        next: (resp: any) => {
          console.log(resp);
          if(resp){
            const cvLink = resp;
            const data = {
              cv_file_url : resp
            }
            this.authService.puttCV(data).subscribe({
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
        },
        error: (HttpResponse: HttpErrorResponse) => {
          console.log(HttpResponse);
          this.alertService.showAlert('danger', HttpResponse.error.message);
        }
      });
    }
  }

  editCV(){
    this.router.navigate(['user/user-fill-cv-form'])
  }
}
