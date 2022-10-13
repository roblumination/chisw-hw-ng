import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { contactsReducer } from './core/state/contacts/contacts.reducer';
import { ContactsEffects } from './core/state/contacts/contacts.effects';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot({ contacts: contactsReducer }, {}),
    EffectsModule.forRoot([ContactsEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
