import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// --- Modules ---
import { AuthModule } from './auth/auth.module';
import { MainModule } from './main/main.module';

// --- Components ---
import { NotFoundComponent } from './shared/pages/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/main/overview', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), MainModule, AuthModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
