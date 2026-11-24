/**
 * about-cms-engine.js
 * Controls EVERY single section of about.html dynamically:
 * 1. Hero Header (Badge, Title, Subtitle, Background Banner)
 * 2. Key Metrics Strip (4 stat counters: number, label)
 * 3. Chapter 1: Johari Bazaar Beginnings (Tag, Title, Paragraphs, Floating Tag, Image, Buttons)
 * 4. Chapter 2: Conscious Luxury Philosophy (Tag, Title, Paragraphs, Floating Tag, 3D Image)
 * 5. Foundational Values (Tag, Title, Subtitle, 3 Value Cards: badge, icon, title, description)
 * 6. Traditional 4-Step Process (Tag, Title, Subtitle, 4 Steps: num, title, description)
 * 7. Curators Quote Banner (Quote text, Author)
 */

const ABOUT_CMS_STORAGE_KEY = 'auro_about_complete_cms';

const DEFAULT_ABOUT_CMS = {
  hero: {
    badge: "Master Goldsmiths of Jaipur Since 1952",
    title: "Preserving Four Generations of Imperial Meenakari & Jadau",
    subtitle: "We bridge the gap between museum-grade royal Rajasthani ornaments and contemporary modern couture, handcrafted by master karigars with 22K micro-micron gold plating and certified anti-allergic metals.",
    banner_img: "images/banner_jewelry_pure_2.jpg"
  },
  stats: [
    { number: "72+", label: "Years of Heritage Pedigree" },
    { number: "120+", label: "Master Karigars in Jaipur" },
    { number: "45k+", label: "Global Brides Adorned" },
    { number: "100%", label: "Hallmarked Purity Safe" }
  ],
  chapter1: {
    tag: "Chapter I • Johari Bazaar Roots",
    title: "From the Royal Havelis to Global Runways",
    p1: "In the 16th century, imperial patronage in the pink corridors of Jaipur nurtured the rarest enamelling art on earth: Meenakari. Our great-grandfather Shri Radheshyamji was awarded court commendation for creating royal ceremonial kadas, sirpech, and bridal ornaments for Rajasthani dynasties.",
    p2: "Today, Auro & Jewellary brings these heirloom-grade techniques to the modern bride worldwide, without the prohibitive real-gold surcharge, using hallmarked allergy-free alloys and authentic hand-cut Polki stones.",
    btn1_text: "Explore the Collections",
    btn1_url: "collections.html",
    btn2_text: "Visit Flagship Boutiques",
    btn2_url: "boutiques.html",
    tag_title: "Jaipur Atelier",
    tag_sub: "Johari Bazaar, Rajasthan",
    image: "images/statement_necklace_1.jpg"
  },
  chapter2: {
    tag: "Chapter II • The Craft Philosophy",
    title: "Luxury That Honors Both Heritage & Skin",
    p1: "Traditional bridal jewelry often forces a difficult choice between exorbitant pure gold costs or cheap synthetic metals that irritate sensitive skin. We rewrote this standard.",
    p2: "Every Auro creation is sculpted in pure brass or certified German silver, encased in triple-layer 22K micro-micron gold plating, and finished with baked mineral glass enameling that never fades or peels under tropical humidity.",
    p3: "Each piece is stamped with our emblem of authenticity and passes 4 rigorous quality controls before it is sealed in velvet-lined vault packaging.",
    tag_title: "22K Micro-Micron Plating",
    tag_sub: "100% Anti-Tarnish & Hypoallergenic",
    image: "images/3d_luxury_necklace_pedestal.jpg"
  },
  values_header: {
    tag: "Our Foundational Values",
    title: "Why Patrons Trust Auro & Jewellary",
    subtitle: "Our commitments ensure every heirloom jewel delivered across 45 countries remains radiant for generations."
  },
  values_list: [
    {
      badge: "Certified",
      icon: "shield-check",
      title: "100% Skin Safe & Hallmarked",
      description: "Free from lead, nickel, and cadmium. Certified anti-allergic metals guarantee comfortable, irritation-free wear throughout day-long wedding festivities."
    },
    {
      badge: "Authentic",
      icon: "sparkles",
      title: "Uncompromising Handcraft",
      description: "We reject hollow machine pressing. Every hinge, screw joint, and pavé setting is hand-calibrated by 4th-generation Jaipur artisan families."
    },
    {
      badge: "100% Insured",
      icon: "truck",
      title: "Insured Global Delivery",
      description: "Dispatched in tamper-proof luxury packaging with 100% transit insurance by BlueDart Express & Sequel Logistics right to your doorstep."
    }
  ],
  process_header: {
    tag: "Artisanal Pedigree",
    title: "The Anatomy of Authentic Meenakari",
    subtitle: "A single bridal bangle takes up to 72 hours of meticulous manual handwork across four specialized guild craftsmen."
  },
  process_steps: [
    {
      num: "01",
      title: "Ghaat (Moulding)",
      description: "The core structural form is hand-cast with precision screw joints, custom calibrated for ergonomic balance."
    },
    {
      num: "02",
      title: "Chitrai (Engraving)",
      description: "Master engravers chisel delicate peacocks, lotuses, and floral creepers into the metal surface using steel burins."
    },
    {
      num: "03",
      title: "Rangbhari (Kiln)",
      description: "Crushed mineral glass pigments are infused into the grooves and baked in traditional kilns at 850°C for indelible color."
    },
    {
      num: "04",
      title: "Ghothai (Polishing)",
      description: "Natural agate stones burnish the gold surface to a mirror-like royal finish without abrasive chemical degradation."
    }
  ],
  quote: {
    text: "Jewellery is not merely adornment; it is ancestral poetry cast in gold, passed with pride from mother to bride.",
    author: "— The Master Curators of Auro & Jewellary, Jaipur"
  }
};

