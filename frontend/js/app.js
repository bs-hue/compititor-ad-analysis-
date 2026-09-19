// ─── Application State ─────────────────────────────────────────────────────
let state = {
  clients: [],
  activeClientId: 1,
  clientData: {
    client: {},
    competitors: [],
    ads: []
  },
  currentProductTab: 'ads', // 'ads' | 'hooks' | 'angles' | 'saved'
  filters: {
    competitor: 'all',
    tier: 'all',
    format: 'all',
    search: ''
  },
  savedSwipe: JSON.parse(localStorage.getItem('saved_swipe_library') || '[]'),
  activeHookModalAd: null,
  activeAnalyzeAd: null
};

// ─── Initialization ────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', async () => {
  document.getElementById('lastUpdatedLabel').textContent = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  await checkApifyEngineStatus();
  await loadClientsList();
  setupSearchInputEvent();
  updateSavedTabBadgeCount();
});

// ─── API Loaders ───────────────────────────────────────────────────────────
async function loadClientsList() {
  try {
    const res = await fetch('/api/clients');
    const result = await res.json();
    if (result.message === 'success' && result.data.length > 0) {
      state.clients = result.data;
      if (!state.clients.find(c => c.id === state.activeClientId)) {
        state.activeClientId = state.clients[0].id;
      }
      renderClientHorizontalTabs();
      await loadClientOverviewData(state.activeClientId);
    }
  } catch (e) {
    console.error('Error loading clients:', e);
  }
}

async function loadClientOverviewData(clientId) {
  state.activeClientId = clientId;
  renderClientHorizontalTabs();

  try {
    const res = await fetch(`/api/clients/${clientId}/overview`);
    const result = await res.json();
    if (result.message === 'success') {
      state.clientData = result.data;
      
      // Reset competitor filter on client switch
      state.filters.competitor = 'all';

      // Update UI components
      renderMetricsCards();
      renderMarketIntelligenceCards();
      renderTopAdsSection();
      renderCompetitorFilterPills();
      renderActiveProductTab();
    }
  } catch (e) {
    console.error('Error loading client overview:', e);
  }
}

function refreshClientData() {
  fireToast('Refreshing live competitor intelligence...');
  loadClientOverviewData(state.activeClientId);
}

// ─── 1. CLIENT HORIZONTAL TABS ─────────────────────────────────────────────
function renderClientHorizontalTabs() {
  const container = document.getElementById('clientTabsNavContainer');
  
  const tabsHtml = state.clients.map(c => `
    <button class="client-nav-tab ${c.id === state.activeClientId ? 'active' : ''}" onclick="selectClientWorkspaceTab(${c.id})">
      <span>${c.name}</span>
      <span class="client-tab-count">${c.competitorCount || 0} competitors</span>
    </button>
  `).join('');

  container.innerHTML = tabsHtml + `
    <button class="btn-add-client-tab" onclick="openAddClientModal()">+ Add Client</button>
  `;
}

function selectClientWorkspaceTab(clientId) {
  loadClientOverviewData(clientId);
}

// ─── 2. SUMMARY METRICS CARDS ──────────────────────────────────────────────
function renderMetricsCards() {
  const comps = state.clientData.competitors || [];
  const ads = state.clientData.ads || [];

  const totalActiveAds = comps.reduce((acc, curr) => acc + (curr.activeAdCount || 0), 0) || ads.length;
  const maxDays = Math.max(0, ...comps.map(comp => comp.maxDaysActive || 0), ...ads.map(ad => ad.daysActive || 0));
  const anglesSet = new Set(ads.map(a => a.angle || 'Direct Offer'));

  document.getElementById('metricCompCount').textContent = comps.length;
  document.getElementById('metricAdsCount').textContent = totalActiveAds;
  document.getElementById('metricMaxDays').textContent = `${maxDays}d`;
  document.getElementById('metricAngleCount').textContent = anglesSet.size;

  // Tab count badges
  document.getElementById('badgeTabAds').textContent = ads.length;
  document.getElementById('badgeTabHooks').textContent = ads.length;
  document.getElementById('badgeTabAngles').textContent = anglesSet.size;
}

