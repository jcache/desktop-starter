export const Player = (table) => {
  table.increments('id').primary();
  table.string('first_name', 100);
  table.string('last_name', 100);
  table.string('email', 100);
};