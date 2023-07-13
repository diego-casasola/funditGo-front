import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-comentarios-pro',
  templateUrl: './comentarios-pro.component.html',
  styleUrls: ['./comentarios-pro.component.scss']
})
export class ComentariosProComponent implements OnInit {
  @Input('COMENTARIOS') comentarios!: any[];

  constructor() { }

  ngOnInit(): void {
    console.log(this.comentarios);
  }

  openComentar(){
    console.log('Comentar');
  }

}
