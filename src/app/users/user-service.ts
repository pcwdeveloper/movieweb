import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private http = inject(HttpClient);


  getUsers(pageIndex:number, pageSize:number): Observable<any>{
    return this.http.get<any>(environment.apiBaseUrl+'api/users?pageIndex='+pageIndex+'&pageSize='+pageSize);
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(environment.apiBaseUrl+'api/users', user);
  }


  deleteUser(id: number): Observable<any>{
    return this.http.delete<any>(environment.apiBaseUrl+'api/users/'+id);
  }

  getUser(id: number): Observable<User>{
    return this.http.get<User>(environment.apiBaseUrl+'api/users/'+id);
  }

  updateUser(user:User): Observable<User>{
    return this.http.put<User>(environment.apiBaseUrl+'api/users/'+user.id,user);
  }
}
