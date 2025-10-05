import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment';
import { filter } from 'rxjs';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './common/navbar-component/navbar-component';

@Component({
  selector: 'app-root',
  imports: [NavbarComponent,RouterOutlet,MatButtonModule, MatMenuModule,CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('movieweb');
  

  constructor(private router: Router) {
    
  }

}
