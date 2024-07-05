import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquationCheckComponent } from './equation-check.component';

describe('EquationCheckComponent', () => {
  let component: EquationCheckComponent;
  let fixture: ComponentFixture<EquationCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EquationCheckComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EquationCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
