import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksMiniComponent } from './tasks-mini.component';

describe('TasksMiniComponent', () => {
  let component: TasksMiniComponent;
  let fixture: ComponentFixture<TasksMiniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TasksMiniComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TasksMiniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
