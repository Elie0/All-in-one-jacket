import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FalldataComponent } from './falldata.component';

describe('FalldataComponent', () => {
  let component: FalldataComponent;
  let fixture: ComponentFixture<FalldataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FalldataComponent]
    });
    fixture = TestBed.createComponent(FalldataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
