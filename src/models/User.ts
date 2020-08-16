export class User {
  id: string
  first_name: string
  last_name: string
  email: string
  avatar: string
  active: boolean

  constructor(
    id: string,
    first_name: string,
    last_name: string,
    email: string,
    avatar: string,
    active: boolean
  ) {
    this.id = id
    this.first_name = first_name
    this.last_name = last_name
    this.email = email
    this.avatar = avatar
    this.active = active
  }
}
