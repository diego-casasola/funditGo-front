import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Proyecto } from '../../../interfaces/proyecto.interface';
import { ProyectoService } from '../../../services/proyecto.service';

@Component({
  selector: 'app-proyectos-revision',
  templateUrl: './proyectos-revision.component.html',
  styleUrls: ['./proyectos-revision.component.scss']
})
export class ProyectosRevisionComponent implements OnInit {
  pageEvent!: PageEvent;
  lengthTable: number = 10;
  page: number = 1;
  pageSize: number = 25;
  pageSizeOptions: number[] = [10, 25, 35, 50];

  listaProyectos: Proyecto[] = [];

  constructor(
    private proyectoService: ProyectoService,
  ) { }

  ngOnInit(): void {
    this.getProyectosPage(this.page, this.pageSize);
  }

  onPaginateChange(event: PageEvent): void {
    this.page = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.getProyectosPage(this.page, this.pageSize);
  }

  getProyectosPage(page: number, pageSize: number) {
    let data ={
      estado: 'Revision'
    }
    this.proyectoService.filterProyectos(page, pageSize, data).subscribe(
      (resp: any) => {
        console.log(resp);
        this.listaProyectos = resp.items.map((proyecto: any, index: number) => ({
          ...proyecto,
          order: index
        }));
      }
    );
  }

}
