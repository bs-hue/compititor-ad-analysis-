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

            /* AdLens Per-Card Direct Overlay */
            .bloomx-adlens-card {
                display: block !important;
                position: relative !important;
                margin: 0 0 12px 0 !important;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
                color: #F8FAFC !important;
                background: #0E1219 !important;
                border: 1px solid rgba(255, 255, 255, 0.12) !important;
                border-radius: 14px !important;
                padding: 12px 14px !important;
                box-shadow: 0 6px 22px rgba(0, 0, 0, 0.45) !important;
                box-sizing: border-box !important;
                z-index: 10 !important;
                width: 100% !important;
                user-select: none !important;
            }
            .adlens-header-row {
                display: flex !important;
                align-items: center !important;
                justify-content: space-between !important;
                margin-bottom: 8px !important;
            }
            .adlens-header-left {
                display: flex !important;
                align-items: center !important;
                gap: 7px !important;
                flex-wrap: wrap !important;
            }
            .adlens-tier-badge {
                display: inline-flex !important;
                align-items: center !important;
                gap: 5px !important;
                font-size: 11px !important;
                font-weight: 750 !important;
                padding: 2.5px 8.5px !important;
                border-radius: 20px !important;
            }
            .adlens-badge-winner {
                background: rgba(16, 185, 129, 0.16) !important;
                border: 1px solid rgba(16, 185, 129, 0.35) !important;
                color: #34D399 !important;
            }
            .adlens-badge-tested {
                background: rgba(59, 130, 246, 0.16) !important;
                border: 1px solid rgba(59, 130, 246, 0.35) !important;
                color: #60A5FA !important;
            }
            .adlens-badge-new {
                background: rgba(245, 158, 11, 0.16) !important;
                border: 1px solid rgba(245, 158, 11, 0.35) !important;
                color: #FBBF24 !important;
            }
            .adlens-tier-dot {
                width: 6px !important;
                height: 6px !important;
                border-radius: 50% !important;
                background: currentColor !important;
            }
            .adlens-platforms-tag {
                background: #18202F !important;
                border: 1px solid rgba(255, 255, 255, 0.08) !important;
                color: #94A3B8 !important;
                font-size: 10px !important;
                font-weight: 600 !important;
                padding: 2px 7px !important;
                border-radius: 4px !important;
            }
            .adlens-lib-copy {
                background: #161B26 !important;
                border: 1px solid rgba(255, 255, 255, 0.1) !important;
                color: #94A3B8 !important;
                font-size: 10.5px !important;
                font-weight: 600 !important;
                padding: 2.5px 8px !important;
                border-radius: 6px !important;
                cursor: pointer !important;
                transition: all 0.15s ease !important;
            }
            .adlens-lib-copy:hover {
                border-color: #6366F1 !important;
                color: #FFFFFF !important;
                background: #1F2537 !important;
            }
            .adlens-metrics-grid {
                display: grid !important;
                grid-template-columns: 1.15fr 1fr 1fr !important;
                gap: 7px !important;
                margin-bottom: 9px !important;
            }
            .adlens-stat-box {
                background: #11151E !important;
                border: 1px solid rgba(255, 255, 255, 0.06) !important;
                border-radius: 10px !important;
                padding: 8px 10px !important;
                display: flex !important;
                flex-direction: column !important;
                gap: 1px !important;
            }
            .adlens-stat-spend {
                border-color: rgba(192, 132, 252, 0.35) !important;
                background: linear-gradient(135deg, rgba(192, 132, 252, 0.08) 0%, rgba(17, 21, 30, 0.95) 100%) !important;
            }
            .adlens-stat-label {
                font-size: 9.5px !important;
                font-weight: 700 !important;
                color: #8E95A2 !important;
                text-transform: uppercase !important;
                letter-spacing: 0.5px !important;
            }
            .adlens-stat-val {
                font-size: 15px !important;
                font-weight: 850 !important;
                color: #F8FAFC !important;
                line-height: 1.25 !important;
                margin-top: 1px !important;
            }
            .adlens-spend-gradient {
                color: #C084FC !important;
                background: linear-gradient(90deg, #C084FC 0%, #F472B6 100%) !important;
                -webkit-background-clip: text !important;
                -webkit-text-fill-color: transparent !important;
            }
            .adlens-stat-sub {
                font-size: 9.5px !important;
                color: #8E95A2 !important;
                margin-top: 1px !important;
            }
            .adlens-actions-row {
                display: flex !important;
                align-items: center !important;
                gap: 6px !important;
            }
            .adlens-btn {
                border: none !important;
                outline: none !important;
                font-family: inherit !important;
                font-size: 11px !important;
                font-weight: 700 !important;
                border-radius: 8px !important;
                padding: 7px 11px !important;
                cursor: pointer !important;
                display: inline-flex !important;
                align-items: center !important;
                justify-content: center !important;
                gap: 5px !important;
                transition: all 0.15s ease !important;
            }
            .adlens-btn-download {
                background: #18202E !important;
                border: 1px solid rgba(255, 255, 255, 0.12) !important;
                color: #E2E8F0 !important;
                flex: 1 !important;
            }
            .adlens-btn-download:hover {
                background: #232C3F !important;
                border-color: #38BDF8 !important;
                color: #38BDF8 !important;
            }
            .adlens-btn-save {
                background: linear-gradient(135deg, rgba(99, 102, 241, 0.3) 0%, rgba(168, 85, 247, 0.3) 100%) !important;
                border: 1px solid rgba(168, 85, 247, 0.45) !important;
                color: #E9D5FF !important;
                flex: 1 !important;
            }
            .adlens-btn-save:hover {
                background: linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%) !important;
                color: #FFFFFF !important;
                box-shadow: 0 2px 10px rgba(99, 102, 241, 0.45) !important;
            }
            .adlens-btn-toggle {
                background: #141923 !important;
                border: 1px solid rgba(255, 255, 255, 0.1) !important;
                color: #94A3B8 !important;
                padding: 7px 10px !important;
            }
            .adlens-btn-toggle:hover {
                background: #1D2332 !important;
                color: #FFFFFF !important;
            }
            .adlens-details-drawer {
                background: #0B0E14 !important;
                border: 1px solid rgba(255, 255, 255, 0.08) !important;
                border-radius: 10px !important;
                padding: 10px 12px !important;
                margin-top: 8px !important;
                display: flex !important;
                flex-direction: column !important;
                gap: 8px !important;
            }
            .adlens-drawer-grid {
                display: grid !important;
                grid-template-columns: 1fr 1fr !important;
                gap: 6px !important;
                font-size: 10.5px !important;
                color: #94A3B8 !important;
            }
            .adlens-drawer-grid span {
                color: #8E95A2 !important;
            }
            .adlens-drawer-grid b {
                color: #F8FAFC !important;
                margin-left: 4px !important;
            }
            .adlens-drawer-footer {
                padding-top: 6px !important;
                border-top: 1px solid rgba(255, 255, 255, 0.06) !important;
                display: flex !important;
                justify-content: flex-end !important;
            }
            .adlens-dashboard-link {
                font-size: 10.5px !important;
                font-weight: 700 !important;
                color: #A78BFA !important;
                text-decoration: none !important;
            }
            .adlens-dashboard-link:hover {
                text-decoration: underline !important;
            }
            .adlens-btn-transcribe {
                background: linear-gradient(135deg, rgba(236, 72, 153, 0.22) 0%, rgba(168, 85, 247, 0.28) 100%) !important;
                border: 1px solid rgba(236, 72, 153, 0.45) !important;
                color: #F472B6 !important;
                flex: 1 !important;
            }
            .adlens-btn-transcribe:hover {
                background: linear-gradient(135deg, #EC4899 0%, #A855F7 100%) !important;
                color: #FFFFFF !important;
                box-shadow: 0 2px 10px rgba(236, 72, 153, 0.45) !important;
            }
            .adlens-btn-transcribe.active {
                background: #EC4899 !important;
                color: #FFFFFF !important;
            }
            .adlens-transcript-drawer {
                background: #090C13 !important;
                border: 1px solid rgba(236, 72, 153, 0.35) !important;
                border-radius: 10px !important;
                padding: 11px 12px !important;
                margin-top: 8px !important;
                display: flex !important;
                flex-direction: column !important;
                gap: 8px !important;
                box-shadow: 0 6px 20px rgba(0, 0, 0, 0.5) !important;
                animation: adlensFadeIn 0.2s ease !important;
            }
            .adlens-transcript-header {
                display: flex !important;
                align-items: center !important;
                justify-content: space-between !important;
                border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;
                padding-bottom: 7px !important;
            }
            .adlens-transcript-title {
                font-size: 11.5px !important;
                font-weight: 800 !important;
                color: #F8FAFC !important;
                display: flex !important;
                align-items: center !important;
                gap: 6px !important;
            }
            .adlens-sarvam-badge {
                font-size: 9px !important;
                font-weight: 700 !important;
                color: #F472B6 !important;
                background: rgba(236, 72, 153, 0.15) !important;
                border: 1px solid rgba(236, 72, 153, 0.35) !important;
                padding: 2px 6px !important;
                border-radius: 10px !important;
                display: inline-flex !important;
                align-items: center !important;
                gap: 4px !important;
            }
            .adlens-sarvam-dot {
                width: 5px !important;
                height: 5px !important;
                border-radius: 50% !important;
                background: #F472B6 !important;
                box-shadow: 0 0 6px #F472B6 !important;
            }
            .adlens-transcript-close {
                background: none !important;
                border: none !important;
                color: #8E95A2 !important;
                cursor: pointer !important;
                font-size: 13px !important;
                padding: 0 4px !important;
                line-height: 1 !important;
            }
            .adlens-transcript-close:hover {
                color: #FFFFFF !important;
            }
            .adlens-transcript-loading {
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                gap: 8px !important;
                padding: 14px 10px !important;
                color: #F472B6 !important;
                font-size: 11px !important;
                font-weight: 600 !important;
            }
            .adlens-spinner {
                width: 14px !important;
                height: 14px !important;
                border: 2px solid rgba(236, 72, 153, 0.25) !important;
                border-top-color: #F472B6 !important;
                border-radius: 50% !important;
                animation: adlensSpin 0.7s linear infinite !important;
            }
            @keyframes adlensSpin {
                to { transform: rotate(360deg); }
            }
            .adlens-segment-item {
                background: #111520 !important;
                border: 1px solid rgba(255, 255, 255, 0.05) !important;
                border-left: 3px solid #8B5CF6 !important;
                border-radius: 6px !important;
                padding: 7px 9px !important;
                display: flex !important;
                flex-direction: column !important;
                gap: 3px !important;
            }
            .adlens-segment-hook { border-left-color: #EC4899 !important; }
            .adlens-segment-problem { border-left-color: #F59E0B !important; }
            .adlens-segment-mechanism { border-left-color: #38BDF8 !important; }
            .adlens-segment-cta { border-left-color: #10B981 !important; }
            .adlens-segment-meta {
                display: flex !important;
                align-items: center !important;
                justify-content: space-between !important;
                font-size: 9.5px !important;
                font-weight: 700 !important;
            }
            .adlens-segment-tag {
                text-transform: uppercase !important;
                letter-spacing: 0.5px !important;
            }
            .adlens-segment-hook .adlens-segment-tag { color: #EC4899 !important; }
            .adlens-segment-problem .adlens-segment-tag { color: #F59E0B !important; }
            .adlens-segment-mechanism .adlens-segment-tag { color: #38BDF8 !important; }
            .adlens-segment-cta .adlens-segment-tag { color: #10B981 !important; }
            .adlens-segment-time {
                color: #64748B !important;
                font-family: monospace !important;
                font-size: 9.5px !important;
            }
            .adlens-segment-text {
                font-size: 11px !important;
                line-height: 1.4 !important;
                color: #E2E8F0 !important;
            }
            .adlens-segment-notes {
                font-size: 9.5px !important;
                color: #8E95A2 !important;
                font-style: italic !important;
            }
            .adlens-transcript-copy-all {
                width: 100% !important;
                background: #18202E !important;
                border: 1px solid rgba(255, 255, 255, 0.1) !important;
                color: #F8FAFC !important;
                border-radius: 6px !important;
                padding: 6px 10px !important;
                font-size: 11px !important;
                font-weight: 700 !important;
                cursor: pointer !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                gap: 5px !important;
                transition: all 0.15s ease !important;
            }
            .adlens-transcript-copy-all:hover {
                background: #232C3F !important;
                border-color: #EC4899 !important;
                color: #F472B6 !important;
            }
        `;
        (document.head || document.documentElement).appendChild(style);
    }
    ensureStylesInjected();

    // ─── Active Vertical & Benchmark State ─────────────────────────────────────
    let activeVerticalKey = 'spiritual_coaching';
    let isCalibrated = true;
    let activeVerticalName = 'Spiritual / Coaching';
    let connectedDashboardUrl = 'http://localhost:3000';

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
            chrome.storage.local.get(['active_vertical', 'custom_benchmarks', 'dashboard_api_url'], (result) => {
                const targetKey = result.active_vertical || 'spiritual_coaching';
                if (result.dashboard_api_url) {
                    connectedDashboardUrl = result.dashboard_api_url;
                }

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
            if (area === 'local') {
                if (changes.dashboard_api_url) {
                    connectedDashboardUrl = changes.dashboard_api_url.newValue || 'http://localhost:3000';
                }
                if (changes.active_vertical || changes.custom_benchmarks) {
                    loadBenchmarksAndSync(() => {
                        recalculateAllAds();
                    });
                }
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

    // ─── Extract Media from Ad Card (Video or High-Res Image) ─────────────────
    function findCardMedia(cardEl) {
        if (!cardEl) return null;
        // 1. Check for video element
        const video = cardEl.querySelector('video');
        if (video) {
            let src = video.src || '';
            if (!src) {
                const s = video.querySelector('source');
                if (s && s.src) src = s.src;
            }
            if (src && !src.startsWith('blob:')) {
                return { type: 'video', url: src, ext: 'mp4' };
            }
        }
        // 2. High-res image
        const imgs = Array.from(cardEl.querySelectorAll('img'));
        let bestImg = null;
        let maxArea = 0;
        imgs.forEach(img => {
            const src = img.src || '';
            if (src.includes('profile') || src.includes('icon') || src.includes('emoji')) return;
            const w = img.naturalWidth || img.width || 0;
            const h = img.naturalHeight || img.height || 0;
            const area = w * h;
            if (area > maxArea && (w > 100 || area > 10000)) {
                maxArea = area;
                bestImg = img;
            }
        });
        if (bestImg && bestImg.src) {
            return { type: 'image', url: bestImg.src, ext: 'jpg' };
        }
        return null;
    }

    function triggerDownloadMedia(mediaObj, fallbackName = 'ad_creative') {
        if (!mediaObj || !mediaObj.url) {
            alert('No direct video or image file detected on this ad card.');
            return;
        }
        const filename = `${fallbackName}.${mediaObj.ext || 'mp4'}`;
        try {
            fetch(mediaObj.url)
                .then(r => r.blob())
                .then(blob => {
                    const blobUrl = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = blobUrl;
                    a.download = filename;
                    document.body.appendChild(a);
                    a.click();
                    setTimeout(() => {
                        document.body.removeChild(a);
                        URL.revokeObjectURL(blobUrl);
                    }, 2000);
                })
                .catch(() => {
                    const a = document.createElement('a');
                    a.href = mediaObj.url;
                    a.target = '_blank';
                    a.download = filename;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                });
        } catch (e) {
            window.open(mediaObj.url, '_blank');
        }
    }

    // ─── Save Single Ad to Dashboard ───────────────────────────────────────────
    async function saveSingleAdToDashboard(adData, btnEl) {
        const originalHtml = btnEl.innerHTML;
        btnEl.disabled = true;
        btnEl.innerHTML = '<span>⏳ Saving...</span>';

        const payload = {
            advertiserName: adData.advertiserName || 'Advertiser',
            vertical: activeVerticalKey || 'spiritual_coaching',
            ads: [{
                libraryId: adData.libraryId,
                daysActive: adData.perf.daysRunning,
                tier: adData.perf.tierKey === 'winner' ? 'Winner' : (adData.perf.tierKey === 'tested' ? 'Tested' : 'New'),
                format: adData.mediaType === 'video' ? 'Video' : 'Image',
                hook: adData.hookSnippet,
                bodyText: adData.hookSnippet,
                platforms: adData.platforms,
                spend: adData.perf.spend,
                views: adData.perf.views,
                clicks: adData.perf.clicks,
                cpcMid: adData.perf.cpcMid,
                estPurchases: adData.perf.estPurchases?.mid || 0,
                creativeCount: adData.creativeCount || 1
            }]
        };

        try {
            const res = await fetch(`${connectedDashboardUrl}/api/extension/ingest`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const json = await res.json();
            if (res.ok && json.message === 'success') {
                btnEl.innerHTML = '<span>✅ Saved!</span>';
                btnEl.style.background = '#059669';
                btnEl.style.borderColor = '#10B981';
                setTimeout(() => {
                    btnEl.disabled = false;
                    btnEl.innerHTML = originalHtml;
                    btnEl.style.background = '';
                    btnEl.style.borderColor = '';
                }, 2500);
            } else {
                throw new Error(json.error || 'Server error');
            }
        } catch (e) {
            btnEl.innerHTML = '<span>⚠️ Server offline</span>';
            setTimeout(() => {
                btnEl.disabled = false;
                btnEl.innerHTML = originalHtml;
            }, 2500);
        }
    }

    // ─── Build AdLens Overlay DOM on Each Card (AdLens Exact Feature Set) ───────
    function createLensCardElement(data) {
        const perf = data.perf;
        const tier = perf.tier;

        const container = document.createElement('div');
        container.className = 'bloomx-adlens-card spendo-lens-card';
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

        const confText = isCalibrated ? 'High confidence' : 'Medium confidence';

        let tierBadgeClass = 'adlens-badge-tested';
        let tierBadgeText = '⚡ Tested';
        if (perf.tierKey === 'winner') {
            tierBadgeClass = 'adlens-badge-winner';
            tierBadgeText = '🏆 Winner';
        } else if (perf.tierKey === 'test') {
            tierBadgeClass = 'adlens-badge-new';
            tierBadgeText = '🧪 New';
        }

        const platformsStr = Array.isArray(data.platforms) && data.platforms.length > 0 
            ? data.platforms.map(p => p === 'Facebook' ? 'FB' : (p === 'Instagram' ? 'IG' : p)).join(' · ')
            : 'FB · IG';

        container.innerHTML = `
            <!-- 1. Header with Duration & Status -->
            <div class="adlens-header-row">
                <div class="adlens-header-left">
                    <span class="adlens-tier-badge ${tierBadgeClass}">
                        <span class="adlens-tier-dot"></span>
                        ${tierBadgeText} · ${perf.daysRunning}d active
                    </span>
                    <span class="adlens-platforms-tag">${platformsStr}</span>
                </div>
                <div class="adlens-header-right">
                    ${data.libraryId ? `<span class="adlens-lib-copy" title="Click to copy Library ID" data-id="${data.libraryId}">📋 ID: ${data.libraryId}</span>` : ''}
                </div>
            </div>

            <!-- 2. Primary Spend & Impressions Grid (Instantly visible!) -->
            <div class="adlens-metrics-grid">
                <div class="adlens-stat-box adlens-stat-spend" title="Estimated cumulative ad spend">
                    <span class="adlens-stat-label">Est. Total Spend</span>
                    <span class="adlens-stat-val adlens-spend-gradient">${totalSpendMidStr}</span>
                    <span class="adlens-stat-sub">${daySpendRange}</span>
                </div>

                <div class="adlens-stat-box" title="Estimated Views & Impressions">
                    <span class="adlens-stat-label">Est. Views</span>
                    <span class="adlens-stat-val">${viewsCompactStr}</span>
                    <span class="adlens-stat-sub">${viewsPerDayStr}</span>
                </div>

                <div class="adlens-stat-box" title="Estimated conversions at benchmark CPA">
                    <span class="adlens-stat-label">Est. Orders</span>
                    <span class="adlens-stat-val">~${perf.estPurchases.mid.toLocaleString('en-IN')}</span>
                    <span class="adlens-stat-sub">CPC ~₹${perf.cpcMid.toFixed(1)}</span>
                </div>
            </div>

            <!-- 3. AdLens Action Toolbar -->
            <div class="adlens-actions-row">
                <button class="adlens-btn adlens-btn-download" type="button" title="Download video or image creative">
                    📥 Media
                </button>
                <button class="adlens-btn adlens-btn-transcribe" type="button" title="Transcribe Video Script with Sarvam AI">
                    🎙️ Script
                </button>
                <button class="adlens-btn adlens-btn-save" type="button" title="Save ad directly to your Competitor Dashboard">
                    ⭐ Save
                </button>
                <button class="adlens-btn adlens-btn-toggle" type="button" title="Toggle detailed math breakdown">
                    Details ▾
                </button>
            </div>

            <!-- 4. Collapsible Deep Details Drawer -->
            <div class="adlens-details-drawer" style="display: none;">
                <div class="adlens-drawer-grid">
                    <div class="adlens-drawer-item">
                        <span>Daily Spend:</span>
                        <b>${daySpendStr} / day</b>
                    </div>
                    <div class="adlens-drawer-item">
                        <span>Benchmark CPM:</span>
                        <b>₹${BENCHMARKS.metrics.cpm.mid}</b>
                    </div>
                    <div class="adlens-drawer-item">
                        <span>Benchmark CTR:</span>
                        <b>${BENCHMARKS.metrics.ctr_percent.mid}%</b>
                    </div>
                    <div class="adlens-drawer-item">
                        <span>Model:</span>
                        <b>${confText} · ${activeVerticalName}</b>
                    </div>
                </div>
                <div class="adlens-drawer-footer">
                    <a href="${connectedDashboardUrl}" target="_blank" class="adlens-dashboard-link">Open Full Competitor Intelligence Dashboard ↗</a>
                </div>
            </div>

            <!-- 5. Collapsible Sarvam AI Script Drawer -->
            <div class="adlens-transcript-drawer" style="display: none;">
                <div class="adlens-transcript-header">
                    <div class="adlens-transcript-title">
                        <span>🎙️ Video Script Breakdown</span>
                        <span class="adlens-sarvam-badge"><span class="adlens-sarvam-dot"></span> Sarvam AI (saaras:v3)</span>
                    </div>
                    <button class="adlens-transcript-close" type="button" title="Close Script Drawer">✕</button>
                </div>
                <div class="adlens-transcript-body"></div>
            </div>
        `;

        // Copy Library ID
        const copyEl = container.querySelector('.adlens-lib-copy');
        if (copyEl) {
            copyEl.addEventListener('click', (e) => {
                e.stopPropagation();
                const libId = copyEl.getAttribute('data-id');
                if (libId) {
                    navigator.clipboard.writeText(libId).then(() => {
                        const original = copyEl.textContent;
                        copyEl.textContent = 'Copied!';
                        setTimeout(() => { copyEl.textContent = original; }, 1200);
                    });
                }
            });
        }

        // Toggle Details Drawer
        const toggleBtn = container.querySelector('.adlens-btn-toggle');
        const drawerEl = container.querySelector('.adlens-details-drawer');
        if (toggleBtn && drawerEl) {
            toggleBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const isHidden = drawerEl.style.display === 'none';
                drawerEl.style.display = isHidden ? 'flex' : 'none';
                toggleBtn.innerHTML = isHidden ? 'Details ▴' : 'Details ▾';
            });
        }

        // Toggle & Fetch Sarvam AI Video Transcription
        const transcribeBtn = container.querySelector('.adlens-btn-transcribe');
        const transcriptDrawerEl = container.querySelector('.adlens-transcript-drawer');
        const transcriptBodyEl = container.querySelector('.adlens-transcript-body');
        const transcriptCloseBtn = container.querySelector('.adlens-transcript-close');

        if (transcriptCloseBtn && transcriptDrawerEl) {
            transcriptCloseBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                transcriptDrawerEl.style.display = 'none';
                if (transcribeBtn) transcribeBtn.classList.remove('active');
            });
        }

        let cachedTranscript = null;

        if (transcribeBtn && transcriptDrawerEl && transcriptBodyEl) {
            transcribeBtn.addEventListener('click', async (e) => {
                e.stopPropagation();

                // If already visible, toggle closed
                if (transcriptDrawerEl.style.display !== 'none') {
                    transcriptDrawerEl.style.display = 'none';
                    transcribeBtn.classList.remove('active');
                    return;
                }

                // If details drawer is open, close it to keep card clean
                if (drawerEl && drawerEl.style.display !== 'none') {
                    drawerEl.style.display = 'none';
                    if (toggleBtn) toggleBtn.innerHTML = 'Details ▾';
                }

                transcriptDrawerEl.style.display = 'flex';
                transcribeBtn.classList.add('active');

                // If already loaded once, keep displayed
                if (cachedTranscript) {
                    renderTranscriptContent(transcriptBodyEl, cachedTranscript);
                    return;
                }

                // Loading spinner
                transcriptBodyEl.innerHTML = `
                    <div class="adlens-transcript-loading">
                        <div class="adlens-spinner"></div>
                        <span>Sarvam AI (saaras:v3) transcribing ad audio & script...</span>
                    </div>
                `;

                try {
                    const mediaObj = findCardMedia(data.cardEl);
                    const mediaUrl = mediaObj && mediaObj.type === 'video' ? mediaObj.url : null;
                    const advertiserName = data.advertiserName || document.querySelector('h1')?.innerText || 'Competitor Ad';
                    const hook = data.hookSnippet || '';
                    const bodyText = (data.cardEl && data.cardEl.innerText) ? data.cardEl.innerText.substring(0, 300) : '';

                    const response = await fetch(`${connectedDashboardUrl}/api/transcribe/media`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            mediaUrl,
                            competitorName: advertiserName,
                            hook,
                            bodyText
                        })
                    });

                    if (!response.ok) {
                        throw new Error(`HTTP ${response.status}`);
                    }

                    const json = await response.json();
                    if (json.data) {
                        cachedTranscript = json.data;
                        renderTranscriptContent(transcriptBodyEl, cachedTranscript);
                    } else {
                        throw new Error('No transcription returned');
                    }
                } catch (err) {
                    transcriptBodyEl.innerHTML = `
                        <div style="font-size: 11px; color: #F87171; padding: 6px 0; line-height: 1.4;">
                            ⚠️ Transcription Notice: ${err.message}. Verify that your Competitor Dashboard is active at <b>${connectedDashboardUrl}</b>.
                        </div>
                    `;
                }
            });
        }

        // Download Creative
        const downloadBtn = container.querySelector('.adlens-btn-download');
        if (downloadBtn) {
            downloadBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const originalHtml = downloadBtn.innerHTML;
                const mediaObj = findCardMedia(data.cardEl);
                if (mediaObj) {
                    downloadBtn.innerHTML = '⏳ Grabbing...';
                    triggerDownloadMedia(mediaObj, `ad_${data.libraryId || 'creative'}`);
                    setTimeout(() => {
                        downloadBtn.innerHTML = '✅ Downloaded!';
                        setTimeout(() => { downloadBtn.innerHTML = originalHtml; }, 2000);
                    }, 800);
                } else {
                    alert('No direct video or image file detected on this ad card.');
                }
            });
        }

        // Save Single Ad
        const saveBtn = container.querySelector('.adlens-btn-save');
        if (saveBtn) {
            saveBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                saveSingleAdToDashboard(data, saveBtn);
            });
        }

        return container;
    }

    // Helper: Render structured transcript segments in the ad card
    function renderTranscriptContent(containerEl, transcriptData) {
        const segments = transcriptData.segments || [];
        const fullText = transcriptData.fullTranscript || segments.map(s => s.text).join(' ');

        let segmentsHtml = '';
        segments.forEach(seg => {
            const tagLower = (seg.tag || '').toLowerCase();
            let segClass = 'adlens-segment-hook';
            let segIcon = '🎯';
            if (tagLower.includes('problem')) {
                segClass = 'adlens-segment-problem';
                segIcon = '⚠️';
            } else if (tagLower.includes('mechanism') || tagLower.includes('solution')) {
                segClass = 'adlens-segment-mechanism';
                segIcon = '💡';
            } else if (tagLower.includes('cta') || tagLower.includes('call')) {
                segClass = 'adlens-segment-cta';
                segIcon = '🚀';
            }

            segmentsHtml += `
                <div class="adlens-segment-item ${segClass}">
                    <div class="adlens-segment-meta">
                        <span class="adlens-segment-tag">${segIcon} ${seg.tag || 'Script'}</span>
                        <span class="adlens-segment-time">${seg.start || '00:00'} – ${seg.end || '00:15'}</span>
                    </div>
                    <div class="adlens-segment-text">${seg.text || ''}</div>
                    ${seg.notes ? `<div class="adlens-segment-notes">💡 ${seg.notes}</div>` : ''}
                </div>
            `;
        });

        containerEl.innerHTML = `
            <div style="display: flex; flex-direction: column; gap: 6px;">
                ${segmentsHtml}
            </div>
            <button class="adlens-transcript-copy-all" type="button">
                📋 Copy Full Script
            </button>
        `;

        const copyBtn = containerEl.querySelector('.adlens-transcript-copy-all');
        if (copyBtn) {
            copyBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                navigator.clipboard.writeText(fullText).then(() => {
                    const originalText = copyBtn.innerHTML;
                    copyBtn.innerHTML = '✅ Copied Script!';
                    setTimeout(() => { copyBtn.innerHTML = originalText; }, 1800);
                });
            });
        }
    }

    // ─── Accurate Ad Card Element Boundary Isolation ──────────────────────────
    function findAdCardElement(targetEl) {
        if (!targetEl) return null;

        let el = targetEl;
        let cardCandidate = null;

        // Traverse UP from targetEl to find ONLY the boundary of this individual ad card
        while (el && el !== document.body && el !== document.documentElement) {
            // Stop climbing if we hit document-level landmark regions (Feed, Region, Main, Header)
            const role = el.getAttribute ? el.getAttribute('role') : null;
            if (role === 'region' || role === 'main' || role === 'navigation' || role === 'banner' || role === 'feed') {
                break;
            }

            const text = el.innerText || '';
            const matchCount = (text.match(/Library ID:/gi) || []).length;

            // If it contains more than 1 Library ID, we've climbed into the parent grid or feed!
            if (matchCount > 1) {
                break;
            }

            if (matchCount === 1) {
                const rect = el.getBoundingClientRect ? el.getBoundingClientRect() : null;
                // An individual ad card in Meta Ad Library is max ~750px wide. Anything >850px is a section wrapper.
                if (rect && rect.width > 850) {
                    break;
                }

                // Check if this container contains the media, action buttons, or has card-like dimensions
                const hasMediaOrLinks = el.querySelector('img, video, [role="button"], a[href*="/ads/library/"]') !== null;
                if (hasMediaOrLinks || (rect && rect.height >= 180)) {
                    cardCandidate = el;
                }
            }

            el = el.parentElement;
        }

        return cardCandidate;
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
                        advertiserName: ad.advertiserName,
                        hookSnippet: ad.hookSnippet,
                        cardEl: ad.element,
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
                    const response = await fetch(`${connectedDashboardUrl}/api/extension/ingest`, {
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
                            window.open(connectedDashboardUrl, '_blank');
                        };
                    } else {
                        throw new Error(json.error || 'Failed to ingest ads');
                    }
                } catch (err) {
                    console.error('[BloomX Ad Lens] Ingest error:', err);
                    btnSend.disabled = false;
                    btnSend.innerHTML = originalText;
                    showPanelToast(`⚠️ Could not reach ${connectedDashboardUrl}. Ensure your backend server is online!`, false);
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
            ensureStylesInjected();

            // Collect all unique candidate card containers
            const cardsFound = new Set();

            // Strategy 1: Find by Library ID text nodes
            const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
            let n;
            while ((n = walker.nextNode())) {
                if (n.nodeValue && n.nodeValue.includes('Library ID:')) {
                    const card = findAdCardElement(n.parentElement);
                    if (card) cardsFound.add(card);
                }
            }

            // Strategy 2: Find by See Ad Details links
            const detailLinks = document.querySelectorAll('a[href*="/ads/library/?id="], a[href*="id="]');
            detailLinks.forEach(link => {
                if (link.innerText && /See ad details|details/i.test(link.innerText)) {
                    const card = findAdCardElement(link);
                    if (card) cardsFound.add(card);
                }
            });

            cardsFound.forEach((card, idx) => {
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

                // Do not inject twice into the same card
                if (card.getAttribute('data-bloomx-injected') === 'true' || card.querySelector('.bloomx-adlens-card, .spendo-lens-card')) {
                    return;
                }

                const lensElement = createLensCardElement({
                    startDate,
                    status,
                    platforms,
                    creativeCount,
                    libraryId,
                    advertiserName,
                    hookSnippet,
                    perf,
                    cardEl: card
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
