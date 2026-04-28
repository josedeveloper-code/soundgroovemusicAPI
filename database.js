const { Sequelize } = require("sequelize");
require("dotenv").config();

const connectionString = process.env.DATABASE_URL;
const isProduction = process.env.NODE_ENV === "production";

const sequelizeOptions = {
  logging: !isProduction, // Log SQL only in development
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

let sequelize;

if (connectionString) {
  // Detect dialect automatically
  if (connectionString.startsWith("sqlite:")) {
    sequelizeOptions.dialect = "sqlite";
    sequelizeOptions.storage = "./database.sqlite";
  } else if (connectionString.startsWith("postgres://") || connectionString.startsWith("postgresql://")) {
    sequelizeOptions.dialect = "postgres";

    if (isProduction) {
      sequelizeOptions.dialectOptions = {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      };
    }
  } else {
    throw new Error("Unsupported DATABASE_URL format. Use sqlite: or postgres://");
  }

  sequelize = new Sequelize(connectionString, sequelizeOptions);

} else {
  // Local fallback (SQLite)
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./database.sqlite",
    logging: false
  });
}

// Optional: Test connection immediately
sequelize.authenticate()
  .then(() => console.log(" Welcome, The  Database connected"))
  .catch(err => console.error("Oh No! Sorry, The  Database connection error:", err));

module.exports = sequelize;
