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

            /* Accuracy & Budget Staged Overlays */
            .adlens-dates-unclear {
                opacity: 0.55 !important;
                filter: grayscale(0.7) !important;
                border-color: rgba(255, 255, 255, 0.08) !important;
            }
            .adlens-badge-unclear {
                background: rgba(148, 163, 184, 0.16) !important;
                border: 1px solid rgba(148, 163, 184, 0.35) !important;
                color: #94A3B8 !important;
            }
            .bloomx-budget-4grid {
                display: grid !important;
                grid-template-columns: 1fr 1fr !important;
                gap: 8px !important;
                margin-bottom: 10px !important;
            }
            .bloomx-budget-box {
                background: #0A0D14 !important;
                border: 1px solid rgba(255, 255, 255, 0.08) !important;
                border-radius: 10px !important;
                padding: 8px 10px !important;
                display: flex !important;
                flex-direction: column !important;
                gap: 2px !important;
            }
            .bloomx-budget-sub {
                font-size: 9.5px !important;
                font-weight: 750 !important;
                color: #8E95A2 !important;
                text-transform: uppercase !important;
                letter-spacing: 0.3px !important;
            }
            .bloomx-budget-val {
                font-size: 13.5px !important;
                font-weight: 850 !important;
                letter-spacing: -0.2px !important;
            }
            .bloomx-budget-hint {
                font-size: 9.5px !important;
                color: #64748B !important;
            }
            .bloomx-launch-strip {
                background: rgba(56, 189, 248, 0.08) !important;
                border: 1px solid rgba(56, 189, 248, 0.2) !important;
                border-radius: 8px !important;
                padding: 6px 10px !important;
                font-size: 11px !important;
                color: #E2E8F0 !important;
                margin-top: 6px !important;
            }
            .bloomx-custom-date-row {
                display: flex !important;
                gap: 6px !important;
                margin-top: 6px !important;
                align-items: center !important;
            }
            .bloomx-custom-date-row input[type="date"] {
                background: #0E1219 !important;
                border: 1px solid rgba(255, 255, 255, 0.15) !important;
                color: #F8FAFC !important;
                border-radius: 6px !important;
                padding: 3px 6px !important;
                font-size: 10px !important;
                flex: 1 !important;
            }
        `;
        (document.head || document.documentElement).appendChild(style);
    }
    ensureStylesInjected();

    // ─── Active Vertical & Benchmark State ─────────────────────────────────────
    let activeVerticalKey = 'spiritual_coaching';
    let isCalibrated = true;
    let activeVerticalName = 'Spiritual / Coaching';
    let activeK = 1550;
    let calibrationCount = 0;
    let connectedDashboardUrl = 'http://localhost:3000';

    let BENCHMARKS = {
        k: 1550,
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
        },
        eu_benchmarks: {
            cpm_low_eur: 4.0,
            cpm_mid_eur: 7.0,
            cpm_high_eur: 10.0,
            eur_to_inr_rate: 90.0,
            frequency: 1.9
        }
    };

    // ─── Apply Vertical Configuration ──────────────────────────────────────────
    function applyVerticalConfig(vKey, vData) {
        if (!vData) return;
        activeVerticalKey = vKey;
        activeVerticalName = vData.name || vKey;
        isCalibrated = vData.calibrated === true;
        activeK = Number(vData.k) || 1550;
        BENCHMARKS.k = activeK;

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

    function applyEuConfig(euData) {
        if (!euData) return;
        BENCHMARKS.eu_benchmarks = {
            cpm_low_eur: Number(euData.cpm_low_eur) || 4.0,
            cpm_mid_eur: Number(euData.cpm_mid_eur) || 7.0,
            cpm_high_eur: Number(euData.cpm_high_eur) || 10.0,
            eur_to_inr_rate: Number(euData.eur_to_inr_rate) || 90.0,
            frequency: Number(euData.frequency) || 1.9
        };
    }

    // ─── Sync with chrome.storage.local ────────────────────────────────────────
    function loadBenchmarksAndSync(cb) {
        if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
            chrome.storage.local.get(['active_vertical', 'custom_benchmarks', 'dashboard_api_url', 'eu_benchmarks', 'calibration_history'], (result) => {
                const targetKey = result.active_vertical || 'spiritual_coaching';
                if (result.dashboard_api_url) {
                    connectedDashboardUrl = result.dashboard_api_url;
                }
                if (result.eu_benchmarks) {
                    applyEuConfig(result.eu_benchmarks);
                }

                if (result.calibration_history && result.calibration_history[targetKey]) {
                    calibrationCount = result.calibration_history[targetKey].length;
                } else {
                    calibrationCount = 0;
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
                    if (data && data.eu_benchmarks) {
                        applyEuConfig(data.eu_benchmarks);
                    }
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
                    document.querySelectorAll('.adlens-dashboard-link').forEach(link => {
                        link.href = connectedDashboardUrl;
                    });
                }
                if (changes.active_vertical || changes.custom_benchmarks || changes.eu_benchmarks || changes.calibration_history) {
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

    // ─── Date Parsing Helper (Start & End Date for Active/Inactive Ads - Req 1) ───────
    const MONTH_MAP = {
        jan: 0, january: 0,
        feb: 1, february: 1,
        mar: 2, march: 2,
        apr: 3, april: 3,
        may: 4,
        jun: 5, june: 5,
        jul: 6, july: 6,
        aug: 7, august: 7,
        sep: 8, sept: 8, september: 8,
        oct: 9, october: 9,
        nov: 10, november: 10,
        dec: 11, december: 11
    };

    function parseDateString(str) {
        if (!str) return null;
        const clean = str.trim().replace(/^[•\s\-\–\—,]+|[•\s\-\–\—,]+$/g, '');

        // Pattern A: "10 Oct 2026" or "10 October, 2026"
        const dmy = clean.match(/^(\d{1,2})\s+([A-Za-z]+),?\s+(\d{4})$/);
        if (dmy) {
            const day = parseInt(dmy[1], 10);
            const mKey = dmy[2].toLowerCase();
            const year = parseInt(dmy[3], 10);
            if (MONTH_MAP[mKey] !== undefined) {
                return new Date(year, MONTH_MAP[mKey], day);
            }
        }

        // Pattern B: "Oct 10, 2026" or "October 10 2026"
        const mdy = clean.match(/^([A-Za-z]+)\s+(\d{1,2}),?\s+(\d{4})$/);
        if (mdy) {
            const mKey = mdy[1].toLowerCase();
            const day = parseInt(mdy[2], 10);
            const year = parseInt(mdy[3], 10);
            if (MONTH_MAP[mKey] !== undefined) {
                return new Date(year, MONTH_MAP[mKey], day);
            }
        }

        // Fallback standard parsing
        const d = new Date(clean);
        if (!isNaN(d.getTime())) return d;

        return null;
    }

    function parseStartAndEndDate(text, status) {
        if (!text) return { startDate: null, endDate: null, datesUnclear: (status === 'Inactive') };
        let startDate = null;
        let endDate = null;

        // Date snippet regex that matches either "10 Oct 2026" or "Oct 10, 2026"
        const dateSubPattern = '(?:\\d{1,2}\\s+[A-Za-z]{3,9},?\\s+\\d{4}|[A-Za-z]{3,9}\\s+\\d{1,2},?\\s+\\d{4})';

        // Pattern 1: Date Range: "10 Oct 2026 - 18 Oct 2026" or "Oct 10, 2026 – Oct 18, 2026" (with or without "Ran between")
        const rangeRegex = new RegExp(`(?:Ran between\\s+)?(${dateSubPattern})\\s*(?:–|-|—|to)\\s*(${dateSubPattern})`, 'i');
        const rangeMatch = text.match(rangeRegex);
        if (rangeMatch) {
            startDate = parseDateString(rangeMatch[1]);
            endDate = parseDateString(rangeMatch[2]);
        }

        // Pattern 2: "Started running on [Date]"
        if (!startDate) {
            const startRegex = new RegExp(`Started running on\\s+(${dateSubPattern})`, 'i');
            const startMatch = text.match(startRegex);
            if (startMatch) startDate = parseDateString(startMatch[1]);
        }

        // Pattern 3: Inactive with ended on [Date] or until [Date]
        if (!endDate) {
            const endRegex = new RegExp(`(?:ended on|until)\\s+(${dateSubPattern})`, 'i');
            const endMatch = text.match(endRegex);
            if (endMatch) endDate = parseDateString(endMatch[1]);
        }

        // Pattern 4: Fallback generic single date if start date still missing
        if (!startDate) {
            const anyDateMatch = text.match(new RegExp(`(${dateSubPattern})`, 'i'));
            if (anyDateMatch) startDate = parseDateString(anyDateMatch[1]);
        }

        // Requirement 1: If an ad is Inactive and no end date is found, mark it "Dates unclear"
        const datesUnclear = (status === 'Inactive' && !endDate);

        return { startDate, endDate, datesUnclear };
    }

    function parseStartDate(text) {
        return parseStartAndEndDate(text).startDate;
    }

    // ─── EU Transparency & Reach Detection (Requirement 7) ─────────────────────
    function parseNumWithMultiplier(numStr, multStr) {
        if (!numStr) return 0;
        let n = parseFloat(numStr.replace(/,/g, ''));
        if (isNaN(n)) return 0;
        const m = (multStr || '').toUpperCase();
        if (m === 'K') n *= 1000;
        else if (m === 'M') n *= 1000000;
        return Math.round(n);
    }

    function detectEuTransparency(cardEl, cardText) {
        if (!cardEl && !cardText) return null;
        const text = cardText || cardEl.innerText || '';
        const html = cardEl.innerHTML || '';

        const hasEuTag = /European Union transparency|EU transparency|Beneficiary and payer/i.test(text) ||
                         /European Union transparency|EU transparency/i.test(html);

        let reach = null;
        let reachStr = '';

        const rangeMatch = text.match(/(?:Reach:?\s*~?\s*)?([0-9,\.]+)\s*(K|M|k|m)?\s*(?:–|-)\s*([0-9,\.]+)\s*(K|M|k|m)?\s*(?:EU\s+)?reach/i) ||
                           text.match(/Reach:\s*~?\s*([0-9,\.]+)\s*(K|M|k|m)?\s*(?:–|-)\s*([0-9,\.]+)\s*(K|M|k|m)?/i);

        if (rangeMatch) {
            const num1 = parseNumWithMultiplier(rangeMatch[1], rangeMatch[2]);
            const num2 = parseNumWithMultiplier(rangeMatch[3], rangeMatch[4]);
            reach = Math.round((num1 + num2) / 2);
            reachStr = `${rangeMatch[1]}${rangeMatch[2] || ''}–${rangeMatch[3]}${rangeMatch[4] || ''}`;
        } else {
            const singleMatch = text.match(/(?:Reach:?\s*~?\s*)?([0-9,\.]+)\s*(K|M|k|m)?\s*(?:EU\s+)?reach/i) ||
                                text.match(/Reach:\s*~?\s*([0-9,\.]+)\s*(K|M|k|m)?/i);
            if (singleMatch) {
                reach = parseNumWithMultiplier(singleMatch[1], singleMatch[2]);
                reachStr = `${singleMatch[1]}${singleMatch[2] || ''}`;
            }
        }

        // Requirement 7: Remove 25,000 default. Only use EU mode when a real reach number is parsed.
        if (!reach || reach <= 0) return null;

        // Parse audience demographics breakdown if present
        const demographics = {
            age: [],
            gender: [],
            countries: []
        };

        const ageMatches = text.matchAll(/(18-24|25-34|35-44|45-54|55-64|65\+)\s*[:\-]?\s*(\d+%?)/gi);
        for (const m of ageMatches) {
            demographics.age.push(`${m[1]}: ${m[2].includes('%') ? m[2] : m[2] + '%'}`);
        }

        const genderMatches = text.matchAll(/(Men|Women|Male|Female|Non-binary)\s*[:\-]?\s*(\d+%?)/gi);
        for (const m of genderMatches) {
            demographics.gender.push(`${m[1]}: ${m[2].includes('%') ? m[2] : m[2] + '%'}`);
        }

        const euCountries = ['Germany', 'France', 'Italy', 'Spain', 'Poland', 'Netherlands', 'Belgium', 'Austria', 'Sweden', 'Ireland', 'Portugal', 'Greece', 'Czechia', 'Romania', 'Hungary'];
        euCountries.forEach(country => {
            const rgx = new RegExp(`${country}\\s*[:\\-]?\\s*(\\d+%?)`, 'i');
            const cm = text.match(rgx);
            if (cm) {
                demographics.countries.push(`${country}: ${cm[1].includes('%') ? cm[1] : cm[1] + '%'}`);
            } else if (text.includes(country)) {
                demographics.countries.push(country);
            }
        });

        return {
            hasEuTag,
            reach,
            reachStr,
            demographics
        };
    }

    // ─── Platform Detection (Requirement 9: Only from card's Platforms section) ─
    function detectPlatforms(cardEl) {
        const platforms = [];
        if (!cardEl) return ['Facebook'];

        // Requirement 9: Locate the dedicated "Platforms" section inside the card
        let platformsScope = null;
        const allElements = cardEl.querySelectorAll('div, span, section');
        for (const el of allElements) {
            if (/^Platforms$/i.test((el.textContent || '').trim())) {
                platformsScope = el.parentElement ? (el.parentElement.parentElement || el.parentElement) : el;
                break;
            }
        }

        const scope = platformsScope || cardEl;
        const iconNodes = scope.querySelectorAll('[aria-label], [title], [alt], [data-tooltip-content], img, svg');
        iconNodes.forEach(icon => {
            const descriptor = ((icon.getAttribute('aria-label') || '') + ' ' + (icon.getAttribute('title') || '') + ' ' + (icon.getAttribute('alt') || '') + ' ' + (icon.getAttribute('data-tooltip-content') || '')).toLowerCase();
            if (descriptor.includes('facebook') && !platforms.includes('Facebook')) platforms.push('Facebook');
            if (descriptor.includes('instagram') && !platforms.includes('Instagram')) platforms.push('Instagram');
            if (descriptor.includes('messenger') && !platforms.includes('Messenger')) platforms.push('Messenger');
            if (descriptor.includes('audience network') && !platforms.includes('Audience Network')) platforms.push('Audience Network');
        });

        // Fallback: Check if card header contains Instagram icon if not yet found
        if (!platforms.includes('Instagram')) {
            const anyIg = cardEl.querySelector('[aria-label*="Instagram" i], [title*="Instagram" i], [alt*="Instagram" i]');
            if (anyIg) platforms.push('Instagram');
        }

        return platforms.length > 0 ? platforms : ['Facebook'];
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

    // ─── Window Selection State (Requirement 5) ────────────────────────────────
    let activeWindowKey = '90d'; // '30d' | '90d' | 'all' | 'custom'
    let customWindowStart = null;
    let customWindowEnd = null;

    function getActiveWindowDates() {
        const today = new Date();
        today.setHours(23, 59, 59, 999);

        if (activeWindowKey === '30d') {
            const start = new Date(today);
            start.setDate(today.getDate() - 30);
            start.setHours(0, 0, 0, 0);
            return { start, end: today, label: 'Last 30 Days' };
        }
        if (activeWindowKey === '90d') {
            const start = new Date(today);
            start.setDate(today.getDate() - 90);
            start.setHours(0, 0, 0, 0);
            return { start, end: today, label: 'Last 90 Days' };
        }
        if (activeWindowKey === 'custom' && customWindowStart) {
            const start = new Date(customWindowStart);
            start.setHours(0, 0, 0, 0);
            const end = customWindowEnd ? new Date(customWindowEnd) : today;
            end.setHours(23, 59, 59, 999);
            return { start, end, label: 'Custom Window' };
        }
        return { start: null, end: today, label: 'Lifetime' };
    }

    // ─── Total Ads Count on Page Detection (e.g., "~4 results" or "4 results") ──
    function detectPageTotalAdsCount() {
        const textNodes = document.querySelectorAll('h1, h2, h3, div, span');
        for (const el of textNodes) {
            const txt = (el.innerText || '').trim();
            const match = txt.match(/^~?\s*(\d+)\s+results?$/i);
            if (match && match[1]) {
                const count = parseInt(match[1], 10);
                if (count > 0 && count < 10000) return count;
            }
        }
        return null;
    }

    // ─── Time-Aware Daily Spend Model Engine ──────────────────────────────────
    function computeBudgetFirstModel(adsList, windowDates, today = new Date()) {
        const ads = Array.isArray(adsList) ? adsList : Array.from(adsList || []);
        const todayMid = new Date(today);
        todayMid.setHours(0, 0, 0, 0);
        const todayEnd = new Date(today);
        todayEnd.setHours(23, 59, 59, 999);

        let activeCount = 0;
        let inactiveCount = 0;
        let unclearCount = 0;
        let winnerCount = 0;
        let testedCount = 0;
        let testCount = 0;
        let launchedLast7 = 0;
        let velocity = 0;

        const validAds = [];

        ads.forEach(ad => {
            if (ad.datesUnclear) {
                unclearCount++;
                return;
            }

            validAds.push(ad);

            if (ad.status === 'Active') {
                activeCount++;
            } else {
                inactiveCount++;
            }

            if (ad.startDate) {
                const daysAgo = Math.floor((todayMid.getTime() - ad.startDate.getTime()) / 86400000);
                if (daysAgo >= 0 && daysAgo <= 7) launchedLast7++;
                if (daysAgo >= 0 && daysAgo <= 30) velocity++;
            }
        });

        // Setup time normalization for each valid ad
        const oneDayMs = 86400000;
        let earliestStartMs = todayMid.getTime();

        validAds.forEach(a => {
            a._startMs = a.startDate ? new Date(a.startDate).setHours(0, 0, 0, 0) : todayMid.getTime();
            const eDate = (a.status === 'Active' || !a.endDate) ? todayMid : a.endDate;
            a._endMs = new Date(eDate).setHours(23, 59, 59, 999);

            // Real calendar days the ad ran
            const runDiff = Math.max(1, Math.round((a._endMs - a._startMs) / oneDayMs));
            a.daysRunning = runDiff;

            // Tier classification based on actual runtime
            if (a.daysRunning > 30) {
                a.tierKey = 'winner';
                winnerCount++;
            } else if (a.daysRunning >= 7) {
                a.tierKey = 'tested';
                testedCount++;
            } else {
                a.tierKey = 'test';
                testCount++;
            }

            // Creative duplicate factor (max 1.5x)
            const count = typeof a.creativeCount === 'number' && a.creativeCount > 1 ? a.creativeCount : 1;
            a.creativeMultiplier = count > 1 ? Math.min(1 + 0.1 * (count - 1), 1.5) : 1.0;

            // Initialize time-aware accumulators
            a.lifetimeSpendMid = 0;
            a.windowSpendMid = 0;
            a.daysInWindow = 0;
            a.todaySpendMid = 0;
            a.todaySharePercent = 0;
            a.todayWeight = 0;

            if (a._startMs < earliestStartMs) {
                earliestStartMs = a._startMs;
            }
        });

        // Date window boundaries for panel "Spend in window"
        const winStartMs = windowDates?.start ? new Date(windowDates.start).setHours(0, 0, 0, 0) : null;
        const winEndMs = windowDates?.end ? new Date(windowDates.end).setHours(23, 59, 59, 999) : todayEnd.getTime();

        let totalWindowBudgetMid = 0;
        let windowDaysWithAdsCount = 0;
        const dailyHistory = [];

        // FOR EACH CALENDAR DAY d (from earliest ad start date to today):
        for (let curMs = earliestStartMs; curMs <= todayMid.getTime(); curMs += oneDayMs) {
            const curDate = new Date(curMs);

            // 1. running(d) = ads where start <= d <= end (Active ads: end = today; Inactive: their end date; skip "dates unclear" ads)
            const runningD = [];
            for (let i = 0; i < validAds.length; i++) {
                const a = validAds[i];
                if (a._startMs <= curMs && curMs <= a._endMs) {
                    runningD.push(a);
                }
            }

            const Nd = runningD.length;
            if (Nd === 0) continue;

            // 3. budget(d) = k * N(d)^0.6 (k from active vertical, no velocity factor, no page total results)
            const budgetD = activeK * Math.pow(Nd, 0.6);

            // 4. Ad age on that day: age = d - ad start date.
            // weight(ad, d) = 0.5 if age < 3 (learning phase), 1 if age 3-6, 3 if age 7-30, 10 if age > 30.
            // Multiply by the creative-duplicate factor (max 1.5).
            let sumWeightsD = 0;
            const dayWeights = [];

            for (let i = 0; i < Nd; i++) {
                const a = runningD[i];
                const age = Math.max(0, Math.floor((curMs - a._startMs) / oneDayMs));
                let baseWeight = 0.5;
                if (age > 30) {
                    baseWeight = 10;
                } else if (age >= 7) {
                    baseWeight = 3;
                } else if (age >= 3) {
                    baseWeight = 1;
                } else {
                    baseWeight = 0.5; // age < 3 (learning phase)
                }

                const w = baseWeight * a.creativeMultiplier;
                dayWeights.push({ ad: a, w, age, baseWeight });
                sumWeightsD += w;
            }

            const isToday = (curMs === todayMid.getTime());
            const inWindow = (!winStartMs || curMs >= winStartMs) && (curMs <= winEndMs);

            if (inWindow) {
                windowDaysWithAdsCount++;
                totalWindowBudgetMid += budgetD;
            }

            const dayLogAds = [];

            // 5. spend(ad, d) = budget(d) * weight(ad, d) / sum of weights of all ads in running(d)
            for (let i = 0; i < Nd; i++) {
                const { ad: a, w, age } = dayWeights[i];
                const share = sumWeightsD > 0 ? (w / sumWeightsD) : (1 / Nd);
                const spendD = budgetD * share;

                a.lifetimeSpendMid += spendD;

                if (inWindow) {
                    a.windowSpendMid += spendD;
                    a.daysInWindow++;
                }

                if (isToday) {
                    a.todaySpendMid = Math.round(spendD);
                    a.todaySharePercent = share * 100;
                    a.todayWeight = w;
                }

                dayLogAds.push({
                    libraryId: a.libraryId,
                    hook: a.hookSnippet,
                    age,
                    weight: w,
                    sharePct: share * 100,
                    spendMid: Math.round(spendD)
                });
            }

            dailyHistory.push({
                curMs,
                date: curDate,
                dateStr: curDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
                Nd,
                budgetD: Math.round(budgetD),
                sumWeightsD,
                ads: dayLogAds
            });
        }

        // Panel "Advertiser daily budget" = budget(today) using ONLY currently Active ads
        const activeAdsToday = validAds.filter(a => a.status === 'Active' && a._startMs <= todayMid.getTime() && todayMid.getTime() <= a._endMs);
        const N_activeToday = activeAdsToday.length;
        const todayActiveBudgetMid = N_activeToday > 0 ? Math.round(activeK * Math.pow(N_activeToday, 0.6)) : 0;
        const todayActiveBudgetLow = Math.round(todayActiveBudgetMid * 0.6);
        const todayActiveBudgetHigh = Math.round(todayActiveBudgetMid * 1.6);
        const estMonthlyBudget = todayActiveBudgetMid * 30;

        // Panel "Spend in window" = sum of budget(d) for days in selected window where N(d) >= 1
        const totalWindowSpendMid = Math.round(totalWindowBudgetMid);
        const totalWindowSpendLow = Math.round(totalWindowSpendMid * 0.6);
        const totalWindowSpendHigh = Math.round(totalWindowSpendMid * 1.6);

        // EU Mode check & formatting for each ad
        const cpm = BENCHMARKS.metrics.cpm;
        const ctr = BENCHMARKS.metrics.ctr_percent;
        const costPerPurchase = BENCHMARKS.metrics.cost_per_purchase.target || 480;

        validAds.forEach(a => {
            // Card "Est. total spend" = sum of spend(ad, d) over ALL days the ad ran
            let displaySpendMid = Math.round(a.lifetimeSpendMid);
            let displaySpendLow = Math.round(displaySpendMid * 0.6);
            let displaySpendHigh = Math.round(displaySpendMid * 1.6);

            // Card "Daily" = spend(ad, today) for active ads; for inactive ads show their average daily spend
            let dailySpendMid = 0;
            if (a.status === 'Active') {
                dailySpendMid = a.todaySpendMid || Math.round(a.lifetimeSpendMid / Math.max(1, a.daysRunning));
            } else {
                dailySpendMid = Math.round(a.lifetimeSpendMid / Math.max(1, a.daysRunning));
            }
            const dailySpendLow = Math.round(dailySpendMid * 0.6);
            const dailySpendHigh = Math.round(dailySpendMid * 1.6);

            // Preserve EU Real-Reach Mode if parsed
            if (a.euData && typeof a.euData.reach === 'number' && a.euData.reach > 0) {
                const reach = a.euData.reach;
                const impressions = Math.round(reach * 1.9);
                const euBenchmarks = BENCHMARKS.eu_benchmarks || { cpm_mid_eur: 7.0, eur_to_inr_rate: 90.0 };
                const cpmMidEur = euBenchmarks.cpm_mid_eur || 7.0;
                const eurRate = euBenchmarks.eur_to_inr_rate || 90.0;
                const spendMidEur = (impressions / 1000) * cpmMidEur;

                displaySpendMid = Math.round(spendMidEur * eurRate);
                displaySpendLow = Math.round(displaySpendMid * 0.85);
                displaySpendHigh = Math.round(displaySpendMid * 1.15);
                dailySpendMid = Math.round(displaySpendMid / Math.max(1, a.daysRunning));
                a.viewsMid = impressions;
                a.isEuMode = true;
            } else {
                a.viewsMid = Math.round((displaySpendMid / (cpm.mid || 226)) * 1000);
                a.isEuMode = false;
            }

            a.clicksMid = Math.round(a.viewsMid * ((ctr.mid || 1.22) / 100));
            a.cpcMid = a.clicksMid > 0 ? (displaySpendMid / a.clicksMid) : 0;
            a.estPurchasesMid = Math.round(displaySpendMid / costPerPurchase);

            const avgDaily = Math.round(displaySpendMid / Math.max(1, a.daysRunning));
            const shareZ = a.status === 'Active' ? (a.todaySharePercent || 0).toFixed(1) : '0';
            const budgetB = formatIndianNumber(todayActiveBudgetMid, false);

            // Card tooltip: "Ran X days · avg ₹Y/day · today's share Z% of ₹B/day (N ads live)"
            const tooltipStr = (a.status === 'Active' && N_activeToday > 0)
                ? `Ran ${a.daysRunning} days · avg ₹${avgDaily.toLocaleString('en-IN')}/day · today's share ${shareZ}% of ₹${budgetB}/day (${N_activeToday} ads live)`
                : `Ran ${a.daysRunning} days (Inactive) · avg ₹${avgDaily.toLocaleString('en-IN')}/day · Lifetime total: ${formatIndianNumber(displaySpendMid, true)}`;

            const tooltips = {
                daily: tooltipStr,
                spend: tooltipStr,
                views: `Spend (${formatIndianNumber(displaySpendMid, true)}) ÷ ₹${cpm.mid} CPM × 1,000 = ${formatCompactViews(a.viewsMid)} views`,
                orders: `Spend (${formatIndianNumber(displaySpendMid, true)}) ÷ ₹${costPerPurchase} Target CPA = ~${a.estPurchasesMid} orders`
            };

            a.perf = {
                daysRunning: a.daysRunning,
                tierKey: a.tierKey,
                tier: BENCHMARKS.daily_spend_tiers[a.tierKey] || { low: dailySpendLow, mid: dailySpendMid, high: dailySpendHigh },
                creativeMultiplier: a.creativeMultiplier,
                isEuMode: a.isEuMode,
                euData: a.euData,
                datesUnclear: false,
                dailyBudgetMid: todayActiveBudgetMid,
                dailySpendMid,
                dailySpendLow,
                dailySpendHigh,
                totalSpendMid: displaySpendMid,
                totalSpendLow: displaySpendLow,
                totalSpendHigh: displaySpendHigh,
                lifetimeSpendMid: displaySpendMid,
                todaySharePercent: a.todaySharePercent,
                adSharePercent: a.todaySharePercent,
                todayActiveCount: N_activeToday,
                confidenceText: isCalibrated ? `Calibrated · k = ${activeK}` : `Uncalibrated · k = ${activeK}`,
                confidenceBadgeClass: isCalibrated ? 'adlens-badge-med-conf' : 'adlens-badge-low-conf',
                confidenceType: isCalibrated ? 'calibrated' : 'uncalibrated',
                spend: { low: displaySpendLow, mid: displaySpendMid, high: displaySpendHigh },
                windowSpend: { low: Math.round(a.windowSpendMid * 0.6), mid: Math.round(a.windowSpendMid), high: Math.round(a.windowSpendMid * 1.6) },
                views: { low: Math.round(a.viewsMid * 0.8), mid: a.viewsMid, high: Math.round(a.viewsMid * 1.2) },
                clicks: { low: Math.round(a.clicksMid * 0.8), mid: a.clicksMid, high: Math.round(a.clicksMid * 1.2) },
                cpcMid: a.cpcMid,
                estPurchases: { low: Math.round(a.estPurchasesMid * 0.8), mid: a.estPurchasesMid, high: Math.round(a.estPurchasesMid * 1.2) },
                tooltips
            };
        });

        const totalWindowViewsMid = Math.round((totalWindowSpendMid / (cpm.mid || 226)) * 1000);
        const totalWindowPurchasesMid = Math.round(totalWindowSpendMid / costPerPurchase);

        return {
            validAds,
            activeCount,
            inactiveCount,
            unclearCount,
            winnerCount,
            testedCount,
            testCount,
            launchedLast7,
            velocity,
            todayActiveBudgetMid,
            todayActiveBudgetLow,
            todayActiveBudgetHigh,
            dailyBudgetMid: todayActiveBudgetMid,
            dailyBudgetLow: todayActiveBudgetLow,
            dailyBudgetHigh: todayActiveBudgetHigh,
            estMonthlyBudget,
            activeDaysCount: windowDaysWithAdsCount,
            totalWindowSpendMid,
            totalWindowSpendLow,
            totalWindowSpendHigh,
            totalWindowViewsMid,
            totalWindowPurchasesMid,
            dailyHistory
        };
    }

    // ─── Dual-Mode Performance Calculation (1. EU Real-Reach, 2. India Budget-First) ───
    function calculatePerformance(startDate, endDate = null, status = 'Active', creativeCount = 1, euData = null, datesUnclear = false, today = new Date()) {
        // Requirement 1: If inactive and no end date, mark Dates unclear, 0 spend, excluded
        if (datesUnclear) {
            return {
                daysRunning: 0,
                tierKey: 'unclear',
                tier: { label: 'Dates Unclear', low: 0, mid: 0, high: 0 },
                creativeMultiplier: 1.0,
                isEuMode: false,
                euData: null,
                datesUnclear: true,
                dailyBudgetMid: 0,
                dailySpendMid: 0,
                adSharePercent: 0,
                confidenceText: 'Dates unclear',
                confidenceBadgeClass: 'adlens-badge-unclear',
                confidenceType: 'unclear',
                spend: { low: 0, mid: 0, high: 0 },
                views: { low: 0, mid: 0, high: 0 },
                clicks: { low: 0, mid: 0, high: 0 },
                cpcMid: 0,
                estPurchases: { low: 0, mid: 0, high: 0 },
                tooltips: {
                    spend: 'Dates unclear for Inactive ad (no end date found). Excluded from calculations.'
                }
            };
        }

        let daysRunning = 1;
        if (status === 'Inactive' && startDate && endDate) {
            const diffMs = endDate.getTime() - startDate.getTime();
            daysRunning = Math.max(1, Math.floor(diffMs / 86400000));
        } else if (startDate) {
            const diffMs = today.getTime() - startDate.getTime();
            daysRunning = Math.max(1, Math.floor(diffMs / 86400000));
        }

        let tierKey = 'test';
        if (daysRunning < 7) {
            tierKey = 'test';
        } else if (daysRunning <= 30) {
            tierKey = 'tested';
        } else {
            tierKey = 'winner';
        }

        const tier = BENCHMARKS.daily_spend_tiers[tierKey];
        const count = typeof creativeCount === 'number' && creativeCount > 1 ? creativeCount : 1;
        const creativeMultiplier = count > 1 ? Math.min(1 + 0.1 * (count - 1), 1.5) : 1.0;

        // Base placeholders until computeBudgetFirstModel updates with advertiser pool
        return {
            daysRunning,
            tierKey,
            tier,
            creativeMultiplier,
            isEuMode: false,
            euData,
            datesUnclear: false,
            dailyBudgetMid: 0,
            dailySpendMid: 0,
            adSharePercent: 0,
            confidenceText: isCalibrated ? `Calibrated · k = ${activeK}` : `Uncalibrated · k = ${activeK}`,
            confidenceBadgeClass: isCalibrated ? 'adlens-badge-med-conf' : 'adlens-badge-low-conf',
            confidenceType: isCalibrated ? 'calibrated' : 'uncalibrated',
            spend: { low: 0, mid: 0, high: 0 },
            views: { low: 0, mid: 0, high: 0 },
            clicks: { low: 0, mid: 0, high: 0 },
            cpcMid: 0,
            estPurchases: { low: 0, mid: 0, high: 0 },
            tooltips: {}
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
            if (src) {
                return { type: 'video', url: src, poster: video.poster || null, ext: 'mp4' };
            }
            if (video.poster) {
                return { type: 'image', url: video.poster, ext: 'png' };
            }
        }
        // 2. High-res image
        const imgs = Array.from(cardEl.querySelectorAll('img'));
        let bestImg = null;
        let maxArea = 0;
        imgs.forEach(img => {
            const src = img.src || '';
            if (src.includes('profile') || src.includes('icon') || src.includes('emoji') || src.startsWith('data:image')) return;
            const w = img.naturalWidth || img.width || 0;
            const h = img.naturalHeight || img.height || 0;
            const area = w * h;
            if (area > maxArea && (w > 80 || area > 6000)) {
                maxArea = area;
                bestImg = img;
            }
        });
        if (bestImg && bestImg.src) {
            return { type: 'image', url: bestImg.src, ext: 'png' };
        }
        return null;
    }

    function triggerDownloadMedia(mediaObj, fallbackName = 'ad_creative') {
        if (!mediaObj || !mediaObj.url) {
            alert('No direct video or image file detected on this ad card.');
            return;
        }
        const filename = `${fallbackName}.${mediaObj.ext || 'mp4'}`;

        // Strategy 1: Chrome Extension Native Download API via background script
        if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.sendMessage) {
            chrome.runtime.sendMessage({
                action: 'download_media',
                url: mediaObj.url,
                filename: filename
            }, (response) => {
                if (response && response.success) {
                    console.log('[BloomX Ad Lens] Native download started:', filename);
                    return;
                }
                // Fallback to in-page blob / direct trigger if background worker unavailable
                fallbackDownloadTrigger(mediaObj.url, filename);
            });
        } else {
            fallbackDownloadTrigger(mediaObj.url, filename);
        }
    }

    function fallbackDownloadTrigger(url, filename) {
        try {
            fetch(url)
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
                    a.href = url;
                    a.target = '_blank';
                    a.download = filename;
                    document.body.appendChild(a);
                    a.click();
                    setTimeout(() => { document.body.removeChild(a); }, 1500);
                });
        } catch (e) {
            window.open(url, '_blank');
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

        const isDatesUnclear = !!perf.datesUnclear;
        if (isDatesUnclear) {
            container.classList.add('adlens-dates-unclear');
            if (data.cardEl) data.cardEl.classList.add('adlens-dates-unclear');
        }

        const totalSpendMidStr = isDatesUnclear ? '—' : formatIndianNumber(perf.spend.mid, true);
        const daySpendVal = Math.round(perf.dailySpendMid || (perf.spend.mid / Math.max(1, perf.daysRunning)));
        const daySpendStr = isDatesUnclear ? '—' : `₹${daySpendVal.toLocaleString('en-IN')}/day`;
        const sharePct = (typeof perf.adSharePercent === 'number' && perf.adSharePercent > 0) ? perf.adSharePercent : 0;
        const sharePctStr = sharePct > 0 ? `${sharePct.toFixed(1)}%` : '0%';
        const daySpendRange = isDatesUnclear 
            ? 'Excluded from totals' 
            : (data.status === 'Active' 
                ? `${sharePctStr} share of ₹${formatIndianNumber(perf.dailyBudgetMid || 0, false)}/d` 
                : 'avg daily spend');
        const viewsCompactStr = isDatesUnclear ? '—' : formatCompactViews(perf.views.mid);
        const viewsPerDay = Math.round(perf.views.mid / Math.max(1, perf.daysRunning));
        const viewsPerDayStr = isDatesUnclear ? '—' : `${formatCompactViews(viewsPerDay)}/day`;

        // Badge selection: Requirement 1 (Real EU reach, Dates unclear, Estimated Medium/Low confidence)
        let badgeHtml = '';
        if (isDatesUnclear) {
            badgeHtml = `<span class="adlens-tier-badge adlens-badge-unclear" title="Dates unclear for Inactive ad (no end date found). Excluded from calculations."><span class="adlens-tier-dot" style="background: #94A3B8;"></span>Dates unclear</span>`;
        } else if (perf.isEuMode) {
            badgeHtml = `<span class="adlens-tier-badge adlens-badge-eu" title="Verified via European Union Ad Transparency data"><span class="adlens-tier-dot"></span>Real EU reach · High confidence</span>`;
        } else {
            const tierEmoji = perf.tierKey === 'winner' ? '🔥' : (perf.tierKey === 'tested' ? '⚡' : '🧪');
            const tierTitle = perf.tierKey === 'winner' ? 'Proven Winner' : (perf.tierKey === 'tested' ? 'Tested' : 'New Test');
            badgeHtml = `<span class="adlens-tier-badge ${perf.confidenceBadgeClass}" title="${perf.confidenceText}"><span class="adlens-tier-dot"></span>${tierEmoji} ${tierTitle}</span>`;
        }

        const durationTag = isDatesUnclear ? 'Dates unclear (Inactive)' : `${perf.daysRunning}d ${data.status === 'Inactive' ? 'ran (Inactive)' : 'active'}`;

        const platformsStr = Array.isArray(data.platforms) && data.platforms.length > 0 
            ? data.platforms.map(p => p === 'Facebook' ? 'FB' : (p === 'Instagram' ? 'IG' : p)).join(' · ')
            : 'FB · IG';

        const spendSubStr = isDatesUnclear
            ? 'Dates unclear (Excluded)'
            : (perf.isEuMode 
                ? `🇪🇺 Real Reach: ~${formatCompactViews(perf.euData.reach)}`
                : `Range: ${formatIndianNumber(perf.spend.low, true)}–${formatIndianNumber(perf.spend.high, true)}`);

        // EU Audience Breakdown HTML (Requirement 1)
        let euAudienceHtml = '';
        if (perf.isEuMode && perf.euData && perf.euData.demographics) {
            const demo = perf.euData.demographics;
            const hasData = (demo.gender && demo.gender.length > 0) || (demo.age && demo.age.length > 0) || (demo.countries && demo.countries.length > 0);
            if (hasData) {
                euAudienceHtml = `
                    <div class="adlens-eu-audience">
                        <div class="adlens-eu-audience-title">
                            <span>🇪🇺 EU Audience Breakdown (Transparency)</span>
                            <span style="font-weight: 500; text-transform: none; color: #94A3B8;">Real EU Data</span>
                        </div>
                        ${demo.gender.length > 0 ? `
                            <div class="adlens-eu-breakdown-row">
                                <span style="color: #94A3B8; font-size: 9.5px; width: 48px;">Gender:</span>
                                ${demo.gender.map(g => `<span class="adlens-eu-pill">${g}</span>`).join('')}
                            </div>
                        ` : ''}
                        ${demo.age.length > 0 ? `
                            <div class="adlens-eu-breakdown-row">
                                <span style="color: #94A3B8; font-size: 9.5px; width: 48px;">Age:</span>
                                ${demo.age.map(a => `<span class="adlens-eu-pill">${a}</span>`).join('')}
                            </div>
                        ` : ''}
                        ${demo.countries.length > 0 ? `
                            <div class="adlens-eu-breakdown-row">
                                <span style="color: #94A3B8; font-size: 9.5px; width: 48px;">Countries:</span>
                                ${demo.countries.slice(0, 5).map(c => `<span class="adlens-eu-pill">${c}</span>`).join('')}
                            </div>
                        ` : ''}
                    </div>
                `;
            }
        }

        container.innerHTML = `
            <!-- 1. Header with Duration & Status -->
            <div class="adlens-header-row">
                <div class="adlens-header-left">
                    ${badgeHtml}
                    ${data.advertiserName ? `<span class="adlens-platforms-tag" title="Advertiser">👤 ${data.advertiserName}</span>` : ''}
                    <span class="adlens-platforms-tag">${durationTag}</span>
                    <span class="adlens-platforms-tag">${platformsStr}</span>
                </div>
                <div class="adlens-header-right">
                    ${data.libraryId ? `<span class="adlens-lib-copy" title="Click to copy Library ID" data-id="${data.libraryId}">📋 ID: ${data.libraryId}</span>` : ''}
                </div>
            </div>

            <!-- 2. Primary Spend & Impressions Grid with Tooltips (Requirement 4) -->
            <div class="adlens-metrics-grid">
                <div class="adlens-stat-box adlens-stat-spend" title="${perf.tooltips?.daily || ''}">
                    <span class="adlens-stat-label">
                        Est. Total Spend
                        <span class="adlens-calc-trigger" title="How calculated">?
                            <span class="adlens-calc-tooltip">${perf.tooltips?.spend || perf.tooltips?.daily || 'Estimated ad spend: Daily budget × weight share × days running'}</span>
                        </span>
                    </span>
                    <span class="adlens-stat-val adlens-spend-gradient">${totalSpendMidStr}</span>
                    <span class="adlens-stat-sub">${isDatesUnclear ? 'Dates unclear (Excluded)' : (perf.isEuMode ? `🇪🇺 Real Reach: ~${formatCompactViews(perf.euData.reach)}` : (data.status === 'Active' ? `₹${daySpendVal.toLocaleString('en-IN')}/d (${sharePctStr} share)` : `₹${daySpendVal.toLocaleString('en-IN')}/d (avg)`))}</span>
                </div>

                <div class="adlens-stat-box">
                    <span class="adlens-stat-label">
                        Est. Views
                        <span class="adlens-calc-trigger" title="How calculated">?
                            <span class="adlens-calc-tooltip">${perf.tooltips?.views || 'Estimated impressions based on CPM'}</span>
                        </span>
                    </span>
                    <span class="adlens-stat-val">${viewsCompactStr}</span>
                    <span class="adlens-stat-sub">${viewsPerDayStr}</span>
                </div>

                <div class="adlens-stat-box">
                    <span class="adlens-stat-label">
                        Est. Orders
                        <span class="adlens-calc-trigger" title="How calculated">?
                            <span class="adlens-calc-tooltip">${perf.tooltips?.orders || 'Estimated conversions at target CPA'}</span>
                        </span>
                    </span>
                    <span class="adlens-stat-val">~${perf.estPurchases.mid.toLocaleString('en-IN')}</span>
                    <span class="adlens-stat-sub">CPC ~₹${perf.cpcMid.toFixed(1)}</span>
                </div>
            </div>

            ${euAudienceHtml}

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
                        <span>Daily Spend:
                            <span class="adlens-calc-trigger" title="How calculated">?
                                <span class="adlens-calc-tooltip">${perf.tooltips?.daily || 'Daily spend of this ad'}</span>
                            </span>
                        </span>
                        <b>${daySpendStr} (${daySpendRange})</b>
                    </div>
                    <div class="adlens-drawer-item">
                        <span>Total Ad Spend (${perf.daysRunning}d):
                            <span class="adlens-calc-trigger" title="How calculated">?
                                <span class="adlens-calc-tooltip">${perf.tooltips?.spend || 'Total spend = sum of daily spend over all days ran'}</span>
                            </span>
                        </span>
                        <b>${totalSpendMidStr} (sum over all days ran)</b>
                    </div>
                    <div class="adlens-drawer-item">
                        <span>Advertiser Daily Budget (Today):</span>
                        <b>₹${formatIndianNumber(perf.dailyBudgetMid || 0, false)}/day (${perf.todayActiveCount || 0} active ads, k = ${activeK.toLocaleString('en-IN')}${isCalibrated ? ', Calibrated' : ''})</b>
                    </div>
                    <div class="adlens-drawer-item">
                        <span>Ad Age & Lifecycle:</span>
                        <b>${perf.daysRunning}d ran (${perf.tierKey === 'winner' ? '🔥 Winner (>30d, w=10)' : (perf.tierKey === 'tested' ? '⚡ Tested (7-30d, w=3)' : (perf.daysRunning < 3 ? '🧪 Learning (<3d, w=0.5)' : '🧪 Test (3-6d, w=1)'))}${perf.creativeMultiplier > 1 ? ` · ×${perf.creativeMultiplier.toFixed(2)} duplicates` : ''})</b>
                    </div>
                    <div class="adlens-drawer-item">
                        <span>Estimation Mode:</span>
                        <b>${perf.isEuMode ? '🇪🇺 EU Real-Reach' : '🇮🇳 Time-Aware Daily Spend Model'}</b>
                    </div>
                    <div class="adlens-drawer-item">
                        <span>Vertical Benchmark:</span>
                        <b>${activeVerticalName} (₹${BENCHMARKS.metrics.cpm.mid} CPM)</b>
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

        // Dashboard Link dynamic click sync
        const dashboardLinkEl = container.querySelector('.adlens-dashboard-link');
        if (dashboardLinkEl) {
            dashboardLinkEl.addEventListener('click', () => {
                dashboardLinkEl.href = connectedDashboardUrl;
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
        const windowDates = getActiveWindowDates();
        const model = computeBudgetFirstModel(Array.from(detectedAdsMap.values()), windowDates);

        detectedAdsMap.forEach((ad, key) => {
            if (ad.element) {
                const oldLens = ad.element.querySelector('.spendo-lens-card, .bloomx-lens-card, .bloomx-adlens-card');
                if (oldLens) {
                    const newLens = createLensCardElement({
                        startDate: ad.startDate,
                        endDate: ad.endDate,
                        status: ad.status,
                        platforms: ad.platforms,
                        creativeCount: ad.creativeCount,
                        libraryId: ad.libraryId,
                        advertiserName: ad.advertiserName,
                        hookSnippet: ad.hookSnippet,
                        cardEl: ad.element,
                        perf: ad.perf
                    });
                    ad.element.replaceChild(newLens, oldLens);
                }
            }
        });

        if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
            chrome.storage.local.set({ last_detected_page_spend: model.totalWindowSpendMid });
        }

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

        const windowDates = getActiveWindowDates();
        // Compute Budget-First Model across all detected ads for this advertiser
        const model = computeBudgetFirstModel(ads, windowDates);
        const validAds = model.validAds;
        const advertiserName = ads[0]?.advertiserName || 'Advertiser';

        const sortedWinners = [...validAds]
            .sort((a, b) => b.daysRunning - a.daysRunning)
            .slice(0, 5);

        if (isPanelMinimized) {
            panel.innerHTML = `
                <div class="bloomx-panel-mini" id="bloomx-panel-expand">
                    <span class="bloomx-mini-dot"></span>
                    <span class="bloomx-mini-text">⚡ BloomX Ad Lens (<b>${validAds.length}</b>)</span>
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
            ? `<div class="bloomx-panel-warning-pill">⚠️ Low Confidence (Uncalibrated)</div>`
            : `<div class="bloomx-panel-calibrated-pill">✅ Calibrated Budget Model</div>`;

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

                <!-- Requirement 5: k value + number of calibrations used -->
                <div style="margin-top: 6px; padding: 6px 10px; background: rgba(255, 255, 255, 0.04); border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.08); display: flex; justify-content: space-between; align-items: center; font-size: 10.5px;">
                    <span style="color: #94A3B8;">Spend constant:</span>
                    <span style="color: ${isCalibrated ? '#4ADE80' : '#FBBF24'}; font-weight: 750;">
                        k = <b>${activeK.toLocaleString('en-IN')}</b> · ${calibrationCount > 0 ? `Calibrated on ${calibrationCount} advertiser${calibrationCount === 1 ? '' : 's'}` : (isCalibrated ? 'Calibrated vertical' : 'Uncalibrated vertical')}
                    </span>
                </div>

                <!-- Requirement 1 & 5: Top Advertiser Budget 4 Numbers -->
                <div class="bloomx-budget-4grid" style="margin-top: 8px;">
                    <div class="bloomx-budget-box">
                        <div class="bloomx-budget-sub">Daily Budget</div>
                        <div class="bloomx-budget-val" style="color: #4ADE80;">${formatIndianNumber(model.dailyBudgetMid, true)}</div>
                        <div class="bloomx-budget-hint">${formatIndianNumber(model.dailyBudgetLow, true)} – ${formatIndianNumber(model.dailyBudgetHigh, true)}</div>
                    </div>
                    <div class="bloomx-budget-box">
                        <div class="bloomx-budget-sub">Est. Monthly</div>
                        <div class="bloomx-budget-val" style="color: #A3E635;">${formatIndianNumber(model.estMonthlyBudget, true)}</div>
                        <div class="bloomx-budget-hint">Daily × 30 days</div>
                    </div>
                    <div class="bloomx-budget-box">
                        <div class="bloomx-budget-sub">Spend in Window</div>
                        <div class="bloomx-budget-val" style="color: #C084FC;">${formatIndianNumber(model.totalWindowSpendMid, true)}</div>
                        <div class="bloomx-budget-hint">${windowDates.label} (${model.activeDaysCount} active days)</div>
                    </div>
                    <div class="bloomx-budget-box">
                        <div class="bloomx-budget-sub">Active / Winners</div>
                        <div class="bloomx-budget-val" style="color: #60A5FA;">${model.activeCount} / ${model.winnerCount}</div>
                        <div class="bloomx-budget-hint">Lifecycle ratio</div>
                    </div>
                </div>

                <!-- New Ads Launched Strip -->
                <div class="bloomx-launch-strip">
                    🚀 <b>New ads launched:</b> <span style="color:#4ADE80; font-weight:800;">${model.launchedLast7}</span> in last 7d · <span style="color:#60A5FA; font-weight:800;">${model.velocity}</span> in last 30d
                </div>

                <!-- Requirement 5: Date Window Selector -->
                <div class="bloomx-panel-card" style="margin-top: 8px;">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <span class="bloomx-vertical-label" style="font-size:11px; font-weight:700;">📅 Date Window:</span>
                        <select id="bloomx-panel-window-select" class="bloomx-panel-select" style="min-width: 140px;">
                            <option value="90d" ${activeWindowKey === '90d' ? 'selected' : ''}>Last 90 days (Default)</option>
                            <option value="30d" ${activeWindowKey === '30d' ? 'selected' : ''}>Last 30 days</option>
                            <option value="all" ${activeWindowKey === 'all' ? 'selected' : ''}>Lifetime</option>
                            <option value="custom" ${activeWindowKey === 'custom' ? 'selected' : ''}>Custom Range...</option>
                        </select>
                    </div>
                    <div id="bloomx-custom-date-container" class="bloomx-custom-date-row" style="display: ${activeWindowKey === 'custom' ? 'flex' : 'none'};">
                        <input type="date" id="bloomx-custom-start" value="${customWindowStart ? customWindowStart.toISOString().split('T')[0] : ''}" />
                        <span style="color:#64748B; font-size:10px;">to</span>
                        <input type="date" id="bloomx-custom-end" value="${customWindowEnd ? customWindowEnd.toISOString().split('T')[0] : ''}" />
                        <button id="bloomx-custom-apply" style="background:#6366F1; color:#fff; border:none; border-radius:5px; padding:3px 8px; font-size:10px; cursor:pointer; font-weight:700;">Apply</button>
                    </div>
                </div>

                <!-- Ad Counts Summary -->
                <div class="bloomx-panel-card">
                    <div class="bloomx-panel-label">Advertiser Ads On Screen</div>
                    <div class="bloomx-status-row">
                        <span class="bloomx-status-pill bloomx-active-pill">🟢 ${model.activeCount} Active</span>
                        ${model.inactiveCount > 0 ? `<span class="bloomx-status-pill bloomx-inactive-pill">⚪ ${model.inactiveCount} Inactive</span>` : ''}
                        ${model.unclearCount > 0 ? `<span class="bloomx-status-pill" style="background:rgba(100,116,139,0.2);color:#94A3B8;border:1px solid #475569;" title="Inactive ads with no end date are excluded from totals">⚠️ ${model.unclearCount} Dates Unclear</span>` : ''}
                        <span class="bloomx-total-pill">${validAds.length} Counted</span>
                    </div>
                    <div class="bloomx-tiers-pills-row">
                        <span class="bloomx-tier-chip chip-winner">Winner: <b>${model.winnerCount}</b></span>
                        <span class="bloomx-tier-chip chip-tested">Tested: <b>${model.testedCount}</b></span>
                        <span class="bloomx-tier-chip chip-test">Test: <b>${model.testCount}</b></span>
                    </div>
                </div>

                <!-- Financial Totals (Window specified on every total) -->
                <div class="bloomx-panel-card bloomx-card-highlight">
                    <div class="bloomx-panel-label">Spend (${windowDates.label})</div>
                    <div class="bloomx-spend-total">
                        ${formatIndianNumber(model.totalWindowSpendLow, true)} – ${formatIndianNumber(model.totalWindowSpendHigh, true)}
                    </div>
                    <div class="bloomx-spend-mid-sub">
                        Mid: <b>${formatIndianNumber(model.totalWindowSpendMid, true)}</b> est. (${windowDates.label})
                    </div>

                    <div class="bloomx-summary-stats-grid">
                        <div class="bloomx-stat-box">
                            <div class="bloomx-stat-sub">Views (${windowDates.label})</div>
                            <div class="bloomx-stat-main">${formatIndianNumber(model.totalWindowViewsMid, false)}</div>
                        </div>
                        <div class="bloomx-stat-box">
                            <div class="bloomx-stat-sub">Purchases (${windowDates.label})</div>
                            <div class="bloomx-stat-main">~${model.totalWindowPurchasesMid.toLocaleString('en-IN')}</div>
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

                <!-- Debug Toggle: Show Calculation (Last 10 Days) -->
                <div class="bloomx-panel-card" style="margin-top: 8px;">
                    <button id="bloomx-btn-calc-toggle" type="button" style="background: rgba(99, 102, 241, 0.12); border: 1px solid rgba(99, 102, 241, 0.35); color: #818CF8; border-radius: 6px; padding: 6px 10px; width: 100%; font-size: 11px; font-weight: 700; cursor: pointer; display: flex; justify-content: space-between; align-items: center; text-align: left; transition: all 0.15s ease;">
                        <span>🔍 Show calculation (Last 10 Days)</span>
                        <span id="bloomx-calc-toggle-icon">▾</span>
                    </button>
                    <div id="bloomx-calc-debug-drawer" style="display: none; margin-top: 8px; font-size: 10px; max-height: 260px; overflow-y: auto; background: rgba(15, 23, 42, 0.85); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 8px; padding: 8px;">
                        ${(model.dailyHistory && model.dailyHistory.length > 0) ? model.dailyHistory.slice(-10).reverse().map(dh => `
                            <div style="margin-bottom: 8px; padding-bottom: 6px; border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
                                <div style="display: flex; justify-content: space-between; color: #F1F5F9; font-weight: 700; margin-bottom: 4px;">
                                    <span>📅 ${dh.dateStr}</span>
                                    <span style="color: #4ADE80;">₹${dh.budgetD.toLocaleString('en-IN')} (N=${dh.Nd})</span>
                                </div>
                                <div style="color: #94A3B8; font-size: 9px; margin-bottom: 3px;">
                                    Budget = ${activeK} × ${dh.Nd}^0.6 · Sum of Weights = ${dh.sumWeightsD.toFixed(1)}
                                </div>
                                ${dh.ads.map(adInfo => `
                                    <div style="display: flex; justify-content: space-between; padding: 2px 0; color: #CBD5E1; font-size: 9.5px;">
                                        <span title="${adInfo.hook}" style="max-width: 140px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                                            ${adInfo.libraryId ? `ID: ${adInfo.libraryId}` : adInfo.hook}
                                        </span>
                                        <span>Age: ${adInfo.age}d (w=${adInfo.weight.toFixed(1)}) · <b>${adInfo.sharePct.toFixed(1)}%</b> (₹${adInfo.spendMid.toLocaleString('en-IN')})</span>
                                    </div>
                                `).join('')}
                            </div>
                        `).join('') : '<div style="color: #94A3B8; text-align: center; padding: 6px;">No daily history recorded.</div>'}
                    </div>
                </div>

                <!-- Action Buttons -->
                <button class="bloomx-btn-send-dashboard" id="bloomx-btn-send-dashboard">
                    🚀 Send to BloomX Dashboard
                </button>
                <button class="bloomx-btn-export" id="bloomx-btn-export-csv">
                    📥 Export CSV (${validAds.length} Ads)
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

        // Toggle "Show calculation" Debug Drawer
        const btnCalcToggle = panel.querySelector('#bloomx-btn-calc-toggle');
        const calcDrawer = panel.querySelector('#bloomx-calc-debug-drawer');
        const calcIcon = panel.querySelector('#bloomx-calc-toggle-icon');
        if (btnCalcToggle && calcDrawer) {
            btnCalcToggle.addEventListener('click', () => {
                const isHidden = calcDrawer.style.display === 'none';
                calcDrawer.style.display = isHidden ? 'block' : 'none';
                if (calcIcon) calcIcon.textContent = isHidden ? '▴' : '▾';
            });
        }

        // Date window selector listener
        const winSelectEl = panel.querySelector('#bloomx-panel-window-select');
        const customContainerEl = panel.querySelector('#bloomx-custom-date-container');
        if (winSelectEl) {
            winSelectEl.addEventListener('change', (e) => {
                activeWindowKey = e.target.value;
                if (activeWindowKey === 'custom') {
                    if (customContainerEl) customContainerEl.style.display = 'flex';
                } else {
                    recalculateAllAds();
                }
            });
        }

        const customApplyBtn = panel.querySelector('#bloomx-custom-apply');
        if (customApplyBtn) {
            customApplyBtn.addEventListener('click', () => {
                const sVal = panel.querySelector('#bloomx-custom-start').value;
                const eVal = panel.querySelector('#bloomx-custom-end').value;
                if (sVal) customWindowStart = new Date(sVal);
                if (eVal) customWindowEnd = new Date(eVal);
                recalculateAllAds();
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

                const advertiserName = validAds[0]?.advertiserName || 'Advertiser';
                const payload = {
                    advertiserName,
                    vertical: activeVerticalKey,
                    ads: validAds.map(a => ({
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
                        showPanelToast(`🎉 Successfully sent ${validAds.length} ads for "${advertiserName}" to your Competitor Dashboard!`);
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
            'Lifecycle Stage',
            'Budget Share (%)',
            'Daily Spend Mid (INR)',
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
            escapeCSV(ad.perf?.tierKey === 'winner' ? 'Winner' : (ad.perf?.tierKey === 'tested' ? 'Tested' : 'Test')),
            escapeCSV(ad.perf?.adSharePercent ? ad.perf.adSharePercent.toFixed(1) + '%' : '0%'),
            escapeCSV(ad.perf?.dailySpendMid || 0),
            escapeCSV(ad.perf?.spend?.low || 0),
            escapeCSV(ad.perf?.spend?.mid || 0),
            escapeCSV(ad.perf?.spend?.high || 0),
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

            let newCardsCount = 0;
            cardsFound.forEach((card) => {
                const cardText = card.innerText || '';
                // Requirement 3: Skip if Library ID cannot be read (never use fake card_index IDs)
                const libraryId = detectLibraryId(cardText);
                if (!libraryId) return;

                // Performance - skip if already tracked and injected
                if (detectedAdsMap.has(libraryId) && card.getAttribute('data-bloomx-injected') === 'true') {
                    return;
                }

                const status = detectStatus(cardText);
                const { startDate, endDate, datesUnclear } = parseStartAndEndDate(cardText, status);
                const platforms = detectPlatforms(card);
                const creativeCount = detectCreativeCount(cardText);
                const advertiserName = detectAdvertiserName(card);
                const hookSnippet = detectHookSnippet(cardText);
                const euData = detectEuTransparency(card, cardText);
                const perf = calculatePerformance(startDate, endDate, status, creativeCount, euData, datesUnclear);

                detectedAdsMap.set(libraryId, {
                    element: card,
                    libraryId,
                    advertiserName,
                    startDate,
                    endDate,
                    datesUnclear,
                    euData,
                    daysRunning: perf.daysRunning,
                    status,
                    platforms,
                    creativeCount,
                    hookSnippet,
                    tierKey: perf.tierKey,
                    tier: perf.tier,
                    perf
                });
                newCardsCount++;
            });

            if (newCardsCount > 0 || detectedAdsMap.size > 0) {
                // Compute Budget-First Model across all detected ads
                const windowDates = getActiveWindowDates();
                const model = computeBudgetFirstModel(Array.from(detectedAdsMap.values()), windowDates);

                detectedAdsMap.forEach((ad) => {
                    const card = ad.element;
                    if (!card) return;

                    const existingLens = card.querySelector('.bloomx-adlens-card, .spendo-lens-card');
                    const lensElement = createLensCardElement({
                        startDate: ad.startDate,
                        endDate: ad.endDate,
                        status: ad.status,
                        platforms: ad.platforms,
                        creativeCount: ad.creativeCount,
                        libraryId: ad.libraryId,
                        advertiserName: ad.advertiserName,
                        hookSnippet: ad.hookSnippet,
                        perf: ad.perf,
                        cardEl: card
                    });

                    if (existingLens) {
                        card.replaceChild(lensElement, existingLens);
                    } else {
                        card.setAttribute('data-bloomx-injected', 'true');
                        card.insertBefore(lensElement, card.firstChild);
                    }
                });

                if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
                    chrome.storage.local.set({ last_detected_page_spend: model.totalWindowSpendMid });
                }
            }

            renderFloatingPanel();

        } catch (err) {
            console.error('[BloomX Ad Lens] Scan error:', err);
        } finally {
            isScanning = false;
        }
    }

    // ─── Debounced Observer for Infinite Scroll (Requirement 10) ───────────────
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

    // ─── Reset on Navigation & Advertiser Change (Requirement 2) ───────────────
    let lastKnownUrl = window.location.href;
    let lastAdvertiserKey = getAdvertiserKeyFromUrl(window.location.href);

    function getAdvertiserKeyFromUrl(urlStr) {
        try {
            const u = new URL(urlStr, window.location.origin);
            const pageId = u.searchParams.get('view_all_page_id') || u.searchParams.get('page_id');
            if (pageId) return 'page_' + pageId;
            const q = u.searchParams.get('q');
            if (q) return 'q_' + q.toLowerCase().trim();
            const id = u.searchParams.get('id');
            if (id) return 'id_' + id;
            return u.pathname + u.search;
        } catch (e) {
            return urlStr;
        }
    }

    function resetOnNavigation() {
        detectedAdsMap.clear();
        // Remove all injected lens overlays
        document.querySelectorAll('.bloomx-adlens-card, .spendo-lens-card').forEach(el => el.remove());
        document.querySelectorAll('[data-bloomx-injected]').forEach(el => el.removeAttribute('data-bloomx-injected'));
        if (floatingPanelEl) {
            floatingPanelEl.style.display = 'none';
        }
        scheduleScan();
    }

    function checkNavigationChange() {
        const currentUrl = window.location.href;
        const currentAdvertiserKey = getAdvertiserKeyFromUrl(currentUrl);

        if (currentUrl !== lastKnownUrl || currentAdvertiserKey !== lastAdvertiserKey) {
            lastKnownUrl = currentUrl;
            lastAdvertiserKey = currentAdvertiserKey;
            resetOnNavigation();
        }
    }

    // Watch location.href every 1s and listen to popstate / hashchange
    setInterval(checkNavigationChange, 1000);
    window.addEventListener('popstate', checkNavigationChange);
    window.addEventListener('hashchange', checkNavigationChange);

    // ─── Calibration Message Listener (Requirement 4 & 8) ──────────────────────
    if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.onMessage) {
        chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
            if (request.action === 'COMPUTE_CALIBRATION') {
                const calibStart = request.startDate ? new Date(request.startDate) : null;
                const calibEnd = request.endDate ? new Date(request.endDate) : new Date();

                const ads = Array.from(detectedAdsMap.values());
                if (ads.length === 0) {
                    sendResponse({
                        success: false,
                        error: 'No ads detected on this page yet. Please scroll the Facebook Ad Library first.'
                    });
                    return true;
                }

                // Run Budget-First Model for the requested calibration date window
                const model = computeBudgetFirstModel(ads, { start: calibStart, end: calibEnd });
                const advertiserName = ads[0]?.advertiserName || 'Current Advertiser';

                sendResponse({
                    success: true,
                    advertiserName,
                    estimatedSpend: model.totalWindowSpendMid,
                    dailyBudgetMid: model.dailyBudgetMid,
                    activeDaysCount: model.activeDaysCount,
                    adCount: model.validAds.length,
                    currentK: activeK,
                    calibrationCount: calibrationCount,
                    isCalibrated: isCalibrated
                });
                return true;
            }
        });
    }

    console.log('%c[BloomX Ad Lens]%c Active with Popup Sync, Staged Spend & Navigation Watcher', 'color: #6366f1; font-weight: bold;', 'color: #10b981;');
})();
