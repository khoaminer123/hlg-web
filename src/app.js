const express = require('express');
const path = require('path');
const cors = require('cors');

const authRoutes = require('./routes/Auth.route');
const userRoutes = require('./routes/User.route');
const configRoutes = require('./routes/SystemConfig.route');
const errorMiddleware = require('./middlewares/error.middleware');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/config', configRoutes);

const clientPath = path.join(__dirname, '../client/dist');

/* 1️⃣ Serve static assets */
app.use(express.static(clientPath));

/* 2️⃣ SPA fallback bằng REGEX (Express 5 OK) */
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(clientPath, 'index.html'));
});

// Centralized Error Handling
app.use(errorMiddleware);

module.exports = app;
