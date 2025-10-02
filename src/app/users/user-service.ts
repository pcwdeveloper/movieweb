import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private http = inject(HttpClient);


  getUsers(){
    this.http.get<any>('https://spriingmoviedemo-c8e2h0c2hjgbh9dj.centralindia-01.azurewebsites.net/api/users')
    .subscribe(users => {
      console.log(users);
    });
  }
}
