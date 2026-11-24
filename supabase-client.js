/**
 * Supabase Client & Configuration
 * 100% Free Tier Ready
 */

// Replace these with your Supabase Project Settings > API credentials
const SUPABASE_CONFIG = {
    // Connected to your live Supabase project
    url: 'https://efyqftxjtylvaoqhqptb.supabase.co',
    anonKey: 'sb_publishable_WtIo91bnJaIRG7W0ITRR8w_-50i2_kY'
};

// Local Storage Fallback & Cache for zero-cost operation
const LOCAL_STORAGE_KEYS = {
    METAL_RATES: 'jewellery_metal_rates',
    CART: 'jewellery_cart',
    SETTINGS: 'jewellery_settings',
    LAST_SYNC: 'jewellery_metal_last_sync'
};

// Initialize Supabase Client if library is loaded
let supabaseClient = null;
try {
    if (typeof supabase !== 'undefined' && supabase.createClient) {
        supabaseClient = supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
    }
} catch (e) {
    console.warn('Supabase initialization fallback:', e);
}

// Default Baseline Rates (Updated daily via API or Admin)
const DEFAULT_FALLBACK_RATES = [
    { metal_type: 'gold_24k', metal_name: '24K Pure Gold', rate_per_gram: 7850.00, change_24h: 0.45 },
    { metal_type: 'gold_22k', metal_name: '22K Gold', rate_per_gram: 7250.00, change_24h: 0.42 },
    { metal_type: 'gold_18k', metal_name: '18K Gold', rate_per_gram: 5950.00, change_24h: 0.38 },
    { metal_type: 'silver_999', metal_name: '999 Fine Silver', rate_per_gram: 94.00, change_24h: -0.15 },
    { metal_type: 'silver_925', metal_name: '925 Sterling Silver', rate_per_gram: 87.50, change_24h: -0.10 }
];

/**
 * Metal Price Manager
 */
const MetalPriceService = {
    async getRates() {
        // 1. Try Supabase first if connected
        if (supabaseClient && SUPABASE_CONFIG.url !== 'https://xyzcompanyplaceholder.supabase.co') {
            try {
                const { data, error } = await supabaseClient
                    .from('metal_rates')
                    .select('*');
                if (!error && data && data.length > 0) {
                    localStorage.setItem(LOCAL_STORAGE_KEYS.METAL_RATES, JSON.stringify(data));
                    return data;
                }
            } catch (err) {
                console.warn('Failed to fetch rates from Supabase, checking local cache:', err);
            }
        }

        // 2. Check LocalStorage Cache
        const cached = localStorage.getItem(LOCAL_STORAGE_KEYS.METAL_RATES);
        if (cached) {
            try {
                return JSON.parse(cached);
            } catch (e) {}
        }

        // 3. Fallback to baseline default rates
        localStorage.setItem(LOCAL_STORAGE_KEYS.METAL_RATES, JSON.stringify(DEFAULT_FALLBACK_RATES));
        return DEFAULT_FALLBACK_RATES;
    },

    /**
     * Calculate dynamic jewellery price
     * Formula: [(Weight * Rate) + Making Charges + Stone] * (1 + GST)
     */
    calculatePrice(product, rates) {
        if (!product.is_metal_dynamic && product.fixed_price) {
            return parseFloat(product.fixed_price);
        }

        const metalType = product.metal_type || 'gold_22k';
        const weight = parseFloat(product.metal_weight_grams) || 0;
        const makingCharge = parseFloat(product.making_charge_value) || 0;
        const stoneCharge = parseFloat(product.stone_charge) || 0;
        const gstPercent = parseFloat(product.gst_percent) || 3.0;

        const rateObj = rates.find(r => r.metal_type === metalType) || 
                        rates.find(r => r.metal_type === 'gold_22k') || 
                        { rate_per_gram: 7250.00 };

        const metalCost = weight * rateObj.rate_per_gram;
        const subtotal = metalCost + makingCharge + stoneCharge;
        const totalWithGst = subtotal * (1 + (gstPercent / 100));

        return {
            ratePerGram: rateObj.rate_per_gram,
            metalCost: Math.round(metalCost),
            makingCharge: Math.round(makingCharge),
            stoneCharge: Math.round(stoneCharge),
            gstAmount: Math.round(subtotal * (gstPercent / 100)),
            finalPrice: Math.round(totalWithGst)
        };
    }
};

window.SUPABASE_CONFIG = SUPABASE_CONFIG;
window.MetalPriceService = MetalPriceService;
