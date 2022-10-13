import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, map, mergeMap } from 'rxjs';
import { ContactService } from 'src/app/features/contacts/services/contact.service';
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
}
