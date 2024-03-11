import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriescomponentComponent } from './seriescomponent.component';

describe('SeriescomponentComponent', () => {
  let component: SeriescomponentComponent;
  let fixture: ComponentFixture<SeriescomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeriescomponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SeriescomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
