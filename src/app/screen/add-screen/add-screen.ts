import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldControl, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../model/movie';

@Component({
  selector: 'app-add-screen',
  imports: [CommonModule,MatFormFieldModule,ReactiveFormsModule],
  templateUrl: './add-screen.html',
  styleUrl: './add-screen.css'
})
export class AddScreen {

  isLoading = false;
  screenForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any) {


    this.screenForm = this.fb.group({
      section: [, Validators.required]
    });

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

}
