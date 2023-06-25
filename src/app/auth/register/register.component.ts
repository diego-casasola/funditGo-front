import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { Router } from '@angular/router';

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
    private dateAdapter: DateAdapter<Date>
  ) { }

  ngOnInit(): void {
  }

  register() {
    this.registerForm.value.dateOfBirth = formatDate(this.registerForm.value.dateOfBirth, 'yyyy-MM-dd', 'en-US');
    console.log(this.registerForm.value);
  }

}
