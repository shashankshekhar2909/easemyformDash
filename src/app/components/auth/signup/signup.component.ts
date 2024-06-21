import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

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
    private authService: AuthService
  ) {
    this.signUpForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password1: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', [Validators.required, Validators.minLength(6)]],
      first_name: ['', [Validators.required]],
      date_of_birth:['1997-09-23'],
    });
  }

  submitting = false;

  postSignUp = () => {
    this.authService.signUp(this.signUpForm.value).subscribe({
      next: (resp:any) => {
        console.log(resp);
        this.submitting = false;
        this.signUpForm.reset();
      },
      error: (HttpResponse: HttpErrorResponse) => {
        // this._snackBar.open(`${HttpResponse.error.detail}`, 'OK', {
        //   duration: 3000,
        //   panelClass: ['error-snackbar']
        // });
      }
    });
  }

  gotoAdminDash() {
    this.router.navigate(['admin']);
  }
}
