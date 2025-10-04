import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { DashboardService } from '../services/dashboard-service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-dashboard-component',
  imports: [CommonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule],
  templateUrl: './dashboard-component.html',
  styleUrl: './dashboard-component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {

  dashboardService: DashboardService = inject(DashboardService);
  // Using signals (new reactive primitive in Angular) for state
  totalUsers = 0;
  activeUsers = 0;
  inActiveUsers = 0;
  isLoading = false;
  constructor(private cdr: ChangeDetectorRef) {
    this.getDashboard();
  }

  getDashboard() {
    this.isLoading = true;
    // Simulate API fetch — replace with your HTTP call
    this.dashboardService.getDashboard().subscribe(res => {
      console.log(res);
      this.isLoading = false;
      this.totalUsers = res.totalUser;
      this.activeUsers = res.activeUser;
      this.inActiveUsers = res.inActiveUser;
      console.log(res);
      this.cdr.detectChanges();
    },
     (err) => {
      this.isLoading = false;
      console.error('Error get user:', err);
    });
  }
}
