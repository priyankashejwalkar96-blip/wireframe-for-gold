/**
 * Dynamic CMS & Theme Engine for Jewellery E-Commerce
 * Automatically binds all headers, footers, banners, buttons, and text across ALL pages
 * with Supabase Cloud & Local Storage.
 */

const DEFAULT_CMS_DATA = {
    announcement_bar: {
        text: "✨ Complimentary Insured Express Shipping on Orders Above ₹3,999",
        phone: "+91 98200 12345",
        show_ticker: true
    },
    header_config: {
        brand_name: "Auro",
        brand_suffix: "Jewellary",
        tagline: "Luxury Handcrafted Jewellery",
        phone: "+91 98200 12345"
    },
    hero_banner: {
        badge: "ROYAL HERITAGE COLLECTION",
        title: "Imperial Elegance Handcrafted in Pure Gold",
        subtitle: "Preserving 500-year-old Rajasthani & Mughal craftsmanship with transparent daily bullion rates.",
        btn1_text: "Explore Royal Collections",
        btn1_url: "collections.html",
        btn2_text: "Today's Live Bullion Rates",
        btn2_url: "admin.html"
    },
    footer_config: {
        about_text: "Preserving imperial Rajasthani and Mughal jewellery crafts since 1952. Each piece is hallmarked, artisan-handcrafted, and curated with devotion.",
        phone: "+91 (0) 98200 12345",
        email: "concierge@aurojewels.com",
        copyright: "© 2026 Auro & Jewellary. All Rights Reserved."
    }
};

const CMSEngine = {
    STORAGE_KEY: 'auro_site_cms_cache',

    async getCMSData() {
        // 1. Try Supabase Cloud
        if (typeof supabase !== 'undefined') {
            try {
                const client = supabase.createClient('https://efyqftxjtylvaoqhqptb.supabase.co', 'sb_publishable_WtIo91bnJaIRG7W0ITRR8w_-50i2_kY');
                const { data, error } = await client.from('site_cms').select('*');
                if (!error && data && data.length > 0) {
                    const mapped = {};
                    data.forEach(item => {
                        mapped[item.section_key] = item.content_json;
                    });
                    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(mapped));
                    return mapped;
                }
            } catch (err) {
                console.warn('CMS cloud fetch note:', err);
            }
        }

        // 2. Check LocalStorage Cache
        const cached = localStorage.getItem(this.STORAGE_KEY);
        if (cached) {
            try { return JSON.parse(cached); } catch(e) {}
        }

        // 3. Fallback
        return DEFAULT_CMS_DATA;
    },

    async saveSection(sectionKey, sectionData) {
        // 1. Update Supabase
        if (typeof supabase !== 'undefined') {
            try {
                const client = supabase.createClient('https://efyqftxjtylvaoqhqptb.supabase.co', 'sb_publishable_WtIo91bnJaIRG7W0ITRR8w_-50i2_kY');
                await client.from('site_cms').upsert({
                    section_key: sectionKey,
                    section_name: sectionKey.replace('_', ' ').toUpperCase(),
                    content_json: sectionData,
                    updated_at: new Date().toISOString()
                }, { onConflict: 'section_key' });
            } catch(e) {}
        }

        // 2. Update LocalStorage
        let all = await this.getCMSData();
        all[sectionKey] = sectionData;
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(all));
        this.applyToDOM(all);
    },

    applyToDOM(cms) {
        if (!cms) return;

        // 1. Announcement Bar & Phone
        if (cms.announcement_bar) {
            const ann = cms.announcement_bar;
            document.querySelectorAll('.top-bar-text').forEach(el => {
                if (ann.text) el.innerText = ann.text;
            });
            document.querySelectorAll('a[href="#help"], .top-bar a[href^="tel:"]').forEach(el => {
                if (ann.phone && el.innerText.includes('+91')) {
                    el.innerText = `Concierge: ${ann.phone}`;
                }
            });
            document.querySelectorAll('.hub-tooltip').forEach(el => {
                if (ann.phone && el.innerText.includes('Call Concierge')) {
                    el.innerText = `Call Concierge (${ann.phone})`;
                }
            });
        }

        // 2. Header Branding
        if (cms.header_config) {
            const h = cms.header_config;
            document.querySelectorAll('.logo-brand-name').forEach(el => {
                if (h.brand_name) el.innerText = h.brand_name;
            });
            document.querySelectorAll('.logo-subscript-jewellery').forEach(el => {
                if (h.brand_suffix) el.innerText = h.brand_suffix;
            });
        }

        // 3. Hero Section (Home page)
        if (cms.hero_banner) {
            const hero = cms.hero_banner;
            const heroTitle = document.querySelector('.hero-title, .hero-content h1');
            if (heroTitle && hero.title) heroTitle.innerText = hero.title;

            const heroSubtitle = document.querySelector('.hero-subtitle, .hero-content p');
            if (heroSubtitle && hero.subtitle) heroSubtitle.innerText = hero.subtitle;

            const heroBtn1 = document.querySelector('.hero-content .btn-primary, .hero-btn-primary');
            if (heroBtn1 && hero.btn1_text) {
                heroBtn1.innerText = hero.btn1_text;
                if (hero.btn1_url) heroBtn1.href = hero.btn1_url;
            }

            const heroBtn2 = document.querySelector('.hero-content .btn-secondary, .hero-btn-secondary');
            if (heroBtn2 && hero.btn2_text) {
                heroBtn2.innerText = hero.btn2_text;
                if (hero.btn2_url) heroBtn2.href = hero.btn2_url;
            }
        }

        // 4. Footer Section (Across All Pages)
        if (cms.footer_config) {
            const f = cms.footer_config;
            const footerAbout = document.querySelector('.footer-col.brand-col p, .footer-about-text');
            if (footerAbout && f.about_text) footerAbout.innerText = f.about_text;

            const footerPhone = document.querySelector('.footer-col p i[data-lucide="phone"]');
            if (footerPhone && footerPhone.parentElement && f.phone) {
                footerPhone.parentElement.innerHTML = `<i data-lucide="phone"></i> ${f.phone}`;
            }

            const footerEmail = document.querySelector('.footer-col p i[data-lucide="mail"]');
            if (footerEmail && footerEmail.parentElement && f.email) {
                footerEmail.parentElement.innerHTML = `<i data-lucide="mail"></i> ${f.email}`;
            }

            const copyrightEl = document.querySelector('.footer-bottom p');
            if (copyrightEl && f.copyright) copyrightEl.innerText = f.copyright;
        }

        if (window.lucide) window.lucide.createIcons();
    }
};

window.CMSEngine = CMSEngine;

// Initialize across all pages on load
window.addEventListener('DOMContentLoaded', async () => {
    try {
        const cmsData = await CMSEngine.getCMSData();
        CMSEngine.applyToDOM(cmsData);
    } catch(e) {
        console.warn('CMS init note:', e);
    }
});
