import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColaboradoresProComponent } from './colaboradores-pro.component';

describe('ColaboradoresProComponent', () => {
  let component: ColaboradoresProComponent;
  let fixture: ComponentFixture<ColaboradoresProComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColaboradoresProComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColaboradoresProComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
