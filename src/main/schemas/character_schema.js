export const Character = (table) => {
  table.increments('id').primary();
  table.string('full_name', 100);
};