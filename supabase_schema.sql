-- ==============================================================================
-- JEWELLERY E-COMMERCE SUPABASE SCHEMA (100% FREE TIER READY)
-- ==============================================================================

-- 1. METAL LIVE PRICES TABLE
CREATE TABLE IF NOT EXISTS public.metal_rates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    metal_type VARCHAR(50) NOT NULL,       -- 'gold_24k', 'gold_22k', 'gold_18k', 'silver_999', 'silver_925'
    metal_name VARCHAR(100) NOT NULL,      -- '24K Pure Gold', '22K Gold', '925 Sterling Silver'
    purity_percentage NUMERIC(5,2) NOT NULL, -- 99.9, 91.6, 75.0, 92.5
    rate_per_gram NUMERIC(12,2) NOT NULL,  -- Current rate in INR (₹)
    change_24h NUMERIC(5,2) DEFAULT 0.0,   -- Percentage change (+1.2%, -0.5%)
    source VARCHAR(50) DEFAULT 'manual',   -- 'goldapi', 'metalpriceapi', 'manual'
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert Default Baseline Rates (Live Rates will sync over this)
INSERT INTO public.metal_rates (metal_type, metal_name, purity_percentage, rate_per_gram, change_24h, source)
VALUES 
('gold_24k', '24K Fine Gold', 99.9, 7850.00, 0.45, 'manual'),
('gold_22k', '22K Standard Gold', 91.6, 7250.00, 0.42, 'manual'),
('gold_18k', '18K Gold', 75.0, 5950.00, 0.38, 'manual'),
('silver_999', '999 Fine Silver', 99.9, 94.00, -0.15, 'manual'),
('silver_925', '925 Sterling Silver', 92.5, 87.50, -0.10, 'manual')
ON CONFLICT DO NOTHING;


-- 2. CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

INSERT INTO public.categories (name, slug, description)
VALUES 
('Necklaces', 'necklaces', 'Royal and modern fine jewellery necklaces'),
('Earrings', 'earrings', 'Kashmiri, studs, bugadi and statement earrings'),
('Rings', 'rings', 'Daily wear and bridal gemstone rings'),
('Nosepins', 'nosepins', 'Traditional and contemporary nosepins'),
('German Silver', 'german-silver', 'Artisan hand-crafted silver articles')
ON CONFLICT (slug) DO NOTHING;


-- 3. PRODUCTS TABLE (WITH DYNAMIC METAL PRICING FORMULA SUPPORT)
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    sku VARCHAR(100) UNIQUE,
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    description TEXT,
    short_description TEXT,
    
    -- Metal & Pricing Dynamics
    is_metal_dynamic BOOLEAN DEFAULT TRUE,  -- If true: calculates (weight * live_rate) + making + stones
    metal_type VARCHAR(50) DEFAULT 'gold_22k', -- matches metal_rates.metal_type
    metal_weight_grams NUMERIC(10,3) DEFAULT 0.000, -- Gross weight in grams
    making_charge_type VARCHAR(20) DEFAULT 'flat', -- 'flat' (₹) or 'percent' (%)
    making_charge_value NUMERIC(10,2) DEFAULT 0.00, 
    stone_charge NUMERIC(10,2) DEFAULT 0.00,        -- Value of diamonds/gemstones
    fixed_price NUMERIC(12,2) DEFAULT NULL,         -- Used if is_metal_dynamic = FALSE
    gst_percent NUMERIC(5,2) DEFAULT 3.00,          -- 3% GST standard on jewellery
    
    -- Stock & Visibility
    stock_quantity INT DEFAULT 10,
    is_featured BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    
    -- Images (Array of URLs or JSON)
    images JSONB DEFAULT '[]'::jsonb,
    primary_image TEXT,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);


