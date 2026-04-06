require('dotenv').config();
const connectDB = require('./src/config/db');
const app = require('./src/app');

connectDB();

app.listen(3003, () => {
  console.log('Server running on http://localhost:3003');
});
