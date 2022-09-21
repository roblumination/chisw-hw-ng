import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './shared/pages/not-found/not-found.component';
// import { ForgotPasswordPageComponent } from './auth/pages/forgot-password-page/forgot-password-page.component';
// import { LoginPageComponent } from './auth/pages/login-page/login-page.component';
// import { MainPageComponent } from './auth/pages/main-page/main-page.component';
// import { RestorePasswordPageComponent } from './auth/pages/restore-password-page/restore-password-page.component';
// import { SignUpPageComponent } from './auth/pages/sign-up-page/sign-up-page.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
