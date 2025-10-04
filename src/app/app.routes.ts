import { Routes } from '@angular/router';
import { UserList } from './users/user-list/user-list';
import { Login } from './public/login/login';

export const routes: Routes = [
    { 
      path: 'users', 
      component: UserList 
    },
    { 
        path: '', 
        component: Login },
    { 
        path: '**', 
        redirectTo: '' 
    },

];
