import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export function roleGuard(requiredRoles: string[]): CanActivateFn {
  return () => {
    const authService = inject(AuthService);
    const router = inject(Router);
    const userRole = authService.getUserRole();

    if (userRole && requiredRoles.includes(userRole)) {
      return true; // ✅ Allowed
    }

    // 🚫 Not authorized
    router.navigate(['/forbidden']);
    return false;
  };
}