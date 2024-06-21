import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpXsrfTokenExtractor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  constructor(
    private tokenExtractor: HttpXsrfTokenExtractor,
    private router: Router
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Ensure credentials are included with requests
    request = request.clone({
      withCredentials: true,
    });

    // Add CSRF token if available
    const token = this.tokenExtractor.getToken();
    if (token && !request.url.startsWith('https://storage.googleapis.com/')) {
      const headers = request.headers
        .set('X-Requested-With', 'XMLHttpRequest')
        .set('X-CSRFToken', token as string);
      request = request.clone({ headers });
    }

    return next.handle(request).pipe(
      map((response: HttpResponse<any>|any) => response),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 403) {
          this.router.navigate(['/']);
        }
        return throwError(error);
      })
    );
  }
}
