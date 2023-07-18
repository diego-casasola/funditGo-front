import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColaboradorModalComponent } from './colaborador-modal.component';

describe('ColaboradorModalComponent', () => {
  let component: ColaboradorModalComponent;
  let fixture: ComponentFixture<ColaboradorModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColaboradorModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColaboradorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
