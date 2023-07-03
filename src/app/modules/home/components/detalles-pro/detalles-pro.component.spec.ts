import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesProComponent } from './detalles-pro.component';

describe('DetallesProComponent', () => {
  let component: DetallesProComponent;
  let fixture: ComponentFixture<DetallesProComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetallesProComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesProComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
