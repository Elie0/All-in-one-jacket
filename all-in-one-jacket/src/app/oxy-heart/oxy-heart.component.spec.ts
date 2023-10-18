import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OxyHeartComponent } from './oxy-heart.component';

describe('OxyHeartComponent', () => {
  let component: OxyHeartComponent;
  let fixture: ComponentFixture<OxyHeartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OxyHeartComponent]
    });
    fixture = TestBed.createComponent(OxyHeartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