const AboutCMSEngine = {
  async getData() {
    // 1. Try Supabase
    if (typeof supabase !== 'undefined') {
      try {
        const client = supabase.createClient('https://efyqftxjtylvaoqhqptb.supabase.co', 'sb_publishable_WtIo91bnJaIRG7W0ITRR8w_-50i2_kY');
        const { data, error } = await client.from('site_cms').select('*').eq('section_key', 'about_complete_cms').maybeSingle();
        if (!error && data && data.content_json) {
          localStorage.setItem(ABOUT_CMS_STORAGE_KEY, JSON.stringify(data.content_json));
          return data.content_json;
        }
      } catch(e) {}
    }

    // 2. LocalStorage Cache
    const cached = localStorage.getItem(ABOUT_CMS_STORAGE_KEY);
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        return { ...DEFAULT_ABOUT_CMS, ...parsed };
      } catch(e) {}
    }

    return DEFAULT_ABOUT_CMS;
  },

  async saveAll(data) {
    localStorage.setItem(ABOUT_CMS_STORAGE_KEY, JSON.stringify(data));

    if (typeof supabase !== 'undefined') {
      try {
        const client = supabase.createClient('https://efyqftxjtylvaoqhqptb.supabase.co', 'sb_publishable_WtIo91bnJaIRG7W0ITRR8w_-50i2_kY');
        await client.from('site_cms').upsert({
          section_key: 'about_complete_cms',
          section_name: 'About Complete Page Dynamic CMS',
          content_json: data,
          updated_at: new Date().toISOString()
        }, { onConflict: 'section_key' });
      } catch(e) {
        console.warn('About CMS Supabase note:', e);
      }
    }

    this.apply(data);
  },

  apply(data) {
    if (!data) return;

    // 1. Hero Section
    if (data.hero) {
      const h = data.hero;
      const heroSec = document.querySelector('.about-hero');
      if (heroSec) {
        const b = heroSec.querySelector('.about-hero-badge');
        if (b && h.badge) b.innerHTML = `<i data-lucide="crown" style="width: 14px; height: 14px;"></i> ${h.badge}`;
        const t = heroSec.querySelector('.about-hero-title');
        if (t && h.title) t.innerText = h.title;
        const sub = heroSec.querySelector('.about-hero-subtitle');
        if (sub && h.subtitle) sub.innerText = h.subtitle;
        if (h.banner_img) {
          heroSec.style.backgroundImage = `linear-gradient(rgba(18, 14, 12, 0.72), rgba(18, 14, 12, 0.72)), url('${h.banner_img}')`;
          heroSec.style.color = '#FFFFFF';
          if (t) t.style.color = '#FFFFFF';
          if (sub) sub.style.color = '#e0e0e0';
        }
      }
    }

    // 2. Stats Strip
    if (data.stats && data.stats.length) {
      const statsGrid = document.querySelector('.about-stats-grid');
      if (statsGrid) {
        statsGrid.innerHTML = data.stats.map(st => `
          <div>
            <div class="stat-number">${st.number}</div>
            <div class="stat-label">${st.label}</div>
          </div>
        `).join('');
      }
    }

    // 3. Chapter 1: Johari Bazaar Beginnings
    if (data.chapter1) {
      const c1 = data.chapter1;
      const sec1 = document.querySelectorAll('.about-section')[0];
      if (sec1) {
        const tag = sec1.querySelector('.section-tag');
        if (tag && c1.tag) tag.innerText = c1.tag;
        const h2 = sec1.querySelector('h2');
        if (h2 && c1.title) h2.innerText = c1.title;
        const paras = sec1.querySelectorAll('.story-content-box p');
        if (paras[0] && c1.p1) paras[0].innerText = c1.p1;
        if (paras[1] && c1.p2) paras[1].innerText = c1.p2;

        const btn1 = sec1.querySelector('.story-content-box a.btn-primary');
        if (btn1) {
          if (c1.btn1_text) btn1.innerText = c1.btn1_text;
          if (c1.btn1_url) btn1.href = c1.btn1_url;
        }
        const btn2 = sec1.querySelector('.story-content-box a:not(.btn-primary)');
        if (btn2) {
          if (c1.btn2_text) btn2.innerText = c1.btn2_text;
          if (c1.btn2_url) btn2.href = c1.btn2_url;
        }

        const img = sec1.querySelector('.story-img-card img');
        if (img && c1.image) img.src = c1.image;
        const fTitle = sec1.querySelector('.story-img-floating-tag strong');
        if (fTitle && c1.tag_title) fTitle.innerText = c1.tag_title;
        const fSub = sec1.querySelector('.story-img-floating-tag span');
        if (fSub && c1.tag_sub) fSub.innerText = c1.tag_sub;
      }
    }

    // 4. Chapter 2: Conscious Luxury Philosophy
    if (data.chapter2) {
      const c2 = data.chapter2;
      const sec2 = document.querySelectorAll('.about-section')[1];
      if (sec2) {
        const tag = sec2.querySelector('.section-tag');
        if (tag && c2.tag) tag.innerText = c2.tag;
        const h2 = sec2.querySelector('h2');
        if (h2 && c2.title) h2.innerText = c2.title;
        const paras = sec2.querySelectorAll('.story-content-box p');
        if (paras[0] && c2.p1) paras[0].innerText = c2.p1;
        if (paras[1] && c2.p2) paras[1].innerText = c2.p2;
        if (paras[2] && c2.p3) paras[2].innerText = c2.p3;

        const img = sec2.querySelector('.story-img-card img');
        if (img && c2.image) img.src = c2.image;
        const fTitle = sec2.querySelector('.story-img-floating-tag strong');
        if (fTitle && c2.tag_title) fTitle.innerText = c2.tag_title;
        const fSub = sec2.querySelector('.story-img-floating-tag span');
        if (fSub && c2.tag_sub) fSub.innerText = c2.tag_sub;
      }
    }

    // 5. Foundational Values
    if (data.values_header) {
      const sec3 = document.querySelectorAll('.about-section')[2];
      if (sec3) {
        const tag = sec3.querySelector('.section-tag');
        if (tag && data.values_header.tag) tag.innerText = data.values_header.tag;
        const h2 = sec3.querySelector('.section-title');
        if (h2 && data.values_header.title) h2.innerText = data.values_header.title;
        const sub = sec3.querySelector('.section-header p');
        if (sub && data.values_header.subtitle) sub.innerText = data.values_header.subtitle;
      }
    }
    if (data.values_list && data.values_list.length) {
      const grid = document.querySelector('.values-grid');
      if (grid) {
        grid.innerHTML = data.values_list.map(val => `
          <div class="value-card">
            <span class="value-card-badge">${val.badge || 'Value'}</span>
            <div class="value-icon-circle">
              <i data-lucide="${val.icon || 'shield-check'}" style="width: 32px; height: 32px;"></i>
            </div>
            <h3>${val.title}</h3>
            <div class="value-card-sep"></div>
            <p>${val.description}</p>
          </div>
        `).join('');
      }
    }

    // 6. 4-Step Traditional Process
    if (data.process_header) {
      const sec4 = document.querySelectorAll('.about-section')[3];
      if (sec4) {
        const tag = sec4.querySelector('.section-tag');
        if (tag && data.process_header.tag) tag.innerText = data.process_header.tag;
        const h2 = sec4.querySelector('.section-title');
        if (h2 && data.process_header.title) h2.innerText = data.process_header.title;
        const sub = sec4.querySelector('.section-header p');
        if (sub && data.process_header.subtitle) sub.innerText = data.process_header.subtitle;
      }
    }
    if (data.process_steps && data.process_steps.length) {
      const pGrid = document.querySelector('.process-steps-grid');
      if (pGrid) {
        pGrid.innerHTML = data.process_steps.map((st, idx) => `
          <div class="step-card">
            <div class="step-num">${st.num || ('0' + (idx+1))}</div>
            <h4>${st.title}</h4>
            <p>${st.description}</p>
          </div>
        `).join('');
      }
    }

    // 7. Curators Quote
    if (data.quote) {
      const qBox = document.querySelector('.artisan-quote-banner');
      if (qBox) {
        const q = qBox.querySelector('q');
        if (q && data.quote.text) q.innerText = data.quote.text;
        const a = qBox.querySelector('.artisan-quote-author');
        if (a && data.quote.author) a.innerText = data.quote.author;
      }
    }

    if (window.lucide) window.lucide.createIcons();
  }
};

window.AboutCMSEngine = AboutCMSEngine;

window.addEventListener('DOMContentLoaded', async () => {
  try {
    const d = await AboutCMSEngine.getData();
    AboutCMSEngine.apply(d);
  } catch(e) {
    console.warn('AboutCMSEngine init note:', e);
  }
});