// ─── 3. MARKET INTELLIGENCE CARDS ──────────────────────────────────────────
function renderMarketIntelligenceCards() {
  const ads = state.clientData.ads || [];
  const container = document.getElementById('intelCardsGrid');

  if (ads.length === 0) {
    container.innerHTML = `<div style="grid-column: 1/-1; font-size: 15px; color: var(--text-muted);">No ad signals detected yet for this client workspace.</div>`;
    return;
  }

  const insights = [];

  // Insight 1: Offer Pattern
  const freeAds = ads.filter(a => (a.hook || '').toLowerCase().includes('free') || (a.bodyText || '').toLowerCase().includes('free') || (a.hook || '').toLowerCase().includes('₹1'));
  if (freeAds.length > 0) {
    insights.push({
      tag: "OFFER PATTERN",
      text: `"Free entry-point offers appear across ${freeAds.length} tracked competitor variations."`,
      evidence: `${freeAds.length} ads detected`,
      searchQuery: 'free'
    });
  }

  // Insight 2: Format Pattern
  const videoAds = ads.filter(a => a.format === 'Video');
  if (videoAds.length > 0) {
    const pct = Math.round((videoAds.length / ads.length) * 100);
    insights.push({
      tag: "FORMAT PATTERN",
      text: `"Talking-head and video creatives account for ${pct}% of long-running ads."`,
      evidence: `${videoAds.length} videos detected`,
      formatFilter: 'Video'
    });
  }

  // Insight 3: Longevity Signal
  const sorted = [...ads].sort((a, b) => (b.daysActive || 0) - (a.daysActive || 0));
  if (sorted.length > 0) {
    const top = sorted[0];
    insights.push({
      tag: "LONGEVITY SIGNAL",
      text: `"${top.competitorName}'s longest-running ad has remained active for ${top.daysActive} days."`,
      evidence: `Potential messaging signal`,
      competitorFilter: top.competitorName
    });
  }

  container.innerHTML = insights.map(item => `
    <div class="intel-card">
      <div>
        <div class="intel-tag">${item.tag}</div>
        <div class="intel-text" style="margin-top: 10px;">${item.text}</div>
      </div>
      <div class="intel-footer">
        <span class="intel-evidence">${item.evidence}</span>
        <button class="btn-link" onclick="handleInsightCardClick('${item.competitorFilter || ''}', '${item.formatFilter || ''}', '${item.searchQuery || ''}')">View Ads →</button>
      </div>
    </div>
  `).join('');
}

function handleInsightCardClick(comp, format, search) {
  switchProductTab('ads');
  if (comp) setFilter('competitor', comp);
  if (format) setFilter('format', format);
  if (search) {
    state.filters.search = search;
    document.getElementById('filterSearchInput').value = search;
    applyActiveFiltersAndRender();
  }
}

// ─── 4. TOP ADS TO STUDY (CURATED CARDS) ───────────────────────────────────
function renderTopAdsSection() {
  const ads = state.clientData.ads || [];
  const container = document.getElementById('topAdsGrid');

  const topAds = [...ads].sort((a, b) => (b.daysActive || 0) - (a.daysActive || 0)).slice(0, 3);

  if (topAds.length === 0) {
    container.innerHTML = `<div style="grid-column: 1/-1; color: var(--text-muted);">No top ads available.</div>`;
    return;
  }

  container.innerHTML = topAds.map(ad => buildAdCardHTML(ad, true)).join('');
}

// ─── 5. BEAUTIFIED ORIGINAL FILTER SYSTEM ──────────────────────────────────
function renderCompetitorFilterPills() {
  const comps = state.clientData.competitors || [];
  const ads = state.clientData.ads || [];
  const row = document.getElementById('competitorPillsRow');

  let html = `<span class="pill-option ${state.filters.competitor === 'all' ? 'active' : ''}" data-filter="competitor" data-val="all" onclick="setFilter('competitor', 'all', this)">All (${ads.length})</span>`;
  
  comps.forEach(c => {
    const isActive = state.filters.competitor === c.name;
    const compAds = ads.filter(a => a.competitorName === c.name || a.competitorId === c.id);
    html += `<span class="pill-option ${isActive ? 'active' : ''}" data-filter="competitor" data-val="${c.name}" onclick="setFilter('competitor', '${c.name.replace(/'/g, "\\'")}', this)">${c.name} (${compAds.length})</span>`;
  });

  row.innerHTML = html;
}

