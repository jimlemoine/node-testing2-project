
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        {name: 'Land Cruiser'},
        {name: 'Gelandewagen'},
        {name: 'Range Rover'}
      ]);
    });
};
