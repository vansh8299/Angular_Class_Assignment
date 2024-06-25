import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectplaylistComponent } from './selectplaylist.component';

describe('SelectplaylistComponent', () => {
  let component: SelectplaylistComponent;
  let fixture: ComponentFixture<SelectplaylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectplaylistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectplaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
