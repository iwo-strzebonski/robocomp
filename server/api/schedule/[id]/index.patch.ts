import { createKysely } from '@vercel/postgres-kysely'

import auth, { AccessResourceMethods } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  const isAuthorized = await auth.user(event, 'schedule', AccessResourceMethods.PATCH)

  const body = await readBody(event)

  if (!isAuthorized) {
    return createError({ statusCode: 401, message: 'Unauthorized' })
  }

  const { id } = event.context.params as { id: string }

  const db = createKysely()

  try {
    await db
      .updateTable('robocomp.schedules')
      .set({
        start_date: body.start_date,
        end_date: body.end_date
      })
      .where('id', '=', id)
      .executeTakeFirst()
  } catch (error) {
    console.error(error)

    db.destroy()

    return createError({
      statusCode: 500,
      message: 'Failed to update schedule'
    })
  }

  db.destroy()
})
