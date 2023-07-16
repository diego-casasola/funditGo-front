import { formatDate } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ProyectoService } from '../../services/proyecto.service';

@Component({
  selector: 'app-proyectos-filter',
  templateUrl: './proyectos-filter.component.html',
  styleUrls: ['./proyectos-filter.component.scss'],
})
export class ProyectosFilterComponent implements OnInit {
  @Output('PROYECTO-FILTER') filterOutput = new EventEmitter<any>();

  filterForm: FormGroup = this.fb.group({
    search: [''],
    category: [''],
    date_start: [''],
    date_end: [''],
    price_start: [''],
  });

  tiposProyecto: any[] = [];
  searchWord: string = '';

  value: number = 0;
  max = 100;
  min = 0;
  thumbLabel = true;

  filteredOptions!: Observable<any[]>;

  constructor(
    private fb: FormBuilder,
    private proyectoService: ProyectoService
  ) { }

  async ngOnInit(): Promise<void> {
    await this.getTipoProyectoId();
    await this.setCategorias();
  }

  async setCategorias(): Promise<void> {
    this.filteredOptions = this.filterForm.controls['category'].valueChanges
    .pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.nombre),
      map(nombre => nombre ? this._filter(nombre) : this.tiposProyecto.slice())
    )
  }

  displayFn(tipo: any): string {
    return tipo && tipo.nombre ? tipo.nombre : '';
  }

  private _filter(nombre: string): any[] {
    const filterValue = nombre.toLowerCase();

    return this.tiposProyecto.filter(option => option.nombre.toLowerCase().includes(filterValue));
  }

  focusInputProvider() {
    this.searchWord = '';
  }

  formatLabel(value: number) {
    return value + 'Bs';
  }

  searchCategoria() {
    this.filterForm.value.date_start = this.filterForm.value.date_start? formatDate(this.filterForm.value.date_start, 'yyyy-MM-dd', 'en-US') : '';
    this.filterForm.value.date_end = this.filterForm.value.date_end? formatDate(this.filterForm.value.date_end, 'yyyy-MM-dd', 'en-US') : '';
    this.filterForm.value.category = this.filterForm.value.category? this.filterForm.value.category.id : '';
    this.filterForm.value.price_start = this.filterForm.value.price_start == 0? '' : this.filterForm.value.price_start;
    this.filterOutput.emit(this.filterForm.value);
  }

  async getTipoProyectoId(): Promise<void> {
    this.proyectoService.getTipoProyectos().subscribe(
      (resp: any) => {
        this.tiposProyecto = resp;
      },
      (err) => { console.log(err); }
    );
  }

  clear(){
    this.filterForm = this.fb.group({
      search: [''],
      category: [''],
      date_start: [''],
      date_end: [''],
      price_start: [''],
    })
  }
}
