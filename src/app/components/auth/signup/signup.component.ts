import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  signUpForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router:Router,
    private authService: AuthService,
    private alertService: AlertService
  ) {
    this.signUpForm = this.fb.group({
      first_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password1: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', [Validators.required, Validators.minLength(6)]],
      agree: [false, Validators.requiredTrue]
    }, { validator: this.passwordMatchValidator });

  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password1')?.value === form.get('password2')?.value
      ? null : { 'mismatch': true };
  }

  submitting = false;

  postSignUp = () => {
    if(!this.signUpForm.invalid){
      this.authService.signUp(this.signUpForm.value).subscribe({
        next: (resp:any) => {
          console.log(resp);
          this.submitting = false;
          this.signUpForm.reset();
          this.alertService.showAlert('success', 'Sign-up successful!');
        },
        error: (HttpResponse: HttpErrorResponse) => {
          this.alertService.showAlert('danger', 'Failed to signup');
          // this._snackBar.open(`${HttpResponse.error.detail}`, 'OK', {
          //   duration: 3000,
          //   panelClass: ['error-snackbar']
          // });
        }
      });
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

  gotoAdminDash() {
    this.router.navigate(['admin']);
  }
}
