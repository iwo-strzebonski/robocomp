import { createKysely } from '@vercel/postgres-kysely'
import type { VercelPostgresPoolConfig } from '@vercel/postgres';
import { createError } from 'h3'
import { sql } from 'kysely'

import { isFormsResponse, type FormsResponse, type Participant, type Robot } from '~/types/Forms_response'

import type { Database } from '~/types/db/Database'

const pool: VercelPostgresPoolConfig = {
    max: 10,
    connectionString: process.env.DATABASE_URL,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000
}

export const kyselyDb = createKysely<Database>()