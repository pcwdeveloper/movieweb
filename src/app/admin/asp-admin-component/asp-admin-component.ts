import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-asp-admin-component',
  imports: [MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule],
  templateUrl: './asp-admin-component.html',
  styleUrl: './asp-admin-component.css'
})
export class AspAdminComponent {

}
