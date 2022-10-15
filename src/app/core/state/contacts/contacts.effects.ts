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

  addContact$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(contactsActions.addContact),
      mergeMap(({ contact }) =>
        this.contactService.add(contact).pipe(
          map(() => contactsActions.addContactSuccess()),
          catchError(() => EMPTY)
        )
      )
    );
  });

  addContactSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(contactsActions.addContactSuccess),
      map(() => contactsActions.loadContacts())
    );
  });

  deleteContact$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(contactsActions.deleteContact),
      mergeMap(({ contactId }) =>
        this.contactService.delete(contactId).pipe(
          map(() => contactsActions.addContactSuccess()),
          catchError(() => EMPTY)
        )
      )
    );
  });

  deleteContactSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(contactsActions.deleteContact),
      map(() => contactsActions.loadContacts())
    );
  });

  editContact$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(contactsActions.editContact),
      mergeMap(({ contact }) =>
        this.contactService.edit(contact).pipe(
          map(() => contactsActions.addContactSuccess()),
          catchError(() => EMPTY)
        )
      )
    );
  });

  editContactSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(contactsActions.editContactSuccess),
      map(() => contactsActions.loadContacts())
    );
  });
}
