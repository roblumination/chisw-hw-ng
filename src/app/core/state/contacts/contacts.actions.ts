import {
  createAction,
  createActionGroup,
  emptyProps,
  props,
} from '@ngrx/store';
import Contact from '../../models/contact.interface';

// export const contactsActions = {
//   load: createAction(page + 'Load All Contacts'),
//   loadSuccess: createAction(
//     page + 'Load All Contacts Success',
//     props<{ contacts: Array<Contact> }>()
//   ),
//   loadFailure: createAction(
//     page + 'Load All Contacts Failure',
//     props<{ error: string }>()
//   ),
//   add: createAction(
//     '[Contacts Page] Add Contact',
//     props<{ contact: Contact }>()
//   ),
//   edit: createAction(page + 'Edit Contact', props<{ contact: Contact }>()),
//   delete: createAction(page + 'Delete Contact', props<{ contactId: number }>()),
//   setCurrentId: createAction(
//     page + 'Set Current Contact Id',
//     props<{ contactId: number }>()
//   ),
// };

const contactsActions = createActionGroup({
  source: 'Contacts Page',
  events: {
    // --- --- INPUT --- ---
    'Load Contacts': emptyProps(),
    'Load Contacts Failiture': props<{ error: string }>(),
    'Load Contacts Success': props<{ contacts: Array<Contact> }>(),

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