function setFilter(type, val, element) {
  state.filters[type] = val;

  if (element) {
    element.parentElement.querySelectorAll('.pill-option').forEach(el => el.classList.remove('active'));
    element.classList.add('active');
  } else {
    if (type === 'competitor') renderCompetitorFilterPills();
    if (type === 'tier') {
      document.querySelectorAll('#tierPillsRow .pill-option').forEach(el => el.classList.toggle('active', el.dataset.val === val));
    }
    if (type === 'format') {
      document.querySelectorAll('#formatPillsRow .pill-option').forEach(el => el.classList.toggle('active', el.dataset.val === val));
    }
  }

  applyActiveFiltersAndRender();
}

function setupSearchInputEvent() {
  const input = document.getElementById('filterSearchInput');
  input.addEventListener('input', (e) => {
    state.filters.search = e.target.value.trim().toLowerCase();
    applyActiveFiltersAndRender();
  });
}

function applyActiveFiltersAndRender() {
  renderActiveProductTab();
}

// ─── Filter Computation ───────────────────────────────────────────────────
function getFilteredAdsCollection() {
  const ads = state.clientData.ads || [];
  
  return ads.filter(ad => {
    if (state.filters.competitor !== 'all' && ad.competitorName !== state.filters.competitor) return false;
    if (state.filters.tier !== 'all' && (ad.tier || 'New') !== state.filters.tier) return false;
    if (state.filters.format !== 'all' && ad.format !== state.filters.format) return false;

    if (state.filters.search) {
      const q = state.filters.search;
      const haystack = [ad.competitorName, ad.hook, ad.bodyText, ad.angle, ad.adFormatType].join(' ').toLowerCase();
      if (!haystack.includes(q)) return false;
    }

    return true;
  });
}

// ─── 6. WORKSPACE TABS SWITCHER ────────────────────────────────────────────
function switchProductTab(tabName) {
  state.currentProductTab = tabName;
  
  document.querySelectorAll('.ws-tab-btn').forEach(btn => btn.classList.remove('active'));
  if (tabName === 'ads') document.getElementById('wsTabAds').classList.add('active');
  if (tabName === 'hooks') document.getElementById('wsTabHooks').classList.add('active');
  if (tabName === 'angles') document.getElementById('wsTabAngles').classList.add('active');
  if (tabName === 'saved') document.getElementById('wsTabSaved').classList.add('active');

  document.getElementById('productPaneAds').style.display = tabName === 'ads' ? 'block' : 'none';
  document.getElementById('productPaneHooks').style.display = tabName === 'hooks' ? 'block' : 'none';
  document.getElementById('productPaneAngles').style.display = tabName === 'angles' ? 'block' : 'none';
  document.getElementById('productPaneSaved').style.display = tabName === 'saved' ? 'block' : 'none';

  renderActiveProductTab();
}

function renderActiveProductTab() {
  if (state.currentProductTab === 'ads') renderAdFeedTab();
  if (state.currentProductTab === 'hooks') renderHookLibraryTab();
  if (state.currentProductTab === 'angles') renderAnglesExplorerTab();
  if (state.currentProductTab === 'saved') renderSavedSwipeTab();
}

// ─── 7. AD FEED TAB RENDERING ──────────────────────────────────────────────
function renderAdFeedTab() {
  const filtered = getFilteredAdsCollection();
  const container = document.getElementById('allAdsGridContainer');
  document.getElementById('resultsCountLabel').textContent = `${filtered.length} ads found`;

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; background: var(--bg-surface); border: 1px dashed var(--border-subtle); border-radius: var(--radius-lg); padding: 50px 24px; text-align: center;">
        <div style="font-size: 36px; margin-bottom: 12px;">🔍</div>
        <h4 style="font-size: 18px; font-weight: 700; color: var(--text-primary);">No matching ads found</h4>
        <p style="font-size: 14.5px; color: var(--text-muted); margin: 6px auto 16px;">Try adjusting your competitor selection, tier, format, or search query.</p>
        <button class="btn btn-secondary" onclick="resetFiltersToDefault()">Reset Filters</button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(ad => buildAdCardHTML(ad, false)).join('');
}

function resetFiltersToDefault() {
  state.filters = { competitor: 'all', tier: 'all', format: 'all', search: '' };
  document.getElementById('filterSearchInput').value = '';
  renderCompetitorFilterPills();
  setFilter('tier', 'all');
  setFilter('format', 'all');
}

