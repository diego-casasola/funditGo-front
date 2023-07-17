import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentacionProyectoComponent } from './documentacion-proyecto.component';

describe('DocumentacionProyectoComponent', () => {
  let component: DocumentacionProyectoComponent;
  let fixture: ComponentFixture<DocumentacionProyectoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentacionProyectoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentacionProyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
