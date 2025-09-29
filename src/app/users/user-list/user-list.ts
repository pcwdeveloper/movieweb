import { Component, inject } from '@angular/core';
import { UserService } from '../user-service';

@Component({
  selector: 'app-user-list',
  imports: [],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css'
})
export class UserList {
  userService: UserService = inject(UserService);
  constructor() {
    let users = this.userService.getUsers();
  }

}
