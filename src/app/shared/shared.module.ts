import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalWindowComponent } from './components/modal-window/modal-window.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HeaderComponent } from './components/header/header.component';
import { SmallCardComponent } from './components/small-card/small-card.component';
import { SimpleCardComponent } from './components/simple-card/simple-card.component';
// import { RegularButtonComponent } from './components/regular-button/regular-button.component';

@NgModule({
  declarations: [
    ModalWindowComponent,
    NotFoundComponent,
    HeaderComponent,
    SmallCardComponent,
    SimpleCardComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [
    ModalWindowComponent,
    ReactiveFormsModule,
    HeaderComponent,
    SmallCardComponent,
    SimpleCardComponent,
  ],
})
export class SharedModule {}
