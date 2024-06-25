import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SonguserdetailComponent } from './songuserdetail.component';

describe('SonguserdetailComponent', () => {
  let component: SonguserdetailComponent;
  let fixture: ComponentFixture<SonguserdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SonguserdetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SonguserdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
