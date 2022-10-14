import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalLoginWindowComponent } from './components/modal-login-window/login-modal-window.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HeaderComponent } from './components/header/header.component';
import { SmallCardComponent } from './components/small-card/small-card.component';
import { SimpleCardComponent } from './components/simple-card/simple-card.component';
import { ScrollArrowComponent } from './components/scroll-arrow/scroll-arrow.component';
// import { RegularButtonComponent } from './components/regular-button/regular-button.component';

import { MatIconModule } from '@angular/material/icon';
import { DaysAgoPipe } from './pipes/days-ago.pipe';
import { ModalWrapperComponent } from './components/modal-wrapper/modal-wrapper.component';
import { MatRippleModule } from '@angular/material/core';
import { CardLoaderComponent } from './components/card-loader/card-loader.component';

@NgModule({
  declarations: [
    ModalLoginWindowComponent,
    NotFoundComponent,
    HeaderComponent,
    SmallCardComponent,
    SimpleCardComponent,
    ScrollArrowComponent,
    DaysAgoPipe,
    ModalWrapperComponent,
    CardLoaderComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatRippleModule,
    MatIconModule,
  ],
  exports: [
    ModalLoginWindowComponent,
    ReactiveFormsModule,
    HeaderComponent,
    SmallCardComponent,
    SimpleCardComponent,
    ScrollArrowComponent,
    DaysAgoPipe,
    ModalWrapperComponent,
    CardLoaderComponent,
  ],
})
export class SharedModule {}
