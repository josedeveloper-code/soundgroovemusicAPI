const { Sequelize } = require('sequelize');
require('dotenv').config();


const sequelize = process.env.DATABASE_URL.startsWith('postgres') 
  ? new Sequelize(process.env.DATABASE_URL, {
      dialect: 'postgres',
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false 
        }
      }
    })
  : new Sequelize({
      dialect: 'sqlite',
      storage: './database.sqlite'
    });

module.exports = sequelize;
