import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewComponent } from './overview.component';
import { SharedModule } from '../shared/shared.module';
import { TrendsGraphComponent } from './components/trends-graph/trends-graph.component';

@NgModule({
  declarations: [OverviewComponent, TrendsGraphComponent],
  imports: [CommonModule, SharedModule],
  exports: [OverviewComponent],
})
export class OverviewModule {}
