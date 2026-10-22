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

router.post('/transcribe/media', async (req, res) => {
    try {
        const { mediaUrl, competitorName, hook, bodyText } = req.body || {};
        const transcript = await transcriptionService.transcribeMediaPayload({ mediaUrl, competitorName, hook, bodyText });
        res.json({
            message: 'success',
            data: transcript
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ─── Direct Media & Creative Download Endpoints ──────────────────────────────
router.get('/media/download', async (req, res) => {
    try {
        const { url, filename } = req.query;
        if (!url || !url.startsWith('http')) {
            return res.status(400).json({ error: 'Valid URL is required' });
        }

        const fallbackName = (filename || 'creative_asset.mp4').replace(/[^a-zA-Z0-9._-]/g, '_');

        const upstreamRes = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
                'Referer': 'https://www.facebook.com/'
            }
        });

        if (!upstreamRes.ok) {
            return res.status(upstreamRes.status).json({
                error: `Upstream media request failed (${upstreamRes.status} ${upstreamRes.statusText})`
            });
        }

        const contentType = upstreamRes.headers.get('content-type') || (fallbackName.endsWith('.mp4') ? 'video/mp4' : 'image/jpeg');
        res.setHeader('Content-Type', contentType);
        res.setHeader('Content-Disposition', `attachment; filename="${fallbackName}"`);

        const arrayBuffer = await upstreamRes.arrayBuffer();
        res.send(Buffer.from(arrayBuffer));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/ads/:id/download-creative', async (req, res) => {
    try {
        const adId = parseInt(req.params.id, 10);
        const formatType = (req.query.type || 'auto').toLowerCase();
        const pathModule = require('path');
        const fsModule = require('fs');

        const overview = await dbService.getClientOverview(1);
        let targetAd = null;
        if (overview && overview.ads) {
            targetAd = overview.ads.find(a => a.id === adId);
        }

        const compName = targetAd ? (targetAd.competitorName || 'Competitor').replace(/[^a-zA-Z0-9]/g, '_') : 'Creative';
        const isVideo = targetAd ? (targetAd.format === 'Video') : true;

        if (formatType === 'video' || (formatType === 'auto' && isVideo)) {
            let videoPath = pathModule.join(__dirname, '..', '..', 'frontend', 'assets', 'videos', 'sample_reel_astrology.mp4');
            if (targetAd && targetAd.videoUrl && !targetAd.videoUrl.startsWith('http')) {
                const localCandidate = pathModule.join(__dirname, '..', '..', 'frontend', targetAd.videoUrl.replace(/^\//, ''));
                if (fsModule.existsSync(localCandidate)) {
                    videoPath = localCandidate;
                }
            }
            if (fsModule.existsSync(videoPath)) {
                res.setHeader('Content-Type', 'video/mp4');
                res.setHeader('Content-Disposition', `attachment; filename="${compName}_Ad_${adId}_Reel.mp4"`);
                return fsModule.createReadStream(videoPath).pipe(res);
            }
        }

        res.json({
            message: 'success',
            adId,
            competitor: compName,
            format: targetAd ? targetAd.format : 'Image'
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;

