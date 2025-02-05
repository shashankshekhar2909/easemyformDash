import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, HostListener } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-userheader',
  templateUrl: './userheader.component.html',
  styleUrl: './userheader.component.scss'
})
export class UserheaderComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router
  ){
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.activeRoute = this.router.url;
      this.isMobileMenuOpen = false;
    });
  }

  userProfile:any = null;
  activeRoute: string = '';
  isMobileMenuOpen: boolean = false;
  isDropdownOpen: boolean = false;

  ngOnInit(): void {
    this.activeRoute = this.router.url;
    this.getUserDetails();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const dropdownElement = (event.target as HTMLElement).closest('.dropdown-container');
    if (!dropdownElement) {
      this.isDropdownOpen = false;
    }
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  toggleDropdown(event: Event) {
    event.stopPropagation();
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logout(){
    this.authService.logout().subscribe({
      next: (resp:any) => {
        console.log(resp);
        this.router.navigate(['']);
      },
      error: (HttpResponse: HttpErrorResponse) => {
        console.log(HttpResponse);

      }
    });
  }

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
}
