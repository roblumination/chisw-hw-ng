import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewComponent } from './overview.component';
import { SharedModule } from '../shared/shared.module';
import { TrendsGraphComponent } from './components/trends-graph/trends-graph.component';

import { NgxEchartsModule } from 'ngx-echarts';
import { UnresolvedListComponent } from './components/unresolved-list/unresolved-list.component';

import { MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { TasksMiniComponent } from './components/tasks-mini/tasks-mini.component';
import { OverviewRoutingModule } from './overview-routing.module';

@NgModule({
  declarations: [
    OverviewComponent,
    TrendsGraphComponent,
    UnresolvedListComponent,
    TasksMiniComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    MatRippleModule,
    MatButtonModule,
    OverviewRoutingModule,
  ],
  exports: [OverviewComponent],
})
export class OverviewModule {}
