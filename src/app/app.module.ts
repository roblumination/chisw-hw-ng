import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ModalWindowComponent } from './components/modal-window/modal-window.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignUpPageComponent } from './pages/sign-up-page/sign-up-page.component';
import { RestorePasswordPageComponent } from './pages/restore-password-page/restore-password-page.component';
import { ForgotPasswordPageComponent } from './pages/forgot-password-page/forgot-password-page.component';
import { RegularButtonComponent } from './components/regular-button/regular-button.component';

@NgModule({
  declarations: [
    AppComponent,
    ModalWindowComponent,
    LoginPageComponent,
    SignUpPageComponent,
    RestorePasswordPageComponent,
    ForgotPasswordPageComponent,
    RegularButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
