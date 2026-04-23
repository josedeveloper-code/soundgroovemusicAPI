const app = require("./app");
const sequelize = require("./database");
const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully.');
    
    await sequelize.sync(); 

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

startServer();


const port = process.env.PORT || 10000; // Render default is 10000,
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
