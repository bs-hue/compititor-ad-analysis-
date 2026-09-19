const express = require('express');
const router = express.Router();

const dbService = require('../services/dbService');
const clientController = require('../controllers/clientController');
const competitorController = require('../controllers/competitorController');
const adController = require('../controllers/adController');
const syncController = require('../controllers/syncController');

// ─── Health & Status ────────────────────────────────────────────────────────
router.get('/health', async (req, res) => {
    const health = await dbService.getHealth();
    res.json(health);
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

// ─── Ads (Swipe Data) Endpoints ─────────────────────────────────────────────
router.post('/clients/:id/ads', (req, res) => adController.addAd(req, res));
router.delete('/ads/:id', (req, res) => adController.deleteAd(req, res));

module.exports = router;
