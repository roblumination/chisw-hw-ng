import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'overview',
        title: 'Overview',
        loadChildren: () =>
          import('../overview/overview.module').then((m) => m.OverviewModule),
      },
      {
        path: 'tickets',
        title: 'Tickets',
        loadChildren: () =>
          import('../tickets/tickets.module').then((m) => m.TicketsModule),
      },
      {
        path: 'contacts',
        title: 'Contacts',
        loadChildren: () =>
          import('../contacts/contacts.module').then((m) => m.ContactsModule),
      },
      {
        path: 'settings',
        title: 'Settings',
        loadChildren: () =>
          import('../settings/settings.module').then((m) => m.SettingsModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
