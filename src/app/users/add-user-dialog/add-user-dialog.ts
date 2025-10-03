import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
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
    private userService: UserService) {
    this.userForm = this.fb.group({
      userName: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNo: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  save() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

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
        alert('Failed to add user. Please try again.');
      }
    });
  }

  close() {
    this.dialogRef.close();
  }

}
