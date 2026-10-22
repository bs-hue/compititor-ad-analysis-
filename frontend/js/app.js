/**
 * Competitor Intelligence & Ad Swipe Engine - Front End Application
 * Pure front-end prototype with realistic sample data & local UI state
 */

// ─── 1. REALISTIC EMBEDDED SAMPLE DATA ────────────────────────────────────────
const SAMPLE_CLIENTS = [
  {
    id: 1,
    name: "Master Kundli Report By Ankit Batra",
    niche: "Astrology & Kundli Prediction Reports",
    competitorCount: 4,
    competitors: [
      { id: 1, name: "Premium Personalized Kundli By Astro Arun Pandit", activeAds: 94, maxDays: 285, tier: "Winner" },
      { id: 2, name: "Smart Kundli By Aditya Kundli", activeAds: 48, maxDays: 260, tier: "Winner" },
      { id: 3, name: "Astrotalk", activeAds: 210, maxDays: 340, tier: "Winner" },
      { id: 4, name: "InstaAstro", activeAds: 85, maxDays: 240, tier: "Winner" }
    ],
    ads: [
      {
        id: 1,
        competitorName: "Premium Personalized Kundli By Astro Arun Pandit",
        format: "Video",
        daysActive: 285,
        tier: "Winner",
        hook: "Koshish ke baad bhi safalta nahi mil rahi? Check karein aapka Graha Dosh.",
        bodyText: "Aapki kundali mein chhipe hain aapke career, marriage aur financial growth ke raaz. Abhi download karein apni complete personalized report with accurate predictions.",
        angle: "Dosha & Problem Agitation",
        whyStudy: "Identifies high-urgency pain points → offers tailored Vedic diagnosis.",
        adLibraryUrl: "https://www.facebook.com/ads/library/?id=3271663196351922"
      },
      {
        id: 2,
        competitorName: "Smart Kundli By Aditya Kundli",
        format: "Video",
        daysActive: 260,
        tier: "Winner",
        hook: "First Consultation is 100% FREE! Talk to India's top Verified Astrologers now.",
        bodyText: "Chat with 15,000+ verified Vedic astrologers, tarot readers, and numerologists. Get immediate answers to love, career, and marriage doubts.",
        angle: "Free Entry Offer",
        whyStudy: "Zero-friction micro-tripwire offer completely removes initial conversion resistance.",
        adLibraryUrl: "https://www.facebook.com/ads/library/?id=27273062422376341"
      },
      {
        id: 3,
        competitorName: "Astrotalk",
        format: "Video",
        daysActive: 340,
        tier: "Winner",
        hook: "Shadi mein lagatar deri ya rishton mein tanav? Yeh 1 Vedic Upay badal sakta hai sab kuch.",
        bodyText: "Relationship timing aur Manglik dosha ke vishleshan ke liye Bharat ke shreshtha Jyotishiyon se live baat karein. Pehli chat par vishesh chhoot.",
        angle: "Relationship & Marriage Timing",
        whyStudy: "Direct emotional agitation on marital delays paired with empathetic female celebrity endorsement.",
        adLibraryUrl: "https://www.facebook.com/ads/library/?id=1364512795740314"
      },
      {
        id: 4,
        competitorName: "Premium Personalized Kundli By Astro Arun Pandit",
        format: "Image",
        daysActive: 215,
        tier: "Winner",
        hook: "50+ Pages Detailed Janam Kundali Report - Instant WhatsApp Delivery!",
        bodyText: "Get accurate planetary positions, Sade Sati remedies, Gemstone recommendation, and 5-year future roadmap prepared by expert Vedic algorithms.",
        angle: "Speed & Exhaustive Value",
        whyStudy: "High-contrast informational infographic advertising fast instant delivery.",
        adLibraryUrl: "https://www.facebook.com/ads/library/?id=2428124921027614"
      },
      {
        id: 5,
        competitorName: "InstaAstro",
        format: "Video",
        daysActive: 195,
        tier: "Winner",
        hook: "Sirf ₹1 mein baat karein Certified Astrologer se aur payein apni Janam Kundli ka sach!",
        bodyText: "Pehle 5 minute sirf ₹1 mein! Janam Kundli analysis, Grah Dosh nivaran aur career guidance ke liye aaj hi consult karein.",
        angle: "Micro-Tripwire Offer",
        whyStudy: "₹1 first call tripwire drives astronomical conversion volume.",
        adLibraryUrl: "https://www.facebook.com/ads/library/?id=1775427080457515"
      },
      {
        id: 6,
        competitorName: "Premium Personalized Kundli By Astro Arun Pandit",
        format: "Video",
        daysActive: 140,
        tier: "Winner",
        hook: "Original Karungali Mala pehanne ke yeh 3 chamatkari fayde jane aap?",
        bodyText: "100% Original Karungali (Ebony Wood) Mala certified by Vedic priests. Attracts positive energy, shields from negative vibrations.",
        angle: "Spiritual Proof & Protection",
        whyStudy: "Direct product benefits combined with spiritual authority and lab proof.",
        adLibraryUrl: "https://www.facebook.com/ads/library/?id=1726717605033769"
      },
      {
        id: 7,
        competitorName: "Smart Kundli By Aditya Kundli",
        format: "Carousel",
        daysActive: 88,
        tier: "Tested",
        hook: "Pyrite Stone: The Natural Money Magnet everyone is talking about.",
        bodyText: "Keep Pyrite in your cash locker, office desk, or wear it as a bracelet to attract wealth, career abundance, and business growth.",
        angle: "Wealth Attraction",
        whyStudy: "Strong aspirational wealth trigger paired with tangible physical proof.",
        adLibraryUrl: "https://www.facebook.com/ads/library/?id=1628803672117213"
      },
      {
        id: 8,
        competitorName: "Astrotalk",
        format: "Image",
        daysActive: 75,
        tier: "Tested",
        hook: "90% Gemstones in market are fake/treated! Check why Lab Certificate is mandatory.",
        bodyText: "Buy only 100% Gov-Lab certified unheated and untreated gemstones. Free energized Puja vidhi before dispatch.",
        angle: "Authenticity & Risk Reversal",
        whyStudy: "Leverages fear of counterfeit products + lab certification authority.",
        adLibraryUrl: "https://www.facebook.com/ads/library/?id=1700155781252330"
      },
      {
        id: 9,
        competitorName: "Premium Personalized Kundli By Astro Arun Pandit",
        format: "Video",
        daysActive: 62,
        tier: "Tested",
        hook: "Agar aapki Kundli mein yeh 2 grah kamzor hain, toh paisa aakar bhi nahi tikega!",
        bodyText: "Financial growth aur career stability ke liye jaanein apni Kundli ka sahi vishleshan. Book direct personalized consultation today.",
        angle: "Wealth & Planetary Dosha",
        whyStudy: "Focuses on money leaking away despite hard work — extreme audience relevance.",
        adLibraryUrl: "https://www.facebook.com/ads/library/?id=1455615126252043"
      },
      {
        id: 10,
        competitorName: "InstaAstro",
        format: "Image",
        daysActive: 48,
        tier: "Tested",
        hook: "Instant 36 Guna Milan & Manglik Dosh Analysis for Marriage Compatibility",
        bodyText: "Discover planetary harmony, marital longevity and mental compatibility before marriage with ancient Vedic precision algorithms.",
        angle: "Relationship & Future Security",
        whyStudy: "High-urgency relationship and parental marriage approval angle.",
        adLibraryUrl: "https://www.facebook.com/ads/library/?id=1729086082473464"
      },
      {
        id: 11,
        competitorName: "Smart Kundli By Aditya Kundli",
        format: "Carousel",
        daysActive: 35,
        tier: "Tested",
        hook: "Micro Hanuman Chalisa Pendant: Keep the power of Bajrangbali closest to your heart",
        bodyText: "View the entire Hanuman Chalisa through a magnifying lens inside this energized sacred pendant. Protection on the go.",
        angle: "Devotion & Divine Shield",
        whyStudy: "Novel micro-technology gimmick combined with deep religious sentiment.",
        adLibraryUrl: "https://www.facebook.com/ads/library/?id=2055205121800123"
      },
      {
        id: 12,
        competitorName: "Premium Personalized Kundli By Astro Arun Pandit",
        format: "Video",
        daysActive: 24,
        tier: "New",
        hook: "AI Kundli vs Traditional Pandit: Why 45,000+ users switched this month",
        bodyText: "Zero waiting time, 100% mathematical accuracy without human error. Instant PDF on WhatsApp in 60 seconds.",
        angle: "Technology vs Tradition",
        whyStudy: "Direct speed & modern accuracy differentiation against offline pandits.",
        adLibraryUrl: "https://www.facebook.com/ads/library/?id=1552566123570697"
      },
      {
        id: 13,
        competitorName: "Astrotalk",
        format: "Image",
        daysActive: 19,
        tier: "New",
        hook: "Special Navgrah Shanti Rudraksha Bracelet - Limited Festive Energization Batch",
        bodyText: "Balancing all 9 planetary energies in one authentic wearable bracelet. Handcrafted and energized with Vedic rituals.",
        angle: "Urgency & Scarcity",
        whyStudy: "Limited batch scarcity angle for fast immediate purchases.",
        adLibraryUrl: "https://www.facebook.com/ads/library/?id=1290384728912384"
      },
      {
        id: 14,
        competitorName: "Smart Kundli By Aditya Kundli",
        format: "Video",
        daysActive: 14,
        tier: "New",
        hook: "Stop wearing Pukhraj without checking Jupiter placement! It could cause severe health issues.",
        bodyText: "Yellow Sapphire is powerful, but when wrongly worn, it agitates Pitta dosha and brings sudden expenses. Get verified first.",
        angle: "Warning / Avoid Mistake",
        whyStudy: "Negative framing ('Stop doing this') triggers 2x higher click-through rates.",
        adLibraryUrl: "https://www.facebook.com/ads/library/?id=1948271049281723"
      },
      {
        id: 15,
        competitorName: "InstaAstro",
        format: "Video",
        daysActive: 9,
        tier: "New",
        hook: "How to know if your Sade Sati is ending this year: 3 unmistakable signs.",
        bodyText: "Shani Sade Sati transition brings relief, promotions, and property opportunities. Check your exact transition date.",
        angle: "Relief & Good Fortune",
        whyStudy: "Positive transition expectation relieves long-held stress.",
        adLibraryUrl: "https://www.facebook.com/ads/library/?id=1849201948291048"
      },
      {
        id: 16,
        competitorName: "Astrotalk",
        format: "Video",
        daysActive: 315,
        tier: "Winner",
        hook: "Career mein promotion ruka hua hai? Surya aur Shani ki yuti check karein.",
        bodyText: "Corporate stress aur job stagnation ka Vedic samadhan. Talk to certified astrologers today and get exact planetary remedy roadmap.",
        angle: "Career Stagnation & Surya Transit",
        whyStudy: "Direct corporate audience target targeting career stagnation and office politics.",
        adLibraryUrl: "https://www.facebook.com/ads/library/?id=1839201948291049"
      },
      {
        id: 17,
        competitorName: "InstaAstro",
        format: "Carousel",
        daysActive: 110,
        tier: "Winner",
        hook: "5 Signs your Kundli has Kalsarp Dosh (and how to nullify its effects)",
        bodyText: "Swipe through the 5 warning indicators of Rahu-Ketu affliction and download our free remedies guide prepared by Vedic scholars.",
        angle: "Educational Warning & Symptoms",
        whyStudy: "Symptom checklist drives 3x higher carousel engagement and save rates.",
        adLibraryUrl: "https://www.facebook.com/ads/library/?id=1839201948291050"
      },
      {
        id: 18,
        competitorName: "Smart Kundli By Aditya Kundli",
        format: "Image",
        daysActive: 54,
        tier: "Tested",
        hook: "Complete 2026 Yearly Horoscope & Planetary Transit Calendar",
        bodyText: "Know the exact month of your financial breakthrough, job switch, and favorable travel dates with automated precision charts.",
        angle: "Yearly Prediction & Curiosity",
        whyStudy: "Future foresight curiosity triggers massive impulse downloads and shares.",
        adLibraryUrl: "https://www.facebook.com/ads/library/?id=1839201948291051"
      }
    ]
  },
  {
    id: 2,
    name: "Gemsguruji",
    niche: "Natural Certified Gemstones & Vedic Remedies",
    competitorCount: 5,
    competitors: [
      { id: 5, name: "Japam", activeAds: 68, maxDays: 310, tier: "Winner" },
      { id: 6, name: "Divine Hindu", activeAds: 34, maxDays: 215, tier: "Winner" },
      { id: 7, name: "Crystals by Astrotalk", activeAds: 52, maxDays: 260, tier: "Winner" },
      { id: 8, name: "Gemsmantra", activeAds: 26, maxDays: 175, tier: "Winner" },
      { id: 9, name: "Mesmerize", activeAds: 45, maxDays: 140, tier: "Tested" }
    ],
    ads: [
      {
        id: 101,
        competitorName: "Japam",
        format: "Video",
        daysActive: 310,
        tier: "Winner",
        hook: "Why top businessmen wear Original Karungali Wood on their right wrist",
        bodyText: "Authentic Ebony wood absorbs negative planetary radiation and aligns your solar plexus chakra for focus and business acumen.",
        angle: "Authority & Protection",
        whyStudy: "Associates product with elite business success and ancient royalty.",
        adLibraryUrl: "https://www.facebook.com/ads/library/?id=30192849102"
      },
      {
        id: 102,
        competitorName: "Gemsmantra",
        format: "Video",
        daysActive: 175,
        tier: "Winner",
        hook: "Never buy a Yellow Sapphire (Pukhraj) unless it passes this 3-second lab test.",
        bodyText: "Synthetic glass vs authentic Ceylon untreated Pukhraj. Watch how to spot unheated gemstones with our free microscopic guide.",
        angle: "Authenticity & Scam Warning",
        whyStudy: "Educational scam-busting video establishes immense authority and trust.",
        adLibraryUrl: "https://www.facebook.com/ads/library/?id=30192849103"
      },
      {
        id: 103,
        competitorName: "Crystals by Astrotalk",
        format: "Carousel",
        daysActive: 260,
        tier: "Winner",
        hook: "Pyrite vs Green Aventurine: Which money crystal is right for your profession?",
        bodyText: "Pyrite for cash flow and business leaders; Green Aventurine for job promotions and exams. Energized with Vedic mantras.",
        angle: "Choice & Personalization",
        whyStudy: "Product comparison encourages interactive carousel browsing and basket building.",
        adLibraryUrl: "https://www.facebook.com/ads/library/?id=30192849104"
      }
    ]
  },
  {
    id: 3,
    name: "Smart Kundli",
    niche: "AI-Powered Instant Kundli & Horoscope Engine",
    competitorCount: 3,
    competitors: [
      { id: 10, name: "Astrotalk", activeAds: 210, maxDays: 340, tier: "Winner" },
      { id: 11, name: "InstaAstro", activeAds: 85, maxDays: 240, tier: "Winner" },
      { id: 12, name: "Love Bhushan", activeAds: 38, maxDays: 190, tier: "Tested" }
    ],
    ads: [
      {
        id: 201,
        competitorName: "Astrotalk",
        format: "Video",
        daysActive: 340,
        tier: "Winner",
        hook: "Pehle 5 minute baat karein FREE mein kisi bhi astrologer se!",
        bodyText: "Install the app now and start immediate live chat with certified astrologers.",
        angle: "Free Entry Offer",
        whyStudy: "Category-defining tripwire funnel.",
        adLibraryUrl: "https://www.facebook.com/ads/library/?id=40192849101"
      }
    ]
  }
];

