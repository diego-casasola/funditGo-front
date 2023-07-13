import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide: boolean = true;

  loginForm: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
  }
  
  login() {
    const { username, password } = this.loginForm.value;
    Swal.fire({
      title: 'Autenticando',
      text: 'Espere por favor...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
        this.authService.login(username, password).subscribe(
          (resp: any) => {
            Swal.close();
            setTimeout(() => {
              this.router.navigate(['/']);
            }, 500);
          },
          (_) => {
            Swal.close();
            Swal.fire('Credenciales incorrectas')
          }
        );
      }
    })
  }

}
