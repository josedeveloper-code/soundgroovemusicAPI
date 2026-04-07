const { application } = require('express');
const { sequelize } = require('sequelize'); // My Sequelized Connection to Mongo DB & SQLITE
const mongoose = require('mongoose'); // My Mongo DB connection

const app = express();

// Connect SQLite
sequelize.sync().then(() => console.log('SQLite Connected!'));

// Connect MongoDB (assuming you have a local mongo or Atlas URI)
mongoose.connect('mongodb://localhost:27017/soundgroove')
  .then(() => console.log('MongoDB Connected!'));

app.listen(3000, () => console.log('Server running with TWO databases!'));


// Initialize Sequelize with SQlite, Mongo
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './Database.sqlite'// This file will be created automatically
});

async function testConnection () {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully');
    } catch (error) {
        console.error('Unable to connect to the database:', error );
    }
}

testConnection();