// ─── 8. AD CARD BUILDER (HERO HOOK & STRONG HIERARCHY) ─────────────────────
function buildAdCardHTML(ad, isTopStudyCard = false) {
  const isSaved = state.savedSwipe.some(item => item.id === ad.id && item.type === 'ad');
  const days = ad.daysActive || 0;
  
  let whyStudyText = "Free entry-point offer removes initial conversion resistance.";
  if ((ad.angle || '').includes('Dosha') || (ad.angle || '').includes('Problem')) {
    whyStudyText = "Identifies high-urgency pain points → offers tailored Vedic remedy.";
  } else if ((ad.angle || '').includes('Wealth') || (ad.angle || '').includes('Money') || (ad.angle || '').includes('Gemstone')) {
    whyStudyText = "Strong aspirational wealth trigger paired with tangible proof.";
  } else if ((ad.angle || '').includes('Authenticity')) {
    whyStudyText = "Leverages fear of counterfeit products + lab certification authority.";
  }

  return `
    <div class="ad-card-item" id="card-${ad.id}">
      <div>
        <div class="ad-card-topbar">
          <div class="competitor-heading-label">
            <span>${ad.competitorName}</span>
            <span class="format-badge-pill">${ad.format}</span>
          </div>
          <span class="duration-pill-badge">⏱️ ${days} days active</span>
        </div>

        <div class="ad-card-inner-body">
          <!-- Hook (Hero Focal Point) -->
          <div class="ad-hook-spotlight">
            <div class="spotlight-caption">Hook</div>
            <div class="spotlight-quote">"${ad.hook || ''}"</div>
          </div>

          <!-- Angle -->
          <div class="ad-angle-indicator">
            <span class="angle-pill-tag">${ad.angle || 'Direct Offer'}</span>
          </div>

          <!-- Primary Copy Preview -->
          <div>
            <div class="ad-primary-copy-box ad-copy-clamped-2lines" id="copy-box-${ad.id}">
              ${ad.bodyText || 'No primary copy recorded for this ad.'}
            </div>
            ${(ad.bodyText || '').length > 90 ? `
              <button class="btn-link" onclick="toggleCopyClamp(${ad.id})" style="margin-top: 6px;">Read more</button>
            ` : ''}
          </div>

          <!-- Why Study This? -->
          <div class="why-study-box">
            <span class="why-study-label">WHY STUDY THIS?</span>
            <span class="why-study-text">${whyStudyText}</span>
          </div>
        </div>
      </div>

      <!-- Card Actions -->
      <div class="ad-card-footer-actions">
        <div class="actions-cluster-left">
          <button class="btn-use-hook-cta" onclick="openHookDrawer(${ad.id})">
            ✦ Use This Hook
          </button>
          <button class="btn-card-util" onclick="openAnalyzeDrawer(${ad.id})">
            Analyze
          </button>
          <button class="btn-card-util" onclick="toggleSaveAdItem(${ad.id})" title="Save to Swipe File">
            ${isSaved ? '❤️' : '♡'}
          </button>
        </div>
        <a href="${ad.adLibraryUrl || '#'}" target="_blank" class="meta-link-external" title="View on Meta Ad Library">
          Meta ↗
        </a>
      </div>
    </div>
  `;
}

function toggleCopyClamp(adId) {
  const el = document.getElementById(`copy-box-${adId}`);
  if (el) {
    el.classList.toggle('ad-copy-clamped-2lines');
    const btn = el.parentElement.querySelector('.btn-link');
    if (btn) btn.textContent = el.classList.contains('ad-copy-clamped-2lines') ? 'Read more' : 'Show less';
  }
}

// ─── TAB 2: HOOK LIBRARY ───
function renderHookLibraryTab() {
  const ads = state.clientData.ads || [];
  const container = document.getElementById('hooksGridContainer');

  if (ads.length === 0) {
    container.innerHTML = `<div style="grid-column: 1/-1; color: var(--text-muted); padding: 40px; text-align: center;">No hooks found.</div>`;
    return;
  }

  container.innerHTML = ads.map(ad => `
    <div class="hook-deck-tile">
      <div>
        <div class="spotlight-caption" style="margin-bottom: 8px;">${(ad.angle || 'Direct Offer').toUpperCase()}</div>
        <div style="font-size: 17.5px; font-weight: 700; color: var(--text-primary); line-height: 1.45;">"${ad.hook}"</div>
        <div style="font-size: 14px; color: var(--text-muted); margin-top: 14px;">
          Used by <strong>${ad.competitorName}</strong> • Format: <strong>${ad.format}</strong>
        </div>
      </div>
      <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-subtle); padding-top: 16px;">
        <span class="duration-pill-badge">⏱️ ${ad.daysActive || 0}d active</span>
        <button class="btn btn-primary" onclick="openHookDrawer(${ad.id})">
          ✦ Use as Inspiration
        </button>
      </div>
    </div>
  `).join('');
}

