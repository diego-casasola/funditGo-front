import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonacionesUserComponent } from './donaciones-user.component';

describe('DonacionesUserComponent', () => {
  let component: DonacionesUserComponent;
  let fixture: ComponentFixture<DonacionesUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonacionesUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DonacionesUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