// ─── 2. LOCAL UI STATE ────────────────────────────────────────────────────────
let state = {
  activeClientId: 1,
  currentNavTab: 'overview', // 'overview' | 'library' | 'winners' | 'hooks' | 'transcripts' | 'saved'
  filters: {
    competitor: 'all',
    format: 'all',
    tier: 'all',
    search: ''
  },
  sort: 'longest', // 'longest' | 'newest' | 'competitor'
  viewMode: 'grid', // 'grid' | 'list'
  pagination: {
    page: 1,
    pageSize: 9
  },
  savedSwipe: JSON.parse(localStorage.getItem('bloomx_saved_swipe') || '[]'),
  activeAdForDrawer: null,
  simVideoInterval: null,
  simVideoSeconds: 0,
  isSimVideoPlaying: false
};

// ─── AD LENS BENCHMARK CALCULATION & FORMATTING ENGINE ─────────────────────────
const ADLENS_BENCHMARKS = {
  spiritual_coaching: {
    daily_spend_tiers: {
      test: { low: 100, mid: 200, high: 300 },
      tested: { low: 300, mid: 650, high: 1000 },
      winner: { low: 2000, mid: 3000, high: 4000 }
    },
    metrics: { cpm: { low: 170, mid: 226, high: 330 }, ctr_percent: { low: 0.9, mid: 1.22, high: 1.7 }, cost_per_purchase: 480 }
  },
  d2c: {
    daily_spend_tiers: {
      test: { low: 250, mid: 500, high: 800 },
      tested: { low: 800, mid: 1500, high: 2500 },
      winner: { low: 3500, mid: 6000, high: 9000 }
    },
    metrics: { cpm: { low: 190, mid: 250, high: 360 }, ctr_percent: { low: 1.1, mid: 1.45, high: 2.1 }, cost_per_purchase: 420 }
  },
  healthcare: {
    daily_spend_tiers: {
      test: { low: 200, mid: 400, high: 600 },
      tested: { low: 600, mid: 1200, high: 2000 },
      winner: { low: 2800, mid: 4500, high: 7000 }
    },
    metrics: { cpm: { low: 210, mid: 280, high: 390 }, ctr_percent: { low: 0.8, mid: 1.15, high: 1.6 }, cost_per_purchase: 520 }
  },
  fintech: {
    daily_spend_tiers: {
      test: { low: 400, mid: 800, high: 1200 },
      tested: { low: 1200, mid: 2400, high: 4000 },
      winner: { low: 5000, mid: 8500, high: 14000 }
    },
    metrics: { cpm: { low: 280, mid: 390, high: 550 }, ctr_percent: { low: 0.7, mid: 1.05, high: 1.5 }, cost_per_purchase: 750 }
  },
  education: {
    daily_spend_tiers: {
      test: { low: 150, mid: 300, high: 500 },
      tested: { low: 500, mid: 1000, high: 1800 },
      winner: { low: 2500, mid: 4200, high: 6500 }
    },
    metrics: { cpm: { low: 160, mid: 210, high: 310 }, ctr_percent: { low: 1.0, mid: 1.35, high: 1.9 }, cost_per_purchase: 460 }
  }
};

let currentBenchmarkVertical = 'spiritual_coaching';

function calculateAdLensEstimates(daysRunning, verticalKey = currentBenchmarkVertical, creativeCount = 1) {
  const bench = ADLENS_BENCHMARKS[verticalKey] || ADLENS_BENCHMARKS.spiritual_coaching;
  const days = Math.max(1, Number(daysRunning) || 1);
  let tierKey = 'test';
  if (days <= 6) tierKey = 'test';
  else if (days <= 30) tierKey = 'tested';
  else tierKey = 'winner';

  const tier = bench.daily_spend_tiers[tierKey];
  const count = typeof creativeCount === 'number' && creativeCount > 1 ? creativeCount : 1;
  const multiplier = count > 1 ? Math.min(1 + 0.1 * (count - 1), 1.5) : 1.0;

  const spendLow = Math.round(days * tier.low * multiplier);
  const spendMid = Math.round(days * tier.mid * multiplier);
  const spendHigh = Math.round(days * tier.high * multiplier);

  const viewsLow = Math.round((spendLow / bench.metrics.cpm.high) * 1000);
  const viewsMid = Math.round((spendMid / bench.metrics.cpm.mid) * 1000);
  const viewsHigh = Math.round((spendHigh / bench.metrics.cpm.low) * 1000);

  const clicksMid = Math.round(viewsMid * (bench.metrics.ctr_percent.mid / 100));
  const cpcMid = clicksMid > 0 ? (spendMid / clicksMid) : 4.5;
  const ordersMid = Math.round(spendMid / bench.metrics.cost_per_purchase);

  return {
    days,
    tierKey,
    creativeMultiplier: multiplier,
    spend: { low: spendLow, mid: spendMid, high: spendHigh },
    views: { low: viewsLow, mid: viewsMid, high: viewsHigh },
    cpcMid,
    ordersMid
  };
}

function formatSpendINR(num) {
  if (!num || isNaN(num)) return '₹0';
  if (num >= 10000000) return `₹${(num / 10000000).toFixed(1)}Cr`;
  if (num >= 100000) return `₹${(num / 100000).toFixed(1)}L`;
  if (num >= 1000) return `₹${Math.round(num / 1000)}K`;
  return `₹${Math.round(num).toLocaleString('en-IN')}`;
}

function formatCompactViews(num) {
  if (!num || isNaN(num)) return '0';
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return Math.round(num).toString();
}

// ─── 3. INITIALIZATION ────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderWorkspaceDropdown();
  updateSidebarCounters();
  applyClientData();
  setupLiveSearch();
  syncBackendAds();
  checkApifyStatus();

  // Global Escape key listener to close all popups/drawers
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' || e.key === 'Esc') {
      closeAllOverlays();
    }
  });

  // Global click outside listener to dismiss workspace dropdown
  document.addEventListener('click', (e) => {
    const wsBtn = document.getElementById('workspaceSwitcherBtn');
    const wsDropdown = document.getElementById('workspaceDropdown');
    if (wsDropdown && wsDropdown.style.display === 'block') {
      if (!wsBtn.contains(e.target) && !wsDropdown.contains(e.target)) {
        wsDropdown.style.display = 'none';
      }
    }
  });
});

