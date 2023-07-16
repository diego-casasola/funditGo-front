import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { RUser } from '../interfaces/user.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  hide: boolean = true;

  registerForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    lastname: ['', Validators.required],
    email: ['', Validators.required],
    dateOfBirth: ['', Validators.required],
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dateAdapter: DateAdapter<Date>,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  register() {
    if (this.registerForm.invalid) {
      return;
    }

    const { name, lastname, email, dateOfBirth, username, password } = this.registerForm.value;

    const user: RUser = {
      userName: username,
      firstName: name,
      lastName: lastname,
      password: password,
      email: email,
      fechaNacimiento: formatDate(dateOfBirth, 'yyyy-MM-dd', 'en-US'),
      isAdmin: false
    }

    this.authService.registerUser(user).subscribe(resp => {
      if (resp) {
        this.router.navigateByUrl('/auth/login');
      }
    });
  }

}
