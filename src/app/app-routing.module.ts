import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// --- Modules ---
import { AuthModule } from './auth/auth.module';
import { MainModule } from './main/main.module';
import { AuthGuard } from './shared/guards/auth.guard';

// --- Components ---
import { NotFoundComponent } from './shared/pages/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), MainModule, AuthModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
