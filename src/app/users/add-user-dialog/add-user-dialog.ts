import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-add-user-dialog',
  imports: [CommonModule, MatGridListModule,MatFormFieldModule, MatInputModule, MatSelectModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule],
  templateUrl: './add-user-dialog.html',
  styleUrl: './add-user-dialog.css'
})
export class AddUserDialog {
  userForm: FormGroup;

  constructor(private fb: FormBuilder,private dialogRef: MatDialogRef<AddUserDialog>) {
    this.userForm = this.fb.group({
      userName: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNo: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  save() {
    if (this.userForm.valid) {
      console.log('User Data:', this.userForm.value);
      alert('User submitted successfully!');
    } else {
      this.userForm.markAllAsTouched();
    }
  }

  close() {
    this.dialogRef.close();
  }

}
