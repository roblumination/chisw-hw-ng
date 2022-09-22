import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { MainNavigationPanelComponent } from './components/main-navigation-panel/main-navigation-panel.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [MainComponent, MainNavigationPanelComponent],
  imports: [CommonModule, MainRoutingModule, SharedModule],
})
export class MainModule {}
