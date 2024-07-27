import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../../services/alert.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-reset-password-token',
  templateUrl: './reset-password-token.component.html',
  styleUrl: './reset-password-token.component.scss'
})
export class ResetPasswordTokenComponent {
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private fb: FormBuilder,
    private alertService: AlertService,
    private router:Router) {
      this.resetPasswordForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        url: ['', [Validators.required]],
      });
    }

  ngOnInit(): void {
    this.authService.getUserInfo().subscribe(data => {
      console.log(data);
      this.router.navigate(['/admin']);
    });
    const currentDomain = window.location.origin; // Domain
    console.log(currentDomain);
    let url = currentDomain+'/reset-password'
    this.resetPasswordForm.patchValue({
      url:url
    });
    this.checkLogin();
  }

  onSubmit() {
    if (this.resetPasswordForm.valid) {
      console.log(this.resetPasswordForm.value);
      this.resetPassword();
      // Handle login logic here
    } else {
      this.alertService.showAlert('warning', 'Please fill the details');
    }
  }
  submitting = false;
  resetPasswordForm: FormGroup;

  resetPassword(){
    this.submitting = true;
    console.log(this.resetPasswordForm);
    if (this.resetPasswordForm.valid) {
      console.log(this.resetPasswordForm.value);
      // Handle login logic here
      console.log(this.resetPasswordForm);
      this.authService.resetPassword(this.resetPasswordForm.value).subscribe({
        next: (resp:any) => {
          console.log(resp);
          this.alertService.showAlert('success', resp.message);
        },
        error: (HttpResponse: HttpErrorResponse) => {
          console.log(HttpResponse);
          this.alertService.showAlert('danger', HttpResponse.error.message);
        }
      });
    }else{
      this.displayValidationErrors();
    }
  }

  displayValidationErrors() {
    for (const control in this.resetPasswordForm.controls) {
      if (this.resetPasswordForm.controls.hasOwnProperty(control)) {
        this.resetPasswordForm.controls[control].markAsTouched();
      }
    }
  }

  checkLogin(){
    this.authService.getUserInfo().subscribe({
      next: (resp:any) => {
        console.log(resp);
        const userProfile = resp.result[0];
        this.submitting = false;
        console.log(userProfile.is_staff);
        if(userProfile.is_staff){
          this.router.navigate(['/admin/'])
        } else {
          this.router.navigate(['/user/'])
        }
      },
      error: (HttpResponse: HttpErrorResponse) => {
        console.log(HttpResponse);
      }
    });
  }

  get email() {
    return this.resetPasswordForm.get('email');
  }

  get password() {
    return this.resetPasswordForm.get('password');
  }

  get confirmpassword() {
    return this.resetPasswordForm.get('confirmpassword');
  }

  get token() {
    return this.resetPasswordForm.get('token');
  }

}
