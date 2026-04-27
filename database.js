const { Sequelize } = require('sequelize');
require('dotenv').config();

const connectionString = process.env.DATABASE_URL;
const isProduction = process.env.NODE_ENV === 'production';

const sequelizeOptions = {
  logging: false
};

let sequelize;
if (connectionString) {
  if (connectionString.startsWith('sqlite:')) {
    sequelizeOptions.dialect = 'sqlite';
    sequelizeOptions.storage = './database.sqlite';
  } else if (connectionString.startsWith('postgres://') || connectionString.startsWith('postgresql://')) {
    sequelizeOptions.dialect = 'postgres';
    if (isProduction) {
      sequelizeOptions.dialectOptions = {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      };
    }
  } else {
    sequelizeOptions.dialect = process.env.DB_DIALECT || 'sqlite';
    if (sequelizeOptions.dialect === 'sqlite') {
      sequelizeOptions.storage = './database.sqlite';
    }
  }

  sequelize = new Sequelize(connectionString, sequelizeOptions);
} else {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
    logging: false
  });
}

module.exports = sequelize;