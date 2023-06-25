import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-lista-proyectos',
  templateUrl: './lista-proyectos.component.html',
  styleUrls: ['./lista-proyectos.component.scss']
})
export class ListaProyectosComponent implements OnInit {

  isFavorite: boolean = false;

  pageEvent!: PageEvent;
  lengthTable: number = 10;
  pageSize: number = 25;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  constructor() { }

  ngOnInit(): void {
  }

  onPaginateChange(event: PageEvent): void {
    let page = event.pageIndex;
    let page_size = event.pageSize;
    page = page + 1;
    // this.getProcedureSearchList(this.filter, page, page_size);
  }

  saveFavorite(){
    if(this.isFavorite){
      this.isFavorite = false;
    }else{
      this.isFavorite = true;
    }
  }

}
