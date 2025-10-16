import { ChangeDetectorRef, Component, Inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CinemaService } from '../../services/cinema.service';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Cinema } from '../../model/cinemas';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../model/movie';
import { AddScreen } from '../../screen/add-screen/add-screen';

@Component({
  selector: 'app-cinema-details-dialog-component',
  imports: [CommonModule, MatGridListModule,MatFormFieldModule, MatInputModule, MatSelectModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatTabsModule,
    AddScreen],
  templateUrl: './cinema-details-dialog-component.html',
  styleUrl: './cinema-details-dialog-component.css'
})
export class CinemaDetailsDialogComponent {
  readonly panelOpenState = signal(false);
  isLoading = false;
  userForm: FormGroup;
  cinema?:Cinema;
  dataSource = new MatTableDataSource<Screen>();
  displayedColumns: string[] = ['screenNo', 'movie', 'language'];
  movies?:Movie[];
  constructor(
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CinemaDetailsDialogComponent>,
    private userService: CinemaService,
    private movieService: MovieService,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    let disableUsername = this.data?.userName ? true : false;

    this.userForm = this.fb.group({
      userName: [{ value: this.data?.userName, disabled: disableUsername}, Validators.required],
      firstName: [this.data?.firstName, Validators.required],
      lastName: [this.data?.lastName, Validators.required],
      phoneNo: [this.data?.phoneNo, [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      email: [this.data?.email, [Validators.required, Validators.email]]
    });

    this.cinema = this.data;
    this.dataSource.data = this.data.screens;

    this.getMovies();
  }

  save() {
    // if (this.userForm.invalid) {
    //   this.userForm.markAllAsTouched();
    //   return;
    // }
    // if(this.data?.id){
    //   this.updateUser();
    // }else{
    //   this.createUser();
    // }
   
  }

  getMovies(){
    this.isLoading = true;
    this.movieService.getAllMovie().subscribe(res => {
      this.isLoading = false;
      this.movies = res;
      this.cdr.detectChanges();
    },
     (err) => {
      this.isLoading = false;
      this.cdr.detectChanges();
      console.error('Error get all movies', err);
    });


  }

  createU(){
    // this.isLoading = true;
    // const user: User = this.userForm.value;

    // this.userService.addUser(user).subscribe({
    //   next: (res) => {
    //     this.isLoading = false;
    //     this.dialogRef.close(res); // return created user to parent component
    //   },
    //   error: (err) => {
    //     this.isLoading = false;
    //     console.error('Error adding user:', err);
    //   }
    // });
  }

  updateUser(){
    // const user: User = this.userForm.value;
    // user.id = this.data.id;
    // this.userService.updateUser(user).subscribe({
    //   next: (res) => {
    //     this.isLoading = false;
    //     this.dialogRef.close(res); // return created user to parent component
    //   },
    //   error: (err) => {
    //     this.isLoading = false;
    //     console.error('Error adding user:', err);
    //   }
    // });
  }

  close() {
    this.dialogRef.close();
  }

}
