import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateappComponent } from './createapp.component';

describe('CreateappComponent', () => {
  let component: CreateappComponent;
  let fixture: ComponentFixture<CreateappComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateappComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