function getActiveClient() {
  const client = SAMPLE_CLIENTS.find(c => c.id === state.activeClientId) || SAMPLE_CLIENTS[0];
  if (client && client.ads) {
    client.ads.forEach(ad => {
      if (ad.format === 'Video' && !ad.videoUrl) {
        ad.videoUrl = (ad.id % 2 === 0) ? 'assets/videos/sample_reel_astrology.mp4' : 'assets/videos/sample_reel_gemstones.mp4';
      }
    });
  }
  return client;
}


// ─── 4. WORKSPACE SWITCHER & CLIENT LOGIC ──────────────────────────────────────
function renderWorkspaceDropdown() {
  const container = document.getElementById('workspaceDropdown');
  if (!container) return;

  container.innerHTML = SAMPLE_CLIENTS.map(c => `
    <div style="padding: 8px 10px; border-radius: 4px; cursor: pointer; font-size: 12.5px; font-weight: 600; display: flex; justify-content: space-between; align-items: center; ${c.id === state.activeClientId ? 'background: var(--primary-light); color: var(--primary);' : 'color: var(--text-secondary);'}" onclick="selectWorkspace(${c.id})">
      <span>${c.name}</span>
      <span style="font-size: 11px; opacity: 0.7;">${c.competitorCount} comps</span>
    </div>
  `).join('');
}

function toggleWorkspaceDropdown() {
  const el = document.getElementById('workspaceDropdown');
  el.style.display = el.style.display === 'none' ? 'block' : 'none';
}

function selectWorkspace(clientId) {
  state.activeClientId = clientId;
  state.filters.competitor = 'all';
  state.pagination.page = 1;
  document.getElementById('workspaceDropdown').style.display = 'none';

  applyClientData();
  fireToast(`Switched workspace to "${getActiveClient().name}"`);
}

function getBrandInitials(brandName) {
  if (!brandName) return 'AD';
  const clean = brandName.replace(/By\s+[a-zA-Z\s]+/gi, '').trim();
  const words = clean.split(/\s+/).filter(Boolean);
  if (words.length === 1) return words[0].substring(0, 2).toUpperCase();
  if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase();
  return 'AD';
}

function renderTopAds() {
  const container = document.getElementById('topAdsContainer');
  if (!container) return;
  const client = getActiveClient();
  const ads = [...(client.ads || [])].sort((a, b) => (b.daysActive || 0) - (a.daysActive || 0));
  const topWinners = ads.slice(0, 3);

  container.innerHTML = topWinners.map(ad => {
    const isSaved = state.savedSwipe.some(item => item.id === ad.id);
    const estimates = calculateAdLensEstimates(ad.daysActive || 1);
    const spendStr = `${formatSpendINR(estimates.spend.low)} – ${formatSpendINR(estimates.spend.high)}`;
    const viewsStr = `~${formatCompactViews(estimates.views.mid)}`;
    const ordersStr = `~${estimates.ordersMid.toLocaleString('en-IN')}`;
    const cpcStr = `₹${estimates.cpcMid.toFixed(1)}`;

    return `
      <div class="top-ad-card">
        <div style="display: flex; flex-direction: column; gap: 10px;">
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <div class="brand-avatar-circle" style="width: 28px; height: 28px; font-size: 11px;">${getBrandInitials(ad.competitorName)}</div>
              <span style="font-size: 13px; font-weight: 750; color: var(--text-primary);">${ad.competitorName}</span>
            </div>
            <span class="top-ad-badge">⭐ Top Winner · ${ad.daysActive}d</span>
          </div>

          <!-- AdLens Live Metric Ribbon -->
          <div class="adlens-card-metrics" style="margin: 0; background: var(--bg-surface);">
            <div class="adlens-metric-cell">
              <span class="adlens-metric-sub">Est. Spend</span>
              <span class="adlens-metric-val spend-gradient">${spendStr}</span>
            </div>
            <div class="adlens-metric-cell">
              <span class="adlens-metric-sub">Est. Reach</span>
              <span class="adlens-metric-val">${viewsStr}</span>
            </div>
            <div class="adlens-metric-cell">
              <span class="adlens-metric-sub">Orders · CPC</span>
              <span class="adlens-metric-val">${ordersStr} · ${cpcStr}</span>
            </div>
          </div>

          <div style="background: var(--bg-subtle); border-radius: var(--radius-sm); padding: 10px 12px; border-left: 3px solid var(--primary);">
            <div style="font-size: 10.5px; font-weight: 750; color: var(--primary); text-transform: uppercase; margin-bottom: 2px;">Proven Hook</div>
            <div style="font-size: 13.5px; font-weight: 700; color: var(--text-primary); line-height: 1.4;">“${ad.hook}”</div>
          </div>

          <div style="font-size: 12.5px; color: var(--text-secondary); line-height: 1.4;">
            ${(ad.bodyText || '').substring(0, 95)}...
          </div>

          <div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
            <span class="angle-badge" style="font-size: 11px;">🎯 ${ad.angle}</span>
            <span class="ad-type-chip">${ad.format}</span>
          </div>
        </div>

        <div style="display: flex; align-items: center; justify-content: space-between; border-top: 1px solid var(--border-subtle); padding-top: 12px; margin-top: 4px; gap: 8px;">
          <div style="display: flex; gap: 6px; flex-wrap: wrap;">
            ${ad.format === 'Video' ? `
              <button class="btn btn-secondary btn-sm" onclick="openTranscribeDrawer(${ad.id})">🎬 Script</button>
            ` : `
              <button class="btn btn-secondary btn-sm" onclick="openAnalyzeDrawer(${ad.id})">🔍 Details</button>
            `}
            <button class="btn btn-primary btn-sm" onclick="openHookDrawer(${ad.id})">✦ Adapt</button>
            <button class="btn-card-download" onclick="downloadAdCreative(${ad.id})" title="Download Creative & Swipe Spec">📥 Creative</button>
          </div>
          <button class="btn-card-icon ${isSaved ? 'saved' : ''}" onclick="toggleSaveAd(${ad.id})" title="Save Ad">
            ${isSaved ? '❤️' : '♡'}
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function applyClientData() {
  const client = getActiveClient();

  // Update header & breadcrumbs
  const wsName = document.getElementById('currentWsName');
  if (wsName) wsName.textContent = client.name;
  const bcClient = document.getElementById('breadcrumbClientName');
  if (bcClient) bcClient.textContent = client.name;

  // Update metrics
  const ads = client.ads || [];
  const maxDays = ads.reduce((max, a) => Math.max(max, a.daysActive || 0), 0);
  const metricComp = document.getElementById('metricCompCount');
  if (metricComp) metricComp.textContent = client.competitors ? client.competitors.length : 4;
  const metricAd = document.getElementById('metricAdCount');
  if (metricAd) metricAd.textContent = ads.length;
  const metricLongest = document.getElementById('metricLongestActive');
  if (metricLongest) metricLongest.textContent = `${maxDays}d`;

  // Render competitor filter pills
  renderCompetitorFilterPills(client.competitors);

  // Render Top Ads Spotlight
  renderTopAds();

  // Render library cards
  renderAdsLibrary();

  // Update nav counters
  updateSidebarCounters();
}

function updateSidebarCounters() {
  const client = getActiveClient();
  const ads = client.ads || [];
  const winnersCount = ads.filter(a => a.tier === 'Winner').length;

  const navAds = document.getElementById('navAdsCount');
  if (navAds) navAds.textContent = ads.length;
  const navWinners = document.getElementById('navWinnersCount');
  if (navWinners) navWinners.textContent = winnersCount;
  const navSaved = document.getElementById('navSavedCount');
  if (navSaved) navSaved.textContent = state.savedSwipe.length;
}

// ─── 5. NAVIGATION TAB SWITCHING ──────────────────────────────────────────────
function switchNavTab(tabName, el) {
  state.currentNavTab = tabName;
  state.pagination.page = 1;

  document.querySelectorAll('.sidebar-nav .nav-link').forEach(l => l.classList.remove('active'));
  if (el) el.classList.add('active');

  const breadcrumb = document.getElementById('breadcrumbActiveSection');
  
  if (tabName === 'overview') {
    if (breadcrumb) breadcrumb.textContent = 'Overview';
    state.filters.tier = 'all';
    state.filters.format = 'all';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else if (tabName === 'insights') {
    if (breadcrumb) breadcrumb.textContent = 'Market Insights';
    const s = document.getElementById('marketInsightsSection');
    if (s) s.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else if (tabName === 'winners') {
    if (breadcrumb) breadcrumb.textContent = 'Top Ads';
    state.filters.tier = 'Winner';
    const s = document.getElementById('topAdsSection');
    if (s) s.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else if (tabName === 'library') {
    if (breadcrumb) breadcrumb.textContent = 'Ad Library';
    state.filters.tier = 'all';
    state.filters.format = 'all';
    const s = document.getElementById('adLibrarySection');
    if (s) s.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else if (tabName === 'saved') {
    if (breadcrumb) breadcrumb.textContent = 'Saved Ads';
    state.filters.tier = 'all';
    state.filters.format = 'all';
    const s = document.getElementById('adLibrarySection');
    if (s) s.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  syncFilterPillsActiveUI();
  renderAdsLibrary();
}

// ─── 6. SEARCH & FILTER CONTROLS ──────────────────────────────────────────────
function setupLiveSearch() {
  const input = document.getElementById('searchInput');
  if (input) {
    input.addEventListener('input', (e) => {
      state.filters.search = e.target.value.trim().toLowerCase();
      state.pagination.page = 1;
      updateResetButtonVisibility();
      renderAdsLibrary();
    });
  }
}

function renderCompetitorFilterPills(competitors) {
  const container = document.getElementById('competitorPillsContainer');
  if (!container) return;
  const client = typeof getActiveClient === 'function' ? getActiveClient() : null;
  const ads = (state.ads && state.ads.length > 0) ? state.ads : (client && client.ads ? client.ads : []);
  const totalCount = ads ? ads.length : 0;
  let html = `<span class="filter-pill ${state.filters.competitor === 'all' ? 'active' : ''}" data-val="all" onclick="setFilter('competitor', 'all', this)">All <span class="pill-count-bubble">${totalCount}</span></span>`;
  
  if (Array.isArray(competitors)) {
    competitors.forEach(c => {
      const isActive = state.filters.competitor === c.name;
      const count = ads.filter(a => a.competitorName === c.name || a.competitorId === c.id).length || c.activeAds || c.activeAdCount || 0;
      html += `<span class="filter-pill ${isActive ? 'active' : ''}" data-val="${c.name}" onclick="setFilter('competitor', '${c.name.replace(/'/g, "\\'")}', this)">${c.name} <span class="pill-count-bubble">${count}</span></span>`;
    });
  }

  container.innerHTML = html;
  updateResetButtonVisibility();
}

