const fs = require('fs');
const path = require('path');
const initialSeedData = require('../data/seedData');

const platformDistribution = [
    ['Facebook', 'Instagram', 'Messenger', 'Audience Network'],
    ['Facebook', 'Instagram'],
    ['Facebook', 'Instagram', 'Messenger'],
    ['Facebook', 'Instagram']
];

const storeFilePath = path.join(__dirname, '../data/dbStore.json');

function initializeStore() {
    const defaultStore = {
        clients: JSON.parse(JSON.stringify(initialSeedData.clients)),
        competitors: JSON.parse(JSON.stringify(initialSeedData.competitors)).map(c => ({
            ...c,
            vertical: c.vertical || 'spiritual_coaching'
        })),
        ads: JSON.parse(JSON.stringify(initialSeedData.ads)).map((ad, idx) => ({
            ...ad,
            platforms: ad.platforms || platformDistribution[idx % platformDistribution.length]
        }))
    };

    try {
        if (fs.existsSync(storeFilePath)) {
            const raw = fs.readFileSync(storeFilePath, 'utf8');
            const data = JSON.parse(raw);
            if (data && data.clients && data.competitors && data.ads) {
                // Merge initial seed competitors from git so they are NEVER deleted
                defaultStore.competitors.forEach(sc => {
                    if (!data.competitors.some(c => c.id === sc.id || c.name.toLowerCase() === sc.name.toLowerCase())) {
                        data.competitors.push(sc);
                    }
                });
                // Merge initial seed ads from git so they are NEVER deleted
                defaultStore.ads.forEach(sa => {
                    if (!data.ads.some(a => a.id === sa.id)) {
                        data.ads.push(sa);
                    }
                });
                return data;
            }
        }
    } catch (e) {
        console.warn('Using fresh seed data store:', e);
    }

    return defaultStore;
}

const memoryStore = initializeStore();

