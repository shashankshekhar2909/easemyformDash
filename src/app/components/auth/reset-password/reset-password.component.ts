import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../../services/alert.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent implements OnInit{
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private fb: FormBuilder,
    private alertService: AlertService,
    private router:Router) {
      this.resetPasswordForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        token: ['', [Validators.required]],
        password1: ['', [Validators.required, Validators.minLength(6)]],
        password2: ['', [Validators.required, Validators.minLength(6)]]
      }
      , { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password1')?.value === form.get('password2')?.value
      ? null : { 'mismatch': true };
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params:any) => {
      console.log(params);
      this.resetPasswordForm.patchValue({
        email:params.email
      });
      this.resetPasswordForm.patchValue({
        token:params.reset_token
      });
    });
    this.authService.getUserInfo().subscribe(data => {
      console.log(data);
      this.router.navigate(['/admin']);
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
    console.log(this.resetPasswordForm.valid);
    if (this.resetPasswordForm.valid) {
      console.log(this.resetPasswordForm.value);
      // Handle login logic here
      console.log(this.resetPasswordForm);
      this.authService.resetPasswordSubmit(this.resetPasswordForm.value).subscribe({
        next: (resp:any) => {
          console.log(resp);
          this.alertService.showAlert('success', 'Password reset successfull');
          this.router.navigate(['/login'])
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

  showPassword1 = false;
  showPassword2 = false;

  togglePasswordVisibility(field:any) {
    if (field === 'password1') {
      this.showPassword1 = !this.showPassword1;
    } else if (field === 'password2') {
      this.showPassword2 = !this.showPassword2;
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
