import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router:Router) {
      this.loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.minLength(6)]],
        password: ['', [Validators.required, Validators.minLength(6)]]
      });
  }

  ngOnInit(): void {
    this.authService.getUserInfo().subscribe(data => {
      console.log(data);
      this.router.navigate(['/admin']);
    });
    this.checkLogin();
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.login();
      // Handle login logic here
    }
  }
  submitting = false;
  loginForm: FormGroup;

  login(){
    this.submitting = true;
    console.log(this.loginForm);
    console.log(this.loginForm.valid);
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      // Handle login logic here
      console.log(this.loginForm);
      this.authService.login(this.loginForm.value).subscribe({
        next: (resp:any) => {
          console.log(resp);
          this.authService.getUserInfo().subscribe({
            next: (resp:any) => {
              console.log(resp);
              const userProfile = resp.result[0];
              localStorage.setItem('user',JSON.stringify(userProfile));
              this.submitting = false;
              if(userProfile.is_staff){
                this.router.navigate(['/admin'])
              } else {
                this.router.navigate(['/user'])
              }
              this.loginForm.reset();
            },
            error: (HttpResponse: HttpErrorResponse) => {
              console.log(HttpResponse);

            }
          });
        },
        error: (HttpResponse: HttpErrorResponse) => {
          console.log(HttpResponse);

        }
      });
    }
  }

  checkLogin(){
    this.authService.getUserInfo().subscribe({
      next: (resp:any) => {
        console.log(resp);
        const userProfile = resp.result[0];
        this.submitting = false;
        if(userProfile.is_staff){
          this.router.navigate(['/admin'])
        } else {
          this.router.navigate(['/user'])
        }
      },
      error: (HttpResponse: HttpErrorResponse) => {
        console.log(HttpResponse);

      }
    });
  }
  gotoUserDash() {
    this.router.navigate(['user']);
  }

}
