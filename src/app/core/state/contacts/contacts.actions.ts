import { createActionGroup, emptyProps, props } from '@ngrx/store';
import Contact from '../../models/contact.interface';

const contactsActions = createActionGroup({
  source: 'Contacts Page',
  events: {
    // --- --- INPUT --- ---
    'Load Contacts': emptyProps(),
    'Load Contacts Failiture': props<{ error: string }>(),
    'Load Contacts Success': props<{ contacts: Array<Contact> }>(),

    // 'Load Selected Contact': emptyProps(),
    // 'Load Selected Contact Failiture': props<{ error: string }>(),
    // 'Load Selected Contact Success': props<{ contact: Contact }>(),

    // --- --- OUTPUT --- ---
    'Add Contact': props<{ contact: Contact }>(),
    'Add Contact Success': emptyProps(),
    'Add Contact Failiture': props<{ error: string }>(),

    'Edit Contact': props<{ contact: Contact }>(),
    'Edit Contact Success': emptyProps(),
    'Edit Contact Failiture': props<{ error: string }>(),

    'Delete Contact': props<{ contactId: number }>(),
    'Delete Contact Success': emptyProps(),
    'Delete Contact Failiture': props<{ error: string }>(),

    'Set Current Contact Id': props<{ contactId: number }>(),
  },
});

export default contactsActions;
