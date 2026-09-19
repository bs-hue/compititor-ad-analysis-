const apifyService = require('../services/apifyService');
const dbService = require('../services/dbService');

class SyncController {
    /**
     * Get Apify Configuration Status
     */
    async getStatus(req, res) {
        try {
            const status = apifyService.getStatus();
            res.json({ status: 'success', data: status });
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }
    }

    /**
     * Trigger live auto-sync for all competitors in a client workspace
     */
    async syncClient(req, res) {
        try {
            const clientId = Number(req.params.id);
            const result = await apifyService.syncClientCompetitors(clientId);
            res.json({
                status: 'success',
                message: `Successfully synchronized ${result.totalCompetitors} competitors via Apify.`,
                data: result
            });
        } catch (error) {
            console.error('Error in syncClient:', error);
            res.status(500).json({ status: 'error', message: error.message });
        }
    }

    /**
     * Trigger live auto-sync for a single competitor
     */
    async syncCompetitor(req, res) {
        try {
            const competitorId = Number(req.params.id);
            const clientId = Number(req.body.clientId);

            const overview = await dbService.getClientOverview(clientId);
            if (!overview) {
                return res.status(404).json({ status: 'error', message: 'Client workspace not found.' });
            }

            const competitor = overview.competitors.find(c => c.id === competitorId);
            if (!competitor) {
                return res.status(404).json({ status: 'error', message: 'Competitor not found.' });
            }

            const result = await apifyService.syncSingleCompetitor(clientId, competitor);
            res.json({
                status: 'success',
                message: `Successfully updated ads for ${competitor.name}. Found ${result.winnersIdentified} winner ads (>90 days active).`,
                data: result
            });
        } catch (error) {
            console.error('Error in syncCompetitor:', error);
            res.status(500).json({ status: 'error', message: error.message });
        }
    }

    /**
     * Incoming Webhook from Apify / Make.com / Scheduled Tasks
     */
    async handleWebhook(req, res) {
        try {
            const result = await apifyService.handleWebhook(req.body);
            res.json({ status: 'success', data: result });
        } catch (error) {
            console.error('Error in handleWebhook:', error);
            res.status(500).json({ status: 'error', message: error.message });
        }
    }
}

module.exports = new SyncController();
