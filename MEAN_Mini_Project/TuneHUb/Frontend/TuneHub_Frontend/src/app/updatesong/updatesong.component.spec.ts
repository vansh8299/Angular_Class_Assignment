import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatesongComponent } from './updatesong.component';

describe('UpdatesongComponent', () => {
  let component: UpdatesongComponent;
  let fixture: ComponentFixture<UpdatesongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatesongComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdatesongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
