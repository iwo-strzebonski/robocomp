import client from '~/plugins/db.js'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const db_query = `
    BEGIN;

    WITH address_insert AS (
    INSERT INTO robocomp.address (street_address, admin_level_2, postal_code, country_code)
    VALUES ('${query.street_address}', '${query.admin_level_2}', '${query.postal_code}', '${query.country_code}')
    RETURNING id
    ),
    team_insert AS (
    INSERT INTO robocomp.teams (name)
    VALUES ('${query.team_name}')
    RETURNING id
    )

    INSERT INTO robocomp.participants (first_name, last_name, email, phone, address, team)
    SELECT '${query.first_name}', '${query.last_name}', '${query.email}', '${query.phone}', address_insert.id, team_insert.id
    FROM address_insert, team_insert;

    COMMIT;`
  console.log('Sending request to db')
  console.log(client)
  const result = await client.query(db_query)
})
