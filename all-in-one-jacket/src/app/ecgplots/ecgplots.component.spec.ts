import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcgplotsComponent } from './ecgplots.component';

describe('EcgplotsComponent', () => {
  let component: EcgplotsComponent;
  let fixture: ComponentFixture<EcgplotsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EcgplotsComponent]
    });
    fixture = TestBed.createComponent(EcgplotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
