import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptioncomponentComponent } from './descriptioncomponent.component';

describe('DescriptioncomponentComponent', () => {
  let component: DescriptioncomponentComponent;
  let fixture: ComponentFixture<DescriptioncomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DescriptioncomponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DescriptioncomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