// ─── TAB 3: ANGLES EXPLORER ───
function renderAnglesExplorerTab() {
  const ads = state.clientData.ads || [];
  const container = document.getElementById('anglesGridContainer');

  const angleMap = {};
  ads.forEach(ad => {
    const angle = ad.angle || 'Direct Offer';
    if (!angleMap[angle]) {
      angleMap[angle] = { name: angle, ads: [], competitors: new Set() };
    }
    angleMap[angle].ads.push(ad);
    angleMap[angle].competitors.add(ad.competitorName);
  });

  const anglesList = Object.values(angleMap);

  container.innerHTML = anglesList.map(item => `
    <div class="angle-card-tile" onclick="filterByAngleSelection('${item.name}')">
      <div>
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
          <h4 style="font-size: 18px; font-weight: 750; color: var(--text-primary);">${item.name}</h4>
          <span style="font-size: 13px; font-weight: 700; color: var(--primary); background: var(--primary-light); padding: 4px 10px; border-radius: 9999px;">${item.ads.length} ads</span>
        </div>
        <p style="font-size: 14px; color: var(--text-muted);">
          Leveraged by <strong>${item.competitors.size} competitor brands</strong> to drive conversion intent.
        </p>
      </div>
      <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-subtle); padding-top: 14px;">
        <span style="font-size: 13px; color: var(--text-tertiary);">${item.ads.map(a => a.competitorName).slice(0, 2).join(', ')}...</span>
        <span style="font-size: 14px; font-weight: 650; color: var(--primary);">Explore Angle →</span>
      </div>
    </div>
  `).join('');
}

function filterByAngleSelection(angleName) {
  switchProductTab('ads');
  state.filters.search = angleName.toLowerCase();
  document.getElementById('filterSearchInput').value = angleName;
  applyActiveFiltersAndRender();
}

