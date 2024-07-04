import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.authService.userProfile().pipe(
      map((resp: any) => {
        console.log(resp);
        const userInfo = resp.result[0];
        if (userInfo.is_staff) {
          this.router.navigate(['/admin']);
          return false;
        } else {
          this.router.navigate(['/user']);
          return true;
        }
      }),
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        this.router.navigate(['/login']); // Navigate to login page or any other appropriate page
        return of(false);
      })
    );
  }
}
