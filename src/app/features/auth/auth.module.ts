import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignUpPageComponent } from './pages/sign-up-page/sign-up-page.component';
import { RestorePasswordPageComponent } from './pages/restore-password-page/restore-password-page.component';
import { ForgotPasswordPageComponent } from './pages/forgot-password-page/forgot-password-page.component';
import { RegularButtonComponent } from '../../shared/components/regular-button/regular-button.component';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';

@NgModule({
  declarations: [
    LoginPageComponent,
    SignUpPageComponent,
    RestorePasswordPageComponent,
    ForgotPasswordPageComponent,
    RegularButtonComponent,
    AuthComponent,
  ],
  imports: [CommonModule, SharedModule, ReactiveFormsModule, AuthRoutingModule],
})
export class AuthModule {}