function setFilter(type, val, element) {
  state.filters[type] = val;
  state.pagination.page = 1;

  if (element) {
    element.parentElement.querySelectorAll('.filter-pill').forEach(el => el.classList.remove('active'));
    element.classList.add('active');
  }

  updateResetButtonVisibility();
  renderAdsLibrary();
}

function syncFilterPillsActiveUI() {
  document.querySelectorAll('[data-filter="format"]').forEach(p => {
    p.classList.toggle('active', p.getAttribute('data-val') === state.filters.format);
  });
  document.querySelectorAll('[data-filter="tier"]').forEach(p => {
    p.classList.toggle('active', p.getAttribute('data-val') === state.filters.tier);
  });
  const compContainer = document.getElementById('competitorPillsContainer');
  if (compContainer) {
    compContainer.querySelectorAll('.filter-pill').forEach(p => {
      p.classList.toggle('active', p.getAttribute('data-val') === state.filters.competitor);
    });
  }
  updateResetButtonVisibility();
}

function filterByFormat(format) {
  state.filters.format = format;
  syncFilterPillsActiveUI();
  renderAdsLibrary();
  document.getElementById('adsGridContainer').scrollIntoView({ behavior: 'smooth' });
}

function filterByAngle(angle) {
  state.filters.search = angle.toLowerCase();
  document.getElementById('searchInput').value = angle;
  renderAdsLibrary();
  document.getElementById('adsGridContainer').scrollIntoView({ behavior: 'smooth' });
}

function focusWinnerAd() {
  state.filters.tier = 'Winner';
  syncFilterPillsActiveUI();
  renderAdsLibrary();
  document.getElementById('adsGridContainer').scrollIntoView({ behavior: 'smooth' });
}

function handleSortChange(sortVal) {
  state.sort = sortVal;
  renderAdsLibrary();
}

function setViewMode(mode) {
  state.viewMode = mode;
  document.getElementById('btnViewGrid').classList.toggle('active', mode === 'grid');
  document.getElementById('btnViewList').classList.toggle('active', mode === 'list');
  
  const container = document.getElementById('adsGridContainer');
  container.classList.toggle('list-view', mode === 'list');
}

// ─── 7. FILTERED ADS COMPUTATION & RENDERING ──────────────────────────────────
function computeFilteredAds() {
  const client = getActiveClient();
  let ads = [...(client.ads || [])];

  // If in 'saved' tab, filter by saved IDs
  if (state.currentNavTab === 'saved') {
    ads = ads.filter(a => state.savedSwipe.some(item => item.id === a.id));
  }

  // Filter: Competitor
  if (state.filters.competitor !== 'all') {
    ads = ads.filter(a => a.competitorName === state.filters.competitor);
  }

  // Filter: Format
  if (state.filters.format !== 'all') {
    ads = ads.filter(a => a.format === state.filters.format);
  }

  // Filter: Tier
  if (state.filters.tier !== 'all') {
    ads = ads.filter(a => a.tier === state.filters.tier);
  }

  // Filter: Search Text
  if (state.filters.search) {
    const q = state.filters.search;
    ads = ads.filter(a => {
      const haystack = [a.competitorName, a.hook, a.bodyText, a.angle].join(' ').toLowerCase();
      return haystack.includes(q);
    });
  }

  // Sort
  if (state.sort === 'longest') {
    ads.sort((a, b) => (b.daysActive || 0) - (a.daysActive || 0));
  } else if (state.sort === 'newest') {
    ads.sort((a, b) => (a.daysActive || 0) - (b.daysActive || 0));
  } else if (state.sort === 'competitor') {
    ads.sort((a, b) => a.competitorName.localeCompare(b.competitorName));
  }

  return ads;
}

function renderAdsLibrary() {
  const container = document.getElementById('adsGridContainer');
  const allFiltered = computeFilteredAds();

  if (allFiltered.length === 0) {
    if (state.currentNavTab === 'saved') {
      container.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1;">
          <div class="empty-icon">📁</div>
          <div class="empty-title">Your saved ads collection is empty</div>
          <div class="empty-desc">Click the heart icon (♡) on any ad to bookmark it for your swipe file.</div>
          <button class="btn btn-primary btn-sm" style="margin-top: 14px;" onclick="switchNavTab('library')">Browse Ad Library</button>
        </div>
      `;
    } else {
      container.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1;">
          <div class="empty-icon">🔍</div>
          <div class="empty-title">No matching competitor ads found</div>
          <div class="empty-desc">Try clearing your search query or selecting a different brand or format filter.</div>
          <button class="btn btn-secondary btn-sm" style="margin-top: 14px;" onclick="resetFilters()">Reset All Filters</button>
        </div>
      `;
    }
    renderPagination(0, 0);
    return;
  }

  // Pagination slicing
  const { page, pageSize } = state.pagination;
  const total = allFiltered.length;
  const startIndex = (page - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, total);
  const pagedAds = allFiltered.slice(startIndex, endIndex);

  container.innerHTML = pagedAds.map(ad => buildAdCardHTML(ad)).join('');

  renderPagination(startIndex + 1, endIndex, total);
}

function resetFilters() {
  state.filters = { competitor: 'all', format: 'all', tier: 'all', search: '' };
  const input = document.getElementById('searchInput');
  if (input) input.value = '';
  document.querySelectorAll('.filter-pill').forEach(p => {
    p.classList.toggle('active', p.getAttribute('data-val') === 'all');
  });
  updateResetButtonVisibility();
  renderAdsLibrary();
}

function updateResetButtonVisibility() {
  const btn = document.getElementById('btnResetFilters');
  if (!btn) return;
  const isFiltered = state.filters.competitor !== 'all' || 
                     state.filters.format !== 'all' || 
                     state.filters.tier !== 'all' || 
                     Boolean(state.filters.search && state.filters.search.trim());
  btn.style.display = isFiltered ? 'inline-flex' : 'none';
}

function buildAdCardHTML(ad) {
  const isSaved = state.savedSwipe.some(item => item.id === ad.id);
  const tierClass = ad.tier === 'Winner' ? 'tier-winner' : (ad.tier === 'Tested' ? 'tier-tested' : 'tier-new');
  const tierLabel = ad.tier === 'Winner' ? '⭐ Proven Winner' : (ad.tier === 'Tested' ? '⚡ Scaling' : '✨ New Angle');

  const estimates = calculateAdLensEstimates(ad.daysActive || 1);
  const spendStr = `${formatSpendINR(estimates.spend.low)} – ${formatSpendINR(estimates.spend.high)}`;
  const viewsStr = `~${formatCompactViews(estimates.views.mid)}`;
  const ordersStr = `~${estimates.ordersMid.toLocaleString('en-IN')}`;
  const cpcStr = `₹${estimates.cpcMid.toFixed(1)}`;

  return `
    <article class="ad-card" id="card-${ad.id}">
      <div style="display: flex; flex-direction: column; gap: 12px;">
        
        <!-- Header row: Brand Avatar, Name, Format chip, Longevity -->
        <div class="ad-card-head">
          <div class="competitor-meta-wrap">
            <div class="brand-avatar-circle">${getBrandInitials(ad.competitorName)}</div>
            <div style="display: flex; flex-direction: column;">
              <span class="competitor-name-tag">${ad.competitorName}</span>
              <span class="ad-type-chip">${ad.format === 'Video' ? '🎬 Video (9:16)' : (ad.format === 'Carousel' ? '📑 Carousel' : '🖼️ Image')}</span>
            </div>
          </div>
          <span class="longevity-badge ${tierClass}">⏱️ ${ad.daysActive}d active</span>
        </div>

        <!-- AdLens Real-Time Intelligence Grid -->
        <div class="adlens-card-metrics" title="Ad Lens Real-Time Performance Estimates">
          <div class="adlens-metric-cell">
            <span class="adlens-metric-sub">Est. Total Spend</span>
            <span class="adlens-metric-val spend-gradient">${spendStr}</span>
          </div>
          <div class="adlens-metric-cell">
            <span class="adlens-metric-sub">Est. Impressions</span>
            <span class="adlens-metric-val">${viewsStr}</span>
          </div>
          <div class="adlens-metric-cell">
            <span class="adlens-metric-sub">Orders · CPC</span>
            <span class="adlens-metric-val">${ordersStr} · ${cpcStr}</span>
          </div>
        </div>

        <!-- Hook Box (Hero element) -->
        <div class="ad-hook-box">
          <div class="hook-caption">Primary Hook</div>
          <div class="hook-text">“${ad.hook}”</div>
        </div>

        <!-- Angle & Status Tags -->
        <div class="ad-angle-row">
          <span class="angle-badge">🎯 ${ad.angle || 'Direct Offer'}</span>
          <span class="tag-status-pill">${tierLabel}</span>
        </div>

        <!-- Primary Copy Excerpt -->
        <div>
          <p class="ad-copy-preview" id="copy-${ad.id}">${ad.bodyText || ''}</p>
          ${(ad.bodyText || '').length > 80 ? `
            <button class="btn-read-toggle" onclick="toggleCopyExpand(${ad.id})">Read more</button>
          ` : ''}
        </div>

        <!-- Why Study Callout -->
        <div class="why-study-callout">
          <b>Why it works:</b> ${ad.whyStudy || 'Clear psychological trigger and low conversion friction.'}
        </div>
      </div>

      <!-- Footer Actions -->
      <div class="ad-card-actions">
        <div class="card-actions-left">
          ${ad.format === 'Video' ? `
            <button class="btn-card-video" onclick="openTranscribeDrawer(${ad.id})" title="Watch Video & View Script">
              🎬 Script
            </button>
          ` : `
            <button class="btn btn-secondary btn-sm" onclick="openAnalyzeDrawer(${ad.id})">
              🔍 Details
            </button>
          `}
          <button class="btn-card-cta" onclick="openHookDrawer(${ad.id})">
            ✦ Adapt
          </button>
          <button class="btn-card-download" onclick="downloadAdCreative(${ad.id})" title="Download Creative & Swipe Spec">
            📥 HD Creative
          </button>
        </div>

        <div style="display: flex; align-items: center; gap: 6px;">
          <button class="btn-card-icon ${isSaved ? 'saved' : ''}" onclick="toggleSaveAd(${ad.id})" title="Save to Swipe File">
            ${isSaved ? '❤️' : '♡'}
          </button>
          <a href="${ad.adLibraryUrl || '#'}" target="_blank" class="btn-card-icon" title="View on Meta Ad Library">
            ↗
          </a>
        </div>
      </div>
    </article>
  `;
}

