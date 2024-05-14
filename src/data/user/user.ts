export default class User {
  name: string;
  email: string;
  token: string;
  roles: string[];

  constructor(name: string, email: string, token: string, roles: string[]) {
    this.name = name;
    this.email = email;
    this.token = token;
    this.roles = roles;
  }
}
