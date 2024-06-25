import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllsongsComponent } from './allsongs.component';

describe('AllsongsComponent', () => {
  let component: AllsongsComponent;
  let fixture: ComponentFixture<AllsongsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllsongsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllsongsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