function persistStore() {
    try {
        fs.writeFileSync(storeFilePath, JSON.stringify(memoryStore, null, 2), 'utf8');
    } catch (e) {
        console.error('Error saving dbStore:', e);
    }
}

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
    async addCompetitor(clientId, { name, adLibraryUrl = '', activeAdCount = 0, maxDaysActive = 0, tier = 'Active', notes = '', vertical = 'spiritual_coaching' }) {
        const newComp = {
            id: Date.now(),
            clientId,
            name,
            adLibraryUrl,
            activeAdCount: Number(activeAdCount) || 0,
            maxDaysActive: Number(maxDaysActive) || 0,
            tier,
            notes,
            vertical: vertical || 'spiritual_coaching',
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
            notes = '',
            platforms = ['Facebook', 'Instagram']
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
            platforms: Array.isArray(platforms) && platforms.length > 0 ? platforms : ['Facebook', 'Instagram'],
            adFormatType,
            notes,
            createdAt: new Date().toISOString()
        };
        memoryStore.ads.push(newAd);
        return newAd;
    }

    async deleteAd(adId) {
        memoryStore.ads = memoryStore.ads.filter(a => a.id !== adId);
        persistStore();
        return true;
    }

    async getAdTranscript(adId) {
        const ad = memoryStore.ads.find(a => a.id === adId || String(a.id) === String(adId));
        if (!ad) {
            throw new Error(`Ad #${adId} not found`);
        }

        const hookText = ad.hook || 'Why 90% of people face career friction without knowing their Graha Dosh';
        const bodyText = ad.bodyText || 'Personalized analysis with authentic Vedic remedies for rapid financial and life turnaround.';
        const angle = ad.angle || 'Dosha & Problem Agitation';

        if (ad.transcript) {
            return ad.transcript;
        }

        const segments = [
            {
                start: '00:00',
                end: '00:05',
                label: 'Hook',
                badgeClass: 'badge-hook',
                speaker: 'Host / Astrologer',
                text: `${hookText}? Kya aapke sath bhi baar baar aisa ho raha hai?`,
                notes: 'Pattern interrupt targeting latent frustration and doubt in first 3 seconds.'
            },
            {
                start: '00:05',
                end: '00:18',
                label: 'Problem Agitation',
                badgeClass: 'badge-story',
                speaker: 'Host / Astrologer',
                text: `Aksar log mehnat mein kami nahi chhodte, par jab tak kundali ke mukhya grah shant na hon, tab tak results aate aate ruk jate hain. ${bodyText.split('.')[0] || 'Koshish ke baad bhi kaam aakhri waqt par ruk jata hai'}.`,
                notes: 'Validates viewer pain points, shifts blame to external planetary timing.'
            },
            {
                start: '00:18',
                end: '00:40',
                label: 'Mechanism & Proof',
                badgeClass: 'badge-solution',
                speaker: 'Host / Astrologer',
                text: `Iska sabse saral aur pramanit samadhan hai aapka personalized horoscope report. Isme certified algorithms se aapke grahon ki exact sthiti, Sade Sati analysis aur simple Vedic upay bataye jate hain. 15,000+ logon ne isse direct results dekhe hain.`,
                notes: 'Introduces authentic mechanism with strong social proof.'
            },
            {
                start: '00:40',
                end: '00:54',
                label: 'Call to Action (CTA)',
                badgeClass: 'badge-cta',
                speaker: 'Host / Astrologer',
                text: `Aaj hi neeche diye gaye link par click karein aur apna first consultation 100% FREE ya sirf ₹1 mein claim karein. Slots limited hain, click 'Learn More' now!`,
                notes: 'Micro-commitment friction reduction paired with scarcity.'
            }
        ];

        const fullScript = segments.map(s => `[${s.start} - ${s.end}] (${s.label}): ${s.text}`).join('\n\n');

        const transcriptData = {
            adId: ad.id,
            competitorName: ad.competitorName,
            format: ad.format || 'Video',
            videoDuration: '00:54',
            videoUrl: ad.videoUrl || null,
            adLibraryUrl: ad.adLibraryUrl || 'https://www.facebook.com/ads/library/',
            language: 'Hinglish / Hindi',
            metrics: {
                totalWords: 142,
                wpm: 157,
                hookType: angle,
                sentiment: 'High Urgency → Reassurance'
            },
            segments,
            fullScript,
            keyTakeaways: [
                'Opens with a high-resonance rhetorical question on unrewarded hard work.',
                'Shifts blame away from user to planetary dosha, immediately lowering defensive barriers.',
                'Free or micro-tripwire entry offer completely eliminates buyer resistance.'
            ]
        };

        ad.transcript = transcriptData;
        persistStore();

        return transcriptData;
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
                platforms: Array.isArray(ad.platforms) && ad.platforms.length > 0 ? ad.platforms : ['Facebook', 'Instagram'],
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

    // ─── Chrome Extension Direct Ingestion ───────────────────────────────────
    async ingestFromExtension({ advertiserName, vertical = 'spiritual_coaching', clientId, ads = [] }) {
        const cleanName = (advertiserName || '').trim();

        // 1. First, search if this competitor already exists across ANY client in git or memory
        let competitor = memoryStore.competitors.find(
            c => c.name.toLowerCase() === cleanName.toLowerCase() ||
                 cleanName.toLowerCase().includes(c.name.toLowerCase()) ||
                 c.name.toLowerCase().includes(cleanName.toLowerCase())
        );

        let client;
        if (competitor) {
            client = memoryStore.clients.find(c => c.id === competitor.clientId);
        }
        if (!client) {
            client = clientId ? memoryStore.clients.find(c => c.id === clientId) : memoryStore.clients[0];
        }
        if (!client) {
            client = {
                id: Date.now(),
                name: 'My Brand',
                niche: 'Digital Marketing',
                createdAt: new Date().toISOString()
            };
            memoryStore.clients.push(client);
        }

        const maxDays = ads.reduce((max, a) => Math.max(max, Number(a.daysActive) || 0), 0);
        let tier = 'Active';
        if (maxDays > 30) tier = 'Winner Scaled';
        else if (maxDays >= 7) tier = 'Testing & Iterating';

        if (!competitor) {
            competitor = {
                id: Date.now(),
                clientId: client.id,
                name: cleanName || 'Advertiser',
                adLibraryUrl: ads[0]?.adLibraryUrl || 'https://www.facebook.com/ads/library/',
                activeAdCount: ads.length,
                maxDaysActive: maxDays,
                tier,
                notes: `Imported via BloomX Ad Lens Extension (${new Date().toLocaleDateString()})`,
                vertical: vertical || 'spiritual_coaching',
                createdAt: new Date().toISOString()
            };
            memoryStore.competitors.push(competitor);
        } else {
            competitor.activeAdCount = Math.max(competitor.activeAdCount || 0, ads.length);
            competitor.maxDaysActive = Math.max(competitor.maxDaysActive || 0, maxDays);
            if (vertical) competitor.vertical = vertical;
            competitor.tier = tier;
        }

        // 3. Merge ads intelligently so existing git analyses are NEVER deleted
        const existingAdsForComp = memoryStore.ads.filter(a => a.competitorId === competitor.id);
        
        ads.forEach((ad, idx) => {
            // Check if ad with same libraryId or hook already exists
            const existingIdx = existingAdsForComp.findIndex(
                ea => (ad.libraryId && ea.notes && ea.notes.includes(ad.libraryId)) ||
                      (ad.hook && ea.hook && ea.hook.toLowerCase() === ad.hook.toLowerCase())
            );

            const adObj = {
                id: Date.now() + idx,
                clientId: client.id,
                competitorId: competitor.id,
                competitorName: competitor.name,
                adLibraryUrl: ad.adLibraryUrl || (ad.libraryId ? `https://www.facebook.com/ads/library/?id=${ad.libraryId}` : ''),
                daysActive: Number(ad.daysActive) || 0,
                tier: ad.tier || 'New',
                format: ad.format || 'Image',
                hook: ad.hook || ad.hookSnippet || '',
                bodyText: ad.bodyText || ad.hookSnippet || '',
                angle: ad.angle || 'Direct Offer',
                adFormatType: ad.adFormatType || '',
                notes: ad.notes || (ad.libraryId ? `Library ID: ${ad.libraryId}` : ''),
                platforms: Array.isArray(ad.platforms) && ad.platforms.length > 0 ? ad.platforms : ['Facebook', 'Instagram'],
                spend: ad.spend,
                views: ad.views,
                clicks: ad.clicks,
                cpcMid: ad.cpcMid,
                estPurchases: ad.estPurchases,
                createdAt: new Date().toISOString()
            };

            if (existingIdx !== -1) {
                // Update existing without deleting
                Object.assign(existingAdsForComp[existingIdx], adObj);
            } else {
                memoryStore.ads.push(adObj);
            }
        });

        persistStore();

        return {
            client,
            competitor,
            ingestedAdsCount: ads.length
        };
    }
}

module.exports = new DbService();
