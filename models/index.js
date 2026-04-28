const { Sequelize } = require('sequelize');

const sequelize = process.env.DATABASE_URL 
  ? new Sequelize(process.env.DATABASE_URL, {
      dialect: 'postgres',
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false // Required for Render
        }
      }
    })
  : new Sequelize({
      dialect: 'sqlite',
      storage: './database.sqlite' // Falls back to sqlite for local coding
    });

module.exports = { sequelize };