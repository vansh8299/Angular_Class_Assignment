import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateJobFormComponent } from './update-job-form.component';

describe('UpdateJobFormComponent', () => {
  let component: UpdateJobFormComponent;
  let fixture: ComponentFixture<UpdateJobFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateJobFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateJobFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
