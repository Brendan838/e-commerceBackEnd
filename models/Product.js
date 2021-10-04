// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
//const { Category } = require('.');
const Category = require('./Category');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    validate: { 
    notNull: true
    }
    },    

    product_name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { 
    notNull: true
    }
    },

    price: {
    type: DataTypes.DECIMAL,
    allowNull: false,
    validate: {
    isDecimal: true,
    notNull: true
    }
    },

    stock: {
    type: DataTypes.INTEGER,
    defaultValue: 10,
    allowNull: false,
    validate: {
    notNull: true,
    isNumeric: true
    }
    },
    category_id: {
    type: DataTypes.INTEGER,
    references: {
    model: Category,
    key: 'id'
    }
    }

  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;