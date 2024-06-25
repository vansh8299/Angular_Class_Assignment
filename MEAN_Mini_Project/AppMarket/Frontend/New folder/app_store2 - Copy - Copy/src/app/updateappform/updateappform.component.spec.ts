import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateappformComponent } from './updateappform.component';

describe('UpdateappformComponent', () => {
  let component: UpdateappformComponent;
  let fixture: ComponentFixture<UpdateappformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateappformComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateappformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
