exports.up = async (knex) => {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
  await knex.schema
    .createTable('users', (users) => {
      users.uuid('user_id').defaultTo(knex.raw('uuid_generate_v1()')).primary();
      users.string('username', 200).notNullable().unique();
      users.string('password', 200).notNullable();
      users.timestamps(false, true);
    })
}

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('users')
}
