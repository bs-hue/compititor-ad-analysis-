const { supabase, isSupabaseConfigured } = require('../config/supabase');
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
            mode: isSupabaseConfigured ? 'supabase_postgresql' : 'local_memory_store',
            supabaseConfigured: isSupabaseConfigured,
            timestamp: new Date().toISOString()
        };
    }

    // ─── Clients ─────────────────────────────────────────────────────────────
    async getClients() {
        if (isSupabaseConfigured && supabase) {
            try {
                const { data: clients, error: clientErr } = await supabase
                    .from('clients')
                    .select('*')
                    .order('id', { ascending: true });

                if (!clientErr && clients && clients.length > 0) {
                    const { data: competitors } = await supabase.from('competitors').select('id, client_id');
                    return clients.map(client => {
                        const count = (competitors || []).filter(c => c.client_id === client.id).length;
                        return {
                            id: client.id,
                            name: client.name,
                            niche: client.niche,
                            competitorCount: count,
                            createdAt: client.created_at
                        };
                    });
                }
            } catch (err) {
                console.error('Supabase getClients error, falling back to memoryStore:', err.message);
            }
        }

        return memoryStore.clients.map(client => {
            const count = memoryStore.competitors.filter(c => c.clientId === client.id).length;
            return {
                ...client,
                competitorCount: count
            };
        });
    }

    async getClientOverview(clientId) {
        if (isSupabaseConfigured && supabase) {
            try {
                const { data: client, error: clientErr } = await supabase
                    .from('clients')
                    .select('*')
                    .eq('id', clientId)
                    .single();

                if (!clientErr && client) {
                    const { data: competitors } = await supabase
                        .from('competitors')
                        .select('*')
                        .eq('client_id', clientId)
                        .order('active_ad_count', { ascending: false });

                    const { data: ads } = await supabase
                        .from('swipe_data')
                        .select('*')
                        .eq('client_id', clientId)
                        .order('days_active', { ascending: false });

                    return {
                        client,
                        competitors: (competitors || []).map(comp => ({
                            id: comp.id,
                            clientId: comp.client_id,
                            name: comp.name,
                            adLibraryUrl: comp.ad_library_url,
                            activeAdCount: comp.active_ad_count || 0,
                            maxDaysActive: comp.max_days_active || 0,
                            tier: comp.tier || 'Active',
                            notes: comp.notes || ''
                        })),
                        ads: (ads || []).map(ad => ({
                            id: ad.id,
                            clientId: ad.client_id,
                            competitorId: ad.competitor_id,
                            competitorName: ad.competitor_name,
                            adLibraryUrl: ad.ad_library_url,
                            daysActive: ad.days_active || 0,
                            tier: ad.tier || 'New',
                            format: ad.format || 'Image',
                            hook: ad.hook || '',
                            bodyText: ad.body_text || '',
                            angle: ad.angle || 'Direct Offer',
                            adFormatType: ad.ad_format_type || '',
                            videoPath: ad.video_path || '',
                            imagePath: ad.image_path || '',
                            notes: ad.notes || ''
                        }))
                    };
                }
            } catch (err) {
                console.error('Supabase getClientOverview error, falling back to memoryStore:', err.message);
            }
        }

        const client = memoryStore.clients.find(c => c.id === clientId);
        if (!client) return null;

        const competitors = memoryStore.competitors.filter(c => c.clientId === clientId);
        const ads = memoryStore.ads.filter(a => a.clientId === clientId);

        return { client, competitors, ads };
    }

    async createClient(name, niche) {
        if (isSupabaseConfigured && supabase) {
            try {
                const { data, error } = await supabase
                    .from('clients')
                    .insert([{ name, niche }])
                    .select()
                    .single();
                if (!error && data) return data;
            } catch (err) {
                console.error('Supabase createClient error:', err.message);
            }
        }

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
        if (isSupabaseConfigured && supabase) {
            try {
                await supabase.from('clients').delete().eq('id', clientId);
                return true;
            } catch (err) {
                console.error('Supabase deleteClient error:', err.message);
            }
        }

        memoryStore.clients = memoryStore.clients.filter(c => c.id !== clientId);
        memoryStore.competitors = memoryStore.competitors.filter(c => c.clientId !== clientId);
        memoryStore.ads = memoryStore.ads.filter(a => a.clientId !== clientId);
        return true;
    }

    // ─── Competitors ─────────────────────────────────────────────────────────
    async addCompetitor(clientId, { name, adLibraryUrl = '', activeAdCount = 0, maxDaysActive = 0, tier = 'Active', notes = '' }) {
        if (isSupabaseConfigured && supabase) {
            try {
                const { data, error } = await supabase
                    .from('competitors')
                    .insert([{
                        client_id: clientId,
                        name,
                        ad_library_url: adLibraryUrl,
                        active_ad_count: Number(activeAdCount) || 0,
                        max_days_active: Number(maxDaysActive) || 0,
                        tier,
                        notes
                    }])
                    .select()
                    .single();
                if (!error && data) return data;
            } catch (err) {
                console.error('Supabase addCompetitor error:', err.message);
            }
        }

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
        if (isSupabaseConfigured && supabase) {
            try {
                await supabase.from('competitors').delete().eq('id', competitorId);
                await supabase.from('swipe_data').delete().eq('competitor_id', competitorId);
                return true;
            } catch (err) {
                console.error('Supabase deleteCompetitor error:', err.message);
            }
        }

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

        if (isSupabaseConfigured && supabase) {
            try {
                const { data, error } = await supabase
                    .from('swipe_data')
                    .insert([{
                        client_id: clientId,
                        competitor_id: competitorId || null,
                        competitor_name: competitorName,
                        ad_library_url: adLibraryUrl,
                        days_active: Number(daysActive) || 0,
                        tier,
                        format,
                        hook,
                        body_text: bodyText,
                        angle,
                        ad_format_type: adFormatType,
                        notes
                    }])
                    .select()
                    .single();
                if (!error && data) return data;
            } catch (err) {
                console.error('Supabase addAd error:', err.message);
            }
        }

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
        if (isSupabaseConfigured && supabase) {
            try {
                await supabase.from('swipe_data').delete().eq('id', adId);
                return true;
            } catch (err) {
                console.error('Supabase deleteAd error:', err.message);
            }
        }

        memoryStore.ads = memoryStore.ads.filter(a => a.id !== adId);
        return true;
    }

    // ─── Bulk Ingestion & Competitor Sync ────────────────────────────────────
    async bulkUpsertAds(clientId, competitorId, newAds) {
        if (isSupabaseConfigured && supabase) {
            try {
                // Delete previous ads for this competitor to refresh fresh dataset
                await supabase.from('swipe_data').delete().eq('competitor_id', competitorId);
                
                const rows = newAds.map(ad => ({
                    client_id: clientId,
                    competitor_id: competitorId,
                    competitor_name: ad.competitorName,
                    ad_library_url: ad.adLibraryUrl,
                    days_active: Number(ad.daysActive) || 0,
                    tier: ad.tier || 'New',
                    format: ad.format || 'Image',
                    hook: ad.hook || '',
                    body_text: ad.bodyText || '',
                    angle: ad.angle || 'Direct Offer',
                    ad_format_type: ad.adFormatType || '',
                    notes: ad.notes || ''
                }));

                if (rows.length > 0) {
                    await supabase.from('swipe_data').insert(rows);
                }
                return true;
            } catch (err) {
                console.error('Supabase bulkUpsertAds error:', err.message);
            }
        }

        // In-memory fallback
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
        if (isSupabaseConfigured && supabase) {
            try {
                await supabase
                    .from('competitors')
                    .update({
                        active_ad_count: activeAdCount,
                        max_days_active: maxDaysActive,
                        tier: tier
                    })
                    .eq('id', competitorId);
                return true;
            } catch (err) {
                console.error('Supabase updateCompetitorStats error:', err.message);
            }
        }

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
