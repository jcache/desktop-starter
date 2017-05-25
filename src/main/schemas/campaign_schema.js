export const Campaign = table => {
  table.increments('id').primary();
  table.string('campaign_name', 100);
};