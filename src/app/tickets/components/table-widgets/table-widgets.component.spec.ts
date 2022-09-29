import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableWidgetsComponent } from './table-widgets.component';

describe('TableWidgetsComponent', () => {
  let component: TableWidgetsComponent;
  let fixture: ComponentFixture<TableWidgetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableWidgetsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableWidgetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
