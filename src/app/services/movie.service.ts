import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { environment } from '../../environments/environment';
import { Movie } from '../model/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  
  private http = inject(HttpClient);


  getMovies(pageIndex:number, pageSize:number): Observable<any>{
    return this.http.get<any>(environment.apiBaseUrl+'api/movies?pageIndex='+pageIndex+'&pageSize='+pageSize);
  }

  getAllMovie(): Observable<any>{
    return this.http.get<any>(environment.apiBaseUrl+'api/movies/all');
  }


  addMovie(movie: Movie): Observable<User> {
    return this.http.post<User>(environment.apiBaseUrl+'api/movies', movie);
  }


  deleteMovie(id: number): Observable<any>{
    return this.http.delete<any>(environment.apiBaseUrl+'api/movies/'+id);
  }

  getMovie(id: number): Observable<User>{
    return this.http.get<User>(environment.apiBaseUrl+'api/movies/'+id);
  }

  updateMovie(moive:Movie): Observable<User>{
    return this.http.put<User>(environment.apiBaseUrl+'api/movies/'+moive.id,moive);
  }
}
