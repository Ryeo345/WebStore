const Sequelize = require('sequelize');
const { STRING, UUID, UUIDV4, TEXT, FLOAT, DECIMAL, INTEGER} = Sequelize;

const conn = require('./conn');

const Coupon = conn.define('coupon', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  discount: {
    type: DECIMAL,
    defaultValue: 0.00,
  }
});

module.exports = Coupon;
