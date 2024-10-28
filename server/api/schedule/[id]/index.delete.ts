import { createKysely } from '@vercel/postgres-kysely'

import auth, { AccessResourceMethods } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  const isAuthorized = await auth.user(event, 'schedule', AccessResourceMethods.PATCH)

  if (!isAuthorized) {
    return createError({ statusCode: 401, message: 'Unauthorized' })
  }

  const { id } = event.context.params as { id: string }

  const db = createKysely()

  try {
    await db.deleteFrom('robocomp.schedules').where('id', '=', id).executeTakeFirst()
  } catch (error) {
    console.error(error)

    db.destroy()

    return createError({
      statusCode: 500,
      message: 'Failed to delete schedule'
    })
  }

  db.destroy()
})
