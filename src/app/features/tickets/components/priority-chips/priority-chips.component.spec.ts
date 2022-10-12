import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriorityChipsComponent } from './priority-chips.component';

describe('PriorityChipsComponent', () => {
  let component: PriorityChipsComponent;
  let fixture: ComponentFixture<PriorityChipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriorityChipsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PriorityChipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
