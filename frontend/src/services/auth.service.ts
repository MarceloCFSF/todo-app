import api from "./api.service"

export interface LoginData {
  email: string,
  password: string
}

export interface LoginResponse {
  access_token: string,
  token_type: string
}

export const authService = {
  async login(data: LoginData) : Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('/login', data);
    return response.data;
  },

  async logout() : Promise<void> {
    await api.post('/logout');
  }
}
