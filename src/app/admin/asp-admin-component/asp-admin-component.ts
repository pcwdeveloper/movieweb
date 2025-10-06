import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CinemaListComponent } from '../../cinemas/cinema-list-component/cinema-list-component';

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


  @ViewChild('container', { read: ViewContainerRef }) container!: ViewContainerRef;

  loadContainer(view:string) {
    // Clear any previous component
    this.container.clear();

    // Create and insert the component
    this.container.createComponent(CinemaListComponent);
  }
}
