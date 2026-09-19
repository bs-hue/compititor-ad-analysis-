const dbService = require('../services/dbService');

/**
 * Controller for Ad Intelligence and Swipe Data
 */
class AdController {
    async addAd(req, res) {
        try {
            const clientId = parseInt(req.params.id, 10);
            const { competitorName, competitorId } = req.body;

            if (!competitorName && !competitorId) {
                return res.status(400).json({ error: 'Competitor name or ID is required' });
            }

            const ad = await dbService.addAd(clientId, req.body);
            res.json({ message: 'success', data: ad });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async deleteAd(req, res) {
        try {
            const adId = parseInt(req.params.id, 10);
            await dbService.deleteAd(adId);
            res.json({ message: 'success' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new AdController();
