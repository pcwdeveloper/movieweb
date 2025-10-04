import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthRequest } from '../../model/public';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  private http = inject(HttpClient);


  login(authRequest:AuthRequest): Observable<any>{
    return this.http.post<any>(environment.apiBaseUrl+'api/auth/login',authRequest);
  }

}
