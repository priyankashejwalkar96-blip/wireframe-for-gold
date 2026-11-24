/**
 * Universal Complete Site CMS Engine
 * Controls EVERYTHING dynamically from Admin Panel:
 * 1. Header (Logo, Tagline, Brand Name, All Navigation Items)
 * 2. All Products Mega Dropdown Categories & Product Counts
 * 3. Hero Slides, Headlines, Subtitles & Buttons on Home Page
 * 4. Diwali Collections Page (Festive Tag, Title, Subtitle, Offer text)
 * 5. Policies Page (Title, Description, Return Guarantee text)
 * 6. About Us Page (Heritage Badge, Title, Story text)
 * 7. Contact Us Page (Title, Address, VIP Concierge, WhatsApp, Timings)
 * 8. Blogs / Lookbook Page (Journal Title, Tagline, Articles info)
 * 9. Global Footer (About text, Salon Addresses, Emails, Copyright) across ALL pages
 */

const UNIVERSAL_STORE_KEY = 'auro_complete_site_cms';

const DEFAULT_COMPLETE_CMS = {
    // 1. BRANDING & HEADER
    branding: {
        brand_name: "Auro",
        brand_suffix: "Jewellary",
        tagline: "Haute Joaillerie & Royal Heritage",
        announcement: "✨ Complimentary Insured Express Shipping on Orders Above ₹3,999",
        phone: "+91 98200 12345",
        email: "concierge@aurojewels.com"
    },
    // 2. NAVIGATION MENU
    navigation: {
        home: "HOME",
        all_products: "ALL PRODUCTS",
        diwali: "DIWALI COLLECTIONS",
        policies: "POLICIES",
        about: "ABOUT US",
        contact: "CONTACT US",
        blogs: "BLOGS"
    },
    // 3. ALL PRODUCTS DROPDOWN ITEMS
    dropdown_categories: [
        {
                "name": "Hair Accesories",
                "count": 8,
                "url": "hair-accessories.html"
        },
        {
                "name": "Pachi kundan earrings",
                "count": 6,
                "url": "pachi-kundan-earrings.html"
        },
        {
                "name": "Kashmiri earrings",
                "count": 6,
                "url": "kashmiri-earrings.html"
        },
        {
                "name": "Premium & German Silver Earings (Below 300 Rs)",
                "count": 6,
                "url": "silver-earrings-below-300.html"
        },
        {
                "name": "Premium & German Silver Earings (Above 300 Rs)",
                "count": 6,
                "url": "silver-earrings-above-300.html"
        },
        {
                "name": "Earcuff (Bugadi-Kundan-Needle)",
                "count": 6,
                "url": "earcuff-bugadi.html"
        },
        {
                "name": "Statement earrings",
                "count": 6,
                "url": "statement-earrings.html"
        },
        {
                "name": "Statement Rings",
                "count": 6,
                "url": "statement-rings.html"
        },
        {
                "name": "Statement necklace",
                "count": 6,
                "url": "statement-necklace.html"
        },
        {
                "name": "Pachi Kundan Necklace",
                "count": 6,
                "url": "pachi-kundan-necklace.html"
        },
        {
                "name": "German silver Necklaces",
                "count": 6,
                "url": "german-silver-necklaces.html"
        },
        {
                "name": "Rings",
                "count": 6,
                "url": "rings.html"
        },
        {
                "name": "PREMIUM RINGS",
                "count": 6,
                "url": "premium-rings.html"
        },
        {
                "name": "Nosepin",
                "count": 6,
                "url": "nosepin.html"
        }
],
    // 4. HOME HERO
    home_hero: {
        headline: "BUY 2 GET 1 FREE",
        subheadline: "ON BANGLES, BRACELETS & RINGS",
        btn_text: "SHOP STACKABLES",
        btn_url: "collections.html",
        hero_image: "images/hero.jpg",
        diwali_banner: "images/banner_jewelry_pure_1.jpg",
        about_banner: "images/banner_jewelry_pure_2.jpg",
        contact_banner: "images/banner_jewelry_pure_2.jpg",
        blogs_banner: "images/banner_jewelry_pure_3.jpg"
    },
        // 5. DIWALI COLLECTIONS PAGE
    diwali_page: {
        festive_tag: "SHUBH DEEPAVALI AUSPICIOUS EDIT 2025",
        title: "The Shubh Labh Festive Jewellery Edit",
        subtitle: "Auspicious Dhanteras & Diwali royal handcrafted jewellery, infused with 22K gold foil, precious gemstones and temple motifs.",
        banner_img: "images/banner_jewelry_pure_1.jpg"
    },
    // 6. POLICIES PAGE (EXACT AS-IS)
    policies_page: {
        tag: "Trust & Transparency",
        title: "Store Policies & Assurance",
        subtitle: "Our commitment to uncompromising purity, tamper-proof insured express logistics, and an effortless customer care experience.",
        banner_img: "images/hero_slide_2.jpg"
    },
    // 7. ABOUT US PAGE (EXACT AS-IS)
    about_page: {
        badge: "Master Goldsmiths of Jaipur Since 1952",
        title: "Preserving Four Generations of Imperial Meenakari & Jadau",
        story: "We bridge the gap between museum-grade royal Rajasthani ornaments and contemporary modern couture, honoring our ancestors' timeless craftsmanship with ethical precision.",
        banner_img: "images/banner_jewelry_pure_2.jpg"
    },
    // 8. CONTACT US PAGE (EXACT AS-IS)
    contact_page: {
        tag: "24/7 Luxury Jewellery Concierge",
        title: "Connect With Auro & Jewellary",
        subtitle: "Whether you seek personalized bridal trousseau guidance, custom bangle sizing, or live HD virtual showroom appointments, our stylists are at your service.",
        phone: "+91 98200 12345",
        whatsapp: "+919820012345",
        banner_img: "images/banner_jewelry_pure_2.jpg"
    },
    // 9. BLOGS / LOOKBOOK PAGE (EXACT AS-IS)
    blogs_page: {
        badge: "The Jewellery Journal",
        title: "Chronicles of Heritage, Style & Craft",
        subtitle: "Curated perspectives on Rajasthani Jadau heirlooms, bridal styling guides, Meenakari secrets, and contemporary luxury design.",
        banner_img: "images/banner_jewelry_pure_3.jpg"
    },
    // 10. GLOBAL FOOTER
    footer: {
        about: "Preserving imperial Rajasthani and Mughal jewellery crafts since 1952. Each piece is hallmarked, artisan-handcrafted, and curated with devotion.",
        copyright: "© 2026 Auro & Jewellary. All Rights Reserved."
    }
};

