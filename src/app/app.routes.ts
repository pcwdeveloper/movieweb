import { Routes } from '@angular/router';
import { UserList } from './users/user-list/user-list';
import { Login } from './public/login/login';
import { DashboardComponent } from './dashboard-component/dashboard-component';
import { authGuard } from './config/auth.guard';
import { roleGuard } from './config/role.guard';
import { ForbiddenComponent } from './public/forbidden-component/forbidden-component';

export const routes: Routes = [
    {
        path: 'dashboard', 
        component: DashboardComponent,
        canActivate: [authGuard]
    },
    { 
      path: 'users', 
      component: UserList,
      canActivate: [authGuard,roleGuard(['ADMIN'])]
    },
    {
        path: 'forbidden', 
        component: ForbiddenComponent,
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
