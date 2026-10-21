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
            let clientId = Number(req.body?.clientId);

            let overview = null;
            let competitor = null;

            if (clientId) {
                overview = await dbService.getClientOverview(clientId);
                if (overview && Array.isArray(overview.competitors)) {
                    competitor = overview.competitors.find(c => c.id === competitorId);
                }
            }

            // Fallback: search across all clients if clientId was not supplied
            if (!competitor) {
                const clients = await dbService.getClients();
                for (const cl of clients) {
                    const ov = await dbService.getClientOverview(cl.id);
                    const found = ov?.competitors?.find(c => c.id === competitorId);
                    if (found) {
                        clientId = cl.id;
                        competitor = found;
                        break;
                    }
                }
            }

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
