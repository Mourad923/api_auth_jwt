
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('user_registered').del()
    .then(function () {
      // Inserts seed entries
      return knex('user_registered').insert([
        {name: 'Mourad', email: 'mourad92@gmail.com' , password:'1234'},
        
      ]);
    });
};
