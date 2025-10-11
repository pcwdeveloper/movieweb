import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../model/movie';

@Component({
  selector: 'app-movie-dialog',
  imports: [CommonModule, MatGridListModule,MatFormFieldModule, MatInputModule, MatSelectModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule],
  templateUrl: './movie-dialog.html',
  styleUrl: './movie-dialog.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieDialog {
  isLoading = false;
  movieForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<MovieDialog>,
    private movieService: MovieService,
    @Inject(MAT_DIALOG_DATA) public data: any) {


    this.movieForm = this.fb.group({
      name: [this.data?.name, Validators.required],
      hour: [this.data?.hour, Validators.required],
      minute: [this.data?.minute, Validators.required],
      language: [this.data?.language, [Validators.required]],
      tags: [this.data?.tags, [Validators.required]]
    });

  }

  save() {
    console.log("save");
    console.log(this.movieForm);
    if (this.movieForm.invalid) {
      this.movieForm.markAllAsTouched();
      return;
    }
    if(this.data?.id){
      this.updateMovie();
    }else{
      this.createMovie();
    }
   
  }

  createMovie(){
    this.isLoading = true;
    const movie: Movie = this.movieForm.value;

    this.movieService.addMovie(movie).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.dialogRef.close(res);
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Error adding movie:', err);
      }
    });
  }

  updateMovie(){
    const movie: Movie = this.movieForm.value;
    movie.id = this.data.id;
    this.movieService.updateMovie(movie).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.dialogRef.close(res);
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Error adding mvoie:', err);
      }
    });
  }

  close() {
    this.dialogRef.close();
  }

}
