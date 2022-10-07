import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewComponent } from './overview.component';
import { SharedModule } from '../shared/shared.module';
import { TrendsGraphComponent } from './components/trends-graph/trends-graph.component';

import { NgxEchartsModule } from 'ngx-echarts';

@NgModule({
  declarations: [OverviewComponent, TrendsGraphComponent],
  imports: [
    CommonModule,
    SharedModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
  ],
  exports: [OverviewComponent],
})
export class OverviewModule {}
