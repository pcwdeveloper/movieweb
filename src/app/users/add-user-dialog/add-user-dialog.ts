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
import { UserService } from '../user-service';
import { User } from '../../model/user';

@Component({
  selector: 'app-add-user-dialog',
  imports: [CommonModule, MatGridListModule,MatFormFieldModule, MatInputModule, MatSelectModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule],
  templateUrl: './add-user-dialog.html',
  styleUrl: './add-user-dialog.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddUserDialog {
  isLoading = false;
  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddUserDialog>,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    this.userForm = this.fb.group({
      userName: [{ value: this.data?.userName, disabled: true}, Validators.required],
      firstName: [this.data?.firstName, Validators.required],
      lastName: [this.data?.lastName, Validators.required],
      phoneNo: [this.data?.phoneNo, [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      email: [this.data?.email, [Validators.required, Validators.email]]
    });

    console.log("AddUserDialog");
    console.log(this.data);
  }

  save() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }
    if(this.data?.id){
      this.updateUser();
    }else{
      this.createUser();
    }
   
  }

  createUser(){
    this.isLoading = true;
    const user: User = this.userForm.value;

    this.userService.addUser(user).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.dialogRef.close(res); // return created user to parent component
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Error adding user:', err);
      }
    });
  }

  updateUser(){
    const user: User = this.userForm.value;
    user.id = this.data.id;
    this.userService.updateUser(user).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.dialogRef.close(res); // return created user to parent component
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Error adding user:', err);
      }
    });
  }

  close() {
    this.dialogRef.close();
  }

}
