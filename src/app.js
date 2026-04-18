const express = require('express');
const path = require('path');
const cors = require('cors');

const authRoutes = require('./routes/Auth.route');
const userRoutes = require('./routes/User.route');
const configRoutes = require('./routes/SystemConfig.route');
const errorMiddleware = require('./middlewares/error.middleware');

const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/config', configRoutes);

const clientPath = path.join(__dirname, '../client/dist');

/* 1️⃣ Serve static assets */
app.use(express.static(clientPath));

app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(clientPath, 'index.html'));
});

// Centralized Error Handling
app.use(errorMiddleware);

module.exports = app;
