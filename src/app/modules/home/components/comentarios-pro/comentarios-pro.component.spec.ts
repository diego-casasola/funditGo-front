import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComentariosProComponent } from './comentarios-pro.component';

describe('ComentariosProComponent', () => {
  let component: ComentariosProComponent;
  let fixture: ComponentFixture<ComentariosProComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComentariosProComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComentariosProComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
