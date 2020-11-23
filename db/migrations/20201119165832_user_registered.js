exports.up = function(knex) {
  
    return  knex.schema.createTable('user_registered', (table) => {

        table.increments().notNullable()
        table.string('name').notNullable()
        table.string('email').notNullable().unique
        table.string('password').notNullable()



    })
};

exports.down = function(knex) {

    return knex.schema.dropTable('user_registered')
  
};
