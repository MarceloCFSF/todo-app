import { authService, type LoginData } from "@/services/auth.service";
import { defineStore } from "pinia";

interface AuthState {
  token: string,
  tokenType: string
}

export const useAuthStore = defineStore('auth', {
  persist: true,
  state: () : AuthState => ({ token: '', tokenType: '' }),
  actions: {
    async login(data: LoginData) : Promise<boolean> {
      try {
        const response = await authService.login(data);
        this.token = response.access_token;
        this.tokenType = response.token_type;
  
        return true;
      } catch (error) {
        return false;
      }
    },
  }
})