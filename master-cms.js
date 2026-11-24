/**
 * Universal Master CMS Engine
 * Controls EVERYTHING dynamically from Admin Panel:
 * 1. Top Ticker & Announcement Bar
 * 2. Brand Name, Logo, Navigation Links
 * 3. Hero Slides, Headlines, Subtitles, Backgrounds & All Buttons
 * 4. Promo Marquee & Heritage Guarantee Badges
 * 5. Section Titles, Taglines & Subtexts
 * 6. Global Footer, Address, Phones, Emails, Social Links & Copyright
 * 7. Live Metal Rates calculation across all products
 */

const MASTER_CMS_KEY = 'auro_universal_master_cms';

const DEFAULT_UNIVERSAL_CMS = {
    // 1. TOP BAR
    top_bar: {
        announcement: "✨ Complimentary Insured Express Shipping on Orders Above ₹3,999",
        phone: "+91 98200 12345",
        show_ticker: true
    },
    // 2. BRANDING & HEADER
    branding: {
        brand_name: "Auro",
        brand_suffix: "Jewellary",
        tagline: "Haute Joaillerie & Royal Heritage",
        nav_home: "HOME",
        nav_all: "ALL PRODUCTS",
        nav_diwali: "DIWALI COLLECTIONS",
        nav_policies: "POLICIES",
        nav_about: "ABOUT US",
        nav_contact: "CONTACT US",
        nav_blogs: "BLOGS"
    },
    // 3. HOMEPAGE HERO BANNER
    hero: {
        eyebrow: "18K GOLD PLATED . ANTI-TARNISH",
        brand_big: "A U R O",
        tag: "SIGNATURE STACK EDIT",
        headline: "BUY 2 GET 1 FREE",
        subheadline: "ON BANGLES, BRACELETS & RINGS",
        btn_left_text: "AUROJEWELLERY.COM",
        btn_left_url: "collections.html",
        btn_right_text: "SHOP STACKABLES",
        btn_right_url: "collections.html"
    },
    // 4. TRUST BADGES STRIP (Under Hero)
    trust_badges: {
        badge1: "100% Certified Purity",
        badge2: "Heritage Craftsmanship",
        badge3: "Worldwide Insured Shipping",
        badge4: "Hassle-Free Returns"
    },
    // 5. SECTION HEADERS
    sections: {
        collections_tag: "CURATED MASTERPIECES",
        collections_title: "Iconic Royal Collections",
        collections_subtext: "Explore handcrafted temple, meenakari and polki creations designed for royalty.",
        bestseller_tag: "MOST LOVED JEWELS",
        bestseller_title: "Trending Masterpieces",
        heritage_title: "Preserving Jaipur & Mughal Legacy Since 1952",
        heritage_p1: "Every jewel at Auro is painstakingly crafted by master artisans whose families have served Indian royal courts for generations."
    },
    // 6. GLOBAL FOOTER
    footer: {
        about: "Preserving imperial Rajasthani and Mughal jewellery crafts since 1952. Each piece is hallmarked, artisan-handcrafted, and curated with devotion.",
        mumbai_address: "Linking Road, Bandra West, Mumbai, MH",
        jaipur_address: "Johari Bazaar, Pink City, Jaipur, RJ",
        concierge_phone: "+91 (0) 98200 12345",
        inquiries_email: "concierge@aurojewels.com",
        copyright: "© 2026 Auro & Jewellary. All Rights Reserved."
    }
};

