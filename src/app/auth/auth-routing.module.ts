import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// --- --- Pages --- ---
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RestorePasswordPageComponent } from './pages/restore-password-page/restore-password-page.component';
import { SignUpPageComponent } from './pages/sign-up-page/sign-up-page.component';
import { ForgotPasswordPageComponent } from './pages/forgot-password-page/forgot-password-page.component';
import { AuthComponent } from './auth.component';

const routes: Routes = [
  // { path: 'auth', redirectTo: '/auth/login', pathMatch: 'full' },
  {
    path: '',
    pathMatch: 'full',
    component: AuthComponent,
    children: [
      { path: 'login', component: LoginPageComponent },
      { path: 'reset', component: RestorePasswordPageComponent },
      { path: 'signup', component: SignUpPageComponent },
      { path: 'forgot', component: ForgotPasswordPageComponent },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
