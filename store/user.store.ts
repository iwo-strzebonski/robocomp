import { defineStore } from 'pinia'

import type { LoginResponseBody } from '~/types/auth/Login'

export const useUserStore = defineStore({
  id: 'user-store',
  persist: true,
  state: () => {
    return {
      accessToken: '',
      tokenType: '',
      baseResource: '/robocomp',
      INTEGRA_API_URL: process.env.INTEGRA_API_URL
    }
  },
  actions: {
    async logout() {
      const { data, error } = await useFetch<{ message: string }>(`${this.INTEGRA_API_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${this.tokenType} ${this.accessToken}`
        }
      })

      this.accessToken = ''
      this.tokenType = ''

      if (error.value) {
        if (error.value?.statusCode === 401) {
          return navigateTo('/xillith/login')
        }

        throw error
      }

      if (!data.value) throw new Error('No value')

      return navigateTo('/xillith/login')
    },
    async login(email: string, password: string) {
      const { data, error } = await useFetch<LoginResponseBody>(`${this.INTEGRA_API_URL}/auth/login`, {
        params: {
          resource: this.baseResource,
          method: 'GET'
        },
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: {
          email,
          password
        }
      })

      if (error.value) throw error

      if (!data.value) throw new Error('No value')

      this.accessToken = data.value.accessToken
      this.tokenType = data.value.tokenType
    },
    async me() {
      const { data, error } = await useFetch(`${this.INTEGRA_API_URL}/auth/me`, {
        params: {
          resource: this.baseResource,
          method: 'GET'
        },
        headers: {
          Authorization: `${this.tokenType} ${this.accessToken}`
        }
      })

      if (error.value) throw error

      if (!data.value) throw new Error('No value')

      return data.value
    }
  }
})
