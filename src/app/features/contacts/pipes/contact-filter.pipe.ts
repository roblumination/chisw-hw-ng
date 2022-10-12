import { Pipe, PipeTransform } from '@angular/core';
import Contact from '../../../core/models/contact.interface';

@Pipe({
  name: 'ticketsFilter',
})
export class ContactFilterPipe implements PipeTransform {
  transform(contacts: Contact[], filterPhrase: string): Contact[] {
    return contacts.filter((contact) => {
      return (
        contact.lastName.includes(filterPhrase) &&
        contact.firstName.includes(filterPhrase) &&
        contact.address.includes(filterPhrase)
      );
    });
  }
}
