export class CreateLevel {
  name: string;
  description: string;
  responsibleId: number;
  siteId: number;
  constructor(
    name: string,
    description: string,
    responsibleId: number,
    siteId: number
  ) {
    this.name = name;
    this.description = description;
    this.responsibleId = responsibleId;
    this.siteId = siteId;
  }
}

export class CreateNode {
  name: string;
  description: string;
  responsibleId: number;
  siteId: number;
  superiorId: number;
  constructor(
    name: string,
    description: string,
    responsibleId: number,
    siteId: number,
    superiorId: number
  ) {
    this.name = name;
    this.description = description;
    this.responsibleId = responsibleId;
    this.siteId = siteId;
    this.superiorId = superiorId;
  }
}

export class UpdateLevel {
  id: number;
  name: string;
  description: string;
  responsibleId: number;
  status: string;
  constructor(
    id: number,
    name: string,
    description: string,
    responsibleId: number,
    status: string
  ) {
    this.name = name;
    this.description = description;
    this.responsibleId = responsibleId;
    this.id = id;
    this.status = status;
  }
}
