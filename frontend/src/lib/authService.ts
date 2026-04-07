import axios from 'axios'
import { AuthResponse } from '../types'

export const authService = {
  async login(username: string, password: string): Promise<AuthResponse> {
    const formData = new FormData()
    formData.append('username', username)
    formData.append('password', password)

    const response = await axios.post<AuthResponse>('/api/auth/login', formData)
    return response.data
  },
}
