import { createActionGroup, emptyProps, props } from '@ngrx/store';
import Ticket from '../../models/ticket.interface';

const ticketActions = createActionGroup({
  source: 'Tickets Page',
  events: {
    // --- --- INPUT --- ---
    'Load Tickets': emptyProps(),
    'Load Tickets Failiture': props<{ error: string }>(),
    'Load Tickets Success': props<{ tickets: Array<Ticket> }>(),

    // 'Load Selected Contact': emptyProps(),
    // 'Load Selected Contact Failiture': props<{ error: string }>(),
    // 'Load Selected Contact Success': props<{ contact: Contact }>(),

    // --- --- OUTPUT --- ---
    'Add Ticket': props<{ ticket: Ticket }>(),
    'Add Ticket Success': emptyProps(),
    'Add Ticket Failiture': props<{ error: string }>(),

    'Edit Ticket': props<{ ticket: Ticket }>(),
    'Edit Ticket Success': emptyProps(),
    'Edit Ticket Failiture': props<{ error: string }>(),

    'Delete Ticket': props<{ ticketId: number }>(),
    'Delete Ticket Success': emptyProps(),
    'Delete Ticket Failiture': props<{ error: string }>(),

    // 'Set Current Ticket Id': props<{ ticketId: number }>(),
    'Set Sort By': props<{ sortBy: keyof Ticket }>(),
  },
});

export default ticketActions;
