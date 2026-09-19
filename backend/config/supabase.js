require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

const isSupabaseConfigured = SUPABASE_URL && 
                             !SUPABASE_URL.includes('your-project-ref') && 
                             SUPABASE_ANON_KEY && 
                             !SUPABASE_ANON_KEY.includes('your-anon-key');

let supabase = null;

if (isSupabaseConfigured) {
    try {
        supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        console.log('⚡ Connected to Supabase PostgreSQL database.');
    } catch (e) {
        console.warn('⚠️ Could not connect to Supabase, fallback to memory store:', e.message);
    }
} else {
    console.log('ℹ️  Running in Local Fast Memory mode (Supabase credentials not configured in .env).');
}

module.exports = {
    supabase,
    isSupabaseConfigured: !!supabase
};
