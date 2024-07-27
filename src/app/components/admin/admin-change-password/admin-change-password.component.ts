import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../../services/alert.service';
import { AuthService } from '../../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-admin-change-password',
  templateUrl: './admin-change-password.component.html',
  styleUrl: './admin-change-password.component.scss'
})
export class AdminChangePasswordComponent {


  changePasswordForm: FormGroup
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private fb: FormBuilder,
    private alertService: AlertService,
    private router:Router
  ){
    this.changePasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      oldPassword: ['', [Validators.required]],
      password1: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', [Validators.required, Validators.minLength(6)]]
    }
    , { validator: this.passwordMatchValidator });
  }
  submitting = false;
  passwordMatchValidator(form: FormGroup) {
    return form.get('password1')?.value === form.get('password2')?.value
      ? null : { 'mismatch': true };
  }

  ngOnInit(): void {
    this.getUserData();
  }

  onSubmit() {
    if (this.changePasswordForm.valid) {
      console.log(this.changePasswordForm.value);
      this.changePassword();
      // Handle login logic here
    } else {
      this.alertService.showAlert('warning', 'Please fill the details');
    }
  }

  changePassword(){
    this.submitting = true;
    console.log(this.changePasswordForm);
    console.log(this.changePasswordForm.valid);
    if (this.changePasswordForm.valid) {
      console.log(this.changePasswordForm.value);
      // Handle login logic here
      console.log(this.changePasswordForm);
      this.authService.changePasswordSubmit(this.changePasswordForm.value).subscribe({
        next: (resp:any) => {
          console.log(resp);
          this.alertService.showAlert('success', 'Password changed successfull');
          this.router.navigate(['/admin'])
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
    for (const control in this.changePasswordForm.controls) {
      if (this.changePasswordForm.controls.hasOwnProperty(control)) {
        this.changePasswordForm.controls[control].markAsTouched();
      }
    }
  }

  showPassword0 = false;
  showPassword1 = false;
  showPassword2 = false;

  togglePasswordVisibility(field:any) {
    if (field === '0') {
      this.showPassword0 = !this.showPassword0;
    }else if (field === '1') {
      this.showPassword1 = !this.showPassword1;
    } else if (field === '2') {
      this.showPassword2 = !this.showPassword2;
    }
  }

  getUserData(){
    this.authService.getUserInfo().subscribe({
      next: (resp:any) => {
        console.log(resp);
        const userProfile = resp.result[0];
        this.changePasswordForm.patchValue({
          email:userProfile.email
        });
        this.submitting = false;
      },
      error: (HttpResponse: HttpErrorResponse) => {
        console.log(HttpResponse);
      }
    });
  }

  get email() {
    return this.changePasswordForm.get('email');
  }

  get oldPassword() {
    return this.changePasswordForm.get('oldPassword');
  }

  get password1() {
    return this.changePasswordForm.get('password1');
  }

  get password2() {
    return this.changePasswordForm.get('password12');
  }
}
