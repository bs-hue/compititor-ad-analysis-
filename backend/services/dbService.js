const initialSeedData = require('../data/seedData');

// Local in-memory state initialized with seed data
const memoryStore = {
    clients: JSON.parse(JSON.stringify(initialSeedData.clients)),
    competitors: JSON.parse(JSON.stringify(initialSeedData.competitors)),
    ads: JSON.parse(JSON.stringify(initialSeedData.ads))
};

class DbService {
    // ─── Health Check ────────────────────────────────────────────────────────
    async getHealth() {
        return {
            status: 'online',
            mode: 'in_memory_store',
            timestamp: new Date().toISOString()
        };
    }

    // ─── Clients ─────────────────────────────────────────────────────────────
    async getClients() {
        return memoryStore.clients.map(client => {
            const count = memoryStore.competitors.filter(c => c.clientId === client.id).length;
            return {
                ...client,
                competitorCount: count
            };
        });
    }

    async getClientOverview(clientId) {
        const client = memoryStore.clients.find(c => c.id === clientId);
        if (!client) return null;

        const competitors = memoryStore.competitors.filter(c => c.clientId === clientId);
        const ads = memoryStore.ads.filter(a => a.clientId === clientId);

        return { client, competitors, ads };
    }

    async createClient(name, niche) {
        const newClient = {
            id: Date.now(),
            name,
            niche: niche || '',
            createdAt: new Date().toISOString()
        };
        memoryStore.clients.push(newClient);
        return newClient;
    }

    async deleteClient(clientId) {
        memoryStore.clients = memoryStore.clients.filter(c => c.id !== clientId);
        memoryStore.competitors = memoryStore.competitors.filter(c => c.clientId !== clientId);
        memoryStore.ads = memoryStore.ads.filter(a => a.clientId !== clientId);
        return true;
    }

    // ─── Competitors ─────────────────────────────────────────────────────────
    async addCompetitor(clientId, { name, adLibraryUrl = '', activeAdCount = 0, maxDaysActive = 0, tier = 'Active', notes = '' }) {
        const newComp = {
            id: Date.now(),
            clientId,
            name,
            adLibraryUrl,
            activeAdCount: Number(activeAdCount) || 0,
            maxDaysActive: Number(maxDaysActive) || 0,
            tier,
            notes,
            createdAt: new Date().toISOString()
        };
        memoryStore.competitors.push(newComp);
        return newComp;
    }

    async deleteCompetitor(competitorId) {
        memoryStore.competitors = memoryStore.competitors.filter(c => c.id !== competitorId);
        memoryStore.ads = memoryStore.ads.filter(a => a.competitorId !== competitorId);
        return true;
    }

    // ─── Ads (Swipe Data) ───────────────────────────────────────────────────
    async addAd(clientId, adData) {
        const {
            competitorName,
            competitorId,
            adLibraryUrl = '',
            daysActive = 0,
            tier = 'New',
            format = 'Image',
            hook = '',
            bodyText = '',
            angle = 'Direct Offer',
            adFormatType = '',
            notes = ''
        } = adData;

        const newAd = {
            id: Date.now(),
            clientId,
            competitorId: competitorId || null,
            competitorName,
            adLibraryUrl,
            daysActive: Number(daysActive) || 0,
            tier,
            format,
            hook,
            bodyText,
            angle,
            adFormatType,
            notes,
            createdAt: new Date().toISOString()
        };
        memoryStore.ads.push(newAd);
        return newAd;
    }

    async deleteAd(adId) {
        memoryStore.ads = memoryStore.ads.filter(a => a.id !== adId);
        return true;
    }

    // ─── Bulk Ingestion & Competitor Sync ────────────────────────────────────
    async bulkUpsertAds(clientId, competitorId, newAds) {
        memoryStore.ads = memoryStore.ads.filter(a => a.competitorId !== competitorId);
        newAds.forEach((ad, idx) => {
            memoryStore.ads.push({
                id: Date.now() + idx,
                clientId,
                competitorId,
                competitorName: ad.competitorName,
                adLibraryUrl: ad.adLibraryUrl,
                daysActive: Number(ad.daysActive) || 0,
                tier: ad.tier || 'New',
                format: ad.format || 'Image',
                hook: ad.hook || '',
                bodyText: ad.bodyText || '',
                angle: ad.angle || 'Direct Offer',
                adFormatType: ad.adFormatType || '',
                notes: ad.notes || '',
                createdAt: new Date().toISOString()
            });
        });
        return true;
    }

    async updateCompetitorStats(competitorId, { activeAdCount, maxDaysActive, tier }) {
        const comp = memoryStore.competitors.find(c => c.id === competitorId);
        if (comp) {
            comp.activeAdCount = activeAdCount;
            comp.maxDaysActive = maxDaysActive;
            comp.tier = tier;
        }
        return true;
    }
}

module.exports = new DbService();