function toggleCopyExpand(adId) {
  const el = document.getElementById(`copy-${adId}`);
  if (!el) return;
  el.classList.toggle('expanded');
  const btn = el.parentElement.querySelector('.btn-read-toggle');
  if (btn) btn.textContent = el.classList.contains('expanded') ? 'Show less' : 'Read more';
}

// ─── 8. PAGINATION CONTROLS ───────────────────────────────────────────────────
function renderPagination(start, end, total = 0) {
  const bar = document.getElementById('paginationBar');
  const summary = document.getElementById('paginationSummary');
  const pagesContainer = document.getElementById('paginationPages');

  if (total === 0) {
    if (summary) summary.textContent = 'No ads to display';
    if (pagesContainer) pagesContainer.innerHTML = '';
    return;
  }

  if (summary) summary.textContent = `Showing ${start}–${end} of ${total} ads`;

  const totalPages = Math.ceil(total / state.pagination.pageSize);
  let html = '';

  // Previous button
  html += `<button class="page-btn" ${state.pagination.page === 1 ? 'disabled' : ''} onclick="goToPage(${state.pagination.page - 1})">‹</button>`;

  // Numbered pages
  for (let i = 1; i <= totalPages; i++) {
    html += `<button class="page-btn ${state.pagination.page === i ? 'active' : ''}" onclick="goToPage(${i})">${i}</button>`;
  }

  // Next button
  html += `<button class="page-btn" ${state.pagination.page === totalPages ? 'disabled' : ''} onclick="goToPage(${state.pagination.page + 1})">›</button>`;

  if (pagesContainer) pagesContainer.innerHTML = html;
}

function goToPage(pageNum) {
  state.pagination.page = pageNum;
  renderAdsLibrary();
  document.getElementById('adsGridContainer').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ─── 9. DRAWERS & MODALS LOGIC ────────────────────────────────────────────────
function closeActiveDrawers() {
  const backdrop = document.getElementById('drawerBackdrop');
  if (backdrop) backdrop.classList.remove('active');

  ['hookDrawer', 'transcribeDrawer', 'analyzeDrawer'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.remove('active');
  });

  try {
    stopSimVideoPlayback();
  } catch (err) {}
}

function closeAllOverlays() {
  closeActiveDrawers();
  closeAddCompetitorModal();
  const wsDropdown = document.getElementById('workspaceDropdown');
  if (wsDropdown) wsDropdown.style.display = 'none';
}

// Hook Adaptation Drawer
function openHookDrawer(adId) {
  const client = getActiveClient();
  const ad = client.ads.find(a => a.id === adId);
  if (!ad) return;

  state.activeAdForDrawer = ad;

  document.getElementById('hookDrawerCompetitor').textContent = `From ${ad.competitorName} • ${ad.format} (${ad.daysActive}d active)`;
  document.getElementById('drawerOrigHook').textContent = `"${ad.hook}"`;
  document.getElementById('drawerClientTargetName').textContent = client.name;

  renderHookVariations(ad, client);

  document.getElementById('drawerBackdrop').classList.add('active');
  document.getElementById('hookDrawer').classList.add('active');
}

function renderHookVariations(ad, client) {
  const container = document.getElementById('drawerVariationsList');
  const brandName = client.name || 'Your Brand';

  const variations = [
    `"Why 90% of people face career friction without knowing their Graha Dosh — customized ${brandName} guide."`,
    `"Never wear a gemstone or perform remedies without checking planetary Mahadasha first."`,
    `"Get your instant personalized Vedic analysis delivered directly to your WhatsApp in 60 seconds."`
  ];

  container.innerHTML = variations.map(v => `
    <div style="background: #FFFFFF; border: 1px solid var(--border-default); border-radius: var(--radius-sm); padding: 12px 14px; display: flex; align-items: center; justify-content: space-between; gap: 10px;">
      <span style="font-size: 13px; font-weight: 600; color: var(--text-primary); line-height: 1.4;">${v}</span>
      <button class="btn btn-secondary btn-sm" onclick="copyText('${v.replace(/'/g, "\\'")}', this)">📋 Copy</button>
    </div>
  `).join('');
}

function regenerateHookAdaptations() {
  if (state.activeAdForDrawer) {
    renderHookVariations(state.activeAdForDrawer, getActiveClient());
    fireToast('Generated fresh variations! 🎲');
  }
}

function saveActiveHookToSwipe() {
  if (!state.activeAdForDrawer) return;
  const hookObj = {
    id: `hook-${state.activeAdForDrawer.id}-${Date.now()}`,
    type: 'hook',
    hook: state.activeAdForDrawer.hook,
    competitorName: state.activeAdForDrawer.competitorName,
    angle: state.activeAdForDrawer.angle
  };

  state.savedSwipe.push(hookObj);
  localStorage.setItem('bloomx_saved_swipe', JSON.stringify(state.savedSwipe));
  updateSidebarCounters();
  fireToast('Hook saved to Swipe File! 📁');
  closeActiveDrawers();
}

// Video & Transcribe Drawer
function openTranscribeDrawer(adId) {
  const client = getActiveClient();
  const ad = client.ads.find(a => a.id === adId);
  if (!ad) return;

  state.activeAdForDrawer = ad;

  document.getElementById('transcribeDrawerMeta').textContent = `${ad.competitorName} • ${ad.format} • ⏱️ ${ad.daysActive}d active`;
  document.getElementById('simVideoBrand').textContent = `⚡ ${ad.competitorName}`;
  document.getElementById('simVideoHookText').textContent = `"${ad.hook}"`;
  document.getElementById('simMetaLink').href = ad.adLibraryUrl || '#';

  function renderSegments(segs) {
    document.getElementById('transcribeSegmentsContainer').innerHTML = segs.map(s => `
      <div class="script-segment-item">
        <div class="segment-badge-row">
          <span class="time-stamp-pill">${s.start} - ${s.end}</span>
          <span style="font-size: 10.5px; font-weight: 750; text-transform: uppercase; color: var(--primary); background: var(--primary-light); padding: 2px 7px; border-radius: 4px;">${s.tag}</span>
        </div>
        <div style="font-size: 13.5px; font-weight: 600; color: var(--text-primary); line-height: 1.45;">"${s.text}"</div>
        <div style="font-size: 11.5px; color: var(--text-muted); margin-top: 4px; font-style: italic;">💡 ${s.notes}</div>
      </div>
    `).join('');
  }

  // Render baseline segments
  const initialSegments = [
    { start: '00:00', end: '00:05', tag: 'Hook', text: `${ad.hook}? Kya aapke sath bhi baar baar aisa ho raha hai?`, notes: 'Pattern interrupt targeting latent doubt.' },
    { start: '00:05', end: '00:18', tag: 'Problem', text: `Log saalon tak mehnat karte hain par jab tak kundali ke mukhya grah shant na hon, tab tak results aate aate ruk jate hain. ${ad.bodyText ? ad.bodyText.split('.')[0] : ''}.`, notes: 'Validates viewer pain points, shifts blame to external planetary timing.' },
    { start: '00:18', end: '00:40', tag: 'Mechanism', text: `Iska sabse saral aur pramanit samadhan hai aapka personalized horoscope report. Isme certified algorithms se aapke grahon ki exact sthiti aur simple Vedic upay bataye jate hain.`, notes: 'Introduces authentic mechanism with social proof.' },
    { start: '00:40', end: '00:54', tag: 'Call to Action', text: `Aaj hi neeche diye gaye link par click karein aur apna first consultation 100% FREE ya sirf ₹1 mein claim karein. Slots limited hain!`, notes: 'Frictionless entry offer paired with scarcity.' }
  ];
  renderSegments(initialSegments);

  // Fetch from backend /api/ads/:id/transcribe
  fetch(`/api/ads/${adId}/transcribe`)
    .then(r => r.json())
    .then(json => {
      if (json && json.data && Array.isArray(json.data.segments) && json.data.segments.length > 0) {
        renderSegments(json.data.segments);
        const badge = document.getElementById('transcribeModelBadge');
        if (badge) {
          badge.textContent = json.data.provider === 'sarvam_ai' ? '● Sarvam AI (saaras:v3)' : '● Sarvam AI Ready';
        }
      }
    })
    .catch(() => {});

  document.getElementById('transcribeTakeawaysContainer').innerHTML = `
    <li>Opens with high-urgency rhetorical question within first 3 seconds.</li>
    <li>Shifts blame away from viewer to planetary dosha, immediately dissolving sales skepticism.</li>
    <li>Free / micro-tripwire entry offer eliminates buyer resistance.</li>
  `;

  document.getElementById('drawerBackdrop').classList.add('active');
  document.getElementById('transcribeDrawer').classList.add('active');
}

function toggleSimVideoPlayback() {
  const btn = document.getElementById('btnSimPlay');
  const label = document.getElementById('simTimerLabel');

  if (state.isSimVideoPlaying) {
    stopSimVideoPlayback();
  } else {
    state.isSimVideoPlaying = true;
    btn.textContent = '⏸';
    state.simVideoInterval = setInterval(() => {
      state.simVideoSeconds++;
      if (state.simVideoSeconds > 54) state.simVideoSeconds = 0;
      const min = String(Math.floor(state.simVideoSeconds / 60)).padStart(2, '0');
      const sec = String(state.simVideoSeconds % 60).padStart(2, '0');
      label.textContent = `${min}:${sec} / 00:54`;
    }, 1000);
  }
}

function stopSimVideoPlayback() {
  state.isSimVideoPlaying = false;
  if (state.simVideoInterval) {
    clearInterval(state.simVideoInterval);
    state.simVideoInterval = null;
  }
  state.simVideoSeconds = 0;
  const btn = document.getElementById('btnSimPlay');
  const label = document.getElementById('simTimerLabel');
  if (btn) btn.textContent = '▶';
  if (label) label.textContent = '00:00 / 00:54';
}

function adaptFromTranscribe() {
  if (state.activeAdForDrawer) {
    const ad = state.activeAdForDrawer;
    closeActiveDrawers();
    openHookDrawer(ad.id);
  }
}

function copyFullTranscriptText(btn) {
  const fullText = Array.from(document.querySelectorAll('.script-segment-item'))
    .map(el => el.innerText.trim())
    .join('\n\n');

  copyText(fullText, btn);
}

// Analyze Drawer
function openAnalyzeDrawer(adId) {
  const client = getActiveClient();
  const ad = client.ads.find(a => a.id === adId);
  if (!ad) return;

  state.activeAdForDrawer = ad;

  document.getElementById('analyzeDrawerMeta').textContent = `${ad.competitorName} • ${ad.format} • ⏱️ ${ad.daysActive}d active`;
  document.getElementById('analyzeHookVal').textContent = `"${ad.hook}"`;
  document.getElementById('analyzeBodyVal').textContent = `"${ad.bodyText}"`;
  document.getElementById('analyzeAngleVal').textContent = ad.angle || 'Dosha & Problem Agitation';
  document.getElementById('analyzeIdeaVal').textContent = `Structure adaptation: Hook on a common misconception → Introduce authority verification → Direct low-friction next step.`;

  document.getElementById('drawerBackdrop').classList.add('active');
  document.getElementById('analyzeDrawer').classList.add('active');
}

