import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-proyectos-filter',
  templateUrl: './proyectos-filter.component.html',
  styleUrls: ['./proyectos-filter.component.scss'],
})
export class ProyectosFilterComponent implements OnInit {
  @Output('PROYECTO-FILTER') filterOutput = new EventEmitter<any>();

  filterForm = this.fb.group({
    search: [''],
    category: [''],
    date: [''],
    price_start: [''],
    price_end: ['']
  });

  value: number = 0;
  max = 100;
  min = 0;
  thumbLabel = true;

  myControl = new FormControl();
  options: User[] = [
    { name: 'Mary' },
    { name: 'Shelley' },
    { name: 'Igor' }
  ];
  filteredOptions!: Observable<User[]>;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.options.slice())
      );
  }

  displayFn(user: User): string {
    return user && user.name ? user.name : '';
  }

  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  formatLabel(value: number) {
    return value + 'Bs';
  }

}
export interface User {
  name: string;
}

