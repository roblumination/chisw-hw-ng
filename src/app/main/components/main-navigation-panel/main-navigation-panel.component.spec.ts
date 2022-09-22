import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainNavigationPanelComponent } from './main-navigation-panel.component';

describe('MainNavigationPanelComponent', () => {
  let component: MainNavigationPanelComponent;
  let fixture: ComponentFixture<MainNavigationPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainNavigationPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainNavigationPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
