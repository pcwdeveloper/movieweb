import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { environment } from '../../environments/environment';
import { Cinema } from '../model/cinemas';

@Injectable({
  providedIn: 'root'
})
export class CinemaService {
  
  private http = inject(HttpClient);


  getCinemas(pageIndex:number, pageSize:number): Observable<any>{
    return this.http.get<any>(environment.apiBaseUrl+'api/cinemas?pageIndex='+pageIndex+'&pageSize='+pageSize);
  }

  addCinemas(user: Cinema): Observable<User> {
    return this.http.post<User>(environment.apiBaseUrl+'api/cinemas', user);
  }


  deleteCinema(id: number): Observable<any>{
    return this.http.delete<any>(environment.apiBaseUrl+'api/cinemas/'+id);
  }

  getCinema(id: number): Observable<Cinema>{
    return this.http.get<Cinema>(environment.apiBaseUrl+'api/cinemas/'+id);
  }

  updateCinema(user:Cinema): Observable<Cinema>{
    return this.http.put<Cinema>(environment.apiBaseUrl+'api/cinemas/'+user.id,user);
  }
}
