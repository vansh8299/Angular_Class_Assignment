import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagefoodcomponentComponent } from './messagefoodcomponent.component';

describe('MessagefoodcomponentComponent', () => {
  let component: MessagefoodcomponentComponent;
  let fixture: ComponentFixture<MessagefoodcomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessagefoodcomponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MessagefoodcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
