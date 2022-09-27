import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketsComponent } from './tickets.component';
import { SharedModule } from '../shared/shared.module';

import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [TicketsComponent],
  imports: [CommonModule, SharedModule, MatTableModule],
})
export class TicketsModule {}
