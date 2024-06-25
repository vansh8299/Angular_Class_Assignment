import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemdetailComponent } from './itemdetail.component';

describe('ItemdetailComponent', () => {
  let component: ItemdetailComponent;
  let fixture: ComponentFixture<ItemdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemdetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItemdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
