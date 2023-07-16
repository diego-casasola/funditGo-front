import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-header-principal',
  templateUrl: './header-principal.component.html',
  styleUrls: ['./header-principal.component.scss']
})
export class HeaderPrincipalComponent implements OnInit, OnChanges {

  isLanding: boolean = false;
  nombreCompleto: string = this.getUser().nombre;

  constructor(
    private router: Router,
    private authService: AuthService,
  ) { }
  ngOnChanges(changes: SimpleChanges): void {
    
  }

  getUser(){
    return this.authService.usuario;
  }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.validateRoute();
      }
    });
  }

  validateRoute() {
    if (this.router.url === '/') {
      this.isLanding = true;
    } else {
      this.isLanding = false;
    }
  }

  verifyUser(){
    if (this.authService.isLogged()){
      return true;
    } else {
      return false;
    }
  }

}
