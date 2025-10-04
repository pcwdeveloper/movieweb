import { inject, Injectable } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from '../model/login';


export const authGuard: CanActivateFn = () => {
    const authService = inject(AuthService);
    const router = inject(Router);
    const token = authService.getToken();
  
    // ✅ No token — not logged in
    if (!token) {
      router.navigate(['/login']);
      return false;
    }
  
    try {
      const decoded = jwtDecode<JwtPayload>(token);
  
      // ✅ Check expiration
      const now = Math.floor(Date.now() / 1000);
      if (decoded.exp && decoded.exp < now) {
        // 🚫 Token expired
        authService.logout();
        router.navigate(['/login']);
        return false;
      }
  
      // ✅ Valid token — allow access
      return true;
  
    } catch (e) {
      // 🚫 Invalid token
      authService.logout();
      router.navigate(['/login']);
      return false;
    }
  };