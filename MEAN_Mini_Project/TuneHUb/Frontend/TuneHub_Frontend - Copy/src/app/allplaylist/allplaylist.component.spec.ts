import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllplaylistComponent } from './allplaylist.component';

describe('AllplaylistComponent', () => {
  let component: AllplaylistComponent;
  let fixture: ComponentFixture<AllplaylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllplaylistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllplaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
