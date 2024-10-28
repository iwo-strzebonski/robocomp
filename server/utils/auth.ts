import type { NuxtError } from '@nuxt/types'
import type { H3Event } from 'h3'

const runtimeConfig = useRuntimeConfig()

const BASE_RESOURCE = '/robocomp'

export enum AccessResourceMethods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE'
}

/**
 * Verify access to a resource
 * @param {H3Event} event The event object
 * @returns {AuthContext | NuxtError} The user context or an error
 */
async function user(event: H3Event, resource?: string, method?: AccessResourceMethods): Promise<true | NuxtError> {
  const header = getHeader(event, 'Authorization')

  if (!header) return createError({ statusCode: 401, message: 'Unauthorized' })

  const [tokenType, accessToken] = header.split(' ')

  await $fetch(`${runtimeConfig.public.INTEGRA_API_URL}/auth/me`, {
    params: {
      resource: BASE_RESOURCE + (resource ? `/${resource}` : ''),
      method: method || AccessResourceMethods.GET
    },
    headers: {
      Authorization: `${tokenType} ${accessToken}`
    }
  })

  return true
}

export default { AccessResourceMethods, user }
