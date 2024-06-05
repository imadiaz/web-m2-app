export class CreateSite {
    companyId: number;
    siteCode: string;
    siteBusinessName: string;
    name: string;
    siteType: string;
    rfc: string;
    address: string;
    contact: string;
    position: string;
    phone: string;
    extension: string;
    cellular: string;
    email: string;
    logo: string;
    latitud: string;
    longitud: string;
    dueDate: string;
    monthlyPayment: number;
    currency: string;
    appHistoryDays: number;
  
    constructor(
      companyId: number,
      siteCode: string,
      siteBusinessName: string,
      name: string,
      siteType: string,
      rfc: string,
      address: string,
      contact: string,
      position: string,
      phone: string,
      extension: string,
      cellular: string,
      email: string,
      logo: string,
      latitud: string,
      longitud: string,
      dueDate: string,
      monthlyPayment: number,
      currency: string,
      appHistoryDays: number
    ) {
      this.companyId = companyId;
      this.siteCode = siteCode;
      this.siteBusinessName = siteBusinessName;
      this.name = name;
      this.siteType = siteType;
      this.rfc = rfc;
      this.address = address;
      this.contact = contact;
      this.position = position;
      this.phone = phone;
      this.extension = extension;
      this.cellular = cellular;
      this.email = email;
      this.logo = logo;
      this.latitud = latitud;
      this.longitud = longitud;
      this.dueDate = dueDate;
      this.monthlyPayment = monthlyPayment;
      this.currency = currency;
      this.appHistoryDays = appHistoryDays;
    }
}