import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrl: './userdashboard.component.scss'
})
export class UserdashboardComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.getUserInfo().subscribe({
      next: (userInfo: any) => {
        console.log(userInfo);
        if (userInfo.result && userInfo.result.length > 0) {
          const user = userInfo.result[0];
          if (user.is_staff) {
            this.router.navigate(['/admin']);
          }
        }
      },
      error: (error) => {
        console.error('Error fetching user info:', error);
        this.router.navigate(['/login']);
      }
    });
  }
}
