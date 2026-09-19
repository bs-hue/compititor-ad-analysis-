/**
 * Root Server Entry Point
 * Delegates directly to the backend application server.
 */
const app = require('./backend/server');
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`\n==================================================`);
    console.log(`🚀 Competitor Intelligence Engine Running!`);
    console.log(`📡 URL:            http://localhost:${PORT}`);
    console.log(`📊 Frontend:       http://localhost:${PORT}/index.html`);
    console.log(`⚡ API Health:     http://localhost:${PORT}/api/health`);
    console.log(`==================================================\n`);
});
