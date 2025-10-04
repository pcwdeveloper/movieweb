import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


// Material Modules
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { LoginService } from './login-service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [
    MatCardModule, 
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login {

  loginForm: FormGroup;
  hide = true;
  isLoading = false;

  constructor(private fb: FormBuilder, private loginService:LoginService,private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.loginForm.invalid) return;

    this.isLoading = true;
    let loginRequest = this.loginForm.value;
    this.loginService.login(loginRequest).subscribe(res => {
      console.log('sucess');
      this.isLoading = false;
      localStorage.setItem('token', res.token);
      console.log('save localStorate');
      this.router.navigate(['/users']);
      console.log('navigate localStorate');
    },
     (err) => {
      this.isLoading = false;
      console.error('Error login user:', err);
    });
    
  }
}
