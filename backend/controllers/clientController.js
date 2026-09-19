const dbService = require('../services/dbService');

/**
 * Controller for Client Workspace endpoints
 */
class ClientController {
    async getClients(req, res) {
        try {
            const clients = await dbService.getClients();
            res.json({ message: 'success', data: clients });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getClientOverview(req, res) {
        try {
            const clientId = parseInt(req.params.id, 10);
            const data = await dbService.getClientOverview(clientId);
            if (!data) {
                return res.status(404).json({ error: 'Client workspace not found' });
            }
            res.json({ message: 'success', data });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async createClient(req, res) {
        try {
            const { name, niche } = req.body;
            if (!name) {
                return res.status(400).json({ error: 'Client name is required' });
            }
            const newClient = await dbService.createClient(name, niche);
            res.json({ message: 'success', data: newClient });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async deleteClient(req, res) {
        try {
            const clientId = parseInt(req.params.id, 10);
            await dbService.deleteClient(clientId);
            res.json({ message: 'success' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new ClientController();
