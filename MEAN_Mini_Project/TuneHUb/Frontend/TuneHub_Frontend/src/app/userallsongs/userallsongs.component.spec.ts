import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserallsongsComponent } from './userallsongs.component';

describe('UserallsongsComponent', () => {
  let component: UserallsongsComponent;
  let fixture: ComponentFixture<UserallsongsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserallsongsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserallsongsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
