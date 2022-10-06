import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  currentTab: NavigationTabsNames = this.getCurrentTabName();
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

  constructor(private router: Router) {}

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

  getCurrentTabName(): NavigationTabsNames {
    const current = this.router.url.split('/')[2];
    if (current == 'tickets') return NavigationTabsNames.Tickets;
    if (current == 'contacts') return NavigationTabsNames.Contacts;
    if (current == 'settings') return NavigationTabsNames.Settings;
    return NavigationTabsNames.Overview;
  }
}
