import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionProyectosComponent } from './gestion-proyectos.component';

describe('GestionProyectosComponent', () => {
  let component: GestionProyectosComponent;
  let fixture: ComponentFixture<GestionProyectosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionProyectosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionProyectosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
