import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CinemaService {
  
  private http = inject(HttpClient);


  getCinemas(pageIndex:number, pageSize:number): Observable<any>{
    return this.http.get<any>(environment.apiBaseUrl+'api/cinemas?pageIndex='+pageIndex+'&pageSize='+pageSize);
  }

  addCinemas(user: User): Observable<User> {
    return this.http.post<User>(environment.apiBaseUrl+'api/cinemas', user);
  }


  deleteCinema(id: number): Observable<any>{
    return this.http.delete<any>(environment.apiBaseUrl+'api/cinemas/'+id);
  }

  getCinema(id: number): Observable<User>{
    return this.http.get<User>(environment.apiBaseUrl+'api/cinemas/'+id);
  }

  updateCinema(user:User): Observable<User>{
    return this.http.put<User>(environment.apiBaseUrl+'api/cinemas/'+user.id,user);
  }
}
