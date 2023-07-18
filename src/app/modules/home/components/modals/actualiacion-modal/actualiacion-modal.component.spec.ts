import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualiacionModalComponent } from './actualiacion-modal.component';

describe('ActualiacionModalComponent', () => {
  let component: ActualiacionModalComponent;
  let fixture: ComponentFixture<ActualiacionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualiacionModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualiacionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
