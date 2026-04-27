require("dotenv").config();
const sequelize = require("./database"); // Your DB connection file
const app = require("./app");            // The app logic we just polished

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    // 1. Verify Database Connection
    await sequelize.authenticate();
    console.log("✅ Database connection established successfully.");

    // 2. Sync Models 
    // 'alter: true' updates tables to match your models without deleting data
    await sequelize.sync({ alter: true }); 
    console.log("✅ Database models synchronized.");

    // Health Check Route
    app.get("/ping", (req,res) => {
      res.status(200).json({
        status: "online",
        timestamp: new Date().toISOString(),
      });
    });


    // 3. Start Listening
    const server = app.listen(PORT, () => {
      console.log(`🚀 Sound Groove API is live at: http://localhost:${PORT}`);
    });

    // 4. Graceful Shutdown Logic
    // This ensures the database closes properly if the server is stopped
    process.on("SIGTERM", () => {
      console.info("SIGTERM signal received. Closing HTTP server...");
      server.close(() => {
        sequelize.close();
        console.log("HTTP server and DB connection closed.");
      });
    });

  } catch (error) {
    console.error("❌ Server failed to start due to error:", error);
    process.exit(1); // Exit with failure code
  }
}

startServer();