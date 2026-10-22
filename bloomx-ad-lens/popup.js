/**
 * BloomX Ad Lens - Extension Popup Logic
 * Manages vertical switching, calibration confidence alerts, and custom benchmark editing via chrome.storage.
 */

document.addEventListener('DOMContentLoaded', async () => {
    // DOM Elements
    const verticalSelect = document.getElementById('verticalSelect');
    const calibrationBadge = document.getElementById('calibrationBadge');
    const confidenceBanner = document.getElementById('confidenceBanner');
    const bannerIcon = document.getElementById('bannerIcon');
    const bannerText = document.getElementById('bannerText');

    const verticalK = document.getElementById('vertical_k');
    const kCalibStatus = document.getElementById('kCalibStatus');
    const kCalibCountBadge = document.getElementById('kCalibCountBadge');

    const cpmLow = document.getElementById('cpm_low');
    const cpmMid = document.getElementById('cpm_mid');
    const cpmHigh = document.getElementById('cpm_high');

    const ctrLow = document.getElementById('ctr_low');
    const ctrMid = document.getElementById('ctr_mid');
    const ctrHigh = document.getElementById('ctr_high');

    const costPerPurchase = document.getElementById('cost_per_purchase');

    const spendTestLow = document.getElementById('spend_test_low');
    const spendTestMid = document.getElementById('spend_test_mid');
    const spendTestHigh = document.getElementById('spend_test_high');

    const spendTestedLow = document.getElementById('spend_tested_low');
    const spendTestedMid = document.getElementById('spend_tested_mid');
    const spendTestedHigh = document.getElementById('spend_tested_high');

    const spendWinnerLow = document.getElementById('spend_winner_low');
    const spendWinnerMid = document.getElementById('spend_winner_mid');
    const spendWinnerHigh = document.getElementById('spend_winner_high');

    // EU Real-Reach Mode elements
    const euCpmLow = document.getElementById('eu_cpm_low');
    const euCpmMid = document.getElementById('eu_cpm_mid');
    const euCpmHigh = document.getElementById('eu_cpm_high');
    const eurToInrRate = document.getElementById('eur_to_inr_rate');

    // Calibration Mode elements (Requirement 4)
    const realPageSpend = document.getElementById('real_page_spend');
    const btnCalculateCalibration = document.getElementById('btnCalculateCalibration');
    const calibrationResultBox = document.getElementById('calibrationResultBox');
    const calibDetectedSpendText = document.getElementById('calibDetectedSpendText');
    const calibDiffPercentText = document.getElementById('calibDiffPercentText');
    const calibKOldText = document.getElementById('calibKOldText');
    const calibKNewText = document.getElementById('calibKNewText');
    const calibKAvgText = document.getElementById('calibKAvgText');
    const calibHistorySummaryText = document.getElementById('calibHistorySummaryText');
    const btnApplyCalibrationK = document.getElementById('btnApplyCalibrationK');

    const btnSave = document.getElementById('btnSave');
    const btnReset = document.getElementById('btnReset');
    const toast = document.getElementById('toast');
    const inputDashboardUrl = document.getElementById('dashboard_api_url');
    const btnOpenDashboardLink = document.getElementById('btnOpenDashboardLink');

    // Default EU benchmarks template
    const DEFAULT_EU_BENCHMARKS = {
        cpm_low_eur: 4.0,
        cpm_mid_eur: 7.0,
        cpm_high_eur: 10.0,
        eur_to_inr_rate: 90.0,
        frequency: 1.9
    };
    let currentEuBenchmarks = { ...DEFAULT_EU_BENCHMARKS };
    let pendingCalibration = null;
    let calibrationHistory = {};

    // Embedded fallback benchmarks template
    const EMBEDDED_DEFAULT_BENCHMARKS = {
        verticals: {
            spiritual_coaching: {
                name: "Spiritual / Coaching",
                calibrated: true,
                k: 1550,
                cpm_low: 170, cpm_mid: 226, cpm_high: 330,
                ctr_low: 0.9, ctr_mid: 1.22, ctr_high: 1.7,
                cost_per_purchase: 480,
                spend_tiers: {
                    test: { low: 100, mid: 200, high: 300 },
                    tested: { low: 300, mid: 650, high: 1000 },
                    winner: { low: 2000, mid: 3000, high: 4000 }
                }
            },
            d2c: {
                name: "D2C (Direct to Consumer)",
                calibrated: false,
                k: 1550,
                cpm_low: 170, cpm_mid: 226, cpm_high: 330,
                ctr_low: 0.9, ctr_mid: 1.22, ctr_high: 1.7,
                cost_per_purchase: 480,
                spend_tiers: {
                    test: { low: 100, mid: 200, high: 300 },
                    tested: { low: 300, mid: 650, high: 1000 },
                    winner: { low: 2000, mid: 3000, high: 4000 }
                }
            },
            healthcare: {
                name: "Healthcare & Wellness",
                calibrated: false,
                k: 1550,
                cpm_low: 170, cpm_mid: 226, cpm_high: 330,
                ctr_low: 0.9, ctr_mid: 1.22, ctr_high: 1.7,
                cost_per_purchase: 480,
                spend_tiers: {
                    test: { low: 100, mid: 200, high: 300 },
                    tested: { low: 300, mid: 650, high: 1000 },
                    winner: { low: 2000, mid: 3000, high: 4000 }
                }
            },
            fintech: {
                name: "Fintech & Finance",
                calibrated: false,
                k: 1550,
                cpm_low: 170, cpm_mid: 226, cpm_high: 330,
                ctr_low: 0.9, ctr_mid: 1.22, ctr_high: 1.7,
                cost_per_purchase: 480,
                spend_tiers: {
                    test: { low: 100, mid: 200, high: 300 },
                    tested: { low: 300, mid: 650, high: 1000 },
                    winner: { low: 2000, mid: 3000, high: 4000 }
                }
            },
            education: {
                name: "Education & EdTech",
                calibrated: false,
                k: 1550,
                cpm_low: 170, cpm_mid: 226, cpm_high: 330,
                ctr_low: 0.9, ctr_mid: 1.22, ctr_high: 1.7,
                cost_per_purchase: 480,
                spend_tiers: {
                    test: { low: 100, mid: 200, high: 300 },
                    tested: { low: 300, mid: 650, high: 1000 },
                    winner: { low: 2000, mid: 3000, high: 4000 }
                }
            },
            default: {
                name: "Default / General",
                calibrated: false,
                k: 1550,
                cpm_low: 170, cpm_mid: 226, cpm_high: 330,
                ctr_low: 0.9, ctr_mid: 1.22, ctr_high: 1.7,
                cost_per_purchase: 480,
                spend_tiers: {
                    test: { low: 100, mid: 200, high: 300 },
                    tested: { low: 300, mid: 650, high: 1000 },
                    winner: { low: 2000, mid: 3000, high: 4000 }
                }
            }
        }
    };

    let defaultBenchmarks = EMBEDDED_DEFAULT_BENCHMARKS;
    try {
        const res = await fetch(chrome.runtime.getURL('benchmarks.json'));
        const json = await res.json();
        if (json && json.verticals) defaultBenchmarks = json;
    } catch (e) {
        // Fall back gracefully to EMBEDDED_DEFAULT_BENCHMARKS
    }

    // State
    let activeVertical = 'spiritual_coaching';
    let allBenchmarks = JSON.parse(JSON.stringify(defaultBenchmarks.verticals));

    // ─── Load from chrome.storage.local ─────────────────────────────────────────
    chrome.storage.local.get(['active_vertical', 'custom_benchmarks', 'dashboard_api_url', 'eu_benchmarks', 'real_page_spend', 'calibration_history'], (result) => {
        if (result.active_vertical) {
            activeVertical = result.active_vertical;
        }
        if (result.custom_benchmarks && Object.keys(result.custom_benchmarks).length > 0) {
            allBenchmarks = result.custom_benchmarks;
        }
        if (result.eu_benchmarks) {
            currentEuBenchmarks = { ...DEFAULT_EU_BENCHMARKS, ...result.eu_benchmarks };
        } else if (defaultBenchmarks.eu_benchmarks) {
            currentEuBenchmarks = { ...DEFAULT_EU_BENCHMARKS, ...defaultBenchmarks.eu_benchmarks };
        }
        if (result.real_page_spend && realPageSpend) {
            realPageSpend.value = result.real_page_spend;
        }
        if (result.calibration_history) {
            calibrationHistory = result.calibration_history;
        }

        populateEuBenchmarkFields();

        const savedUrl = result.dashboard_api_url || 'http://localhost:3000';
        if (inputDashboardUrl) {
            inputDashboardUrl.value = savedUrl;
        }
        updateDashboardLinks(savedUrl);
        checkDashboardHealth(savedUrl);
        checkSarvamStatus(savedUrl);

        verticalSelect.value = activeVertical;
        populateFieldsForVertical(activeVertical);
    });

    function populateEuBenchmarkFields() {
        if (euCpmLow) euCpmLow.value = currentEuBenchmarks.cpm_low_eur;
        if (euCpmMid) euCpmMid.value = currentEuBenchmarks.cpm_mid_eur;
        if (euCpmHigh) euCpmHigh.value = currentEuBenchmarks.cpm_high_eur;
        if (eurToInrRate) eurToInrRate.value = currentEuBenchmarks.eur_to_inr_rate;
    }

    const btnOpenDashboardLink2 = document.getElementById('btnOpenDashboardLink2');
    const dashboardHealthBadge = document.getElementById('dashboardHealthBadge');

    function updateDashboardLinks(baseUrl) {
        const cleanUrl = (baseUrl || 'http://localhost:3000').replace(/\/$/, '');
        if (btnOpenDashboardLink) {
            btnOpenDashboardLink.href = cleanUrl;
            btnOpenDashboardLink.onclick = (e) => {
                e.preventDefault();
                if (typeof chrome !== 'undefined' && chrome.tabs) {
                    chrome.tabs.create({ url: cleanUrl });
                } else {
                    window.open(cleanUrl, '_blank');
                }
            };
        }
        if (btnOpenDashboardLink2) {
            btnOpenDashboardLink2.href = cleanUrl;
            btnOpenDashboardLink2.onclick = (e) => {
                e.preventDefault();
                if (typeof chrome !== 'undefined' && chrome.tabs) {
                    chrome.tabs.create({ url: cleanUrl });
                } else {
                    window.open(cleanUrl, '_blank');
                }
            };
        }
    }

    async function checkDashboardHealth(baseUrl) {
        if (!dashboardHealthBadge) return;
        try {
            const cleanUrl = (baseUrl || 'http://localhost:3000').replace(/\/$/, '');
            const res = await fetch(`${cleanUrl}/api/health`, { cache: 'no-store' });
            if (res.ok) {
                dashboardHealthBadge.textContent = '● Online';
                dashboardHealthBadge.style.color = '#4ADE80';
                return;
            }
        } catch (e) {}
        dashboardHealthBadge.textContent = '● Offline / Check URL';
        dashboardHealthBadge.style.color = '#F59E0B';
    }

    const sarvamStatusBadge = document.getElementById('sarvamStatusBadge');
    async function checkSarvamStatus(baseUrl) {
        if (!sarvamStatusBadge) return;
        try {
            const cleanUrl = (baseUrl || 'http://localhost:3000').replace(/\/$/, '');
            const res = await fetch(`${cleanUrl}/api/transcribe/status`, { cache: 'no-store' });
            if (res.ok) {
                const json = await res.json();
                if (json.data && json.data.configured) {
                    sarvamStatusBadge.textContent = `● ${json.data.model || 'saaras:v3'} Active`;
                    sarvamStatusBadge.style.color = '#4ADE80';
                    sarvamStatusBadge.style.background = 'rgba(74, 222, 128, 0.15)';
                    sarvamStatusBadge.style.borderColor = 'rgba(74, 222, 128, 0.3)';
                    return;
                }
            }
        } catch (e) {
            // ignore network failure
        }
        sarvamStatusBadge.textContent = '● Offline / Local Fallback';
        sarvamStatusBadge.style.color = '#F59E0B';
        sarvamStatusBadge.style.background = 'rgba(245, 158, 11, 0.15)';
        sarvamStatusBadge.style.borderColor = 'rgba(245, 158, 11, 0.3)';
    }

    // ─── Populate Form Fields for Selected Vertical ────────────────────────────
    function populateFieldsForVertical(vKey) {
        const vData = allBenchmarks[vKey] || defaultBenchmarks?.verticals[vKey];
        if (!vData) return;

        // Confidence Banner & Badge
        const isCalibrated = vData.calibrated === true;
        const vCalibs = calibrationHistory[vKey] || [];
        const calibCount = vCalibs.length;

        if (isCalibrated) {
            confidenceBanner.className = 'confidence-banner banner-calibrated';
            bannerIcon.textContent = '✅';
            bannerText.innerHTML = `<b>High Confidence:</b> Calibrated (${calibCount > 0 ? `on ${calibCount} advertiser${calibCount === 1 ? '' : 's'}` : 'baseline'}).`;
            calibrationBadge.textContent = 'CALIBRATED';
            calibrationBadge.style.color = '#34d399';
        } else {
            confidenceBanner.className = 'confidence-banner banner-uncalibrated';
            bannerIcon.textContent = '⚠️';
            bannerText.innerHTML = '<b>Low Confidence:</b> This vertical is not calibrated yet. Use live calibration below to tune k.';
            calibrationBadge.textContent = 'LOW CONFIDENCE';
            calibrationBadge.style.color = '#fbbf24';
        }

        // Spend Constant k (Requirement 1 & 4)
        if (verticalK) {
            verticalK.value = vData.k || 1550;
        }
        if (kCalibStatus) {
            kCalibStatus.textContent = isCalibrated ? '● Calibrated' : '● Uncalibrated';
            kCalibStatus.style.color = isCalibrated ? '#4ADE80' : '#FBBF24';
        }
        if (kCalibCountBadge) {
            kCalibCountBadge.textContent = calibCount > 0
                ? `Calibrated on ${calibCount} advertiser${calibCount === 1 ? '' : 's'}`
                : (isCalibrated ? 'Calibrated default' : 'Uncalibrated');
        }

        // CPM
        cpmLow.value = vData.cpm_low;
        cpmMid.value = vData.cpm_mid;
        cpmHigh.value = vData.cpm_high;

        // CTR
        ctrLow.value = vData.ctr_low;
        ctrMid.value = vData.ctr_mid;
        ctrHigh.value = vData.ctr_high;

        // CPA
        costPerPurchase.value = vData.cost_per_purchase || 480;

        // Spend Tiers
        const tiers = vData.spend_tiers || {
            test: { low: 100, mid: 200, high: 300 },
            tested: { low: 300, mid: 650, high: 1000 },
            winner: { low: 2000, mid: 3000, high: 4000 }
        };

        spendTestLow.value = tiers.test.low;
        spendTestMid.value = tiers.test.mid;
        spendTestHigh.value = tiers.test.high;

        spendTestedLow.value = tiers.tested.low;
        spendTestedMid.value = tiers.tested.mid;
        spendTestedHigh.value = tiers.tested.high;

        spendWinnerLow.value = tiers.winner.low;
        spendWinnerMid.value = tiers.winner.mid;
        spendWinnerHigh.value = tiers.winner.high;
    }

    // ─── Handle Vertical Switch ────────────────────────────────────────────────
    verticalSelect.addEventListener('change', (e) => {
        activeVertical = e.target.value;
        populateFieldsForVertical(activeVertical);

        // Save active vertical selection
        chrome.storage.local.set({ active_vertical: activeVertical }, () => {
            showToast(`Switched to ${verticalSelect.options[verticalSelect.selectedIndex].text}`);
        });
    });

    // ─── Save & Apply Benchmark Numbers ────────────────────────────────────────
    btnSave.addEventListener('click', () => {
        const vKey = verticalSelect.value;
        if (!allBenchmarks[vKey]) {
            allBenchmarks[vKey] = {};
        }

        allBenchmarks[vKey] = {
            ...allBenchmarks[vKey],
            name: verticalSelect.options[verticalSelect.selectedIndex].text.split('(')[0].trim(),
            calibrated: allBenchmarks[vKey].calibrated, // preserve calibration flag
            k: parseFloat(verticalK?.value) || 1550,
            cpm_low: parseFloat(cpmLow.value) || 170,
            cpm_mid: parseFloat(cpmMid.value) || 226,
            cpm_high: parseFloat(cpmHigh.value) || 330,
            ctr_low: parseFloat(ctrLow.value) || 0.9,
            ctr_mid: parseFloat(ctrMid.value) || 1.22,
            ctr_high: parseFloat(ctrHigh.value) || 1.7,
            cost_per_purchase: parseFloat(costPerPurchase.value) || 480,
            spend_tiers: {
                test: {
                    low: parseFloat(spendTestLow.value) || 100,
                    mid: parseFloat(spendTestMid.value) || 200,
                    high: parseFloat(spendTestHigh.value) || 300
                },
                tested: {
                    low: parseFloat(spendTestedLow.value) || 300,
                    mid: parseFloat(spendTestedMid.value) || 650,
                    high: parseFloat(spendTestedHigh.value) || 1000
                },
                winner: {
                    low: parseFloat(spendWinnerLow.value) || 2000,
                    mid: parseFloat(spendWinnerMid.value) || 3000,
                    high: parseFloat(spendWinnerHigh.value) || 4000
                }
            }
        };

        currentEuBenchmarks = {
            cpm_low_eur: parseFloat(euCpmLow.value) || 4.0,
            cpm_mid_eur: parseFloat(euCpmMid.value) || 7.0,
            cpm_high_eur: parseFloat(euCpmHigh.value) || 10.0,
            eur_to_inr_rate: parseFloat(eurToInrRate.value) || 90.0,
            frequency: 1.9
        };

        const realSpendVal = realPageSpend ? parseFloat(realPageSpend.value) || 0 : 0;

        let customUrl = (inputDashboardUrl ? inputDashboardUrl.value.trim() : '') || 'http://localhost:3000';
        if (customUrl.endsWith('/')) customUrl = customUrl.slice(0, -1);
        updateDashboardLinks(customUrl);

        chrome.storage.local.set({
            active_vertical: vKey,
            custom_benchmarks: allBenchmarks,
            eu_benchmarks: currentEuBenchmarks,
            real_page_spend: realSpendVal,
            dashboard_api_url: customUrl
        }, () => {
            checkDashboardHealth(customUrl);
            checkSarvamStatus(customUrl);
            showToast('✅ Saved! Spend Constant k, Benchmarks & Dashboard URL applied.');
        });
    });

    // ─── Calibration Mode Logic (Requirement 4) ────────────────────────────────
    if (btnCalculateCalibration) {
        btnCalculateCalibration.addEventListener('click', () => {
            const real = parseFloat(realPageSpend.value);
            if (!real || real <= 0) {
                alert('Please enter a valid real spend total from Meta Ads Manager in ₹ (e.g. 150000)');
                return;
            }

            const startDateVal = document.getElementById('calib_start_date')?.value || null;
            const endDateVal = document.getElementById('calib_end_date')?.value || null;

            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                if (!tabs || !tabs[0] || !tabs[0].id) {
                    alert('Please open Facebook Ad Library tab to calibrate against the active page.');
                    return;
                }

                chrome.tabs.sendMessage(tabs[0].id, {
                    action: 'COMPUTE_CALIBRATION',
                    realSpend: real,
                    startDate: startDateVal,
                    endDate: endDateVal
                }, (response) => {
                    if (chrome.runtime.lastError || !response) {
                        alert('Could not communicate with the Facebook Ad Library page. Make sure the page is loaded and refresh if needed.');
                        return;
                    }

                    if (!response.success || !response.estimatedSpend || response.estimatedSpend <= 0) {
                        alert(`No spend detected for ${response.advertiserName || 'advertiser'} in that date range (${response.adCount || 0} ads detected). Please scroll down on Meta Ad Library to load more ads or adjust the dates.`);
                        return;
                    }

                    const detected = response.estimatedSpend;
                    const diffPct = ((detected - real) / real) * 100;

                    // Requirement 4: Compute k_new = k_old * (real / estimated)
                    const currentK = response.currentK || allBenchmarks[activeVertical]?.k || 1550;
                    const k_new = Math.round(currentK * (real / detected));

                    // History of calibrations for this vertical
                    const verticalHist = calibrationHistory[activeVertical] || [];
                    const priorSum = verticalHist.reduce((acc, c) => acc + (Number(c.k) || currentK), 0);
                    const newCount = verticalHist.length + 1;
                    // AVERAGE k across all calibrations for that vertical
                    const k_avg = Math.round((priorSum + k_new) / newCount);

                    const advEl = document.getElementById('calibAdvertiserText');
                    if (advEl) advEl.textContent = response.advertiserName || 'Current Advertiser';

                    const realEl = document.getElementById('calibRealSpendText');
                    if (realEl) realEl.textContent = `₹${Math.round(real).toLocaleString('en-IN')}`;

                    calibDetectedSpendText.textContent = `₹${Math.round(detected).toLocaleString('en-IN')}`;

                    const isOver = diffPct > 0;
                    calibDiffPercentText.textContent = `${isOver ? '+' : ''}${diffPct.toFixed(1)}% (${isOver ? 'Overestimated' : 'Underestimated'})`;
                    calibDiffPercentText.style.color = Math.abs(diffPct) <= 10 ? '#4ADE80' : (isOver ? '#F87171' : '#FBBF24');

                    if (calibKOldText) calibKOldText.textContent = currentK.toLocaleString('en-IN');
                    if (calibKNewText) calibKNewText.textContent = k_new.toLocaleString('en-IN');
                    if (calibKAvgText) calibKAvgText.textContent = k_avg.toLocaleString('en-IN');

                    if (calibHistorySummaryText) {
                        calibHistorySummaryText.innerHTML = `
                            Averaged across <b>${newCount}</b> advertiser calibration${newCount === 1 ? '' : 's'} (${verticalHist.length} previous + <b>${response.advertiserName || 'this advertiser'}</b>).
                        `;
                    }

                    pendingCalibration = {
                        advertiser: response.advertiserName || 'Advertiser',
                        date: new Date().toISOString(),
                        real,
                        estimated: detected,
                        k: k_new,
                        k_avg,
                        newCount
                    };

                    calibrationResultBox.style.display = 'block';
                });
            });
        });
    }

    // Requirement 4: "Apply" saves k_new for the active vertical and sets calibrated:true.
    // Keep a history of calibrations (advertiser, date, real, estimated, k) and use AVERAGE k across all calibrations.
    if (btnApplyCalibrationK) {
        btnApplyCalibrationK.addEventListener('click', () => {
            if (!pendingCalibration) return;
            const vKey = activeVertical;

            if (!calibrationHistory[vKey]) {
                calibrationHistory[vKey] = [];
            }

            // Save entry to calibration history
            calibrationHistory[vKey].push({
                advertiser: pendingCalibration.advertiser,
                date: pendingCalibration.date,
                real: pendingCalibration.real,
                estimated: pendingCalibration.estimated,
                k: pendingCalibration.k
            });

            if (!allBenchmarks[vKey]) {
                allBenchmarks[vKey] = {};
            }

            // Use the AVERAGE k across all calibrations for that vertical
            allBenchmarks[vKey].k = pendingCalibration.k_avg;
            allBenchmarks[vKey].calibrated = true;

            if (verticalK) {
                verticalK.value = pendingCalibration.k_avg;
            }

            chrome.storage.local.set({
                custom_benchmarks: allBenchmarks,
                calibration_history: calibrationHistory
            }, () => {
                populateFieldsForVertical(vKey);
                showToast(`✨ Saved k = ${pendingCalibration.k_avg.toLocaleString('en-IN')}! Vertical calibrated on ${pendingCalibration.newCount} advertisers.`);
            });
        });
    }

    // ─── Reset to Factory Defaults ─────────────────────────────────────────────
    btnReset.addEventListener('click', () => {
        const vKey = verticalSelect.value;
        if (defaultBenchmarks?.verticals[vKey]) {
            allBenchmarks[vKey] = JSON.parse(JSON.stringify(defaultBenchmarks.verticals[vKey]));
            populateFieldsForVertical(vKey);
            currentEuBenchmarks = { ...DEFAULT_EU_BENCHMARKS };
            populateEuBenchmarkFields();
            if (calibrationResultBox) calibrationResultBox.style.display = 'none';

            chrome.storage.local.set({
                custom_benchmarks: allBenchmarks,
                eu_benchmarks: currentEuBenchmarks
            }, () => {
                showToast('↺ Reset to factory default benchmarks.');
            });
        }
    });

    // ─── Toast Feedback Helper ─────────────────────────────────────────────────
    let toastTimeout = null;
    function showToast(msg) {
        toast.textContent = msg;
        toast.style.display = 'block';
        if (toastTimeout) clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            toast.style.display = 'none';
        }, 2200);
    }
});
