export class NotCalendarWeek extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NotCalendarWeek';
  }
}
