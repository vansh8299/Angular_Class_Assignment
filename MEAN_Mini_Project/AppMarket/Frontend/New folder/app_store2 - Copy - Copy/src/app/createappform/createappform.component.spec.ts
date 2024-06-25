import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateappformComponent } from './createappform.component';

describe('CreateappformComponent', () => {
  let component: CreateappformComponent;
  let fixture: ComponentFixture<CreateappformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateappformComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateappformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
