import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NavigationTabsNames } from '../../NavigationTabsNames.enum';

type NavigationTab = {
  title: NavigationTabsNames;
  imageSrc: string;
};

@Component({
  selector: 'app-main-navigation-panel',
  templateUrl: './main-navigation-panel.component.html',
  styleUrls: ['./main-navigation-panel.component.scss'],
})
export class MainNavigationPanelComponent {
  currentTab: NavigationTabsNames = NavigationTabsNames.Overview;
  tabs: Array<NavigationTab> = [
    {
      title: NavigationTabsNames.Overview,
      imageSrc: '/assets/img/navIcon-overview.svg',
    },
    {
      title: NavigationTabsNames.Tickets,
      imageSrc: '/assets/img/navIcon-tickets.svg',
    },
    {
      title: NavigationTabsNames.Contacts,
      imageSrc: '/assets/img/navIcon-contacts.svg',
    },
  ];

  @Output() tabChangeEvent: EventEmitter<NavigationTabsNames> =
    new EventEmitter<NavigationTabsNames>();

  setCurrentTab(tabName: NavigationTabsNames) {
    if (tabName !== this.currentTab) {
      this.currentTab = tabName;
      this.tabChangeEvent.emit(tabName);
    }
  }

  setCurrentTabSettings() {
    this.setCurrentTab(NavigationTabsNames.Settings);
  }
}
