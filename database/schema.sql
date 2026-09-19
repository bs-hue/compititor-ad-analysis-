-- ==============================================================================
-- COMPETITOR INTELLIGENCE & AD SWIPE ENGINE - SUPABASE DATABASE SCHEMA
-- Run this script in the Supabase SQL Editor to initialize all tables and seed data.
-- ==============================================================================

-- 1. Create Clients Table
CREATE TABLE IF NOT EXISTS clients (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    niche TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create Competitors Table
CREATE TABLE IF NOT EXISTS competitors (
    id BIGSERIAL PRIMARY KEY,
    client_id BIGINT NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    ad_library_url TEXT,
    active_ad_count INT DEFAULT 0,
    max_days_active INT DEFAULT 0,
    tier TEXT DEFAULT 'Active', -- 'Whale', 'Active', 'Testing'
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create Swipe Data (Ad Intelligence) Table
CREATE TABLE IF NOT EXISTS swipe_data (
    id BIGSERIAL PRIMARY KEY,
    client_id BIGINT NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
    competitor_id BIGINT REFERENCES competitors(id) ON DELETE SET NULL,
    competitor_name TEXT NOT NULL,
    ad_library_url TEXT,
    days_active INT DEFAULT 0,
    tier TEXT DEFAULT 'New', -- 'Winner', 'Tested', 'New'
    format TEXT DEFAULT 'Image', -- 'Video', 'Image', 'Carousel'
    hook TEXT,
    body_text TEXT,
    angle TEXT DEFAULT 'Direct Offer',
    ad_format_type TEXT,
    video_path TEXT,
    image_path TEXT,
    notes TEXT,
    ad_archive_id TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Create Performance Indexes for Fast Querying
CREATE INDEX IF NOT EXISTS idx_competitors_client_id ON competitors(client_id);
CREATE INDEX IF NOT EXISTS idx_swipe_data_client_id ON swipe_data(client_id);
CREATE INDEX IF NOT EXISTS idx_swipe_data_competitor_id ON swipe_data(competitor_id);
CREATE INDEX IF NOT EXISTS idx_swipe_data_days_active ON swipe_data(days_active DESC);

-- ==============================================================================
-- INITIAL SEED DATA (Clients, Competitors & Curated Ads)
-- ==============================================================================

-- Seed Clients
INSERT INTO clients (id, name, niche) VALUES
(1, 'Master Kundli Report By Ankit Batra', 'Astrology & Kundli Prediction Reports'),
(2, 'Gemsguruji', 'Certified Astrological Gemstones, Rudraksha & Healing Crystals'),
(3, 'Smart Kundli', 'AI-Powered Instant Horoscope & Kundli Reports')
ON CONFLICT (name) DO UPDATE SET niche = EXCLUDED.niche;

-- Seed Competitors for Client 1 (Master Kundli)
INSERT INTO competitors (id, client_id, name, ad_library_url, active_ad_count, max_days_active, tier, notes) VALUES
(1, 1, 'Premium Personalized Kundali By Astro Arun Pandit', 'https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=IN&is_targeted_country=false&media_type=all&q=premium%20personalized%20kundli&search_type=keyword_unordered&sort_data[direction]=desc&sort_data[mode]=total_impressions', 42, 285, 'Whale', 'Heavy volume tester. Strong video hooks focusing on Dosha remedies, marriage timing, and career obstacles.'),
(2, 1, 'Smart Kundli By Aditya Kundli', 'https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=IN&is_targeted_country=false&media_type=all&q=smart%20kundli&search_type=keyword_unordered&sort_data[direction]=desc&sort_data[mode]=total_impressions', 29, 195, 'Active', 'Features instant computerized AI Kundli report hooks with 50+ page customized horoscope breakdowns.'),
(3, 1, 'Astrotalk', 'https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=IN&is_targeted_country=false&media_type=all&q=astro%20talk&search_type=keyword_unordered&sort_data[direction]=desc&sort_data[mode]=total_impressions', 210, 340, 'Whale', 'Dominant category spender. First chat FREE tripwire, celebrity influencer ads, and relationship/marriage problem hooks.'),
(4, 1, 'InstaAstro', 'https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=IN&is_targeted_country=false&media_type=all&search_type=page&sort_data[direction]=desc&sort_data[mode]=total_impressions&view_all_page_id=102828808210151', 85, 240, 'Whale', 'Aggressive ₹1 first consultation offer, daily live horoscope streams, and Kundli matching features.')
ON CONFLICT (id) DO NOTHING;

-- Seed Competitors for Client 2 (Gemsguruji)
INSERT INTO competitors (id, client_id, name, ad_library_url, active_ad_count, max_days_active, tier, notes) VALUES
(5, 2, 'Japam', 'https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=IN&is_targeted_country=false&media_type=all&search_type=page&sort_data[direction]=desc&sort_data[mode]=total_impressions&view_all_page_id=110074208598705', 68, 310, 'Whale', 'Massive scale on Karungali wood bracelets, 5-Mukhi Rudraksha malas, and silver Vedic mantra pendants. High UGC talking head ads.'),
(6, 2, 'Divine Hindu', 'https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=IN&is_targeted_country=false&media_type=all&q=Divine%20Hindu&search_type=keyword_unordered&sort_data[direction]=desc&sort_data[mode]=total_impressions', 34, 215, 'Active', 'Micro Hanuman Chalisa pendants, Sri Yantra energy plates, brass deities, and energized home protection items.'),
(7, 2, 'Crystals by Astrotalk', 'https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=IN&is_targeted_country=false&media_type=all&q=Crystals%20by%20Astrotalk&search_type=keyword_unordered&sort_data[direction]=desc&sort_data[mode]=total_impressions', 52, 260, 'Whale', 'Pyrite (Money Magnet stone), Green Aventurine, Rose Quartz love bracelets. Endorsed heavily by top celebrity astrologers.'),
(8, 2, 'Gemsmantra', 'https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=IN&is_targeted_country=false&media_type=all&q=Gemsmantra&search_type=keyword_unordered&sort_data[direction]=desc&sort_data[mode]=total_impressions', 26, 175, 'Active', 'Natural 100% certified gemstones (Pukhraj, Neelam, Manik, Panna) with Vedic Pran Pratishtha certification and free consultation.'),
(9, 2, 'Mesmerize', 'https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=IN&is_targeted_country=false&media_type=all&q=Mesmerize%20&search_type=keyword_unordered&sort_data[direction]=desc&sort_data[mode]=total_impressions', 45, 190, 'Active', 'Modern Evil Eye jewelry, Nazariya protection bracelets, aesthetic spiritual gifting for couples and young professionals.')
ON CONFLICT (id) DO NOTHING;

-- Seed Competitors for Client 3 (Smart Kundli)
INSERT INTO competitors (id, client_id, name, ad_library_url, active_ad_count, max_days_active, tier, notes) VALUES
(10, 3, 'Astrotalk', 'https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=IN&is_targeted_country=false&media_type=all&q=astro%20talk&search_type=keyword_unordered&sort_data[direction]=desc&sort_data[mode]=total_impressions', 210, 340, 'Whale', 'Dominant category spender. First chat FREE tripwire, celebrity influencer ads, and relationship/marriage problem hooks.'),
(11, 3, 'InstaAstro', 'https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=IN&is_targeted_country=false&media_type=all&search_type=page&sort_data[direction]=desc&sort_data[mode]=total_impressions&view_all_page_id=102828808210151', 85, 240, 'Whale', 'Aggressive ₹1 first consultation offer, daily live horoscope streams, and Kundli matching features.'),
(12, 3, 'Love Bhushan', 'https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=IN&is_targeted_country=false&media_type=all&q=love%20bhushan&search_type=keyword_unordered&sort_data[direction]=desc&sort_data[mode]=total_impressions', 38, 190, 'Active', 'Direct horoscope analysis, Raj Yoga timing, Sade Sati mitigation remedies, and personal consultation booking.')
ON CONFLICT (id) DO NOTHING;

-- Seed Sample High-Performing Ads
INSERT INTO swipe_data (id, client_id, competitor_id, competitor_name, ad_library_url, days_active, tier, format, hook, body_text, angle, ad_format_type, notes) VALUES
(1, 1, 1, 'Premium Personalized Kundali By Astro Arun Pandit', 'https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=IN&is_targeted_country=false&media_type=all&q=premium%20personalized%20kundli&search_type=keyword_unordered&sort_data[direction]=desc&sort_data[mode]=total_impressions', 285, 'Winner', 'Video', 'Koshish ke baad bhi safalta nahi mil rahi? Check karein aapka Graha Dosh.', 'Aapki kundali mein chhipe hain aapke career, marriage aur financial growth ke raaz. Abhi download karein apni complete personalized report with accurate predictions.', 'Dosha & Problem Agitation', 'Direct Video Hook', 'Core evergreen conversion ad.'),
(2, 2, 5, 'Japam', 'https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=IN&is_targeted_country=false&media_type=all&search_type=page&sort_data[direction]=desc&sort_data[mode]=total_impressions&view_all_page_id=110074208598705', 310, 'Winner', 'Video', 'Original Karungali Mala pehanne ke yeh 3 chamatkari fayde jante hain aap?', '100% Original Karungali (Ebony Wood) Mala certified by Vedic priests. Attracts positive energy, shields from negative vibrations, and brings mental peace.', 'Spiritual Proof & Protection', 'UGC Video', 'Long-running top creative in spiritual jewelry.'),
(3, 3, 10, 'Astrotalk', 'https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=IN&is_targeted_country=false&media_type=all&q=astro%20talk&search_type=keyword_unordered&sort_data[direction]=desc&sort_data[mode]=total_impressions', 340, 'Winner', 'Video', 'First Consultation is 100% FREE! Talk to India''s top Verified Astrologers now.', 'Chat with 15,000+ verified Vedic astrologers, tarot readers, and numerologists. Get immediate answers to love, career, and marriage doubts. Claim your free session now.', 'Free Entry Offer', 'UGC Testimonial', 'Category-leading tripwire conversion creative.'),
(4, 3, 11, 'InstaAstro', 'https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=IN&is_targeted_country=false&media_type=all&search_type=page&sort_data[direction]=desc&sort_data[mode]=total_impressions&view_all_page_id=102828808210151', 240, 'Winner', 'Image', 'Sirf ₹1 mein baat karein Certified Astrologer se aur payein apni Janam Kundli ka sach!', 'Pehle 5 minute sirf ₹1 mein! Janam Kundli analysis, Grah Dosh nivaran aur career guidance ke liye aaj hi consult karein.', 'Micro-Tripwire (₹1 Consultation)', 'High-Contrast Banner', 'Aggressive volume driver.')
ON CONFLICT (id) DO NOTHING;

-- Adjust sequence values to prevent primary key collisions on new inserts
SELECT setval('clients_id_seq', (SELECT MAX(id) FROM clients));
SELECT setval('competitors_id_seq', (SELECT MAX(id) FROM competitors));
SELECT setval('swipe_data_id_seq', (SELECT MAX(id) FROM swipe_data));