const MasterCMSService = {
    async loadData() {
        // 1. Try Supabase
        if (typeof supabase !== 'undefined') {
            try {
                const client = supabase.createClient('https://efyqftxjtylvaoqhqptb.supabase.co', 'sb_publishable_WtIo91bnJaIRG7W0ITRR8w_-50i2_kY');
                const { data, error } = await client.from('site_cms').select('*').eq('section_key', 'universal_master_cms').maybeSingle();
                if (!error && data && data.content_json) {
                    localStorage.setItem(MASTER_CMS_KEY, JSON.stringify(data.content_json));
                    return data.content_json;
                }
            } catch (e) {}
        }

        // 2. Local Storage Cache
        const cached = localStorage.getItem(MASTER_CMS_KEY);
        if (cached) {
            try { return JSON.parse(cached); } catch(e) {}
        }

        return DEFAULT_UNIVERSAL_CMS;
    },

    async saveAll(data) {
        // 1. Save locally immediately
        localStorage.setItem(MASTER_CMS_KEY, JSON.stringify(data));

        // 2. Save in Supabase
        if (typeof supabase !== 'undefined') {
            try {
                const client = supabase.createClient('https://efyqftxjtylvaoqhqptb.supabase.co', 'sb_publishable_WtIo91bnJaIRG7W0ITRR8w_-50i2_kY');
                await client.from('site_cms').upsert({
                    section_key: 'universal_master_cms',
                    section_name: 'Universal Master CMS',
                    content_json: data,
                    updated_at: new Date().toISOString()
                }, { onConflict: 'section_key' });
            } catch (e) {
                console.warn('Supabase CMS sync:', e);
            }
        }

        this.apply(data);
    },

    apply(cms) {
        if (!cms) return;

        // TOP BAR
        if (cms.top_bar) {
            document.querySelectorAll('.top-bar-text').forEach(el => {
                if (cms.top_bar.announcement) el.innerText = cms.top_bar.announcement;
            });
        }

        // BRANDING & HEADER
        if (cms.branding) {
            document.querySelectorAll('.logo-brand-name').forEach(el => {
                if (cms.branding.brand_name) el.innerText = cms.branding.brand_name;
            });
            document.querySelectorAll('.logo-subscript-jewellery').forEach(el => {
                if (cms.branding.brand_suffix) el.innerText = cms.branding.brand_suffix;
            });
            // Nav link labels
            const navLinks = document.querySelectorAll('.center-nav ul li a');
            if (navLinks.length >= 6) {
                if (cms.branding.nav_home && navLinks[0]) navLinks[0].innerText = cms.branding.nav_home;
                if (cms.branding.nav_diwali && navLinks[2]) navLinks[2].innerText = cms.branding.nav_diwali;
                if (cms.branding.nav_policies && navLinks[3]) navLinks[3].innerText = cms.branding.nav_policies;
                if (cms.branding.nav_about && navLinks[4]) navLinks[4].innerText = cms.branding.nav_about;
                if (cms.branding.nav_contact && navLinks[5]) navLinks[5].innerText = cms.branding.nav_contact;
            }
        }

        // HERO BANNER
        if (cms.hero) {
            const h = cms.hero;
            // Banner Headline / Offer
            document.querySelectorAll('.hero-slide, .hero-content, .hero-text-content, .hero-editorial-center').forEach(heroContainer => {
                const h1 = heroContainer.querySelector('h1, h2');
                if (h1 && h.headline) h1.innerText = h.headline;
                const p = heroContainer.querySelector('p');
                if (p && h.subheadline) p.innerText = h.subheadline;
            });

            // Match specific elements in index.html hero slide
            const heroHeadline = document.evaluate("//*[contains(text(),'BUY 2 GET 1 FREE')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            if (heroHeadline && h.headline) heroHeadline.innerText = h.headline;

            const heroSub = document.evaluate("//*[contains(text(),'ON BANGLES, BRACELETS')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            if (heroSub && h.subheadline) heroSub.innerText = h.subheadline;

            const heroBtnRight = document.evaluate("//*[contains(text(),'SHOP STACKABLES')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            if (heroBtnRight && h.btn_right_text) {
                heroBtnRight.innerText = h.btn_right_text;
                if (h.btn_right_url && heroBtnRight.closest('a')) heroBtnRight.closest('a').href = h.btn_right_url;
            }
        }

        // SECTION HEADERS
        if (cms.sections) {
            const s = cms.sections;
            document.querySelectorAll('.section-tag').forEach(el => {
                if (s.collections_tag && el.innerText.includes('COLLECTIONS')) el.innerText = s.collections_tag;
                if (s.bestseller_tag && el.innerText.includes('LOVED')) el.innerText = s.bestseller_tag;
            });
            document.querySelectorAll('.section-title').forEach(el => {
                if (s.collections_title && el.innerText.includes('Iconic')) el.innerText = s.collections_title;
                if (s.bestseller_title && el.innerText.includes('Trending')) el.innerText = s.bestseller_title;
            });
        }

        // FOOTER DETAILS
        if (cms.footer) {
            const f = cms.footer;
            document.querySelectorAll('.footer-col.brand-col p').forEach(el => {
                if (f.about) el.innerText = f.about;
            });
            document.querySelectorAll('.footer-col p').forEach(el => {
                if (f.mumbai_address && el.innerHTML.includes('Mumbai Salon:')) {
                    el.innerHTML = `<i data-lucide="map-pin"></i> <strong>Mumbai Salon:</strong> ${f.mumbai_address}`;
                }
                if (f.concierge_phone && el.innerHTML.includes('VIP Concierge:')) {
                    el.innerHTML = `<i data-lucide="phone"></i> <strong>VIP Concierge:</strong> ${f.concierge_phone}`;
                }
                if (f.inquiries_email && el.innerHTML.includes('Inquiries:')) {
                    el.innerHTML = `<i data-lucide="mail"></i> <strong>Inquiries:</strong> ${f.inquiries_email}`;
                }
            });
            document.querySelectorAll('.footer-bottom p').forEach(el => {
                if (f.copyright) el.innerText = f.copyright;
            });
        }

        if (window.lucide) window.lucide.createIcons();
    }
};

window.MasterCMSService = MasterCMSService;

// Apply on every page load
window.addEventListener('DOMContentLoaded', async () => {
    try {
        const data = await MasterCMSService.loadData();
        MasterCMSService.apply(data);
    } catch(e) {}
});
