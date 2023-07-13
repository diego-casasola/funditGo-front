import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectosRevisionComponent } from './proyectos-revision.component';

describe('ProyectosRevisionComponent', () => {
  let component: ProyectosRevisionComponent;
  let fixture: ComponentFixture<ProyectosRevisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProyectosRevisionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProyectosRevisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
