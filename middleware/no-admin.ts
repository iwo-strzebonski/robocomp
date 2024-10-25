import { useUserStore } from '~/store/user.store'

export default defineNuxtRouteMiddleware(async (to) => {
  const userStore = useUserStore()

  if (userStore.tokenType && userStore.accessToken) {
    try {
      await userStore.me()

      return {
        path: (to.query.redirect as string | undefined) || '/xillith'
      }
    } catch {
      userStore.logout()
    }
  }
})
