import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-detalles-pro',
  templateUrl: './detalles-pro.component.html',
  styleUrls: ['./detalles-pro.component.scss']
})
export class DetallesProComponent implements OnInit {
  @Input('DESCRIPCION') descripcion: any;
  @Input('HISTORIA') historia: any;
  @Input('COMPROMISO') compromiso: any;

  constructor() { }

  ngOnInit(): void {
    console.log(this.descripcion);
    console.log(this.historia);
    console.log(this.compromiso);
  }

}
