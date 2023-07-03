import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizacionesProComponent } from './actualizaciones-pro.component';

describe('ActualizacionesProComponent', () => {
  let component: ActualizacionesProComponent;
  let fixture: ComponentFixture<ActualizacionesProComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualizacionesProComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizacionesProComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
