import { authService, type LoginData } from "@/services/auth.service";
import { defineStore } from "pinia";
import router from "@/router";
import routeNames from "@/router/routeNames";

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
    async logout(alreadyLogout: boolean = false) : Promise<void> {
      try {
        if (!alreadyLogout) await authService.logout();
        this.token = '';
        this.tokenType = '';
        router.push({ name: routeNames.login });
      } catch (error) {
        console.error(error);
      }
    }
  }
})