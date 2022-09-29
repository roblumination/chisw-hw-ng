import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { MainNavigationPanelComponent } from './components/main-navigation-panel/main-navigation-panel.component';
import { SharedModule } from '../shared/shared.module';
import { OverviewModule } from '../overview/overview.module';
import { TicketsModule } from '../tickets/tickets.module';
import { SettingsModule } from '../settings/settings.module';

import { MatRippleModule } from '@angular/material/core';

@NgModule({
  declarations: [MainComponent, MainNavigationPanelComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule,
    OverviewModule,
    TicketsModule,
    SettingsModule,
    MatRippleModule,
  ],
})
export class MainModule {}
