export class CreatePreclassifier {
  preclassifierCode: string;
  preclassifierDescription: string;
  cardTypeId: number;

  constructor(
    preclassifierCode: string,
    preclassifierDescription: string,
    cardTypeId: number
  ) {
    this.preclassifierCode = preclassifierCode;
    this.preclassifierDescription = preclassifierDescription;
    this.cardTypeId = cardTypeId;
  }
}
