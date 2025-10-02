import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private http = inject(HttpClient);


  getUsers(): Observable<any>{
    return this.http.get<any>('https://spriingmoviedemo-c8e2h0c2hjgbh9dj.centralindia-01.azurewebsites.net/api/users');
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>('https://spriingmoviedemo-c8e2h0c2hjgbh9dj.centralindia-01.azurewebsites.net/api/users', user);
  }
}
