import { formatDate } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

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

  listaCategoria: any[] = [
    { id: 1, name: 'Categoría 1' },
    { id: 2, name: 'Categoría 2' },
    { id: 3, name: 'Categoría 3' },
    { id: 4, name: 'Categoría 4' },
    { id: 5, name: 'Categoría 5' },
    { id: 6, name: 'Categoría 6' },
    { id: 7, name: 'Categoría 7' },
    { id: 8, name: 'Categoría 8' },
    { id: 9, name: 'Categoría 9' },
    { id: 10, name: 'Categoría 10' },
  ];

  value: number = 0;
  max = 100;
  min = 0;
  thumbLabel = true;

  filteredOptions!: Observable<any[]>;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.setCategorias();
  }

  setCategorias() {
    this.filteredOptions = this.filterForm.controls['category'].valueChanges
    .pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filter(name) : this.listaCategoria.slice())
    )
  }

  displayFn(user: any): string {
    return user && user.name ? user.name : '';
  }

  private _filter(name: string): any[] {
    const filterValue = name.toLowerCase();

    return this.listaCategoria.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  formatLabel(value: number) {
    return value + 'Bs';
  }

  searchCategoria() {
    this.filterForm.value.date_start = formatDate(this.filterForm.value.date_start, 'yyyy-MM-dd', 'en-US');
    this.filterForm.value.date_end = formatDate(this.filterForm.value.date_end, 'yyyy-MM-dd', 'en-US');
    this.filterOutput.emit(this.filterForm.value);
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
