import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstalledappsComponent } from './installedapps.component';

describe('InstalledappsComponent', () => {
  let component: InstalledappsComponent;
  let fixture: ComponentFixture<InstalledappsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstalledappsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InstalledappsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