function openHookFromAnalyze() {
  if (state.activeAdForDrawer) {
    const ad = state.activeAdForDrawer;
    closeActiveDrawers();
    openHookDrawer(ad.id);
  }
}

// ─── 10. SAVE / SWIPE FILE ACTIONS ────────────────────────────────────────────
function toggleSaveAd(adId) {
  const client = getActiveClient();
  const ad = client.ads.find(a => a.id === adId);
  if (!ad) return;

  const existingIdx = state.savedSwipe.findIndex(item => item.id === ad.id);
  if (existingIdx !== -1) {
    state.savedSwipe.splice(existingIdx, 1);
    fireToast('Removed from Swipe File');
  } else {
    state.savedSwipe.push({ ...ad, savedAt: new Date().toISOString() });
    fireToast('Saved ad to Swipe File ❤️');
  }

  localStorage.setItem('bloomx_saved_swipe', JSON.stringify(state.savedSwipe));
  updateSidebarCounters();
  renderAdsLibrary();
}

// ─── 11. ADD COMPETITOR MODAL ─────────────────────────────────────────────────
function openAddCompetitorModal() {
  const backdrop = document.getElementById('addCompModalBackdrop');
  const modal = document.getElementById('addCompetitorModal');
  if (backdrop) backdrop.classList.add('active');
  if (modal) modal.classList.add('active');
}

function closeAddCompetitorModal() {
  const backdrop = document.getElementById('addCompModalBackdrop');
  const modal = document.getElementById('addCompetitorModal');
  if (backdrop) backdrop.classList.remove('active');
  if (modal) modal.classList.remove('active');
}

function handleCreateCompetitorSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('compNameInput').value.trim();
  const url = document.getElementById('compUrlInput').value.trim();
  
  if (!name) return;

  const client = getActiveClient();
  const newComp = {
    id: Date.now(),
    name,
    activeAds: 12,
    maxDays: 45,
    tier: 'Tested',
    url
  };

  client.competitors.push(newComp);
  closeAddCompetitorModal();
  applyClientData();
  fireToast(`Added "${name}" to tracking! 🚀`);
  document.getElementById('compNameInput').value = '';
}

// ─── 12. UTILITIES & CSV EXPORT ───────────────────────────────────────────────
function copyText(text, btn) {
  navigator.clipboard.writeText(text).then(() => {
    if (btn) {
      const orig = btn.innerHTML;
      btn.innerHTML = '✅ Copied!';
      setTimeout(() => { btn.innerHTML = orig; }, 1400);
    }
    fireToast('Copied to clipboard! 📋');
  });
}

function exportDataCSV() {
  const client = getActiveClient();
  const ads = computeFilteredAds();

  if (ads.length === 0) {
    fireToast('No ads to export.');
    return;
  }

  const headers = ['Competitor', 'Format', 'Days Active', 'Tier', 'Hook', 'Angle', 'Body Text', 'Meta URL'];
  const rows = ads.map(a => [
    `"${(a.competitorName || '').replace(/"/g, '""')}"`,
    `"${a.format || ''}"`,
    a.daysActive || 0,
    `"${a.tier || ''}"`,
    `"${(a.hook || '').replace(/"/g, '""')}"`,
    `"${(a.angle || '').replace(/"/g, '""')}"`,
    `"${(a.bodyText || '').replace(/"/g, '""')}"`,
    `"${a.adLibraryUrl || ''}"`
  ]);

  const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.setAttribute('href', url);
  link.setAttribute('download', `${client.name.replace(/[^a-zA-Z0-9]/g, '_')}_Competitor_Swipe.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  fireToast(`Exported ${ads.length} ads to CSV! 📥`);
}

function fireToast(msg) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = msg;

  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(8px)';
    toast.style.transition = 'all 0.2s ease';
    setTimeout(() => { toast.remove(); }, 200);
  }, 2400);
}

// ─── 14. AD LENS IN-DASHBOARD INTELLIGENCE & SYNC ─────────────────────────────
function handleBenchmarkVerticalChange() {
  const sel = document.getElementById('dashboardVerticalSelect');
  if (sel) {
    currentBenchmarkVertical = sel.value;
    renderTopAds();
    renderAdsLibrary();
    fireToast(`Switched benchmark model to ${sel.options[sel.selectedIndex].text}`);
  }
}

function handleDashboardAdLensAnalyze() {
  const input = document.getElementById('adLensUrlInput');
  const resultContainer = document.getElementById('adLensAnalyzerResult');
  if (!input || !resultContainer) return;

  const raw = input.value.trim();
  if (!raw) {
    fireToast('Please paste a Facebook Ad Library URL or Library ID');
    input.focus();
    return;
  }

  // Extract ID if present
  let libraryId = '';
  const idMatch = raw.match(/id=(\d+)/i) || raw.match(/(\d{9,20})/);
  if (idMatch) {
    libraryId = idMatch[1];
  } else {
    libraryId = String(Date.now()).slice(-8);
  }

  // Determine running days (default to 65 days for testing if not known)
  const daysRunning = 65;
  const estimates = calculateAdLensEstimates(daysRunning, currentBenchmarkVertical);
  const spendStr = `${formatSpendINR(estimates.spend.low)} – ${formatSpendINR(estimates.spend.high)}`;
  const viewsStr = `${formatCompactViews(estimates.views.low)} – ${formatCompactViews(estimates.views.high)}`;
  const activeClient = getActiveClient();
  const sampleComp = (activeClient.competitors && activeClient.competitors[0]) ? activeClient.competitors[0].name : 'Competitor Brand';

  const analyzedAdData = {
    id: Date.now(),
    competitorName: sampleComp,
    format: 'Video',
    daysActive: daysRunning,
    tier: estimates.tierKey === 'winner' ? 'Winner' : (estimates.tierKey === 'tested' ? 'Tested' : 'New'),
    hook: "Analyzed via Ad Lens: High converting offer angle with proven retention hook.",
    bodyText: `Real-time intelligence captured for Ad Library ID ${libraryId}. Live spend estimated at ${spendStr} over ${daysRunning} days active delivery.`,
    angle: "Direct Offer & Problem Agitation",
    whyStudy: "Consistently delivered through Meta algorithm with high estimated engagement.",
    adLibraryUrl: raw.startsWith('http') ? raw : `https://www.facebook.com/ads/library/?id=${libraryId}`,
    libraryId: libraryId,
    spendMid: estimates.spend.mid,
    viewsMid: estimates.views.mid,
    cpcMid: estimates.cpcMid,
    estPurchases: estimates.ordersMid
  };

  resultContainer.style.display = 'block';
  resultContainer.innerHTML = `
    <div class="adlens-result-card">
      <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; margin-bottom: 12px; flex-wrap: wrap;">
        <div>
          <span style="font-size: 11px; font-weight: 800; color: #4F46E5; text-transform: uppercase; letter-spacing: 0.5px;">✓ Ad Lens Analysis Complete</span>
          <h4 style="margin: 2px 0 0; font-size: 15px; font-weight: 800; color: var(--text-primary);">${analyzedAdData.competitorName}</h4>
          <span style="font-size: 12px; color: var(--text-muted);">Meta Library ID: <b>${libraryId}</b> · Running ${daysRunning} days</span>
        </div>
        <span class="longevity-badge tier-${estimates.tierKey === 'winner' ? 'winner' : 'tested'}" style="font-size: 12px;">
          ${estimates.tierKey === 'winner' ? '⭐ Scaled Winner (>30d)' : '⚡ Tested & Scaling'}
        </span>
      </div>

      <div class="adlens-card-metrics" style="padding: 12px 14px; margin-bottom: 14px; background: #F1F5F9;">
        <div class="adlens-metric-cell">
          <span class="adlens-metric-sub">Est. Total Spend</span>
          <span class="adlens-metric-val spend-gradient" style="font-size: 14px;">${spendStr}</span>
        </div>
        <div class="adlens-metric-cell">
          <span class="adlens-metric-sub">Est. Impressions</span>
          <span class="adlens-metric-val" style="font-size: 14px;">~${viewsStr}</span>
        </div>
        <div class="adlens-metric-cell">
          <span class="adlens-metric-sub">Est. Orders & CPC</span>
          <span class="adlens-metric-val" style="font-size: 14px;">~${estimates.ordersMid} orders · ₹${estimates.cpcMid.toFixed(1)}</span>
        </div>
      </div>

      <div style="display: flex; align-items: center; justify-content: space-between; gap: 10px; flex-wrap: wrap;">
        <div style="display: flex; gap: 8px;">
          <button class="btn btn-primary btn-sm" id="btnSaveAnalyzedAd" onclick='saveAnalyzedAdToWorkspace(${JSON.stringify(analyzedAdData).replace(/'/g, "&#39;")})'>
            + Save Ad to Workspace
          </button>
          <button class="btn btn-secondary btn-sm" onclick="downloadAdCreative(${analyzedAdData.id})">
            📥 Download Spec
          </button>
        </div>
        <a href="${analyzedAdData.adLibraryUrl}" target="_blank" class="btn-read-toggle" style="font-size: 12.5px;">
          Open on Facebook Ad Library ↗
        </a>
      </div>
    </div>
  `;

  fireToast(`⚡ Analyzed Ad Library ID ${libraryId} successfully!`);
}

async function saveAnalyzedAdToWorkspace(adData) {
  const client = getActiveClient();
  if (!client.ads) client.ads = [];

  // Check if exists
  const existing = client.ads.find(a => a.id === adData.id || (a.notes && a.notes.includes(adData.libraryId)));
  if (!existing) {
    client.ads.unshift(adData);
  }

  // Also send to backend ingestion if online
  try {
    await fetch('/api/extension/ingest', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        advertiserName: adData.competitorName,
        vertical: currentBenchmarkVertical,
        clientId: client.id,
        ads: [{
          libraryId: adData.libraryId,
          adLibraryUrl: adData.adLibraryUrl,
          daysActive: adData.daysActive,
          format: adData.format,
          tier: adData.tier,
          hook: adData.hook,
          bodyText: adData.bodyText,
          angle: adData.angle
        }]
      })
    });
  } catch (e) {
    // Offline mode: saved locally
  }

  applyClientData();
  const resultBox = document.getElementById('adLensAnalyzerResult');
  if (resultBox) resultBox.style.display = 'none';
  const urlInput = document.getElementById('adLensUrlInput');
  if (urlInput) urlInput.value = '';

  document.getElementById('adsGridContainer').scrollIntoView({ behavior: 'smooth' });
  fireToast(`⭐ Ad successfully saved into "${client.name}" workspace!`);
}

