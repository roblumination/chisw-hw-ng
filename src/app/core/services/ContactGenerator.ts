import Contact from '../models/contact.interface';
import {
  getRandomDateInRange,
  getRandomInRange,
  getRandomProfileImgUrl,
} from '../utils';
import { randomNames } from './randomNames';

export default class ContactGenerator {
  private readonly USER_AMOUNT = 3;

  private contacts: Array<Contact> = [];

  getRandomContacts() {
    this.generateContacts();
    return this.contacts;
  }

  private generateContacts() {
    for (let i = 0; i < this.USER_AMOUNT; i++) {
      const randomName = randomNames[getRandomInRange(randomNames.length)];
      const result: Contact = {
        id: i,
        firstName: randomName.split(' ')[0],
        lastName: randomName.split(' ')[1],
        email: 'test@gmail.com',
        address: 'Lviv',
        createdAt: getRandomDateInRange(new Date('2022/07/28'), new Date()),
        photoUrl: getRandomProfileImgUrl(),
      };

      this.contacts.push(result);
    }
  }
}
