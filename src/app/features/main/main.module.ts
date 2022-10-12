import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { MainNavigationPanelComponent } from './components/main-navigation-panel/main-navigation-panel.component';

import { MatRippleModule } from '@angular/material/core';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [MainComponent, MainNavigationPanelComponent],
  imports: [CommonModule, MainRoutingModule, SharedModule, MatRippleModule],
})
export class MainModule {}