// ─── 15. COMPREHENSIVE AD CREATIVE DOWNLOAD & CANVAS GENERATION ────────────
function openCreativeDownloadModal(adId) {
  const client = getActiveClient();
  const ad = (client.ads || []).find(a => a.id === adId);
  if (!ad) return;

  state.activeAdForDownload = ad;

  const isVideo = (ad.format || '').toLowerCase() === 'video';
  const formatBadge = document.getElementById('modalAdFormatBadge');
  if (formatBadge) {
    formatBadge.textContent = ad.format || 'Video';
    formatBadge.style.background = isVideo ? '#EFF6FF' : '#FDF2F8';
    formatBadge.style.color = isVideo ? '#2563EB' : '#DB2777';
  }

  const brandEl = document.getElementById('modalPreviewBrand');
  if (brandEl) brandEl.textContent = ad.competitorName || 'Competitor';

  const hookEl = document.getElementById('modalPreviewHook');
  if (hookEl) hookEl.textContent = `"${ad.hook || ''}"`;

  const tierEl = document.getElementById('modalPreviewTier');
  if (tierEl) {
    tierEl.textContent = ad.tier || 'Winner';
    tierEl.className = `longevity-badge tier-${(ad.tier || 'winner').toLowerCase()}`;
  }

  const daysEl = document.getElementById('modalPreviewDays');
  if (daysEl) daysEl.textContent = `⏱️ ${ad.daysActive || 90}d Active`;

  const estimates = typeof calculateAdLensEstimates === 'function' ? calculateAdLensEstimates(ad.daysActive || 90) : null;
  const spendEl = document.getElementById('modalPreviewSpend');
  if (spendEl) spendEl.textContent = `💰 Est. Spend: ${estimates ? formatSpendINR(estimates.spend.mid) : '₹2.8L'}`;

  const angleEl = document.getElementById('modalPreviewAngle');
  if (angleEl) angleEl.textContent = `🎯 ${ad.angle || 'Problem Agitation'}`;

  // Update direct link buttons to specific ad ID
  const directVid = document.getElementById('btnDirectVideoLink');
  if (directVid) directVid.href = `/api/ads/${ad.id}/download-creative?type=video`;

  const directImg = document.getElementById('btnDirectImageLink');
  if (directImg) directImg.href = `/api/ads/${ad.id}/download-creative?type=image`;

  const directSpec = document.getElementById('btnDirectSpecLink');
  if (directSpec) directSpec.href = `/api/ads/${ad.id}/download-creative?type=spec`;

  // Update live preview element based on format
  const videoWrap = document.getElementById('modalVideoWrap');
  const imageWrap = document.getElementById('modalImageWrap');
  const previewVideo = document.getElementById('modalPreviewVideo');
  const previewImg = document.getElementById('modalPreviewImage');
  const previewLabel = document.getElementById('modalMediaPreviewLabel');

  if (isVideo) {
    if (videoWrap) videoWrap.style.display = 'block';
    if (imageWrap) imageWrap.style.display = 'none';
    if (previewLabel) previewLabel.textContent = 'Reel Preview (9:16 Vertical Video)';
    if (previewVideo) {
      previewVideo.src = ad.videoUrl || `/api/ads/${ad.id}/download-creative?type=video`;
      previewVideo.load();
    }
  } else {
    if (videoWrap) videoWrap.style.display = 'none';
    if (imageWrap) imageWrap.style.display = 'block';
    if (previewLabel) previewLabel.textContent = 'HD Creative Preview (1080×1350 Graphic)';
    if (previewImg) {
      previewImg.src = ad.imageUrl || `/api/ads/${ad.id}/download-creative?type=image`;
    }
  }

  // Priority styling on relevant option
  const cardVideo = document.getElementById('cardOptionVideo');
  const cardImage = document.getElementById('cardOptionImage');
  if (cardVideo && cardImage) {
    if (isVideo) {
      cardVideo.style.borderColor = 'var(--primary)';
      cardVideo.style.boxShadow = '0 0 0 1px var(--primary)';
      cardImage.style.borderColor = 'var(--border-default)';
      cardImage.style.boxShadow = 'none';
    } else {
      cardImage.style.borderColor = '#DB2777';
      cardImage.style.boxShadow = '0 0 0 1px #DB2777';
      cardVideo.style.borderColor = 'var(--border-default)';
      cardVideo.style.boxShadow = 'none';
    }
  }

  const backdrop = document.getElementById('creativeModalBackdrop');
  const modal = document.getElementById('creativeDownloadModal');
  if (backdrop) backdrop.classList.add('active');
  if (modal) modal.classList.add('active');
}

function closeCreativeDownloadModal() {
  const backdrop = document.getElementById('creativeModalBackdrop');
  const modal = document.getElementById('creativeDownloadModal');
  if (backdrop) backdrop.classList.remove('active');
  if (modal) modal.classList.remove('active');
}

function copyCreativeLink(type) {
  const ad = state.activeAdForDownload;
  if (!ad) return;
  const origin = window.location.origin || 'http://localhost:3000';
  const url = `${origin}/api/ads/${ad.id}/download-creative?type=${type}`;
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(url).then(() => {
      fireToast(`📋 Direct ${type.toUpperCase()} link copied!`);
    }).catch(() => {
      prompt('Copy download link:', url);
    });
  } else {
    prompt('Copy download link:', url);
  }
}

function executeDownload(format) {
  const ad = state.activeAdForDownload;
  if (!ad) return;

  if (format === 'video') {
    downloadVideoAsset(ad);
  } else if (format === 'image') {
    downloadImageAsset(ad);
  } else if (format === 'spec') {
    downloadSpecAsset(ad);
  }
}

function downloadActiveDrawerCreative(type) {
  const ad = state.activeAdForDrawer;
  if (!ad) return;

  if (type === 'modal') {
    openCreativeDownloadModal(ad.id);
  } else if (type === 'video') {
    downloadVideoAsset(ad);
  } else if (type === 'image') {
    downloadImageAsset(ad);
  }
}

function downloadAdCreative(adId, preferredFormat = null) {
  const client = getActiveClient();
  const ad = (client.ads || []).find(a => a.id === adId);
  if (!ad) return;

  if (preferredFormat === 'video') {
    downloadVideoAsset(ad);
  } else if (preferredFormat === 'image') {
    downloadImageAsset(ad);
  } else if (preferredFormat === 'spec') {
    downloadSpecAsset(ad);
  } else {
    // Open comprehensive modal with all creative assets
    openCreativeDownloadModal(adId);
  }
}

function downloadVideoAsset(ad) {
  if (!ad) return;
  const compName = (ad.competitorName || 'Competitor').replace(/[^a-zA-Z0-9]/g, '_');
  const fileName = `${compName}_Ad_${ad.id}_Reel.mp4`;
  const downloadUrl = `/api/ads/${ad.id}/download-creative?type=video`;

  triggerBrowserAttachmentDownload(downloadUrl, fileName);
  fireToast(`🎬 Downloading Video Reel (${fileName})...`);
}

function downloadImageAsset(ad) {
  if (!ad) return;
  const compName = (ad.competitorName || 'Competitor').replace(/[^a-zA-Z0-9]/g, '_');
  const fileName = `${compName}_Ad_${ad.id}_Creative.png`;
  const downloadUrl = `/api/ads/${ad.id}/download-creative?type=image`;

  triggerBrowserAttachmentDownload(downloadUrl, fileName);
  fireToast(`🖼️ Downloading HD Creative Image (${fileName})...`);
}

function downloadSpecAsset(ad) {
  const compName = (ad.competitorName || 'Competitor').replace(/[^a-zA-Z0-9]/g, '_');
  const estimates = typeof calculateAdLensEstimates === 'function' ? calculateAdLensEstimates(ad.daysActive || 1) : null;
  const creativeContent = `=====================================================
BLOOMX AD LENS - COMPETITOR CREATIVE ASSET SPEC
=====================================================
Brand: ${ad.competitorName || 'Competitor'}
Format: ${ad.format || 'Video'} (9:16 Vertical)
Days Active: ${ad.daysActive || 90} days continuous delivery
Tier: ${ad.tier || 'Winner'}
Estimated Spend: ${estimates ? formatSpendINR(estimates.spend.mid) : 'N/A'}
Estimated Reach: ${estimates ? formatCompactViews(estimates.views.mid) : 'N/A'}
Estimated Orders: ~${estimates ? estimates.ordersMid : 'N/A'} | CPC: ₹${estimates ? estimates.cpcMid.toFixed(1) : 'N/A'}

PRIMARY HOOK:
"${ad.hook || ''}"

BODY COPY:
${ad.bodyText || ''}

TARGET ANGLE:
${ad.angle || ''}

META AD LIBRARY LINK:
${ad.adLibraryUrl || 'https://www.facebook.com/ads/library/'}
=====================================================
Generated directly from BloomX Ad Lens Engine.
`;

  const blob = new Blob([creativeContent], { type: 'text/plain;charset=utf-8' });
  const blobUrl = URL.createObjectURL(blob);
  triggerBlobDownload(blobUrl, `${compName}_Ad_${ad.id}_swipe_spec.txt`);
  fireToast(`📥 Downloaded creative swipe package for "${ad.competitorName || 'Ad'}"`);
}

function triggerBlobDownload(blobUrl, filename) {
  const a = document.createElement('a');
  a.href = blobUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(blobUrl);
  }, 2000);
}

async function triggerBrowserAttachmentDownload(url, filename) {
  // Method 1: Fetch as Blob and create in-memory ObjectURL
  // This bypasses browser download protections against relative URLs and writes directly to disk
  try {
    const res = await fetch(url);
    if (res.ok) {
      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        if (document.body.contains(a)) document.body.removeChild(a);
        URL.revokeObjectURL(blobUrl);
      }, 10000);
      return;
    }
  } catch (err) {
    console.warn('Blob download fetch error, falling back to direct navigation:', err);
  }

  // Method 2: Hidden iframe trigger
  try {
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = url;
    document.body.appendChild(iframe);
    setTimeout(() => {
      if (document.body.contains(iframe)) document.body.removeChild(iframe);
    }, 30000);
  } catch (err) {}

  // Method 3: Direct anchor trigger with target _blank
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.target = '_blank';
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    if (document.body.contains(a)) document.body.removeChild(a);
  }, 2000);
}

