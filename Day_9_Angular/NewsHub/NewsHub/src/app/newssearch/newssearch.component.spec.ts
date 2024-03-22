import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewssearchComponent } from './newssearch.component';

describe('NewssearchComponent', () => {
  let component: NewssearchComponent;
  let fixture: ComponentFixture<NewssearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewssearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewssearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