const UniversalCMSEngine = {
    async getData() {
        // 1. Try Supabase
        if (typeof supabase !== 'undefined') {
            try {
                const client = supabase.createClient('https://efyqftxjtylvaoqhqptb.supabase.co', 'sb_publishable_WtIo91bnJaIRG7W0ITRR8w_-50i2_kY');
                const { data, error } = await client.from('site_cms').select('*').eq('section_key', 'universal_complete_cms').maybeSingle();
                if (!error && data && data.content_json) {
                    localStorage.setItem(UNIVERSAL_STORE_KEY, JSON.stringify(data.content_json));
                    return data.content_json;
                }
            } catch(e) {}
        }

        // 2. Local Storage Cache
        const cached = localStorage.getItem(UNIVERSAL_STORE_KEY);
        if (cached) {
            try { return JSON.parse(cached); } catch(e) {}
        }

        return DEFAULT_COMPLETE_CMS;
    },

    async saveAll(cmsData) {
        localStorage.setItem(UNIVERSAL_STORE_KEY, JSON.stringify(cmsData));

        if (typeof supabase !== 'undefined') {
            try {
                const client = supabase.createClient('https://efyqftxjtylvaoqhqptb.supabase.co', 'sb_publishable_WtIo91bnJaIRG7W0ITRR8w_-50i2_kY');
                await client.from('site_cms').upsert({
                    section_key: 'universal_complete_cms',
                    section_name: 'Universal Complete Site CMS',
                    content_json: cmsData,
                    updated_at: new Date().toISOString()
                }, { onConflict: 'section_key' });
            } catch(e) {
                console.warn('Supabase CMS upsert note:', e);
            }
        }

        this.apply(cmsData);
    },

    apply(data) {
        if (!data) return;

        // 1. TOP BAR ANNOUNCEMENT
        if (data.branding) {
            document.querySelectorAll('.top-bar-text').forEach(el => {
                if (data.branding.announcement) el.innerText = data.branding.announcement;
            });
            document.querySelectorAll('.logo-brand-name').forEach(el => {
                if (data.branding.brand_name) el.innerText = data.branding.brand_name;
            });
            document.querySelectorAll('.logo-subscript-jewellery').forEach(el => {
                if (data.branding.brand_suffix) el.innerText = data.branding.brand_suffix;
            });
        }

        // 2. NAVIGATION LABELS (ACROSS ALL PAGES)
        if (data.navigation) {
            const nav = data.navigation;
            document.querySelectorAll('.center-nav ul li > a').forEach(a => {
                const href = a.getAttribute('href') || '';
                if (href === 'index.html' && nav.home) a.innerText = nav.home;
                if (href === 'collections.html' && nav.all_products) {
                    a.innerHTML = `${nav.all_products} <i data-lucide="chevron-down" style="width: 14px; height: 14px; margin-left: 2px;"></i>`;
                }
                if (href === 'diwali-collections.html' && nav.diwali) a.innerText = nav.diwali;
                if (href === 'policies.html' && nav.policies) a.innerText = nav.policies;
                if (href === 'about.html' && nav.about) a.innerText = nav.about;
                if (href === 'contact.html' && nav.contact) a.innerText = nav.contact;
                if (href === 'lookbook.html' && nav.blogs) a.innerText = nav.blogs;
            });
        }

        // 3. ALL PRODUCTS DROPDOWN MENU ITEMS
        if (data.dropdown_categories && data.dropdown_categories.length > 0) {
            const dropdown = document.querySelector('.custom-dropdown-menu');
            if (dropdown) {
                dropdown.innerHTML = data.dropdown_categories.map(cat => `
                    <a href="${cat.url}" class="dropdown-link-item">
                        <span>${cat.name}</span>
                        <span class="count-pill">(${cat.count})</span>
                    </a>
                `).join('');
            }
        }

        // 4. HOME HERO
        if (data.home_hero) {
            const hh = data.home_hero;
            const heroHeadline = document.evaluate("//*[contains(text(),'BUY 2 GET 1 FREE')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            if (heroHeadline && hh.headline) heroHeadline.innerText = hh.headline;

            const heroSub = document.evaluate("//*[contains(text(),'ON BANGLES, BRACELETS')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            if (heroSub && hh.subheadline) heroSub.innerText = hh.subheadline;

            const heroBtnRight = document.evaluate("//*[contains(text(),'SHOP STACKABLES')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            if (heroBtnRight && hh.btn_text) {
                heroBtnRight.innerText = hh.btn_text;
                if (hh.btn_url && heroBtnRight.closest('a')) heroBtnRight.closest('a').href = hh.btn_url;
            }
        }

        
        // DIWALI PAGE
        if (data.diwali_page) {
            const dp = data.diwali_page;
            const dTag = document.querySelector('.diwali-hero .festive-tag');
            if (dTag && dp.festive_tag) dTag.innerText = dp.festive_tag;
            const dTitle = document.querySelector('.diwali-hero h1');
            if (dTitle && dp.title) dTitle.innerText = dp.title;
            const dSub = document.querySelector('.diwali-hero p');
            if (dSub && dp.subtitle) dSub.innerText = dp.subtitle;
            const dHero = document.querySelector('.diwali-hero');
            if (dHero && dp.banner_img) dHero.style.backgroundImage = `linear-gradient(rgba(18, 12, 10, 0.78), rgba(18, 12, 10, 0.78)), url('${dp.banner_img}')`;
        }

        // POLICIES PAGE
        if (data.policies_page) {
            const pp = data.policies_page;
            const pTitle = document.querySelector('.policy-hero h1');
            if (pTitle && pp.title) pTitle.innerText = pp.title;
            const pSub = document.querySelector('.policy-hero p');
            if (pSub && pp.subtitle) pSub.innerText = pp.subtitle;
            const pHero = document.querySelector('.policy-hero');
            if (pHero && pp.banner_img) pHero.style.backgroundImage = `linear-gradient(rgba(18, 18, 18, 0.75), rgba(18, 18, 18, 0.75)), url('${pp.banner_img}')`;
        }

        // ABOUT US PAGE
        if (data.about_page) {
            const ap = data.about_page;
            const aBadge = document.querySelector('.about-hero-badge');
            if (aBadge && ap.badge) aBadge.innerText = ap.badge;
            const aTitle = document.querySelector('.about-hero-title, .about-hero h1');
            if (aTitle && ap.title) aTitle.innerText = ap.title;
            const aStory = document.querySelector('.about-hero p, .about-story-p');
            if (aStory && ap.story) aStory.innerText = ap.story;
            const aHero = document.querySelector('.about-hero');
            if (aHero && ap.banner_img) aHero.style.backgroundImage = `linear-gradient(rgba(18, 14, 12, 0.72), rgba(18, 14, 12, 0.72)), url('${ap.banner_img}')`;
        }

        // CONTACT US PAGE
        if (data.contact_page) {
            const cp = data.contact_page;
            const cTag = document.querySelector('.contact-hero .section-tag');
            if (cTag && cp.tag) cTag.innerText = cp.tag;
            const cTitle = document.querySelector('.contact-hero h1');
            if (cTitle && cp.title) cTitle.innerText = cp.title;
            const cSub = document.querySelector('.contact-hero p');
            if (cSub && cp.subtitle) cSub.innerText = cp.subtitle;
            const cHero = document.querySelector('.contact-hero');
            if (cHero && cp.banner_img) cHero.style.backgroundImage = `linear-gradient(rgba(18, 14, 12, 0.78), rgba(18, 12, 10, 0.78)), url('${cp.banner_img}')`;
        }

        // BLOGS / LOOKBOOK PAGE
        if (data.blogs_page) {
            const bp = data.blogs_page;
            const bBadge = document.querySelector('.blog-hero-badge');
            if (bBadge && bp.badge) bBadge.innerText = bp.badge;
            const bTitle = document.querySelector('.blog-hero-title, .blog-hero h1');
            if (bTitle && bp.title) bTitle.innerText = bp.title;
            const bSub = document.querySelector('.blog-hero p');
            if (bSub && bp.subtitle) bSub.innerText = bp.subtitle;
            const bHero = document.querySelector('.blog-hero');
            if (bHero && bp.banner_img) bHero.style.backgroundImage = `linear-gradient(rgba(18, 14, 12, 0.72), rgba(18, 14, 12, 0.72)), url('${bp.banner_img}')`;
        }

        // 10. GLOBAL FOOTER (ACROSS ALL PAGES)
        if (data.footer) {
            const fp = data.footer;
            document.querySelectorAll('.footer-col.brand-col p').forEach(el => {
                if (fp.about) el.innerText = fp.about;
            });
            document.querySelectorAll('.footer-bottom p').forEach(el => {
                if (fp.copyright) el.innerText = fp.copyright;
            });
        }

        
        // DYNAMIC BANNER IMAGES ACROSS ALL PAGES
        if (data.home_hero && data.home_hero.hero_image) {
            const heroImg = document.querySelector('.hero-slide img, .hero-image img, #mainHeroImg');
            if (heroImg) heroImg.src = data.home_hero.hero_image;
            const heroContainer = document.querySelector('.hero-slide, .hero-section');
            if (heroContainer && heroContainer.style && heroContainer.style.backgroundImage) {
                heroContainer.style.backgroundImage = `url('${data.home_hero.hero_image}')`;
            }
        }
        if (data.home_hero && data.home_hero.diwali_banner) {
            const diwaliHero = document.querySelector('.diwali-hero');
            if (diwaliHero) diwaliHero.style.backgroundImage = `linear-gradient(rgba(18, 12, 10, 0.78), rgba(18, 12, 10, 0.78)), url('${data.home_hero.diwali_banner}')`;
        }
        if (data.home_hero && data.home_hero.about_banner) {
            const aboutHero = document.querySelector('.about-hero');
            if (aboutHero) aboutHero.style.backgroundImage = `linear-gradient(rgba(18, 14, 12, 0.72), rgba(18, 14, 12, 0.72)), url('${data.home_hero.about_banner}')`;
        }
        if (data.home_hero && data.home_hero.contact_banner) {
            const contactHero = document.querySelector('.contact-hero');
            if (contactHero) contactHero.style.backgroundImage = `linear-gradient(rgba(18, 14, 12, 0.78), rgba(18, 14, 12, 0.78)), url('${data.home_hero.contact_banner}')`;
        }
        if (data.home_hero && data.home_hero.blogs_banner) {
            const blogHero = document.querySelector('.blog-hero');
            if (blogHero) blogHero.style.backgroundImage = `linear-gradient(rgba(18, 14, 12, 0.72), rgba(18, 14, 12, 0.72)), url('${data.home_hero.blogs_banner}')`;
        }

        if (window.lucide) window.lucide.createIcons();
    }
};

window.UniversalCMSEngine = UniversalCMSEngine;

window.addEventListener('DOMContentLoaded', async () => {
    try {
        const d = await UniversalCMSEngine.getData();
        UniversalCMSEngine.apply(d);
    } catch(e) {}
});
