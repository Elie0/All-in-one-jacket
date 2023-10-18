import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcgPlotComponent } from './ecg-plot.component';

describe('EcgPlotComponent', () => {
  let component: EcgPlotComponent;
  let fixture: ComponentFixture<EcgPlotComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EcgPlotComponent]
    });
    fixture = TestBed.createComponent(EcgPlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
