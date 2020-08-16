import axios, { AxiosResponse } from 'axios'
import { User } from '@/models/User'

export class UserApi {
  async getAllUsers(): Promise<User[]> {
    try {
      const users: AxiosResponse = await axios.get('static/users.json')
      return users.data
    } catch (error) {
      return error
    }
  }
}
