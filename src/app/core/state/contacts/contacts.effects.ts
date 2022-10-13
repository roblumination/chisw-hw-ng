import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, map, mergeMap } from 'rxjs';
import { ContactService } from 'src/app/core/services/contact.service';
import contactsActions from './contacts.actions';

@Injectable()
export class ContactsEffects {
  constructor(
    private actions$: Actions,
    private contactService: ContactService
  ) {}

  loadContacts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(contactsActions.loadContacts),
      mergeMap(() =>
        this.contactService.getAll().pipe(
          map((contacts) =>
            contactsActions.loadContactsSuccess({ contacts: contacts })
          ),
          catchError(() => EMPTY)
        )
      )
    )
  );

  // addContact$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(contactsActions.addContact),
  //     mergeMap(({ contact }) =>
  //       this.contactService.add(contact).pipe(
  //         map(() => contactsActions.addContactSuccess()),
  //         catchError(() => EMPTY)
  //       )
  //     )
  //   );
  // });
}
