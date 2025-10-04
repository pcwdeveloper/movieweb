import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from '../model/login';



@Injectable({ providedIn: 'root' })
export class AuthService {
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserRole(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      const roleNames = decoded.authorities.map(role => role.replace("ROLE_", ""));
      return roleNames ? roleNames[0] : null; 
    } catch {
      return null;
    }
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token;
  }

  logout() {
    localStorage.removeItem('token');
  }
}