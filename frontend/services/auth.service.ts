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
    const response = await useMyFetch<LoginResponse>('/login', {
      method: 'post',
      body: data,
    });

    if (!response.data.value) {
      throw new Error('Erro ao realizar login');
    }

    return response.data.value;
  },

  async logout() : Promise<void> {
    await useMyFetch('/logout', { method: 'post' });
  }
}