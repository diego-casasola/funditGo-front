import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-menu-user',
  templateUrl: './menu-user.component.html',
  styleUrls: ['./menu-user.component.scss']
})
export class MenuUserComponent implements OnInit {

  user = this.authService.usuario;

  constructor(
    public authService: AuthService,
  ) { }

  ngOnInit(): void {
  }

  logout(){
    this.authService.logout();
  }

  muestra(){
    if (this.user.is_staff == 'True'){
      return true;
    } else {
      return false;
    }
  }
}
