require("dotenv").config();
const sequelize = require("./database");
const app = require("./app");

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("Database connection established.");

    await sequelize.sync({ alter: true }); 
    console.log("Database models synchronized.");

    const server = app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

    process.on("unhandledRejection", (err) => {
      console.error("Unhandled Promise Rejection:", err);
      server.close(() => process.exit(1));
    });

  } catch (error) {
    console.error("Server failed to start:", error);
    process.exit(1);
  }
}

startServer();