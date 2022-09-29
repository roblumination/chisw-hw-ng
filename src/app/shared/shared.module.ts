import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalWindowComponent } from './components/modal-window/modal-window.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HeaderComponent } from './components/header/header.component';
import { SmallCardComponent } from './components/small-card/small-card.component';
import { SimpleCardComponent } from './components/simple-card/simple-card.component';
import { ScrollArrowComponent } from './components/scroll-arrow/scroll-arrow.component';
// import { RegularButtonComponent } from './components/regular-button/regular-button.component';

import { MatIconModule } from '@angular/material/icon';
import { DaysAgoPipe } from './pipes/days-ago.pipe';

@NgModule({
  declarations: [
    ModalWindowComponent,
    NotFoundComponent,
    HeaderComponent,
    SmallCardComponent,
    SimpleCardComponent,
    ScrollArrowComponent,
    DaysAgoPipe,
  ],
  imports: [CommonModule, ReactiveFormsModule, MatIconModule],
  exports: [
    ModalWindowComponent,
    ReactiveFormsModule,
    HeaderComponent,
    SmallCardComponent,
    SimpleCardComponent,
    ScrollArrowComponent,
    DaysAgoPipe,
  ],
})
export class SharedModule {}
