import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { ContactsComponent } from '../contacts/contacts.component';
import { OverviewComponent } from '../overview/overview.component';
import { SettingsComponent } from '../settings/settings.component';
import { TicketsComponent } from '../tickets/tickets.component';
import { MainComponent } from './main.component';

const routes: Routes = [
  { path: 'main', redirectTo: '/main/overview', pathMatch: 'full' },
  {
    path: 'main',
    component: MainComponent,
    children: [
      {
        path: 'overview',
        title: 'Overview',
        component: OverviewComponent,
      },
      {
        path: 'tickets',
        title: 'Tickets',
        component: TicketsComponent,
      },
      {
        path: 'contacts',
        title: 'Contacts',
        component: ContactsComponent,
      },
      {
        path: 'settings',
        title: 'Settings',
        component: SettingsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