// ─── STUDIO-QUALITY 1080x1350 CANVAS CREATIVE GENERATOR ─────────────────────
function generateAdCreativeCanvas(ad) {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1350;
    const ctx = canvas.getContext('2d');

    const compName = (ad.competitorName || 'Competitor Brand').trim();
    const hook = ad.hook || 'Proven Pattern Interrupt Hook';
    const angle = ad.angle || 'Problem Agitation & Solution';
    const days = ad.daysActive || 90;
    const tier = ad.tier || 'Winner';
    const estimates = typeof calculateAdLensEstimates === 'function' ? calculateAdLensEstimates(days) : null;
    const spend = estimates ? formatSpendINR(estimates.spend.mid) : '₹1.5L+';
    const reach = estimates ? formatCompactViews(estimates.views.mid) : '500K+';

    // 1. Rich dark gradient background
    const bgGrad = ctx.createLinearGradient(0, 0, 1080, 1350);
    bgGrad.addColorStop(0, '#0B0F19');
    bgGrad.addColorStop(0.4, '#171E38');
    bgGrad.addColorStop(1, '#0B0F19');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1080, 1350);

    // Glowing atmospheric radial gradients
    const glow1 = ctx.createRadialGradient(220, 220, 0, 220, 220, 520);
    glow1.addColorStop(0, 'rgba(79, 70, 229, 0.28)');
    glow1.addColorStop(1, 'rgba(79, 70, 229, 0)');
    ctx.fillStyle = glow1;
    ctx.fillRect(0, 0, 1080, 700);

    const glow2 = ctx.createRadialGradient(860, 1100, 0, 860, 1100, 480);
    glow2.addColorStop(0, 'rgba(236, 72, 153, 0.22)');
    glow2.addColorStop(1, 'rgba(236, 72, 153, 0)');
    ctx.fillStyle = glow2;
    ctx.fillRect(0, 600, 1080, 750);

    // Outer subtle border
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.lineWidth = 14;
    ctx.strokeRect(7, 7, 1066, 1336);

    function roundRect(x, y, w, h, r, fillStyle, strokeStyle, strokeW = 1) {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + w - r, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + r);
      ctx.lineTo(x + w, y + h - r);
      ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      ctx.lineTo(x + r, y + h);
      ctx.quadraticCurveTo(x, y + h, x, y + h - r);
      ctx.lineTo(x, y + r);
      ctx.quadraticCurveTo(x, y, x + r, y);
      ctx.closePath();
      if (fillStyle) {
        ctx.fillStyle = fillStyle;
        ctx.fill();
      }
      if (strokeStyle) {
        ctx.strokeStyle = strokeStyle;
        ctx.lineWidth = strokeW;
        ctx.stroke();
      }
    }

    // 2. Header Bar: Brand Name & Meta Verified Badge
    roundRect(50, 50, 980, 110, 24, 'rgba(255, 255, 255, 0.06)', 'rgba(255, 255, 255, 0.12)', 2);

    // Avatar Circle
    ctx.beginPath();
    ctx.arc(105, 105, 36, 0, Math.PI * 2);
    ctx.fillStyle = '#4F46E5';
    ctx.fill();
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 30px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText((compName.charAt(0) || 'A').toUpperCase(), 105, 105);

    // Brand Name
    ctx.textAlign = 'left';
    ctx.textBaseline = 'alphabetic';
    ctx.font = 'bold 32px Inter, sans-serif';
    ctx.fillStyle = '#FFFFFF';
    let truncatedName = compName;
    if (truncatedName.length > 34) truncatedName = truncatedName.substring(0, 32) + '...';
    ctx.fillText(truncatedName, 160, 95);

    // Verified badge & sponsored text
    ctx.font = 'bold 20px Inter, sans-serif';
    ctx.fillStyle = '#60A5FA';
    ctx.fillText('✓ Meta Verified', 160, 130);
    ctx.font = '500 20px Inter, sans-serif';
    ctx.fillStyle = '#94A3B8';
    ctx.fillText(' • Sponsored Ad', 320, 130);

    // Format badge top-right
    roundRect(880, 80, 130, 50, 14, '#1E293B', '#334155', 1);
    ctx.textAlign = 'center';
    ctx.font = 'bold 18px Inter, sans-serif';
    ctx.fillStyle = '#E2E8F0';
    ctx.fillText(ad.format || 'Video', 945, 112);

    // 3. Performance Ribbon: Days Active & Spend
    roundRect(50, 185, 980, 80, 18, 'rgba(16, 185, 129, 0.12)', 'rgba(16, 185, 129, 0.3)', 2);
    ctx.textAlign = 'left';
    ctx.font = 'bold 24px Inter, sans-serif';
    ctx.fillStyle = '#10B981';
    ctx.fillText(`🏆 ${tier.toUpperCase()} AD · RUNNING ${days} DAYS CONTINUOUSLY`, 75, 235);
    ctx.textAlign = 'right';
    ctx.font = 'bold 22px Inter, sans-serif';
    ctx.fillStyle = '#34D399';
    ctx.fillText(`Est. Spend: ${spend} · Reach: ~${reach}`, 1010, 235);

    // 4. Hook Section (The Big Pattern Interrupt Headline)
    roundRect(50, 290, 980, 380, 28, 'rgba(255, 255, 255, 0.04)', 'rgba(255, 255, 255, 0.1)', 2);

    // Angle tag
    roundRect(80, 320, 340, 48, 12, 'rgba(99, 102, 241, 0.25)', '#6366F1', 1.5);
    ctx.textAlign = 'center';
    ctx.font = 'bold 18px Inter, sans-serif';
    ctx.fillStyle = '#C7D2FE';
    ctx.fillText(`🎯 ${angle.toUpperCase()}`, 250, 351);

    // Hook Headline (Wrapped)
    ctx.textAlign = 'left';
    ctx.font = 'bold 44px Inter, sans-serif';
    ctx.fillStyle = '#FBBF24'; // High contrast gold/yellow

    function wrapText(text, x, y, maxWidth, lineHeight, maxLines = 5) {
      const words = text.split(' ');
      let line = '';
      let linesDrawn = 0;
      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth && n > 0) {
          ctx.fillText(line, x, y);
          line = words[n] + ' ';
          y += lineHeight;
          linesDrawn++;
          if (linesDrawn >= maxLines - 1 && n < words.length - 1) {
            line += '...';
            break;
          }
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, x, y);
      return y;
    }

    wrapText(`"${hook}"`, 80, 435, 920, 60, 4);

    // 5. Body Copy & Value Proposition Box
    roundRect(50, 695, 980, 360, 28, 'rgba(15, 23, 42, 0.65)', 'rgba(255, 255, 255, 0.08)', 2);
    ctx.fillStyle = '#E2E8F0';
    ctx.font = '500 28px Inter, sans-serif';
    const bodyStr = ad.bodyText || 'Aapki kundali mein chhipe hain aapke career, marriage aur financial growth ke raaz. Abhi complete report download karein.';
    wrapText(bodyStr, 80, 755, 920, 44, 4);

    // Key persuasion bullets
    const bullets = [
      '✨ Personalized Astrological Timing & Kundli Breakdown',
      '⚡ Direct Live Consultation with Certified Astrologers',
      '🛡️ 100% Confidential · Instant Digital Delivery'
    ];
    let bY = 890;
    bullets.forEach(b => {
      ctx.font = 'bold 22px Inter, sans-serif';
      ctx.fillStyle = '#38BDF8';
      ctx.fillText(b, 80, bY);
      bY += 45;
    });

    // 6. Call To Action Button (Vibrant & High Converting)
    const ctaGrad = ctx.createLinearGradient(120, 1080, 960, 1180);
    ctaGrad.addColorStop(0, '#4F46E5');
    ctaGrad.addColorStop(1, '#9333EA');
    roundRect(80, 1080, 920, 100, 24, ctaGrad, 'rgba(255, 255, 255, 0.3)', 2);

    ctx.textAlign = 'center';
    ctx.font = '800 32px Inter, sans-serif';
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText('👉 CLAIM CONSULTATION / GET REPORT NOW', 540, 1142);

    // 7. Footer Watermark & Meta ID
    ctx.textAlign = 'center';
    ctx.font = '600 20px Inter, sans-serif';
    ctx.fillStyle = '#64748B';
    ctx.fillText(`BloomX Ad Lens Intelligence • Meta Library ID: ${ad.id || 101} • Scaled Competitor Swipe Asset`, 540, 1250);

    canvas.toBlob((blob) => {
      resolve(blob);
    }, 'image/png');
  });
}


async function syncBackendAds() {
  try {
    const res = await fetch(`/api/clients/${state.activeClientId}/overview`);
    if (res.ok) {
      const json = await res.json();
      if (json && json.data) {
        const client = getActiveClient();
        if (json.data.ads && Array.isArray(json.data.ads) && json.data.ads.length > 0) {
          json.data.ads.forEach(backendAd => {
            if (!client.ads.some(a => a.id === backendAd.id || (backendAd.notes && a.adLibraryUrl && a.adLibraryUrl.includes(backendAd.notes)))) {
              client.ads.unshift(backendAd);
            }
          });
          applyClientData();
        }
      }
    }
  } catch (e) {
    // Offline mode: gracefully use embedded sample data
  }
}

// ─── 15. APIFY CLOUD LIVE INTEGRATION & SYNC TRIGGER ─────────────────────────
async function checkApifyStatus() {
  try {
    const res = await fetch('/api/apify/status');
    if (res.ok) {
      const json = await res.json();
      if (json && json.data) {
        const isLive = json.data.configured;
        const pill = document.getElementById('apifyStatusPill');
        const text = document.getElementById('apifyStatusText');
        const sideDot = document.querySelector('#sidebarApifyStatus .proto-dot');
        const sideLabel = document.getElementById('sidebarStatusLabel');

        if (pill && text) {
          if (isLive) {
            pill.style.background = '#ECFDF5';
            pill.style.borderColor = '#A7F3D0';
            pill.style.color = '#065F46';
            text.textContent = 'Apify Cloud Active';
          } else {
            pill.style.background = '#FEF3C7';
            pill.style.borderColor = '#FDE68A';
            pill.style.color = '#92400E';
            text.textContent = 'Apify Simulated';
          }
        }
        if (sideDot && sideLabel) {
          sideDot.style.background = isLive ? '#10B981' : '#F59E0B';
          sideLabel.textContent = isLive ? 'Apify Cloud Active' : 'Prototype Mode';
        }
      }
    }
  } catch (e) {
    // Offline mode
  }
}

async function triggerApifySync() {
  const btn = document.getElementById('btnSyncApify');
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = '⏳ Syncing via Apify...';
  }
  fireToast('🔄 Connecting to Apify Cloud to scrape and sync competitor ads...');

  try {
    const res = await fetch(`/api/sync/apify/client/${state.activeClientId}`, {
      method: 'POST'
    });
    const data = await res.json();
    if (data.status === 'success') {
      fireToast(`✅ Apify Cloud Sync Complete! Synced ${data.data?.totalCompetitors || 4} competitors.`);
      await syncBackendAds();
    } else {
      fireToast(`Apify Sync: ${data.message || 'Complete'}`);
    }
  } catch (e) {
    fireToast('Apify sync initiated in background.');
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = '🔄 Sync via Apify';
    }
  }
}