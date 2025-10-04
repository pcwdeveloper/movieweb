import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { DashboardService } from '../services/dashboard-service';

@Component({
  selector: 'app-dashboard-component',
  imports: [CommonModule,
    MatCardModule,
    MatIconModule,],
  templateUrl: './dashboard-component.html',
  styleUrl: './dashboard-component.css'
})
export class DashboardComponent {

  dashboardService: DashboardService = inject(DashboardService);
  // Using signals (new reactive primitive in Angular) for state
  totalUsers = 0;
  activeUsers = 0;
  inActiveUsers = 0;
  isLoading = false;
  constructor() {
    this.getDashboard();
  }

  getDashboard() {
    this.isLoading = true;
    // Simulate API fetch — replace with your HTTP call
    this.dashboardService.getDashboard().subscribe(res => {
      this.isLoading = false;
      this.totalUsers = res.totalUser;
      this.activeUsers = res.activeUser;
      this.inActiveUsers = res.inActiveUser;
    },
     (err) => {
      this.isLoading = false;
      console.error('Error get user:', err);
    });
  }
}
