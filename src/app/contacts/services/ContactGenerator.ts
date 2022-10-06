import Contact from '../models/contact.interface';
// import { randomIssues } from './randomIssues';
import { randomNames } from './randomNames';

export default class ContactGenerator {
  private readonly USER_AMOUNT = 100;

  private contacts: Array<Contact> = [];

  constructor() {}

  getRandomContacts() {
    this.generateContacts();
    return this.contacts;
  }

  getRandomProfileImgUrl(): string {
    const seed = this.getRandom(0, 10000);
    // const type = 'adventurer-neutral';
    const type = 'big-ears-neutral';
    return `https://avatars.dicebear.com/api/${type}/${seed}.svg`;
  }

  private generateContacts() {
    for (let i = 0; i < this.USER_AMOUNT; i++) {
      const randomName = randomNames[this.getRandom(randomNames.length)];
      const result: Contact = {
        id: i,
        firstName: randomName.split(' ')[0],
        lastName: randomName.split(' ')[1],
        email: 'test@gmail.com',
        address: 'Lviv',
        createdAt: this.getRandomDate(new Date('2022/07/28'), new Date()),
        photoUrl: this.getRandomProfileImgUrl(),
      };

      this.contacts.push(result);
    }
  }

  private getRandom(max: number, min: number = 0): number {
    const range = max - min;
    return ~~(Math.random() * range) + min;
  }

  private getRandomDate(start: Date, end: Date) {
    return new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
  }
}
