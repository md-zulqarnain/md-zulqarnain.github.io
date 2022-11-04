import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FastingComponent } from './fasting.component';

describe('FastingComponent', () => {
  let component: FastingComponent;
  let fixture: ComponentFixture<FastingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FastingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FastingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
