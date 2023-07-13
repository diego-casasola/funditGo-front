import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-actualizaciones-pro',
  templateUrl: './actualizaciones-pro.component.html',
  styleUrls: ['./actualizaciones-pro.component.scss']
})
export class ActualizacionesProComponent implements OnInit {
  @Input('ACTUALIZACIONES') actualizaciones!: any[];

  constructor() { }

  ngOnInit(): void {
    console.log(this.actualizaciones);
  }

}