// ─── TAB 4: SAVED SWIPE FILE ───
function renderSavedSwipeTab() {
  const container = document.getElementById('savedGridContainer');
  const saved = state.savedSwipe;

  if (saved.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; background: var(--bg-surface); border: 1px dashed var(--border-subtle); border-radius: var(--radius-lg); padding: 50px 24px; text-align: center;">
        <div style="font-size: 36px; margin-bottom: 12px;">📁</div>
        <h4 style="font-size: 18px; font-weight: 750; color: var(--text-primary);">Your swipe file is empty</h4>
        <p style="font-size: 14.5px; color: var(--text-muted); margin: 6px auto 16px;">Save useful competitor ads and messaging patterns to build your own research library.</p>
        <button class="btn btn-primary" onclick="switchProductTab('ads')">Explore Ad Intelligence</button>
      </div>
    `;
    return;
  }

  container.innerHTML = saved.map(item => {
    if (item.type === 'hook') {
      return `
        <div class="hook-deck-tile">
          <div>
            <div class="spotlight-caption">SAVED HOOK</div>
            <div style="font-size: 17.5px; font-weight: 700; color: var(--text-primary); line-height: 1.45;">"${item.hook}"</div>
            <div style="font-size: 14px; color: var(--text-muted); margin-top: 10px;">From ${item.competitorName || 'Competitor'}</div>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-subtle); padding-top: 16px;">
            <button class="btn btn-primary" onclick="openHookDrawerByItemData('${encodeURIComponent(JSON.stringify(item))}')">✦ Adapt</button>
            <button class="btn-link" onclick="removeSavedItem('${item.id}')">Remove</button>
          </div>
        </div>
      `;
    }
    return buildAdCardHTML(item, false);
  }).join('');
}

// ─── 9. DRAWERS (USE THIS HOOK & ANALYZE) ──────────────────────────────────
function openHookDrawer(adId) {
  const ad = state.clientData.ads.find(a => a.id === adId);
  if (!ad) return;
  populateHookDrawer(ad);
}

function openHookDrawerByItemData(encoded) {
  try {
    const data = JSON.parse(decodeURIComponent(encoded));
    populateHookDrawer(data);
  } catch(e) { console.error(e); }
}

function populateHookDrawer(ad) {
  state.activeHookModalAd = ad;
  const currentClient = state.clientData.client || { name: 'Your Brand' };

  document.getElementById('drawerOrigHook').textContent = `"${ad.hook || ''}"`;
  document.getElementById('drawerTargetClient').textContent = currentClient.name;

  let whyText = "• Low-friction offer removes conversion resistance<br>• Clear benefit with immediate relevance<br>• High curiosity trigger";
  if ((ad.angle || '').includes('Dosha') || (ad.angle || '').includes('Problem')) {
    whyText = "• Direct problem-agitation on career/financial friction<br>• Creates urgency to seek immediate diagnosis<br>• Positions personalized remedy as the exact answer";
  } else if ((ad.angle || '').includes('Wealth') || (ad.angle || '').includes('Money') || (ad.angle || '').includes('Gemstone')) {
    whyText = "• Aspirational wealth & fortune magnet angle<br>• Strong tangible visual proof<br>• Fear of missing out on planetary luck";
  }
  document.getElementById('drawerWhyWorks').innerHTML = whyText;

  renderAdaptationVariants(ad, currentClient);

  document.getElementById('drawerBackdropMask').classList.add('active');
  document.getElementById('useHookDrawer').classList.add('active');
}

function renderAdaptationVariants(ad, client) {
  const container = document.getElementById('drawerAdaptationVariants');
  const clientName = client.name || 'Your Client';
  const niche = (client.niche || '').toLowerCase();

  let adaptations = [];
  if (niche.includes('gemstone') || niche.includes('crystal') || clientName.includes('Gems')) {
    adaptations = [
      `"Never wear an uncertified gemstone without personalized Vedic energization."`,
      `"Get 100% Certified Natural Gemstones with customized birth chart analysis."`,
      `"How to choose the exact lucky gemstone for your Rashi in 3 simple steps."`
    ];
  } else if (niche.includes('smart') || clientName.includes('Smart Kundli') || niche.includes('ai-powered')) {
    adaptations = [
      `"Get your instant AI Kundli report with 50+ page customized Vedic predictions."`,
      `"Confused about career or marriage timing? Check your AI-generated birth chart today."`,
      `"Why pay ₹500+ for astrologer consultations when you can generate your full Kundli report instantly?"`
    ];
  } else {
    adaptations = [
      `"Get your complete 50+ page personalized Kundali report & Vedic remedies."`,
      `"Confused about career or marriage timing? Check your Mahadasha today."`,
      `"Discover the exact Graha planetary remedies tailored for your birth chart."`
    ];
  }

  container.innerHTML = adaptations.map(item => `
    <div class="adaptation-variant-box">
      <span style="font-size: 14.5px; font-weight: 600; color: var(--text-primary); line-height: 1.45;">${item}</span>
      <button class="btn btn-secondary" style="height: 34px; padding: 0 12px; font-size: 13px;" onclick="copyHookToClipboard('${item.replace(/'/g, "\\'")}', this)">
        📋 Copy
      </button>
    </div>
  `).join('');
}

function regenerateAdaptationIdeas() {
  if (state.activeHookModalAd) {
    const client = state.clientData.client || {};
    renderAdaptationVariants(state.activeHookModalAd, client);
    fireToast('Generated fresh variations!');
  }
}

function saveActiveHookToSwipeFile() {
  if (!state.activeHookModalAd) return;
  const item = {
    id: `hook-${Date.now()}`,
    type: 'hook',
    hook: state.activeHookModalAd.hook,
    competitorName: state.activeHookModalAd.competitorName,
    angle: state.activeHookModalAd.angle
  };
  state.savedSwipe.push(item);
  saveSwipeStorage();
  fireToast('Hook saved to Swipe File! 📁');
  closeActiveDrawers();
}

// ─── Analyze Drawer ───
function openAnalyzeDrawer(adId) {
  const ad = state.clientData.ads.find(a => a.id === adId);
  if (!ad) return;

  state.activeAnalyzeAd = ad;

  document.getElementById('analyzeDrawerMeta').textContent = `${ad.competitorName} • ${ad.format} • ⏱️ ${ad.daysActive || 0} days active`;
  document.getElementById('analyzeHookVal').textContent = `"${ad.hook || ''}"`;
  document.getElementById('analyzeHeadlineVal').textContent = `"${ad.bodyText ? ad.bodyText.slice(0, 80) + '...' : ad.hook}"`;
  document.getElementById('analyzeOfferVal').textContent = ad.hook && ad.hook.includes('FREE') ? 'Free Consultation / Sample Audit' : 'Personalized Analysis / Specialized Report';
  document.getElementById('analyzeCtaVal').textContent = ad.format === 'Video' ? 'Watch Video / Book via WhatsApp' : 'Claim Report / Order Now';
  document.getElementById('analyzeAngleVal').textContent = ad.angle || 'Problem Agitation + Direct Proof';
  document.getElementById('analyzeLearnVal').textContent = `Long-running ad signal (${ad.daysActive || 0}d). Addresses a specific psychological doubt and removes barrier to entry.`;
  document.getElementById('analyzeIdeaVal').textContent = `Adapt this structure: Hook on a common misconception → Introduce authority verification → Direct low-friction next step.`;
  document.getElementById('analyzeMetaLink').href = ad.adLibraryUrl || '#';

  document.getElementById('drawerBackdropMask').classList.add('active');
  document.getElementById('analyzeDrawer').classList.add('active');
}

function openHookFromAnalyzeDrawer() {
  if (state.activeAnalyzeAd) {
    const ad = state.activeAnalyzeAd;
    closeActiveDrawers();
    populateHookDrawer(ad);
  }
}

function saveAdFromAnalyzeDrawer() {
  if (state.activeAnalyzeAd) {
    toggleSaveAdItem(state.activeAnalyzeAd.id);
  }
}

function closeActiveDrawers() {
  document.getElementById('drawerBackdropMask').classList.remove('active');
  document.getElementById('useHookDrawer').classList.remove('active');
  document.getElementById('analyzeDrawer').classList.remove('active');
}

// ─── Save & Swipe Storage Helpers ───
function toggleSaveAdItem(adId) {
  const ad = state.clientData.ads.find(a => a.id === adId);
  if (!ad) return;

  const idx = state.savedSwipe.findIndex(item => item.id === ad.id && item.type === 'ad');
  if (idx !== -1) {
    state.savedSwipe.splice(idx, 1);
    fireToast('Removed from Swipe File');
  } else {
    state.savedSwipe.push({ ...ad, type: 'ad' });
    fireToast('Saved to Swipe File ❤️');
  }

  saveSwipeStorage();
  renderActiveProductTab();
}

function removeSavedItem(id) {
  state.savedSwipe = state.savedSwipe.filter(item => item.id != id);
  saveSwipeStorage();
  renderSavedSwipeTab();
  fireToast('Item removed');
}

function saveSwipeStorage() {
  localStorage.setItem('saved_swipe_library', JSON.stringify(state.savedSwipe));
  updateSavedTabBadgeCount();
}

function updateSavedTabBadgeCount() {
  document.getElementById('badgeTabSaved').textContent = state.savedSwipe.length;
}

// ─── Modal Helpers (New Client) ───
function openAddClientModal() {
  document.getElementById('newClientModal').classList.add('active');
}

function closeAddClientModal() {
  document.getElementById('newClientModal').classList.remove('active');
}

async function handleCreateClientSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('modalInputClientName').value;
  const niche = document.getElementById('modalInputClientNiche').value;

  try {
    const res = await fetch('/api/clients', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, niche })
    });
    const data = await res.json();
    if (data.message === 'success') {
      closeAddClientModal();
      fireToast('Client workspace created!');
      await loadClientsList();
      await loadClientOverviewData(data.data.id);
    }
  } catch(err) {
    alert('Failed to create client');
  }
}

// ─── Utilities & CSV Export ───
function copyHookToClipboard(text, btn) {
  navigator.clipboard.writeText(text).then(() => {
    fireToast('Hook copied to clipboard! 📋');
    if (btn) {
      const orig = btn.innerHTML;
      btn.innerHTML = '✅ Copied!';
      setTimeout(() => btn.innerHTML = orig, 1500);
    }
  });
}

function fireToast(msg) {
  const dock = document.getElementById('toastDock');
  const toast = document.createElement('div');
  toast.className = 'toast-pill';
  toast.innerHTML = `<span>⚡</span><span>${msg}</span>`;
  dock.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 200);
  }, 2500);
}

function exportDataCSV() {
  const ads = state.clientData.ads || [];
  if (ads.length === 0) {
    alert('No ads available to export.');
    return;
  }
  const headers = ['Competitor', 'Days Active', 'Tier', 'Format', 'Angle', 'Hook', 'Body Text', 'Meta Ad Library URL'];
  const rows = [headers.join(',')];
  ads.forEach(ad => {
    rows.push([
      `"${(ad.competitorName || '').replace(/"/g, '""')}"`,
      ad.daysActive || 0,
      `"${ad.tier || 'New'}"`,
      `"${ad.format || ''}"`,
      `"${ad.angle || ''}"`,
      `"${(ad.hook || '').replace(/"/g, '""')}"`,
      `"${(ad.bodyText || '').replace(/"/g, '""')}"`,
      `"${(ad.adLibraryUrl || '').replace(/"/g, '""')}"`
    ].join(','));
  });
  downloadCsvContent(rows.join('\n'), `${(state.clientData.client.name || 'Client').replace(/\s+/g, '_')}_Ad_Intelligence.csv`);
}

