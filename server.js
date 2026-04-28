require('dotenv').config(); // Load variables first
const app = require('./app'); // Import the app you defined in app.js


const PORT = process.env.PORT || 1234;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;