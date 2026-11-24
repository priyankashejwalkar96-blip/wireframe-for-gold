/**
 * blogs-cms-engine.js
 * Controls EVERY single element of lookbook.html and blog-single.html dynamically:
 * 1. Blog Hero Banner (Tag, Title, Subtitle, Background Banner Image)
 * 2. Filter Categories Pills
 * 3. Complete Blog Articles List (Full CRUD: id, slug, title, tag, date, read_time, author, image, excerpt, full_content, quote, quote_author, product_name, product_price, product_img, product_url)
 * 4. Dynamic Single Blog View (reads ?id=... or ?slug=... on blog-single.html and populates the entire article dynamically)
 */

const BLOGS_CMS_STORAGE_KEY = 'auro_blogs_complete_cms';

const DEFAULT_BLOGS_CMS = {
  hero: {
    tag: "The Jewellery Journal",
    title: "Chronicles of Heritage, Style & Craft",
    subtitle: "Curated perspectives on Rajasthani Jadau heirlooms, bridal styling guides, Meenakari secrets, and contemporary demifine jewellery trends.",
    banner_img: "images/banner_jewelry_pure_3.jpg"
  },
  filters: ["All Articles", "Bridal Styling", "Artisan Heritage", "Care & Maintenance", "Jewellery Trends"],
  articles: [
    {
      id: "blog-1",
      slug: "imperial-meenakari-chokers-winter-brides",
      title: "How to Style Imperial Meenakari Chokers for Winter Brides",
      tag: "Bridal Styling",
      date: "Nov 20, 2026",
      read_time: "5 Min Read",
      author: "Gayatri Rathore, Senior Stylist",
      image: "images/chokers.jpg",
      excerpt: "From pairing Daak foil Polki with velvet lehengas to balancing neckline depths with dual-sided peacocks, master the art of royal bridal styling.",
      content_paragraphs: [
        "The winter wedding season in India commands an undeniable royal richness. Deep velvets, heavy Banarasi brocades, and raw silk lehengas demand a neckpiece with majestic presence. Nothing commands this authority quite like an authentic Jaipur Meenakari choker.",
        "A choker’s true beauty relies on how it frames the collarbone. For plunging sweetheart necklines or scoop cuts, pair a high-collar 3-strand Meenakari choker that sits snug against the throat, followed by a longer 28-inch Aad or Rani Haar to elongate the torso.",
        "Authentic Jaipur court jewelry is famously reversible. While the front presents brilliant uncut Polki stones encased in silver Daak foil, the underside is adorned with vibrant red and green floral creepers (Rangbhari).",
        "During ritual pheras or when photographs are captured from candid angles, the flashes of enamel catch ambient candlelight in an exquisite display of ancestral refinement.",
        "When your choker is dense with emerald beads or ruby drops, balance the face with matching Chandbalis or delicate Bugadi cuffs. Avoid oversized earrings that collide with the top edges of the choker; instead, allow at least two inches of breathing room between the earring droplet and your collar."
      ],
      quote: "A choker must never fight with the lehenga neckline; it should rest as if sculpted naturally onto the bride's skin.",
      quote_author: "Gayatri Rathore, Auro Styling Suite",
      featured_product: {
        title: "Maharani Padmavati Emerald Choker",
        price: "₹12,850 INR",
        image: "images/bestseller_2.jpg",
        url: "collections.html"
      }
    },
    {
      id: "blog-2",
      slug: "mineral-glass-enameling-secrets",
      title: "The Secret Alchemy Behind 850°C Mineral Glass Enameling",
      tag: "Artisan Heritage",
      date: "Nov 15, 2026",
      read_time: "7 Min Read",
      author: "Pandit Manmohan Sharma, Master Enameler",
      image: "images/3d_meenakari_jewelry_craft.jpg",
      excerpt: "Go behind the velvet curtains of our Johari Bazaar atelier to witness how raw silica pigments transform into unbreakable Jaipur enamel.",
      content_paragraphs: [
        "Centuries before modern electroplating existed, Mughal court goldsmiths in Jaipur perfected an indelible bonding process: fusing pulverized gemstone minerals directly into hand-engraved silver and gold grooves at intense kiln temperatures.",
        "Every Meenakari piece begins with the 'Chitera' carving channels into 22K micro-micron silver. The enameler ('Meenakar') then delicately grinds cobalt, lapis lazuli, and ruby dust with distilled pomegranate essential oil into a fine paste.",
        "In our Jaipur workshop, pieces undergo multiple firings in an 850°C kiln. As temperatures soar, the glass powder vitrifies into a glassy layer of permanent, lustrous color that never fades even across generations.",
        "Unlike painted imitations that peel within months, genuine high-fire vitreous enamel becomes physically fused with the precious metal casing, resistant to sweat, perfume, and atmospheric tarnishing."
      ],
      quote: "Mineral enamel is not paint; it is molten glass born in fire that binds for eternity.",
      quote_author: "Pandit Manmohan Sharma, 4th-Gen Johari Artisan",
      featured_product: {
        title: "Imperial Peacock Meenakari Kada",
        price: "₹6,450 INR",
        image: "images/pachi_necklace_1.jpg",
        url: "collections.html"
      }
    },
    {
      id: "blog-3",
      slug: "caring-german-silver-micro-plated-jewels",
      title: "Caring for German Silver & 22K Micro-Micron Plated Jewels",
      tag: "Care & Maintenance",
      date: "Nov 08, 2026",
      read_time: "4 Min Read",
      author: "Auro Concierge Care Desk",
      image: "images/bestseller_1.jpg",
      excerpt: "Essential longevity rituals from master polishers to keep your oxidised necklaces and gold-plated kadas sparkling bright without chemical wear.",
      content_paragraphs: [
        "Handcrafted jewelry represents emotional memories and heirloom craftsmanship. With simple, regular rituals, your handcrafted German Silver and anti-allergic micro-plated ornaments will retain their majestic gleam for decades.",
        "Rule 1: Always apply makeup, hairspray, and perfume before adorning your jewels. Harsh alcohol vapor and citrus sprays can react with plating finishes.",
        "Rule 2: Never store your delicate jewelry in open humid air or velvet boxes that contain moisture-absorbing adhesives. Use airtight zip-pouches with a single anti-tarnish tab inside our signature Auro wooden vault box.",
        "Rule 3: After wearing, gently wipe away perspiration using a lint-free 100% cotton cloth before sealing it away in its box."
      ],
      quote: "Treat your jewelry as art; cleanse gently with soft cotton and shield from direct chemical mists.",
      quote_author: "Auro Concierge Care Desk",
      featured_product: {
        title: "German Silver Aad Royal Choker",
        price: "₹2,080 INR",
        image: "images/silver_below_300_1.jpg",
        url: "silver-earrings-below-300.html"
      }
    }
  ]
};

