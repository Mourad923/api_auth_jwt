
const { Model } = require('objection')


class User extends Model {
  static get tableName() {
    return 'user_registered';
  }
}

module.exports = User;
  