function exportSavedSwipeCSV() {
  if (state.savedSwipe.length === 0) {
    alert('No saved swipe items to export.');
    return;
  }
  const headers = ['Type', 'Competitor', 'Hook', 'Angle', 'Format'];
  const rows = [headers.join(',')];
  state.savedSwipe.forEach(item => {
    rows.push([
      `"${item.type || 'ad'}"`,
      `"${(item.competitorName || '').replace(/"/g, '""')}"`,
      `"${(item.hook || '').replace(/"/g, '""')}"`,
      `"${(item.angle || '').replace(/"/g, '""')}"`,
      `"${(item.format || '').replace(/"/g, '""')}"`
    ].join(','));
  });
  downloadCsvContent(rows.join('\n'), 'Saved_Competitor_Swipe_File.csv');
}

function downloadCsvContent(content, filename) {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

// ─── 8. APIFY AUTOMATED SCRAPER INTEGRATION ────────────────────────────────
async function checkApifyEngineStatus() {
  try {
    const res = await fetch('/api/apify/status');
    const json = await res.json();
    if (json.status === 'success' && json.data) {
      const label = document.getElementById('apifyEngineLabel');
      const pill = document.getElementById('apifyStatusPill');
      if (json.data.configured) {
        label.textContent = 'Apify Cloud Active';
        pill.style.borderColor = 'rgba(16, 185, 129, 0.4)';
        pill.title = `Connected to Apify Actor: ${json.data.actorId} (Sync every ${json.data.autoSyncHours}h)`;
      } else {
        label.textContent = 'Apify Engine (Ready)';
        pill.title = 'Add APIFY_API_TOKEN in .env to enable scheduled cloud scraping';
      }
    }
  } catch (err) {
    console.error('Error checking Apify status:', err);
  }
}

async function triggerApifyAutoSync() {
  const btn = document.getElementById('btnApifySync');
  if (!btn) return;
  const originalHtml = btn.innerHTML;
  btn.innerHTML = '⏳ Scraping Meta Ad Library...';
  btn.disabled = true;

  fireToast('Connecting to Apify Actor to scrape live competitor ads...');

  try {
    const res = await fetch(`/api/sync/apify/client/${state.activeClientId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    const result = await res.json();

    if (result.status === 'success') {
      let totalWinners = 0;
      let totalScraped = 0;
      (result.data.synced || []).forEach(s => {
        totalWinners += s.winnersIdentified || 0;
        totalScraped += s.totalScrapedAds || 0;
      });

      fireToast(`🚀 Synced ${totalScraped} live ads! Found ${totalWinners} winning scale ads (>90d).`);
      await loadClientOverviewData(state.activeClientId);
    } else {
      alert(`Sync Error: ${result.message}`);
    }
  } catch (err) {
    console.error('Apify sync error:', err);
    alert('Failed to run Apify sync. Check console for details.');
  } finally {
    btn.innerHTML = originalHtml;
    btn.disabled = false;
  }
}

async function syncSingleCompetitorApify(competitorId, competitorName) {
  fireToast(`Scraping latest Meta Ads for ${competitorName}...`);
  try {
    const res = await fetch(`/api/sync/apify/competitor/${competitorId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ clientId: state.activeClientId })
    });
    const result = await res.json();
    if (result.status === 'success') {
      fireToast(`✅ ${competitorName} updated! ${result.data.winnersIdentified} winner ads detected.`);
      await loadClientOverviewData(state.activeClientId);
    } else {
      alert(`Competitor sync error: ${result.message}`);
    }
  } catch (err) {
    console.error('Error syncing competitor:', err);
  }
}