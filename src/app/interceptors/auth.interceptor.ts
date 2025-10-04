import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  // ✅ Add Authorization Header if token exists
  const clonedReq = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  return next(clonedReq).pipe(
    catchError((error) => {
      if (error.status === 401 || error.status === 403) {
        // ✅ Token invalid or user not authorized
        localStorage.clear(); // clear token
        router.navigate(['/login']); // redirect to login
      }

      return throwError(() => error);
    })
  );
};