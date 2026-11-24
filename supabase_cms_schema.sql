-- ==============================================================================
-- DYNAMIC CMS & STORE CONFIGURATION SCHEMA FOR SUPABASE
-- ==============================================================================

-- 1. CMS CONTENT & SITE SETTINGS
CREATE TABLE IF NOT EXISTS public.site_cms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    section_key VARCHAR(100) UNIQUE NOT NULL, -- 'header_config', 'footer_config', 'hero_banner', 'announcement_bar', 'features_grid'
    section_name VARCHAR(150) NOT NULL,
    content_json JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.site_cms ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read site_cms" ON public.site_cms FOR SELECT USING (true);
CREATE POLICY "Public insert site_cms" ON public.site_cms FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update site_cms" ON public.site_cms FOR UPDATE USING (true);

-- Insert Default Dynamic Content for Header, Footer, Hero, Banners, Buttons
INSERT INTO public.site_cms (section_key, section_name, content_json)
VALUES 
(
  'announcement_bar', 
  'Top Announcement Bar', 
  '{
    "enabled": true,
    "text": "✨ Complimentary Insured Express Shipping on Orders Above ₹3,999",
    "phone": "+91 98200 12345",
    "show_rates_ticker": true
  }'::jsonb
),
(
  'header_config', 
  'Site Branding & Navigation', 
  '{
    "brand_name": "Auro",
    "brand_suffix": "Jewellary",
    "logo_text": "Auro & Jewellary",
    "tagline": "Luxury Handcrafted Jewellery Since 1952",
    "nav_links": [
      {"label": "HOME", "url": "index.html"},
      {"label": "ALL PRODUCTS", "url": "collections.html"},
      {"label": "DIWALI COLLECTIONS", "url": "diwali-collections.html"},
      {"label": "POLICIES", "url": "policies.html"},
      {"label": "ABOUT US", "url": "about.html"},
      {"label": "CONTACT US", "url": "contact.html"}
    ]
  }'::jsonb
),
(
  'hero_banner', 
  'Homepage Hero Banner & CTA Buttons', 
  '{
    "badge_text": "ROYAL HERITAGE 2026",
    "headline": "Imperial Elegance Handcrafted in Pure Gold",
    "subheadline": "Preserving 500-year-old Rajasthani & Mughal craftsmanship with transparent real-time bullion pricing.",
    "primary_btn_text": "Explore Royal Collection",
    "primary_btn_url": "collections.html",
    "secondary_btn_text": "View Today\'s Gold Rates",
    "secondary_btn_url": "#live-metal-ticker"
  }'::jsonb
),
(
  'footer_config', 
  'Footer Information & Contact', 
  '{
    "about_text": "Preserving imperial Rajasthani and Mughal jewellery crafts since 1952. Each piece is hallmarked, artisan-handcrafted, and curated with devotion.",
    "phone": "+91 98200 12345",
    "email": "concierge@aurojewels.com",
    "address": "Johari Bazaar, Jaipur & Zaveri Bazaar, Mumbai",
    "whatsapp": "+919820012345",
    "copyright": "© 2026 Auro & Jewellary. All Rights Reserved."
  }'::jsonb
)
ON CONFLICT (section_key) DO UPDATE 
SET content_json = EXCLUDED.content_json;
