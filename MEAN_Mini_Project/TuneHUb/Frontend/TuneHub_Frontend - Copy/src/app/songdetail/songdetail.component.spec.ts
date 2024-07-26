import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongdetailComponent } from './songdetail.component';

describe('SongdetailComponent', () => {
  let component: SongdetailComponent;
  let fixture: ComponentFixture<SongdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SongdetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SongdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
