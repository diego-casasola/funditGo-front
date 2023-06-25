import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectosFilterComponent } from './proyectos-filter.component';

describe('ProyectosFilterComponent', () => {
  let component: ProyectosFilterComponent;
  let fixture: ComponentFixture<ProyectosFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProyectosFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProyectosFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
