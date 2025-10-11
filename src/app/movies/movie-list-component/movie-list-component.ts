import { ChangeDetectorRef, Component, inject, ViewChild } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Movie } from '../../model/movie';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { MovieDialog } from '../movie-dialog/movie-dialog';

@Component({
  selector: 'app-movie-list-component',
  imports: [CommonModule, MatListModule, MatIconModule, MatDividerModule, MatTableModule, MatPaginatorModule, MatProgressSpinnerModule, MatButtonModule],
  templateUrl: './movie-list-component.html',
  styleUrl: './movie-list-component.css'
})
export class MovieListComponent {
  userRole: string | null = null;
  movieService: MovieService = inject(MovieService);

  displayedColumns: string[] = ['name', 'time', 'language', 'tags'];
  dataSource = new MatTableDataSource<Movie>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  totalElements = 0;
  pageSize = 5;
  pageIndex = 0;

  isLoading = false;
  constructor(private dialog: MatDialog,private cdr: ChangeDetectorRef, private authService: AuthService) {
    this.userRole = this.authService.getUserRole();
    this.loadMovies();
  }


 
  loadMovies(){
    this.isLoading = true;

    this.movieService.getMovies(this.pageIndex,this.pageSize).subscribe(res => {
      this.isLoading = false;
      this.dataSource.data = res.content;
      this.totalElements = res.totalElements;
      this.cdr.detectChanges();
    },
     (err) => {
      this.isLoading = false;
      this.cdr.detectChanges();
      console.error('Error get movie:', err);
    });
  }

  addMovie() {
    this.openDialog();
  }

  openDialog(movie?:Movie){
    const dialogRef = this.dialog.open(MovieDialog, {
      width: '400px',
      data:movie
    });

    dialogRef.afterClosed().subscribe((movie: Movie | undefined) => {
      if (movie) {
         this.loadMovies();
      }
    });
  }


  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize  = event.pageSize;
    this.loadMovies();
  }

  deleteMovie(movie:Movie){
    this.isLoading = true;
    this.movieService.deleteMovie(movie.id).subscribe(res => {
      this.isLoading = false;
      this.loadMovies();
    },
     (err) => {
      this.isLoading = false;
      console.error('Error delete movie:', err);
    });
  }

  editMovie(movie:Movie){
    this.isLoading = true;
    this.cdr.detectChanges();
    this.movieService.getMovie(movie.id).subscribe(res => {
     
        // ✅ prevents ExpressionChangedAfterItWasCheckedError
        this.isLoading = false;
        this.cdr.detectChanges();
        //this.openDialog(res);
     
    },
     (err) => {
      this.isLoading = false;
      this.cdr.detectChanges();
      console.error('Error edit movie:', err);
    });
  }


}
