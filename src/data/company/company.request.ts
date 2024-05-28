export class CreateCompany {
  name: string;
  rfc: string;
  address: string;
  contact: string;
  position: string;
  phone: string;
  extension: string
  cellular: string;
  email: string;
  logo: string;

  constructor(
    name: string,
    rfc: string,
    address: string,
    contact: string,
    position: string,
    phone: string,
    extension: string,
    cellular: string,
    email: string,
    logo: string
  ) {
    this.name = name;
    this.rfc = rfc;
    this.address = address;
    this.contact = contact;
    this.position = position;
    this.phone = phone;
    this.extension = extension
    this.cellular = cellular;
    this.email = email;
    this.logo = logo;
  }
}
