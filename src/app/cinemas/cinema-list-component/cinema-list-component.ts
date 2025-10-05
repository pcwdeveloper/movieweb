import { ChangeDetectorRef, Component, inject, ViewChild } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { CinemaService } from '../../services/cinema.service';
import { Cinema } from '../../model/cinemas';


@Component({
  selector: 'app-cinema-list-component',
  imports: [CommonModule, MatListModule, MatIconModule, MatDividerModule,MatTableModule, MatPaginatorModule,MatProgressSpinnerModule,MatButtonModule],
  templateUrl: './cinema-list-component.html',
  styleUrl: './cinema-list-component.css'
})
export class CinemaListComponent {
  userRole: string | null = null;
  cinemaService: CinemaService = inject(CinemaService);

  displayedColumns: string[] = ['name', 'city', 'state', 'screens'];
  dataSource = new MatTableDataSource<Cinema>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  totalElements = 0;
  pageSize = 5;
  pageIndex = 0;

  isLoading = false;
  constructor(private dialog: MatDialog,private cdr: ChangeDetectorRef, private authService: AuthService) {
    this.userRole = this.authService.getUserRole();
    this.loadCinemas();
  }


 
  loadCinemas(){
    this.isLoading = true;

    this.cinemaService.getCinemas(this.pageIndex,this.pageSize).subscribe(res => {
      this.isLoading = false;
      this.dataSource.data = res.content;
      this.totalElements = res.totalElements;
    },
     (err) => {
      this.isLoading = false;
      console.error('Error get cinemas:', err);
    });
  }

  addCinema() {
    //this.openDialog();
  }

  // openDialog(user?:User){
  //   const dialogRef = this.dialog.open(AddUserDialog, {
  //     width: '400px',
  //     data:user
  //   });

  //   dialogRef.afterClosed().subscribe((result: User | undefined) => {
  //     if (result) {
  //        this.loadUsers();
  //     }
  //   });
  // }


  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize  = event.pageSize;
    this.loadCinemas();
  }

  deleteCinema(cinema:Cinema){
    this.isLoading = true;
    this.cinemaService.deleteCinema(cinema.id).subscribe(res => {
      this.isLoading = false;
      this.loadCinemas();
    },
     (err) => {
      this.isLoading = false;
      console.error('Error delete cinema:', err);
    });
  }

  editCinema(cinema:Cinema){
    this.isLoading = true;
    this.cdr.detectChanges();
    this.cinemaService.getCinema(cinema.id).subscribe(res => {
     
        // ✅ prevents ExpressionChangedAfterItWasCheckedError
        this.isLoading = false;
        this.cdr.detectChanges();
        //this.openDialog(res);
     
    },
     (err) => {
      this.isLoading = false;
      this.cdr.detectChanges();
      console.error('Error edit cinema:', err);
    });
  }


}
