import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-navbar-component',
  imports: [ CommonModule, 
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule],
  templateUrl: './navbar-component.html',
  styleUrl: './navbar-component.css'
})
export class NavbarComponent {

  showMenu = false;
  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.showMenu = !event.url.includes('login') && event.url !== '/';
    });
  }

  logout(){
   
    localStorage.clear();
    this.router.navigate(['']);

  }
}