const BlogsCMSEngine = {
  async getData() {
    // 1. Try Supabase
    if (typeof supabase !== 'undefined') {
      try {
        const client = supabase.createClient('https://efyqftxjtylvaoqhqptb.supabase.co', 'sb_publishable_WtIo91bnJaIRG7W0ITRR8w_-50i2_kY');
        const { data, error } = await client.from('site_cms').select('*').eq('section_key', 'blogs_all_sections_cms').maybeSingle();
        if (!error && data && data.content_json) {
          localStorage.setItem(BLOGS_CMS_STORAGE_KEY, JSON.stringify(data.content_json));
          return data.content_json;
        }
      } catch(e) {}
    }

    // 2. LocalStorage Cache
    const cached = localStorage.getItem(BLOGS_CMS_STORAGE_KEY);
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        return { ...DEFAULT_BLOGS_CMS, ...parsed };
      } catch(e) {}
    }

    return DEFAULT_BLOGS_CMS;
  },

  async saveAll(data) {
    localStorage.setItem(BLOGS_CMS_STORAGE_KEY, JSON.stringify(data));

    if (typeof supabase !== 'undefined') {
      try {
        const client = supabase.createClient('https://efyqftxjtylvaoqhqptb.supabase.co', 'sb_publishable_WtIo91bnJaIRG7W0ITRR8w_-50i2_kY');
        await client.from('site_cms').upsert({
          section_key: 'blogs_all_sections_cms',
          section_name: 'Blogs & Lookbook All Dynamic CMS',
          content_json: data,
          updated_at: new Date().toISOString()
        }, { onConflict: 'section_key' });
      } catch(e) {
        console.warn('Blogs CMS Supabase note:', e);
      }
    }

    this.apply(data);
  },

  apply(data) {
    if (!data) return;

    // Check if on lookbook.html (listing page)
    const isLookbook = document.querySelector('.blog-grid-3col') !== null || document.querySelector('.blog-hero') !== null;
    if (isLookbook) {
      this.applyLookbook(data);
    }

    // Check if on blog-single.html (single article page)
    const isSingle = document.querySelector('.single-blog-body') !== null || document.querySelector('.article-hero-banner') !== null;
    if (isSingle) {
      this.applySingleBlog(data);
    }

    if (window.lucide) window.lucide.createIcons();
  },

  applyLookbook(data) {
    // 1. Hero Banner
    const heroSec = document.querySelector('.blog-hero');
    if (heroSec && data.hero) {
      if (data.hero.banner_img) {
        heroSec.style.background = `linear-gradient(rgba(18, 14, 12, 0.72), rgba(18, 14, 12, 0.72)), url('${data.hero.banner_img}') center center/cover no-repeat`;
      }
      const badge = heroSec.querySelector('.blog-hero-badge');
      if (badge && data.hero.tag) {
        badge.innerHTML = `<i data-lucide="book-open" style="width: 14px; height: 14px;"></i> ${data.hero.tag}`;
      }
      const title = heroSec.querySelector('.blog-hero-title');
      if (title && data.hero.title) title.innerText = data.hero.title;
      const sub = heroSec.querySelector('.blog-hero-subtitle');
      if (sub && data.hero.subtitle) sub.innerText = data.hero.subtitle;
    }

    // 2. Filter Pills
    const filterContainer = document.querySelector('.blog-filters');
    if (filterContainer && data.filters && data.filters.length) {
      filterContainer.innerHTML = data.filters.map((f, i) => `
        <a href="javascript:void(0)" onclick="filterBlogArticles('${f}')" class="blog-filter-btn ${i === 0 ? 'active' : ''}">${f}</a>
      `).join('');
    }

    // 3. Blog Grid Cards
    const grid = document.querySelector('.blog-grid-3col');
    if (grid && data.articles && data.articles.length) {
      grid.innerHTML = data.articles.map(art => `
        <article class="blog-card" data-category="${art.tag || 'All Articles'}">
          <div class="blog-card-media">
            <img src="${art.image || 'images/chokers.jpg'}" alt="${art.title || 'Journal Story'}">
            <span class="blog-tag-pill">${art.tag || 'Bridal Styling'}</span>
          </div>
          <div class="blog-card-body">
            <div class="blog-meta-row">
              <span><i data-lucide="calendar" style="width: 13px; height: 13px;"></i> ${art.date || 'Recent'}</span>
              <span>•</span>
              <span><i data-lucide="clock" style="width: 13px; height: 13px;"></i> ${art.read_time || '5 Min Read'}</span>
            </div>
            <h2 class="blog-card-title">${art.title || ''}</h2>
            <p class="blog-card-excerpt">
              ${art.excerpt || ''}
            </p>
            <a href="blog-single.html?id=${encodeURIComponent(art.id || art.slug)}" class="blog-read-more-btn">
              Read Full Story <i data-lucide="arrow-right" style="width: 15px; height: 15px;"></i>
            </a>
          </div>
        </article>
      `).join('');
    }
  },

  applySingleBlog(data) {
    if (!data.articles || !data.articles.length) return;

    // Detect target article from URL param ?id=... or ?slug=...
    const urlParams = new URLSearchParams(window.location.search);
    const targetId = urlParams.get('id') || urlParams.get('slug');

    let article = null;
    if (targetId) {
      article = data.articles.find(a => a.id === targetId || a.slug === targetId);
    }
    // Fallback to first article if not specified or not found
    if (!article) {
      article = data.articles[0];
    }

    // Update Page Title
    document.title = `${article.title || 'Story'} | Auro & Jewellary`;

    // 1. Breadcrumb
    const breadcrumbTag = document.querySelector('.container strong');
    if (breadcrumbTag) breadcrumbTag.innerText = article.tag || 'Bridal Styling';

    // 2. Hero Banner
    const banner = document.querySelector('.article-hero-banner');
    if (banner) {
      const bannerBg = article.image || (data.hero && data.hero.banner_img) || 'images/banner_jewelry_pure_3.jpg';
      banner.style.background = `linear-gradient(rgba(18, 14, 12, 0.72), rgba(18, 14, 12, 0.72)), url('${bannerBg}') center center/cover no-repeat`;

      const tagEl = banner.querySelector('.article-tag');
      if (tagEl) tagEl.innerHTML = `<i data-lucide="sparkles" style="width: 14px; height: 14px;"></i> ${article.tag || 'Style Guide'}`;

      const titleEl = banner.querySelector('.article-title');
      if (titleEl) titleEl.innerText = article.title || '';

      const metaEl = banner.querySelector('.article-meta');
      if (metaEl) {
        metaEl.innerHTML = `
          <span>By ${article.author || 'Senior Stylist'}</span>
          <span>•</span>
          <span>${article.date || 'Recent'}</span>
          <span>•</span>
          <span>${article.read_time || '5 Min Read'}</span>
        `;
      }
    }

    // 3. Article Content & Paragraphs
    const contentEl = document.querySelector('.article-content');
    if (contentEl) {
      let parasHtml = '';
      if (article.content_paragraphs && article.content_paragraphs.length) {
        parasHtml = article.content_paragraphs.map((p, idx) => {
          let extra = '';
          if (idx === 1 && article.quote) {
            extra = `
              <div class="article-quote">
                "${article.quote}"
                <cite>— ${article.quote_author || article.author || 'Auro Styling Suite'}</cite>
              </div>
            `;
          }
          if (idx === 2 && article.featured_product && article.featured_product.title) {
            const fp = article.featured_product;
            extra = `
              <div class="article-product-card">
                <img src="${fp.image || 'images/bestseller_2.jpg'}" alt="${fp.title}">
                <div class="article-product-info">
                  <span style="font-size: 0.75rem; text-transform: uppercase; color: #888; letter-spacing: 0.05em; display: block;">Featured In This Story</span>
                  <h4>${fp.title}</h4>
                  <span>${fp.price || ''}</span>
                  <div style="margin-top: 0.6rem;">
                    <a href="${fp.url || 'collections.html'}" class="btn btn-primary" style="padding: 0.5rem 1.2rem; font-size: 0.78rem;">Shop The Piece</a>
                  </div>
                </div>
              </div>
            `;
          }
          return `<p>${p}</p>${extra}`;
        }).join('');
      } else {
        parasHtml = `<p>${article.excerpt || ''}</p>`;
      }

      contentEl.innerHTML = parasHtml;
    }
  }
};

// Global category filter helper for lookbook
window.filterBlogArticles = function(selectedCategory) {
  const buttons = document.querySelectorAll('.blog-filter-btn');
  buttons.forEach(b => {
    if (b.innerText.trim() === selectedCategory) {
      b.classList.add('active');
    } else {
      b.classList.remove('active');
    }
  });

  const cards = document.querySelectorAll('.blog-card');
  cards.forEach(card => {
    const cardCat = card.getAttribute('data-category');
    if (selectedCategory === 'All Articles' || cardCat === selectedCategory) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
};

window.BlogsCMSEngine = BlogsCMSEngine;

window.addEventListener('DOMContentLoaded', async () => {
  try {
    const data = await BlogsCMSEngine.getData();
    BlogsCMSEngine.apply(data);
  } catch(e) {
    console.warn('BlogsCMSEngine init note:', e);
  }
});
