export class TicketModel {
  _id: string = '';
  title: string = '';
  category: object = {};
  department: object = {};
  student: object = {};
  isAnswered: boolean = false;
  createdAt: Date = new Date();

  constructor(
    _id: string,
    title: string,
    category: object,
    department: object,
    student: object,
    isAnswered: boolean,
    createdAt: Date
  ) {
    this._id = _id;
    this.title = title;
    this.category = category;
    this.department = department;
    this.student = student;
    this.isAnswered = isAnswered;
    this.createdAt = createdAt;
  }
}
