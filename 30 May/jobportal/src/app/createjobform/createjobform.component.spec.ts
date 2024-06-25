import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatejobformComponent } from './createjobform.component';

describe('CreatejobformComponent', () => {
  let component: CreatejobformComponent;
  let fixture: ComponentFixture<CreatejobformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatejobformComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreatejobformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
