/**
 * BloomX Ad Lens - Chrome Extension (Manifest V3)
 * Real-time Ad Spend, Views, CPC & Conversion estimator for Facebook Ad Library.
 */

(function () {
    'use strict';

    // ─── Self-Contained Styles Injection ─────────────────────────────────────────
    function ensureStylesInjected() {
        if (document.getElementById('bloomx-spendo-injected-css')) return;
        const style = document.createElement('style');
        style.id = 'bloomx-spendo-injected-css';
        style.textContent = `
            .spendo-lens-card {
                display: block !important;
                position: relative !important;
                margin: 0 0 14px 0 !important;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
                color: #F8FAFC !important;
                box-sizing: border-box !important;
                z-index: 10 !important;
                width: 100% !important;
                max-width: 100% !important;
                user-select: none !important;
            }
            .spendo-top-pill {
                display: flex !important;
                align-items: center !important;
                justify-content: space-between !important;
                background: #0E1219 !important;
                border: 1px solid rgba(255, 255, 255, 0.12) !important;
                border-radius: 12px !important;
                padding: 9px 14px !important;
                cursor: pointer !important;
                box-shadow: 0 4px 18px rgba(0, 0, 0, 0.4) !important;
                transition: transform 0.15s ease, border-color 0.15s ease !important;
            }
            .spendo-top-pill:hover {
                border-color: rgba(192, 132, 252, 0.4) !important;
                transform: translateY(-1px) !important;
            }
            .spendo-top-left {
                display: flex !important;
                align-items: center !important;
                gap: 9px !important;
            }
            .spendo-logo-badge {
                width: 26px !important;
                height: 26px !important;
                border-radius: 8px !important;
                background: linear-gradient(135deg, #c084fc 0%, #f472b6 100%) !important;
                color: #0F1218 !important;
                font-size: 14px !important;
                font-weight: 900 !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                box-shadow: 0 2px 8px rgba(192, 132, 252, 0.4) !important;
            }
            .spendo-brand-name {
                font-size: 13.5px !important;
                font-weight: 800 !important;
                color: #FFFFFF !important;
                letter-spacing: -0.2px !important;
            }
            .spendo-live-badge {
                display: inline-flex !important;
                align-items: center !important;
                gap: 5px !important;
                background: rgba(74, 222, 128, 0.15) !important;
                border: 1px solid rgba(74, 222, 128, 0.3) !important;
                color: #4ADE80 !important;
                font-size: 11px !important;
                font-weight: 700 !important;
                padding: 2px 8px !important;
                border-radius: 20px !important;
            }
            .spendo-live-dot {
                width: 6px !important;
                height: 6px !important;
                border-radius: 50% !important;
                background: #4ADE80 !important;
                box-shadow: 0 0 6px #4ADE80 !important;
            }
            .spendo-top-right {
                display: flex !important;
                align-items: center !important;
                gap: 8px !important;
            }
            .spendo-top-spend {
                font-size: 14.5px !important;
                font-weight: 800 !important;
                color: #A3E635 !important;
                letter-spacing: -0.2px !important;
            }
            .spendo-chevron {
                font-size: 13px !important;
                color: #94A3B8 !important;
                transition: transform 0.2s ease !important;
            }
            .spendo-body {
                background: #0B0E14 !important;
                border: 1px solid rgba(255, 255, 255, 0.08) !important;
                border-radius: 16px !important;
                padding: 16px !important;
                margin-top: 6px !important;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.45) !important;
                display: flex !important;
                flex-direction: column !important;
                gap: 12px !important;
            }
            .spendo-head-row {
                display: flex !important;
                align-items: center !important;
                justify-content: space-between !important;
            }
            .spendo-sec-title {
                font-size: 10.5px !important;
                font-weight: 800 !important;
                text-transform: uppercase !important;
                letter-spacing: 0.6px !important;
                color: #8E95A2 !important;
            }
            .spendo-conf-pill {
                font-size: 10.5px !important;
                font-weight: 600 !important;
                padding: 2.5px 8.5px !important;
                border-radius: 20px !important;
                display: inline-flex !important;
                align-items: center !important;
                gap: 5px !important;
            }
            .conf-mid {
                background: rgba(245, 158, 11, 0.15) !important;
                color: #FBBF24 !important;
                border: 1px solid rgba(245, 158, 11, 0.3) !important;
            }
            .conf-high {
                background: rgba(74, 222, 128, 0.15) !important;
                color: #4ADE80 !important;
                border: 1px solid rgba(74, 222, 128, 0.3) !important;
            }
            .spendo-conf-dot {
                width: 6px !important;
                height: 6px !important;
                border-radius: 50% !important;
                background: currentColor !important;
            }
            .spendo-stats-grid {
                display: grid !important;
                grid-template-columns: repeat(3, 1fr) !important;
                gap: 8px !important;
            }
            .spendo-stat-box {
                background: #11151E !important;
                border: 1px solid rgba(255, 255, 255, 0.06) !important;
                border-radius: 12px !important;
                padding: 10px 8px !important;
                display: flex !important;
                flex-direction: column !important;
                gap: 2px !important;
            }
            .spendo-box-primary {
                border-color: rgba(192, 132, 252, 0.35) !important;
                background: linear-gradient(135deg, rgba(192, 132, 252, 0.08) 0%, rgba(17, 21, 30, 0.9) 100%) !important;
            }
            .spendo-stat-label {
                font-size: 10px !important;
                color: #8E95A2 !important;
                font-weight: 500 !important;
            }
            .spendo-stat-number {
                font-size: 16px !important;
                font-weight: 800 !important;
                color: #F8FAFC !important;
                line-height: 1.25 !important;
                margin-top: 1px !important;
            }
            .spendo-spend-gradient {
                color: #C084FC !important;
                background: linear-gradient(90deg, #C084FC 0%, #F472B6 100%) !important;
                -webkit-background-clip: text !important;
                -webkit-text-fill-color: transparent !important;
            }
            .spendo-stat-unit {
                font-size: 10px !important;
                color: #8E95A2 !important;
                margin-top: 2px !important;
            }
            .spendo-meta-row {
                font-size: 11px !important;
                color: #8E95A2 !important;
                display: flex !important;
                align-items: center !important;
                gap: 10px !important;
                flex-wrap: wrap !important;
            }
            .spendo-meta-row span b {
                color: #F8FAFC !important;
                font-weight: 700 !important;
            }
            .spendo-copy-id {
                cursor: pointer !important;
                color: #60A5FA !important;
                text-decoration: underline !important;
            }
            .spendo-verified-pill {
                align-self: flex-start !important;
                display: inline-flex !important;
                align-items: center !important;
                gap: 5px !important;
                background: rgba(74, 222, 128, 0.08) !important;
                border: 1px solid rgba(74, 222, 128, 0.28) !important;
                color: #4ADE80 !important;
                font-size: 10.5px !important;
                font-weight: 700 !important;
                padding: 3.5px 9px !important;
                border-radius: 20px !important;
            }
            .spendo-btn-gradient {
                display: flex !important;
                align-items: center !important;
                justify-content: space-between !important;
                width: 100% !important;
                padding: 11px 14px !important;
                background: linear-gradient(90deg, #818CF8 0%, #C084FC 50%, #F472B6 100%) !important;
                border: none !important;
                border-radius: 12px !important;
                cursor: pointer !important;
                box-shadow: 0 4px 15px rgba(192, 132, 252, 0.35) !important;
                transition: transform 0.15s ease, opacity 0.15s ease !important;
            }
            .spendo-btn-grad-text {
                font-size: 12.5px !important;
                font-weight: 800 !important;
                color: #0F1218 !important;
                letter-spacing: -0.2px !important;
            }
            .spendo-pro-tag {
                background: #0F1218 !important;
                color: #4ADE80 !important;
                font-size: 10.5px !important;
                font-weight: 800 !important;
                padding: 3px 8px !important;
                border-radius: 6px !important;
                letter-spacing: 0.5px !important;
            }
            .spendo-btn-insights {
                display: flex !important;
                align-items: center !important;
                justify-content: space-between !important;
                width: 100% !important;
                padding: 10px 14px !important;
                background: #121620 !important;
                border: 1px solid rgba(255, 255, 255, 0.08) !important;
                border-radius: 12px !important;
                cursor: pointer !important;
                color: #F8FAFC !important;
                font-size: 12px !important;
                font-weight: 700 !important;
                transition: background 0.15s ease, border-color 0.15s ease !important;
            }
            .spendo-open-arrow {
                color: #818CF8 !important;
                font-weight: 700 !important;
            }
            .spendo-plan-footer {
                display: flex !important;
                align-items: center !important;
                justify-content: space-between !important;
                padding-top: 10px !important;
                border-top: 1px dashed rgba(255, 255, 255, 0.1) !important;
                font-size: 11px !important;
                color: #8E95A2 !important;
            }
            .spendo-plan-footer b {
                color: #F8FAFC !important;
            }
            .spendo-pro-link {
                color: #A3E635 !important;
                font-weight: 700 !important;
                text-decoration: none !important;
            }
        `;
        (document.head || document.documentElement).appendChild(style);
    }
    ensureStylesInjected();

    // ─── Active Vertical & Benchmark State ─────────────────────────────────────
    let activeVerticalKey = 'spiritual_coaching';
    let isCalibrated = true;
    let activeVerticalName = 'Spiritual / Coaching';

    let BENCHMARKS = {
        daily_spend_tiers: {
            test: {
                name: 'Test',
                min_days: 0,
                max_days: 6,
                low: 100,
                mid: 200,
                high: 300,
                label: 'Test (<7d)',
                color: '#f59e0b',
                badge_bg: '#fef3c7',
                badge_text: '#92400e',
                badge_border: '#fcd34d'
            },
            tested: {
                name: 'Tested',
                min_days: 7,
                max_days: 30,
                low: 300,
                mid: 650,
                high: 1000,
                label: 'Tested (7-30d)',
                color: '#3b82f6',
                badge_bg: '#dbeafe',
                badge_text: '#1e40af',
                badge_border: '#93c5fd'
            },
            winner: {
                name: 'Winner',
                min_days: 31,
                max_days: null,
                low: 2000,
                mid: 3000,
                high: 4000,
                label: 'Winner (>30d)',
                color: '#10b981',
                badge_bg: '#d1fae5',
                badge_text: '#065f46',
                badge_border: '#6ee7b7'
            }
        },
        metrics: {
            cpm: { low: 170, mid: 226, high: 330 },
            ctr_percent: { low: 0.9, mid: 1.22, high: 1.7 },
            cost_per_purchase: { target: 480 }
        }
    };

    // ─── Apply Vertical Configuration ──────────────────────────────────────────
    function applyVerticalConfig(vKey, vData) {
        if (!vData) return;
        activeVerticalKey = vKey;
        activeVerticalName = vData.name || vKey;
        isCalibrated = vData.calibrated === true;

        BENCHMARKS.metrics.cpm = {
            low: Number(vData.cpm_low) || 170,
            mid: Number(vData.cpm_mid) || 226,
            high: Number(vData.cpm_high) || 330
        };

        BENCHMARKS.metrics.ctr_percent = {
            low: Number(vData.ctr_low) || 0.9,
            mid: Number(vData.ctr_mid) || 1.22,
            high: Number(vData.ctr_high) || 1.7
        };

        BENCHMARKS.metrics.cost_per_purchase = {
            target: Number(vData.cost_per_purchase) || 480
        };

        if (vData.spend_tiers) {
            if (vData.spend_tiers.test) {
                BENCHMARKS.daily_spend_tiers.test.low = Number(vData.spend_tiers.test.low) || 100;
                BENCHMARKS.daily_spend_tiers.test.mid = Number(vData.spend_tiers.test.mid) || 200;
                BENCHMARKS.daily_spend_tiers.test.high = Number(vData.spend_tiers.test.high) || 300;
            }
            if (vData.spend_tiers.tested) {
                BENCHMARKS.daily_spend_tiers.tested.low = Number(vData.spend_tiers.tested.low) || 300;
                BENCHMARKS.daily_spend_tiers.tested.mid = Number(vData.spend_tiers.tested.mid) || 650;
                BENCHMARKS.daily_spend_tiers.tested.high = Number(vData.spend_tiers.tested.high) || 1000;
            }
            if (vData.spend_tiers.winner) {
                BENCHMARKS.daily_spend_tiers.winner.low = Number(vData.spend_tiers.winner.low) || 2000;
                BENCHMARKS.daily_spend_tiers.winner.mid = Number(vData.spend_tiers.winner.mid) || 3000;
                BENCHMARKS.daily_spend_tiers.winner.high = Number(vData.spend_tiers.winner.high) || 4000;
            }
        }
    }

    // ─── Sync with chrome.storage.local ────────────────────────────────────────
    function loadBenchmarksAndSync(cb) {
        if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
            chrome.storage.local.get(['active_vertical', 'custom_benchmarks'], (result) => {
                const targetKey = result.active_vertical || 'spiritual_coaching';

                if (result.custom_benchmarks && result.custom_benchmarks[targetKey]) {
                    applyVerticalConfig(targetKey, result.custom_benchmarks[targetKey]);
                    if (cb) cb();
                } else {
                    // Fall back to benchmarks.json
                    fetchBenchmarksJson(targetKey, cb);
                }
            });
        } else {
            fetchBenchmarksJson('spiritual_coaching', cb);
        }
    }

    function fetchBenchmarksJson(targetKey, cb) {
        try {
            const url = chrome.runtime.getURL('benchmarks.json');
            fetch(url)
                .then(r => r.json())
                .then(data => {
                    if (data && data.verticals && data.verticals[targetKey]) {
                        applyVerticalConfig(targetKey, data.verticals[targetKey]);
                    }
                    if (cb) cb();
                })
                .catch(() => { if (cb) cb(); });
        } catch (e) {
            if (cb) cb();
        }
    }

    // Listen for real-time changes from extension popup
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.onChanged) {
        chrome.storage.onChanged.addListener((changes, area) => {
            if (area === 'local' && (changes.active_vertical || changes.custom_benchmarks)) {
                loadBenchmarksAndSync(() => {
                    recalculateAllAds();
                });
            }
        });
    }

    // Initial load
    loadBenchmarksAndSync(() => {
        scanAndEnhanceAdCards();
    });

    // ─── Store of All Detected Ads ─────────────────────────────────────────────
    const detectedAdsMap = new Map();

    // ─── Indian Number Formatting Helper ───────────────────────────────────────
    function formatIndianNumber(num, isCurrency = false) {
        if (num === null || num === undefined || isNaN(num)) return isCurrency ? '₹0' : '0';
        const abs = Math.abs(num);
        const prefix = isCurrency ? '₹' : '';

        // 1 Crore and above (1,00,00,000+)
        if (abs >= 10000000) {
            const val = abs / 10000000;
            return `${prefix}${val >= 10 ? val.toFixed(1) : val.toFixed(2)} Cr`;
        }

        // 1 Lakh and above (1,00,000 - 99,99,999)
        if (abs >= 100000) {
            const val = abs / 100000;
            return `${prefix}${val >= 10 ? val.toFixed(1) : val.toFixed(2)} L`;
        }

        // Below 1 Lakh - standard Indian comma formatting (e.g., 45,000)
        const rounded = Math.round(abs);
        const str = rounded.toString();
        let lastThree = str.substring(str.length - 3);
        const otherNumbers = str.substring(0, str.length - 3);
        const formatted = otherNumbers !== ''
            ? otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + lastThree
            : lastThree;

        return `${prefix}${formatted}`;
    }

    // ─── Date Parsing Helper ───────────────────────────────────────────────────
    function parseStartDate(text) {
        if (!text) return null;
        const match = text.match(/Started running on\s+([A-Za-z0-9,\s\/\-]+?)(?=\s*(?:\.|\n|•|Library ID|$))/i);
        if (!match || !match[1]) return null;

        const dateStr = match[1].trim();
        const parsed = new Date(dateStr);
        if (!isNaN(parsed.getTime())) return parsed;

        const partsMatch = dateStr.match(/(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})/);
        if (partsMatch) {
            const day = parseInt(partsMatch[1], 10);
            const monthStr = partsMatch[2];
            const year = parseInt(partsMatch[3], 10);
            const d = new Date(`${monthStr} ${day}, ${year}`);
            if (!isNaN(d.getTime())) return d;
        }

        return null;
    }

    // ─── Platform Detection ────────────────────────────────────────────────────
    function detectPlatforms(cardEl) {
        const platforms = [];
        const cardText = cardEl.innerText || '';
        const html = cardEl.innerHTML.toLowerCase();

        if (html.includes('facebook') || cardText.includes('Facebook')) platforms.push('Facebook');
        if (html.includes('instagram') || cardText.includes('Instagram')) platforms.push('Instagram');
        if (html.includes('messenger') || cardText.includes('Messenger')) platforms.push('Messenger');
        if (html.includes('audience network') || cardText.includes('Audience Network')) platforms.push('Audience Network');

        return platforms.length > 0 ? platforms : ['Facebook', 'Instagram'];
    }

    // ─── Creative Count Detection ──────────────────────────────────────────────
    function detectCreativeCount(cardText) {
        const match = cardText.match(/(\d+)\s+ads?\s+use\s+this\s+creative\s+and\s+text/i);
        if (match && match[1]) {
            return parseInt(match[1], 10);
        }
        if (/multiple versions/i.test(cardText)) {
            return 'Multiple';
        }
        return null;
    }

    // ─── Library ID Detection ──────────────────────────────────────────────────
    function detectLibraryId(cardText) {
        const match = cardText.match(/Library ID:\s*([0-9]+)/i);
        return match ? match[1] : null;
    }

    // ─── Status Detection ──────────────────────────────────────────────────────
    function detectStatus(cardText) {
        if (/Inactive/i.test(cardText)) return 'Inactive';
        if (/Active/i.test(cardText)) return 'Active';
        return 'Active';
    }

    // ─── Advertiser Name Detection ─────────────────────────────────────────────
    function detectAdvertiserName(cardEl) {
        const links = cardEl.querySelectorAll('a');
        for (const link of links) {
            const text = (link.innerText || '').trim();
            if (text && text.length > 1 && text.length < 50 &&
                !/Library ID|Started|About|See ad details|Privacy/i.test(text)) {
                return text;
            }
        }
        const searchInput = document.querySelector('input[placeholder*="Search"], input[type="text"]');
        if (searchInput && searchInput.value && searchInput.value.trim().length > 1) {
            return searchInput.value.trim();
        }
        return 'Advertiser';
    }

    // ─── Hook / Headline Snippet ───────────────────────────────────────────────
    function detectHookSnippet(cardText) {
        const lines = cardText.split('\n')
            .map(l => l.trim())
            .filter(l => l.length > 8 && !/Library ID|Started running|Active|Inactive|Platforms|Sponsored|Apply Now|Learn More|Sign Up/i.test(l));
        return lines.length > 0 ? lines[0].substring(0, 50) + (lines[0].length > 50 ? '...' : '') : 'Ad Creative';
    }

    // ─── Performance Calculation ───────────────────────────────────────────────
    function calculatePerformance(startDate, today = new Date()) {
        let daysRunning = 1;
        if (startDate) {
            const diffMs = today.getTime() - startDate.getTime();
            daysRunning = Math.max(1, Math.floor(diffMs / (1000 * 60 * 60 * 24)));
        }

        let tierKey = 'test';
        if (daysRunning <= 6) {
            tierKey = 'test';
        } else if (daysRunning <= 30) {
            tierKey = 'tested';
        } else {
            tierKey = 'winner';
        }

        const tier = BENCHMARKS.daily_spend_tiers[tierKey];

        const spendLow = daysRunning * tier.low;
        const spendMid = daysRunning * tier.mid;
        const spendHigh = daysRunning * tier.high;

        const cpm = BENCHMARKS.metrics.cpm;
        const viewsLow = Math.round((spendLow / cpm.high) * 1000);
        const viewsMid = Math.round((spendMid / cpm.mid) * 1000);
        const viewsHigh = Math.round((spendHigh / cpm.low) * 1000);

        const ctr = BENCHMARKS.metrics.ctr_percent;
        const clicksLow = Math.round(viewsLow * (ctr.low / 100));
        const clicksMid = Math.round(viewsMid * (ctr.mid / 100));
        const clicksHigh = Math.round(viewsHigh * (ctr.high / 100));

        const cpcMid = clicksMid > 0 ? (spendMid / clicksMid) : 0;

        const costPerPurchase = BENCHMARKS.metrics.cost_per_purchase.target || 480;
        const estPurchasesMid = Math.round(spendMid / costPerPurchase);
        const estPurchasesLow = Math.round(spendLow / costPerPurchase);
        const estPurchasesHigh = Math.round(spendHigh / costPerPurchase);

        return {
            daysRunning,
            tierKey,
            tier,
            spend: { low: spendLow, mid: spendMid, high: spendHigh },
            views: { low: viewsLow, mid: viewsMid, high: viewsHigh },
            clicks: { low: clicksLow, mid: clicksMid, high: clicksHigh },
            cpcMid,
            estPurchases: { low: estPurchasesLow, mid: estPurchasesMid, high: estPurchasesHigh }
        };
    }

    // ─── Compact Views Helper (e.g., 2.5M, 25.8K) ─────────────────────────────
    function formatCompactViews(num) {
        if (num === null || num === undefined || isNaN(num)) return '0';
        const abs = Math.abs(num);
        if (abs >= 1000000) {
            const v = abs / 1000000;
            return `${v >= 10 ? v.toFixed(1) : v.toFixed(1).replace(/\.0$/, '')}M`;
        }
        if (abs >= 1000) {
            const v = abs / 1000;
            return `${v >= 10 ? v.toFixed(1) : v.toFixed(1).replace(/\.0$/, '')}K`;
        }
        return Math.round(abs).toString();
    }

    // ─── Build Lens Overlay DOM on Each Card (Spendo Minimal UI) ─────────────────
    function createLensCardElement(data) {
        const perf = data.perf;
        const tier = perf.tier;

        const container = document.createElement('div');
        container.className = 'spendo-lens-card';
        container.setAttribute('data-bloomx-card', 'true');
        if (data.libraryId) {
            container.setAttribute('data-lib-id-ref', data.libraryId);
        }

        const totalSpendMidStr = formatIndianNumber(perf.spend.mid, true);
        const daySpendStr = `₹${Math.round(perf.spend.mid / perf.daysRunning).toLocaleString('en-IN')}`;
        const daySpendRange = `₹${tier.low.toLocaleString('en-IN')}–${tier.high.toLocaleString('en-IN')}/day`;
        const viewsCompactStr = formatCompactViews(perf.views.mid);
        const viewsPerDay = Math.round(perf.views.mid / perf.daysRunning);
        const viewsPerDayStr = `${formatCompactViews(viewsPerDay)}/day`;

        const confClass = isCalibrated ? 'conf-high' : 'conf-mid';
        const confText = isCalibrated ? 'High confidence' : 'Medium confidence';

        container.innerHTML = `
            <!-- Top Collapsible Pill Bar -->
            <div class="spendo-top-pill" role="button" title="Click to collapse/expand">
                <div class="spendo-top-left">
                    <div class="spendo-logo-badge">S</div>
                    <span class="spendo-brand-name">Actual Spend</span>
                    <span class="spendo-live-badge">
                        <span class="spendo-live-dot"></span>
                        Live
                    </span>
                </div>
                <div class="spendo-top-right">
                    <span class="spendo-top-spend">${totalSpendMidStr}</span>
                    <span class="spendo-chevron">⌃</span>
                </div>
            </div>

            <!-- Card Body -->
            <div class="spendo-body">
                <!-- Header Row -->
                <div class="spendo-head-row">
                    <span class="spendo-sec-title">SPEND OVERVIEW</span>
                    <span class="spendo-conf-pill ${confClass}">
                        <span class="spendo-conf-dot"></span>
                        ${confText}
                    </span>
                </div>

                <!-- 3 Stat Boxes Grid -->
                <div class="spendo-stats-grid">
                    <div class="spendo-stat-box" title="Estimated daily spend">
                        <span class="spendo-stat-label">Day spend</span>
                        <span class="spendo-stat-number">${daySpendStr}</span>
                        <span class="spendo-stat-unit">${daySpendRange}</span>
                    </div>

                    <div class="spendo-stat-box spendo-box-primary" title="Cumulative estimated spend">
                        <span class="spendo-stat-label">Total spend</span>
                        <span class="spendo-stat-number spendo-spend-gradient">${totalSpendMidStr}</span>
                        <span class="spendo-stat-unit">${perf.daysRunning} days</span>
                    </div>

                    <div class="spendo-stat-box" title="Estimated views & daily impressions">
                        <span class="spendo-stat-label">Views</span>
                        <span class="spendo-stat-number">${viewsCompactStr}</span>
                        <span class="spendo-stat-unit">${viewsPerDayStr}</span>
                    </div>
                </div>

                <!-- Metadata Row 1 -->
                <div class="spendo-meta-row">
                    <span>Running <b>${perf.daysRunning}d</b></span>
                    <span>Variants <b>${data.creativeCount || 1}</b></span>
                    <span>CPM <b>₹${BENCHMARKS.metrics.cpm.mid}</b></span>
                </div>

                <!-- Metadata Row 2 -->
                <div class="spendo-meta-row">
                    <span>Status <b>${data.status}</b></span>
                    ${data.libraryId ? `<span class="spendo-copy-id" title="Click to copy Library ID" data-lib-id="${data.libraryId}">ID: ${data.libraryId}</span>` : ''}
                    <span>~<b>${perf.estPurchases.mid.toLocaleString('en-IN')}</b> orders</span>
                </div>

                <!-- Verified Model Pill -->
                <div class="spendo-verified-pill" title="Calibrated benchmark model applied">
                    ✔ Price from website · ${activeVerticalName}
                </div>

                <!-- Gradient Pro CTA -->
                <button class="spendo-btn-gradient" type="button" title="View comprehensive competitor sales & revenue">
                    <span class="spendo-btn-grad-text">Total Sales &amp; Revenue</span>
                    <span class="spendo-pro-tag">🔒 PRO</span>
                </button>

                <!-- Full Ad Insights Button -->
                <button class="spendo-btn-insights" type="button" title="Open BloomX Competitor Dashboard">
                    <span>Full ad insights</span>
                    <span class="spendo-open-arrow">Open →</span>
                </button>

                <!-- Footer Row -->
                <div class="spendo-plan-footer">
                    <span>BloomX Intel · <b>Active</b></span>
                    <a href="http://localhost:3001/" target="_blank" class="spendo-pro-link" title="Open full analytics dashboard">Dashboard ↗</a>
                </div>
            </div>
        `;

        // Interactive toggle on top bar
        const topPill = container.querySelector('.spendo-top-pill');
        const bodyEl = container.querySelector('.spendo-body');
        const chevronEl = container.querySelector('.spendo-chevron');

        topPill.addEventListener('click', (e) => {
            e.stopPropagation();
            const isHidden = bodyEl.style.display === 'none';
            bodyEl.style.display = isHidden ? 'flex' : 'none';
            chevronEl.textContent = isHidden ? '⌃' : '⌄';
        });

        // Copy Library ID on click
        const copyEl = container.querySelector('.spendo-copy-id');
        if (copyEl) {
            copyEl.addEventListener('click', (e) => {
                e.stopPropagation();
                const libId = copyEl.getAttribute('data-lib-id');
                if (libId) {
                    navigator.clipboard.writeText(libId).then(() => {
                        const original = copyEl.textContent;
                        copyEl.textContent = 'Copied!';
                        setTimeout(() => { copyEl.textContent = original; }, 1200);
                    });
                }
            });
        }

        // Action buttons open dashboard
        const btnInsights = container.querySelector('.spendo-btn-insights');
        if (btnInsights) {
            btnInsights.addEventListener('click', (e) => {
                e.stopPropagation();
                window.open('http://localhost:3001/', '_blank');
            });
        }

        const btnGradient = container.querySelector('.spendo-btn-gradient');
        if (btnGradient) {
            btnGradient.addEventListener('click', (e) => {
                e.stopPropagation();
                window.open('http://localhost:3001/', '_blank');
            });
        }

        return container;
    }

    // ─── Find Ad Card Elements ─────────────────────────────────────────────────
    function findAdCardElement(targetEl) {
        // Find the outer card container in Facebook Ad Library
        const outerCard = targetEl.closest('.x1plvlek, [role="region"]');
        if (outerCard && outerCard !== document.body) {
            return outerCard;
        }

        let current = targetEl;
        while (current && current !== document.body) {
            const currentText = current.innerText || '';
            if (currentText.includes('Library ID:') && currentText.includes('Started running on')) {
                if (current.parentElement && current.parentElement !== document.body) {
                    const parentText = current.parentElement.innerText || '';
                    const matchCount = (parentText.match(/Library ID:/g) || []).length;
                    if (matchCount > 1) {
                        return current;
                    }
                }
            }
            current = current.parentElement;
        }
        return null;
    }

    // ─── Recalculate All Existing Ads ──────────────────────────────────────────
    function recalculateAllAds() {
        detectedAdsMap.forEach((ad, key) => {
            const newPerf = calculatePerformance(ad.startDate);
            ad.perf = newPerf;
            ad.tierKey = newPerf.tierKey;
            ad.tier = newPerf.tier;
            ad.daysRunning = newPerf.daysRunning;

            if (ad.element) {
                const oldLens = ad.element.querySelector('.spendo-lens-card, .bloomx-lens-card');
                if (oldLens) {
                    const newLens = createLensCardElement({
                        startDate: ad.startDate,
                        status: ad.status,
                        platforms: ad.platforms,
                        creativeCount: ad.creativeCount,
                        libraryId: ad.libraryId,
                        perf: newPerf
                    });
                    ad.element.replaceChild(newLens, oldLens);
                }
            }
        });

        renderFloatingPanel();
    }

    // ─── Floating Overview Panel ───────────────────────────────────────────────
    let floatingPanelEl = null;
    let isPanelMinimized = false;

    function ensureFloatingPanel() {
        if (floatingPanelEl && document.body.contains(floatingPanelEl)) {
            return floatingPanelEl;
        }

        floatingPanelEl = document.createElement('div');
        floatingPanelEl.id = 'bloomx-floating-panel';
        floatingPanelEl.className = 'bloomx-float-panel';
        document.body.appendChild(floatingPanelEl);
        return floatingPanelEl;
    }

    function renderFloatingPanel() {
        const panel = ensureFloatingPanel();
        const ads = Array.from(detectedAdsMap.values());

        if (ads.length === 0) {
            panel.style.display = 'none';
            return;
        }
        panel.style.display = 'block';

        let activeCount = 0;
        let inactiveCount = 0;
        let testCount = 0;
        let testedCount = 0;
        let winnerCount = 0;

        let totalSpendLow = 0;
        let totalSpendMid = 0;
        let totalSpendHigh = 0;
        let totalViewsLow = 0;
        let totalViewsMid = 0;
        let totalViewsHigh = 0;
        let totalEstPurchasesMid = 0;

        ads.forEach(ad => {
            if (ad.status === 'Active') activeCount++;
            else inactiveCount++;

            if (ad.tierKey === 'winner') winnerCount++;
            else if (ad.tierKey === 'tested') testedCount++;
            else testCount++;

            totalSpendLow += ad.perf.spend.low;
            totalSpendMid += ad.perf.spend.mid;
            totalSpendHigh += ad.perf.spend.high;

            totalViewsLow += ad.perf.views.low;
            totalViewsMid += ad.perf.views.mid;
            totalViewsHigh += ad.perf.views.high;

            totalEstPurchasesMid += ad.perf.estPurchases.mid;
        });

        const advertiserName = ads[0]?.advertiserName || 'Advertiser';

        const sortedWinners = [...ads]
            .sort((a, b) => b.daysRunning - a.daysRunning)
            .slice(0, 5);

        if (isPanelMinimized) {
            panel.innerHTML = `
                <div class="bloomx-panel-mini" id="bloomx-panel-expand">
                    <span class="bloomx-mini-dot"></span>
                    <span class="bloomx-mini-text">⚡ BloomX Ad Lens (<b>${ads.length}</b>)</span>
                    <button class="bloomx-btn-expand" title="Expand Panel">➕</button>
                </div>
            `;
            panel.querySelector('#bloomx-panel-expand').addEventListener('click', () => {
                isPanelMinimized = false;
                renderFloatingPanel();
            });
            return;
        }

        const confidencePill = !isCalibrated
            ? `<div class="bloomx-panel-warning-pill">⚠️ Low Confidence (Uncalibrated Vertical)</div>`
            : `<div class="bloomx-panel-calibrated-pill">✅ Calibrated Benchmark Model</div>`;

        panel.innerHTML = `
            <div class="bloomx-panel-header">
                <div class="bloomx-panel-title-wrap">
                    <span class="bloomx-logo-dot"></span>
                    <div>
                        <div class="bloomx-panel-title">BloomX Ad Lens</div>
                        <div class="bloomx-panel-advertiser" title="${advertiserName}">${advertiserName}</div>
                    </div>
                </div>
                <div class="bloomx-panel-actions">
                    <button class="bloomx-btn-toggle" id="bloomx-btn-minimize" title="Minimize Panel">一</button>
                    <button class="bloomx-btn-toggle" id="bloomx-btn-close" title="Close Panel" style="font-size: 16px; margin-left: 4px; line-height: 1;">&times;</button>
                </div>
            </div>

            <div class="bloomx-panel-content">
                <!-- Vertical Indicator & Quick Selector -->
                <div class="bloomx-vertical-indicator-row">
                    <div class="bloomx-panel-vertical-bar">
                        <span class="bloomx-vertical-label">🎯 Vertical:</span>
                        <select id="bloomx-panel-vertical-select" class="bloomx-panel-select">
                            <option value="spiritual_coaching" ${activeVerticalKey === 'spiritual_coaching' ? 'selected' : ''}>Spiritual / Coaching</option>
                            <option value="d2c" ${activeVerticalKey === 'd2c' ? 'selected' : ''}>D2C (E-commerce)</option>
                            <option value="healthcare" ${activeVerticalKey === 'healthcare' ? 'selected' : ''}>Healthcare & Wellness</option>
                            <option value="fintech" ${activeVerticalKey === 'fintech' ? 'selected' : ''}>Fintech & Finance</option>
                            <option value="education" ${activeVerticalKey === 'education' ? 'selected' : ''}>Education & EdTech</option>
                            <option value="default" ${activeVerticalKey === 'default' ? 'selected' : ''}>Default / General</option>
                        </select>
                    </div>
                    ${confidencePill}
                </div>

                <!-- Ad Counts Summary -->
                <div class="bloomx-panel-card">
                    <div class="bloomx-panel-label">Advertiser Ads On Screen</div>
                    <div class="bloomx-status-row">
                        <span class="bloomx-status-pill bloomx-active-pill">🟢 ${activeCount} Active</span>
                        ${inactiveCount > 0 ? `<span class="bloomx-status-pill bloomx-inactive-pill">⚪ ${inactiveCount} Inactive</span>` : ''}
                        <span class="bloomx-total-pill">${ads.length} Total</span>
                    </div>
                    <div class="bloomx-tiers-pills-row">
                        <span class="bloomx-tier-chip chip-winner">Winner: <b>${winnerCount}</b></span>
                        <span class="bloomx-tier-chip chip-tested">Tested: <b>${testedCount}</b></span>
                        <span class="bloomx-tier-chip chip-test">Test: <b>${testCount}</b></span>
                    </div>
                </div>

                <!-- Financial Totals -->
                <div class="bloomx-panel-card bloomx-card-highlight">
                    <div class="bloomx-panel-label">Minimum Visible Spend</div>
                    <div class="bloomx-spend-total">
                        ${formatIndianNumber(totalSpendLow, true)} – ${formatIndianNumber(totalSpendHigh, true)}
                    </div>
                    <div class="bloomx-spend-mid-sub">
                        Mid: <b>${formatIndianNumber(totalSpendMid, true)}</b> est. total
                    </div>

                    <div class="bloomx-summary-stats-grid">
                        <div class="bloomx-stat-box">
                            <div class="bloomx-stat-sub">Total Views</div>
                            <div class="bloomx-stat-main">${formatIndianNumber(totalViewsMid, false)}</div>
                        </div>
                        <div class="bloomx-stat-box">
                            <div class="bloomx-stat-sub">Est. Purchases</div>
                            <div class="bloomx-stat-main">~${totalEstPurchasesMid.toLocaleString('en-IN')}</div>
                        </div>
                    </div>
                </div>

                <!-- Top 5 Winners Section -->
                <div class="bloomx-panel-card">
                    <div class="bloomx-panel-header-sub">
                        <div class="bloomx-panel-label" style="margin:0;">🏆 Top 5 Winners (Longest Running)</div>
                        <span class="bloomx-label-hint">Click to scroll</span>
                    </div>

                    <div class="bloomx-winners-list">
                        ${sortedWinners.map((winner, idx) => `
                            <div class="bloomx-winner-item" data-winner-lib-id="${winner.libraryId}" data-winner-index="${idx}">
                                <div class="bloomx-winner-rank">#${idx + 1}</div>
                                <div class="bloomx-winner-info">
                                    <div class="bloomx-winner-headline">${winner.hookSnippet}</div>
                                    <div class="bloomx-winner-meta">
                                        <span class="bloomx-winner-days">${winner.daysRunning}d active</span>
                                        <span>•</span>
                                        <span class="bloomx-winner-spend">${formatIndianNumber(winner.perf.spend.mid, true)}</span>
                                        <span>•</span>
                                        <span>${formatIndianNumber(winner.perf.views.mid, false)} views</span>
                                    </div>
                                </div>
                                <div class="bloomx-winner-arrow">↗</div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Action Buttons -->
                <button class="bloomx-btn-send-dashboard" id="bloomx-btn-send-dashboard">
                    🚀 Send to BloomX Dashboard
                </button>
                <button class="bloomx-btn-export" id="bloomx-btn-export-csv">
                    📥 Export CSV (${ads.length} Ads)
                </button>
                <div id="bloomx-panel-toast" class="bloomx-panel-toast"></div>
            </div>
        `;

        panel.querySelector('#bloomx-btn-minimize').addEventListener('click', () => {
            isPanelMinimized = true;
            renderFloatingPanel();
        });

        const btnClose = panel.querySelector('#bloomx-btn-close');
        if (btnClose) {
            btnClose.addEventListener('click', () => {
                panel.style.display = 'none';
            });
        }

        // Send to BloomX Dashboard Ingestion Handler
        const btnSend = panel.querySelector('#bloomx-btn-send-dashboard');
        const panelToast = panel.querySelector('#bloomx-panel-toast');

        function showPanelToast(msg, isSuccess = true) {
            if (!panelToast) return;
            panelToast.textContent = msg;
            panelToast.className = `bloomx-panel-toast ${isSuccess ? 'toast-success' : 'toast-error'}`;
            panelToast.style.display = 'block';
            setTimeout(() => { panelToast.style.display = 'none'; }, 4500);
        }

        if (btnSend) {
            btnSend.addEventListener('click', async () => {
                const originalText = btnSend.innerHTML;
                btnSend.disabled = true;
                btnSend.innerHTML = '⏳ Sending to Dashboard...';

                const advertiserName = ads[0]?.advertiserName || 'Advertiser';
                const payload = {
                    advertiserName,
                    vertical: activeVerticalKey,
                    ads: ads.map(a => ({
                        libraryId: a.libraryId,
                        adLibraryUrl: a.libraryId ? `https://www.facebook.com/ads/library/?id=${a.libraryId}` : window.location.href,
                        daysActive: a.daysRunning,
                        tier: a.tier?.name || 'New',
                        format: 'Image',
                        hook: a.hookSnippet,
                        bodyText: a.hookSnippet,
                        platforms: a.platforms,
                        spend: a.perf.spend,
                        views: a.perf.views,
                        clicks: a.perf.clicks,
                        cpcMid: a.perf.cpcMid,
                        estPurchases: a.perf.estPurchases?.mid || 0,
                        creativeCount: a.creativeCount || 1
                    }))
                };

                try {
                    const response = await fetch('http://localhost:3001/api/extension/ingest', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(payload)
                    });

                    const json = await response.json();
                    if (response.ok && json.message === 'success') {
                        btnSend.disabled = false;
                        btnSend.innerHTML = '✅ Ingested! Open Dashboard ↗';
                        btnSend.classList.add('btn-send-success');
                        showPanelToast(`🎉 Successfully sent ${ads.length} ads for "${advertiserName}" to your Competitor Dashboard!`);
                        btnSend.onclick = () => {
                            window.open('http://localhost:3001/', '_blank');
                        };
                    } else {
                        throw new Error(json.error || 'Failed to ingest ads');
                    }
                } catch (err) {
                    console.error('[BloomX Ad Lens] Ingest error:', err);
                    btnSend.disabled = false;
                    btnSend.innerHTML = originalText;
                    showPanelToast(`⚠️ Could not reach http://localhost:3001. Ensure your backend server is running!`, false);
                }
            });
        }

        // Quick vertical switcher directly in floating panel
        const verticalSelectEl = panel.querySelector('#bloomx-panel-vertical-select');
        if (verticalSelectEl) {
            verticalSelectEl.addEventListener('change', (e) => {
                const newKey = e.target.value;
                if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
                    chrome.storage.local.set({ active_vertical: newKey }, () => {
                        loadBenchmarksAndSync(() => {
                            recalculateAllAds();
                        });
                    });
                }
            });
        }

        panel.querySelectorAll('.bloomx-winner-item').forEach(item => {
            item.addEventListener('click', () => {
                const libId = item.getAttribute('data-winner-lib-id');
                const adData = ads.find(a => a.libraryId === libId);
                if (adData && adData.element) {
                    adData.element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    adData.element.classList.remove('bloomx-highlight-target');
                    void adData.element.offsetWidth;
                    adData.element.classList.add('bloomx-highlight-target');
                    setTimeout(() => {
                        adData.element.classList.remove('bloomx-highlight-target');
                    }, 2500);
                }
            });
        });

        panel.querySelector('#bloomx-btn-export-csv').addEventListener('click', exportAdsToCSV);
    }

    // ─── CSV Export Functionality ──────────────────────────────────────────────
    function exportAdsToCSV() {
        const ads = Array.from(detectedAdsMap.values());
        if (ads.length === 0) {
            alert('No ads detected to export.');
            return;
        }

        const headers = [
            'Library ID',
            'Advertiser',
            'Status',
            'Start Date',
            'Days Active',
            'Vertical',
            'Tier',
            'Daily Spend Low (INR)',
            'Daily Spend High (INR)',
            'Total Spend Low (INR)',
            'Total Spend Mid (INR)',
            'Total Spend High (INR)',
            'Est Views Low',
            'Est Views Mid',
            'Est Views High',
            'Est Clicks Mid',
            'Est CPC Mid (INR)',
            'Est Purchases Mid',
            'Platforms',
            'Creative Copies',
            'Headline Snippet',
            'Ad Library URL'
        ];

        const escapeCSV = (str) => {
            if (str === null || str === undefined) return '""';
            const s = String(str).replace(/"/g, '""');
            return `"${s}"`;
        };

        const rows = ads.map(ad => [
            escapeCSV(ad.libraryId || 'N/A'),
            escapeCSV(ad.advertiserName || 'Advertiser'),
            escapeCSV(ad.status),
            escapeCSV(ad.startDate ? ad.startDate.toISOString().split('T')[0] : 'Unknown'),
            escapeCSV(ad.daysRunning),
            escapeCSV(activeVerticalName),
            escapeCSV(ad.tier.name),
            escapeCSV(ad.tier.low),
            escapeCSV(ad.tier.high),
            escapeCSV(ad.perf.spend.low),
            escapeCSV(ad.perf.spend.mid),
            escapeCSV(ad.perf.spend.high),
            escapeCSV(ad.perf.views.low),
            escapeCSV(ad.perf.views.mid),
            escapeCSV(ad.perf.views.high),
            escapeCSV(ad.perf.clicks.mid),
            escapeCSV(ad.perf.cpcMid.toFixed(2)),
            escapeCSV(ad.perf.estPurchases.mid),
            escapeCSV(ad.platforms.join(', ')),
            escapeCSV(ad.creativeCount || 1),
            escapeCSV(ad.hookSnippet || ''),
            escapeCSV(ad.libraryId ? `https://www.facebook.com/ads/library/?id=${ad.libraryId}` : window.location.href)
        ]);

        const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');

        const advertiserName = (ads[0]?.advertiserName || 'Advertiser').replace(/[^a-zA-Z0-9_-]/g, '_');
        const todayStr = new Date().toISOString().split('T')[0];
        link.setAttribute('href', url);
        link.setAttribute('download', `BloomX_${advertiserName}_${activeVerticalKey}_Ads_${todayStr}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    // ─── Scan & Enhance Ad Cards ───────────────────────────────────────────────
    let isScanning = false;
    function scanAndEnhanceAdCards() {
        if (isScanning) return;
        isScanning = true;

        try {
            const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
            const targetNodes = [];
            let n;
            while ((n = walker.nextNode())) {
                if (n.nodeValue && n.nodeValue.includes('Library ID:')) {
                    targetNodes.push(n.parentElement);
                }
            }

            targetNodes.forEach((textEl, idx) => {
                const card = findAdCardElement(textEl);
                if (!card) return;

                const cardText = card.innerText || '';
                const libraryId = detectLibraryId(cardText) || `card_${idx}`;

                const startDate = parseStartDate(cardText);
                const status = detectStatus(cardText);
                const platforms = detectPlatforms(card);
                const creativeCount = detectCreativeCount(cardText);
                const advertiserName = detectAdvertiserName(card);
                const hookSnippet = detectHookSnippet(cardText);
                const perf = calculatePerformance(startDate);

                detectedAdsMap.set(libraryId, {
                    element: card,
                    libraryId,
                    advertiserName,
                    startDate,
                    daysRunning: perf.daysRunning,
                    status,
                    platforms,
                    creativeCount,
                    hookSnippet,
                    tierKey: perf.tierKey,
                    tier: perf.tier,
                    perf
                });

                if (card.getAttribute('data-bloomx-injected') === 'true' || card.querySelector('.spendo-lens-card, .bloomx-lens-card')) {
                    return;
                }

                const lensElement = createLensCardElement({
                    startDate,
                    status,
                    platforms,
                    creativeCount,
                    libraryId,
                    perf
                });

                card.setAttribute('data-bloomx-injected', 'true');
                card.insertBefore(lensElement, card.firstChild);
            });

            renderFloatingPanel();

        } catch (err) {
            console.error('[BloomX Ad Lens] Scan error:', err);
        } finally {
            isScanning = false;
        }
    }

    // ─── Debounced Observer for Infinite Scroll ────────────────────────────────
    let debounceTimer = null;
    function scheduleScan() {
        if (debounceTimer) clearTimeout(debounceTimer);
        debounceTimer = setTimeout(scanAndEnhanceAdCards, 200);
    }

    const observer = new MutationObserver((mutations) => {
        let hasRelevantMutation = false;
        for (const mutation of mutations) {
            if (mutation.addedNodes.length > 0) {
                hasRelevantMutation = true;
                break;
            }
        }
        if (hasRelevantMutation) {
            scheduleScan();
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    scheduleScan();
    setInterval(scanAndEnhanceAdCards, 1800);

    console.log('%c[BloomX Ad Lens]%c Active with Popup Sync & Vertical Benchmarks', 'color: #6366f1; font-weight: bold;', 'color: #10b981;');
})();
