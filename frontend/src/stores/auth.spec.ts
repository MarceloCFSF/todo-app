import { beforeEach, describe, it, expect, vi } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { useAuthStore } from "./auth";
import { afterEach } from "node:test";
import { authService } from "@/services/auth.service";

vi.mock('../services/auth.service.ts')

describe('Auth Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  it('should login successful', async () => {
    vi.mocked(authService.login)
      .mockReturnValue(Promise.resolve({
        access_token: "token", token_type: "Bearer"
      }))

    const auth = useAuthStore()

    expect(auth.token).to.be.empty
    expect(auth.tokenType).to.be.empty

    await auth.login({
      email: 'user@example.com',
      password: "12345678"
    })

    expect(auth.token).toBe('token')
    expect(auth.tokenType).toBe('Bearer')
  })

  it('should not login', async () => {
    vi.mocked(authService.login)
      .mockReturnValue(Promise.reject())

    const auth = useAuthStore()

    expect(auth.token).to.be.empty
    expect(auth.tokenType).to.be.empty

    await auth.login({
      email: 'user@example.com',
      password: "12345678"
    })

    expect(auth.token).to.be.empty
    expect(auth.tokenType).to.be.empty
  })
})