const express = require('express');
const path = require('path');
const cors = require('cors');

const authRoutes = require('./routes/Auth.route');

const app = express();

app.use(cors());
app.use(express.json());

/* ================= API ================= */
app.use('/api/auth', authRoutes);

/* ================= FRONTEND ================= */
const clientPath = path.join(__dirname, '../client/dist');

/* 1️⃣ Serve static assets */
app.use(express.static(clientPath));

/* 2️⃣ SPA fallback bằng REGEX (Express 5 OK) */
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(clientPath, 'index.html'));
});

module.exports = app;