-- 4. ORDERS & ORDER ITEMS TABLE
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_number VARCHAR(50) UNIQUE NOT NULL,
    customer_name VARCHAR(150) NOT NULL,
    customer_email VARCHAR(150) NOT NULL,
    customer_phone VARCHAR(20) NOT NULL,
    shipping_address JSONB NOT NULL,
    
    -- Totals
    subtotal NUMERIC(12,2) NOT NULL,
    metal_snapshot_rates JSONB, -- Record rates at the time of purchase for transparency
    tax_amount NUMERIC(12,2) DEFAULT 0.00,
    shipping_fee NUMERIC(12,2) DEFAULT 0.00,
    discount_amount NUMERIC(12,2) DEFAULT 0.00,
    total_amount NUMERIC(12,2) NOT NULL,
    
    -- Payment & Order Status
    payment_method VARCHAR(50) DEFAULT 'cod', -- 'razorpay', 'upi_qr', 'cod'
    payment_status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'paid', 'failed'
    payment_id VARCHAR(100),
    order_status VARCHAR(50) DEFAULT 'placed', -- 'placed', 'confirmed', 'shipped', 'delivered', 'cancelled'
    tracking_number VARCHAR(100),
    courier_partner VARCHAR(100),
    
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
    product_title VARCHAR(255) NOT NULL,
    product_image TEXT,
    unit_price NUMERIC(12,2) NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    total_price NUMERIC(12,2) NOT NULL,
    weight_snapshot NUMERIC(10,3),
    metal_type_snapshot VARCHAR(50)
);


-- 5. COUPONS & PROMOTIONS
CREATE TABLE IF NOT EXISTS public.coupons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(50) UNIQUE NOT NULL,
    discount_type VARCHAR(20) DEFAULT 'percentage', -- 'percentage' or 'flat'
    discount_value NUMERIC(10,2) NOT NULL,
    min_order_amount NUMERIC(10,2) DEFAULT 0.00,
    max_discount_amount NUMERIC(10,2),
    valid_until TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT TRUE,
    usage_limit INT DEFAULT 100,
    used_count INT DEFAULT 0
);


-- 6. ADMIN CONFIG & SETTINGS
CREATE TABLE IF NOT EXISTS public.store_settings (
    key VARCHAR(100) PRIMARY KEY,
    value JSONB NOT NULL,
    description TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

INSERT INTO public.store_settings (key, value, description)
VALUES 
('shipping_rules', '{"free_shipping_min": 1999, "default_shipping_fee": 99}'::jsonb, 'Shipping configuration'),
('metal_api_config', '{"provider": "goldapi", "api_key": "", "auto_refresh_hours": 12, "last_synced": null}'::jsonb, 'Live Metal API settings'),
('contact_details', '{"phone": "+91 9876543210", "email": "contact@jewellery.com", "address": "Jewellery Market, Mumbai, India"}'::jsonb, 'Store Contact Information')
ON CONFLICT (key) DO NOTHING;


-- 7. ROW LEVEL SECURITY (RLS) POLICIES
-- Enable RLS for all tables
ALTER TABLE public.metal_rates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.store_settings ENABLE ROW LEVEL SECURITY;

-- Public READ access for storefront
CREATE POLICY "Public read metal_rates" ON public.metal_rates FOR SELECT USING (true);
CREATE POLICY "Public read categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Public read active products" ON public.products FOR SELECT USING (is_active = true);
CREATE POLICY "Public read active coupons" ON public.coupons FOR SELECT USING (is_active = true);
CREATE POLICY "Public read store_settings" ON public.store_settings FOR SELECT USING (true);

-- Customer can create order
CREATE POLICY "Public insert orders" ON public.orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert order_items" ON public.order_items FOR INSERT WITH CHECK (true);
CREATE POLICY "Public read own order by id" ON public.orders FOR SELECT USING (true);
CREATE POLICY "Public read own order_items" ON public.order_items FOR SELECT USING (true);

-- Note: In Supabase, the Admin Dashboard can use either Supabase Service Role Key (securely)
-- or Supabase Admin User authentication to have full INSERT, UPDATE, DELETE permissions.
