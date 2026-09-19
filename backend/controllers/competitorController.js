const dbService = require('../services/dbService');

/**
 * Controller for Competitor tracking & Meta Ad Library links
 */
class CompetitorController {
    async addCompetitor(req, res) {
        try {
            const clientId = parseInt(req.params.id, 10);
            const { name, adLibraryUrl = '', activeAdCount = 0, maxDaysActive = 0, tier = 'Active', notes = '' } = req.body;

            if (!name) {
                return res.status(400).json({ error: 'Competitor name is required' });
            }

            const comp = await dbService.addCompetitor(clientId, {
                name,
                adLibraryUrl,
                activeAdCount,
                maxDaysActive,
                tier,
                notes
            });

            res.json({ message: 'success', data: comp });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async deleteCompetitor(req, res) {
        try {
            const competitorId = parseInt(req.params.id, 10);
            await dbService.deleteCompetitor(competitorId);
            res.json({ message: 'success' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new CompetitorController();
