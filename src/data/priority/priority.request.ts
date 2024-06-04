export class CreatePriority {
  siteId: number;
  priorityCode: string;
  priorityDescription: string;
  priorityDays: number;
  constructor(
    siteId: number,
    priorityCode: string,
    priorityDescription: string,
    priorityDays: number
  ) {
    this.siteId = siteId;
    this.priorityCode = priorityCode;
    this.priorityDescription = priorityDescription;
    this.priorityDays = priorityDays;
  }
}
