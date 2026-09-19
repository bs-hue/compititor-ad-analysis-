require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const apiRouter = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 3000;
const frontendPath = path.join(__dirname, '..', 'frontend');

// ─── Middleware ─────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve frontend static assets
app.use(express.static(frontendPath));

// ─── API Routes ─────────────────────────────────────────────────────────────
app.use('/api', apiRouter);

// ─── Direct Fallback Route ──────────────────────────────────────────────────
app.get('/', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
});

// Backward compatibility for /Swipe-Dashboard.html
app.get('/Swipe-Dashboard.html', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
});

// ─── Start Server ───────────────────────────────────────────────────────────
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`\n==================================================`);
        console.log(`🚀 Competitor Intelligence Engine Started!`);
        console.log(`📡 Local Server:   http://localhost:${PORT}`);
        console.log(`📊 Frontend:       http://localhost:${PORT}/index.html`);
        console.log(`⚡ API Health:     http://localhost:${PORT}/api/health`);
        console.log(`==================================================\n`);
    });
}

module.exports = app;
