import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllappsComponent } from './allapps.component';

describe('AllappsComponent', () => {
  let component: AllappsComponent;
  let fixture: ComponentFixture<AllappsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllappsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllappsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
