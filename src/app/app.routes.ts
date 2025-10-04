import { Routes } from '@angular/router';
import { UserList } from './users/user-list/user-list';
import { Login } from './public/login/login';
import { DashboardComponent } from './dashboard-component/dashboard-component';
import { AuthGuard } from './config/auth.guard';

export const routes: Routes = [
    {
        path: 'dashboard', 
        component: DashboardComponent,
        canActivate: [AuthGuard]
    },
    { 
      path: 'users', 
      component: UserList,
      canActivate: [AuthGuard]
    },
    {
        path: 'login', 
        component: Login
    },
    { 
        path: '', 
        component: Login
    },
    { 
        path: '**', 
        redirectTo: '' 
    },

];
