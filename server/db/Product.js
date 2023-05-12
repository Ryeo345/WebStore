const Sequelize = require('sequelize');
const { STRING, UUID, UUIDV4, TEXT, FLOAT, DECIMAL, INTEGER} = Sequelize;

const conn = require('./conn');

const numGen = (min, max) => {
  const rand = Math.random() * (max - min) + min;
  return Math.floor(rand);
}

const Product = conn.define('product', {
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
  image: {
    type:TEXT,
    validate: {
      isUrl: true,
      notEmpty: true
    },
    allowNull: true,
  },
  price: {
    type: DECIMAL(10, 2),
    defaultValue: 9.99,
  },
  category: {
    type: STRING,
  },
  totalCal: {
    type: INTEGER
  },
  calFat: {
    type: INTEGER
  },
  totalFat: {
    type: INTEGER
  },
  satFat: {
    type: INTEGER
  },
  transFat: {
    type: INTEGER
  },
  cholesterol: {
    type: INTEGER
  },
  sodium: {
    type: INTEGER
  },
  totalCarbs: {
    type: INTEGER
  },
  fiber: {
    type: INTEGER
  },
  sugars: {
    type: INTEGER
  },
  protein: {
    type: INTEGER
  },
});

Product.addHook('beforeValidate',(product) => {
  if (product.image === ''){
    product.image = null;
  }
})
module.exports = Product;
