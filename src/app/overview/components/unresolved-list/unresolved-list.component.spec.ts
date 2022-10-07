import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnresolvedListComponent } from './unresolved-list.component';

describe('UnresolvedListComponent', () => {
  let component: UnresolvedListComponent;
  let fixture: ComponentFixture<UnresolvedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnresolvedListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnresolvedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
