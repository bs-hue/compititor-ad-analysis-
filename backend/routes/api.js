const express = require('express');
const router = express.Router();

const dbService = require('../services/dbService');
const transcriptionService = require('../services/transcriptionService');
const clientController = require('../controllers/clientController');
const competitorController = require('../controllers/competitorController');
const adController = require('../controllers/adController');
const syncController = require('../controllers/syncController');

// ─── Health & Status ────────────────────────────────────────────────────────
router.get('/health', async (req, res) => {
    const health = await dbService.getHealth();
    res.json(health);
});

// ─── Benchmarks Endpoint ───────────────────────────────────────────────────
router.get('/benchmarks', (req, res) => {
    try {
        const benchmarks = require('../../config/benchmarks.json');
        res.json({ message: 'success', data: benchmarks });
    } catch (e) {
        res.status(500).json({ error: 'Failed to load benchmarks configuration' });
    }
});

// ─── Apify Sync & Webhook Endpoints ─────────────────────────────────────────
router.get('/apify/status', (req, res) => syncController.getStatus(req, res));
router.post('/sync/apify/client/:id', (req, res) => syncController.syncClient(req, res));
router.post('/sync/apify/competitor/:id', (req, res) => syncController.syncCompetitor(req, res));
router.post('/webhook/apify', (req, res) => syncController.handleWebhook(req, res));

// ─── Clients Endpoints ──────────────────────────────────────────────────────
router.get('/clients', (req, res) => clientController.getClients(req, res));
router.post('/clients', (req, res) => clientController.createClient(req, res));
router.get('/clients/:id/overview', (req, res) => clientController.getClientOverview(req, res));
router.delete('/clients/:id', (req, res) => clientController.deleteClient(req, res));

// ─── Competitors Endpoints ──────────────────────────────────────────────────
router.post('/clients/:id/competitors', (req, res) => competitorController.addCompetitor(req, res));
router.delete('/competitors/:id', (req, res) => competitorController.deleteCompetitor(req, res));

// ─── Direct Chrome Extension Ingestion Endpoint ───────────────────────────
router.post('/extension/ingest', async (req, res) => {
    try {
        const { advertiserName, vertical = 'spiritual_coaching', clientId, ads = [] } = req.body;
        if (!advertiserName) {
            return res.status(400).json({ error: 'Advertiser name is required' });
        }
        if (!Array.isArray(ads) || ads.length === 0) {
            return res.status(400).json({ error: 'No ads provided to ingest' });
        }

        const result = await dbService.ingestFromExtension({ advertiserName, vertical, clientId, ads });
        res.json({
            message: 'success',
            data: result
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ─── Transcribe Ad Video & Script Endpoint (Sarvam AI / STT) ───────────────
router.get('/transcribe/status', (req, res) => {
    res.json({
        status: 'success',
        data: {
            configured: transcriptionService.isConfigured,
            provider: 'sarvam_ai',
            model: 'saaras:v3'
        }
    });
});

router.get('/ads/:id/transcribe', async (req, res) => {
    try {
        const adId = req.params.id;
        const transcript = await transcriptionService.transcribeAd(adId);
        res.json({
            message: 'success',
            data: transcript
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
