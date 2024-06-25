import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddsongComponent } from './addsong.component';

describe('AddsongComponent', () => {
  let component: AddsongComponent;
  let fixture: ComponentFixture<AddsongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddsongComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddsongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
