import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppdetailComponent } from './appdetail.component';

describe('AppdetailComponent', () => {
  let component: AppdetailComponent;
  let fixture: ComponentFixture<AppdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppdetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
