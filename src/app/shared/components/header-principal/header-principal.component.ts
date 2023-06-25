import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header-principal',
  templateUrl: './header-principal.component.html',
  styleUrls: ['./header-principal.component.scss']
})
export class HeaderPrincipalComponent implements OnInit {

  isLanding: boolean = false;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.validateRoute();
      }
    });
  }

  validateRoute() {
    console.log(this.router.url);
    console.log(this.isLanding);
    if (this.router.url === '/') {
      this.isLanding = true;
    } else {
      this.isLanding = false;
    }
  }

}
