/**
 * category-pages-cms-engine.js
 * Automatically makes all 14 dropdown category pages fully dynamic!
 * 
 * Works across:
 * - hair-accessories.html
 * - pachi-kundan-earrings.html
 * - kashmiri-earrings.html
 * - silver-earrings-below-300.html
 * - silver-earrings-above-300.html
 * - earcuff-bugadi.html
 * - statement-earrings.html
 * - statement-rings.html
 * - statement-necklace.html
 * - pachi-kundan-necklace.html
 * - german-silver-necklaces.html
 * - rings.html
 * - premium-rings.html
 * - nosepin.html
 * 
 * Capabilities:
 * 1. Synchronizes hero banner headers (tag, title, subtitle, banner image)
 * 2. Synchronizes category sidebar count pills dynamically
 * 3. Pulls live products for each category from ProductsCMSEngine (or DEFAULT_PRODUCTS)
 * 4. Enables quick sorting (Price Low-to-High, High-to-Low, Popularity)
 * 5. Integrated with Cart (addToCart), Wishlist, and Quick View Modal
 */

const CATEGORY_PAGES_META_KEY = 'auro_category_pages_meta_cms';

const DEFAULT_CATEGORY_PAGES_META = {
  "hair-accessories.html": {
    categoryKey: "hair",
    tag: "Royal Trousseau Coiffure",
    title: "Hair Accessories & Brooches",
    subtitle: "Exquisite handcrafted Pachi Kundan Juda brooches, German silver borla maangtikas, and imperial hair pins designed for festive celebrations and royal bridal updos.",
    banner_img: "images/hero.jpg"
  },
  "pachi-kundan-earrings.html": {
    categoryKey: "pachi-earrings",
    tag: "Imperial Royal Collection",
    title: "Pachi Kundan Earrings",
    subtitle: "Imperial Jaipuri Uncut Stone Chandbalis & Jhumkas. Curated with imperial Mughal artistry and hallmarked hypoallergenic finish.",
    banner_img: "images/hero.jpg"
  },
  "kashmiri-earrings.html": {
    categoryKey: "kashmiri",
    tag: "Imperial Royal Collection",
    title: "Kashmiri Earrings",
    subtitle: "Royal Jhumkas & Kashmiri Dejhoor Earrings. Curated with imperial Mughal artistry and hallmarked hypoallergenic finish.",
    banner_img: "images/hero.jpg"
  },
  "silver-earrings-below-300.html": {
    categoryKey: "silver-below-300",
    tag: "Daily Demifine Luxury",
    title: "German Silver (Below 300 Rs)",
    subtitle: "Affordable handcrafted oxidized German silver jhumkas, studs, and lightweight temple dangles crafted for daily sophistication.",
    banner_img: "images/hero.jpg"
  },
  "silver-earrings-above-300.html": {
    categoryKey: "silver-above-300",
    tag: "Artisan Statement Edit",
    title: "German Silver (Above 300 Rs)",
    subtitle: "Heavy artisan-carved German silver statement earrings, tribal chandeliers, and mirror-work ear ornaments.",
    banner_img: "images/hero.jpg"
  },
  "earcuff-bugadi.html": {
    categoryKey: "earcuff",
    tag: "Traditional Maharashtrian & Rajputi",
    title: "Earcuff (Bugadi-Kundan-Needle)",
    subtitle: "Authentic non-pierced bugadi cuffs, Kundan ear climber needles, and bridal ear chains handcrafted with heirloom finesse.",
    banner_img: "images/hero.jpg"
  },
  "statement-earrings.html": {
    categoryKey: "statement-earrings",
    tag: "High Drama Couture",
    title: "Statement Earrings",
    subtitle: "Bold chandelier earrings, temple architecture silhouettes, and oversized Polki drops designed to turn heads.",
    banner_img: "images/hero.jpg"
  },
  "statement-rings.html": {
    categoryKey: "statement-rings",
    tag: "Imperial Finger Armour",
    title: "Statement Rings",
    subtitle: "Royal cocktail rings, adjustable Meenakari floral crowns, and oversized uncut stone rings reminiscent of royal Mughal courts.",
    banner_img: "images/hero.jpg"
  },
  "statement-necklace.html": {
    categoryKey: "statement-necklace",
    tag: "Heirloom Masterpieces",
    title: "Statement Necklace",
    subtitle: "Imperial Aad chokers, multi-tier Polki rani haars, and regal bridal necklaces hand-carved in 22K micro-plated silver.",
    banner_img: "images/hero.jpg"
  },
  "pachi-kundan-necklace.html": {
    categoryKey: "pachi-necklace",
    tag: "Authentic Jaipur Jadau",
    title: "Pachi Kundan Necklace",
    subtitle: "Traditional foil-backed Daak Kundan necklaces with reversible Meenakari work, emerald beads, and authentic royal finishes.",
    banner_img: "images/hero.jpg"
  },
  "german-silver-necklaces.html": {
    categoryKey: "german-silver-necklace",
    tag: "Tribal & Bohemian Heritage",
    title: "German Silver Necklaces",
    subtitle: "Layered coin necklaces, tribal oxidized chokers, and ghungroo-adorned collar pieces for vintage styling.",
    banner_img: "images/hero.jpg"
  },
  "rings.html": {
    categoryKey: "rings",
    tag: "Artisan Everyday Ornaments",
    title: "Handcrafted Rings",
    subtitle: "Subtle gemstone rings, floral motifs, and adjustable ethnic bands crafted for everyday comfort and grace.",
    banner_img: "images/hero.jpg"
  },
  "premium-rings.html": {
    categoryKey: "premium-rings",
    tag: "Haute Joaillerie Solitaires",
    title: "PREMIUM RINGS",
    subtitle: "Precious navratna inlays, certified Moissanite solitaires, and museum-grade enamel cocktail rings.",
    banner_img: "images/hero.jpg"
  },
  "nosepin.html": {
    categoryKey: "nosepin",
    tag: "Nath & Mukhbhushan",
    title: "Heritage Nosepins",
    subtitle: "Clip-on bridal naths, minimal silver studs, and traditional Maharashtrian Brahmi pearls for auspicious celebrations.",
    banner_img: "images/hero.jpg"
  }
};

const CategoryPagesCMSEngine = {
  // Identify which category page the browser is currently on
  getCurrentPageFileName() {
    const path = window.location.pathname;
    const parts = path.split('/');
    return parts[parts.length - 1] || 'collections.html';
  },

  async getPagesMeta() {
    // 1. Try Supabase
    if (typeof supabase !== 'undefined') {
      try {
        const client = supabase.createClient('https://efyqftxjtylvaoqhqptb.supabase.co', 'sb_publishable_WtIo91bnJaIRG7W0ITRR8w_-50i2_kY');
        const { data, error } = await client.from('site_cms').select('*').eq('section_key', 'category_pages_meta_cms').maybeSingle();
        if (!error && data && data.content_json) {
          localStorage.setItem(CATEGORY_PAGES_META_KEY, JSON.stringify(data.content_json));
          return { ...DEFAULT_CATEGORY_PAGES_META, ...data.content_json };
        }
      } catch(e) {}
    }

    // 2. LocalStorage Cache
    const cached = localStorage.getItem(CATEGORY_PAGES_META_KEY);
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        return { ...DEFAULT_CATEGORY_PAGES_META, ...parsed };
      } catch(e) {}
    }

    return DEFAULT_CATEGORY_PAGES_META;
  },

  async savePagesMeta(metaObj) {
    localStorage.setItem(CATEGORY_PAGES_META_KEY, JSON.stringify(metaObj));

    if (typeof supabase !== 'undefined') {
      try {
        const client = supabase.createClient('https://efyqftxjtylvaoqhqptb.supabase.co', 'sb_publishable_WtIo91bnJaIRG7W0ITRR8w_-50i2_kY');
        await client.from('site_cms').upsert({
          section_key: 'category_pages_meta_cms',
          section_name: 'Category Dropdown Pages Metadata',
          content_json: metaObj,
          updated_at: new Date().toISOString()
        }, { onConflict: 'section_key' });
      } catch(e) {
        console.warn('Category Pages CMS Supabase note:', e);
      }
    }
  },

  async initPage() {
    const filename = this.getCurrentPageFileName();
    const metaAll = await this.getPagesMeta();
    const currentMeta = metaAll[filename];

    // If not one of the 14 category pages, return
    if (!currentMeta) return;

    // 1. Update Hero Banner (tag, title, subtitle, bg)
    const heroBanner = document.querySelector('.page-hero-banner');
    if (heroBanner) {
      if (currentMeta.banner_img) {
        heroBanner.style.background = `linear-gradient(rgba(18,18,18,0.72), rgba(18,18,18,0.72)), url('${currentMeta.banner_img}') center/cover`;
      }
      const tagEl = heroBanner.querySelector('.section-tag');
      if (tagEl && currentMeta.tag) tagEl.innerText = currentMeta.tag;
      const titleEl = heroBanner.querySelector('.page-title');
      if (titleEl && currentMeta.title) titleEl.innerText = currentMeta.title;
      const subEl = heroBanner.querySelector('p');
      if (subEl && currentMeta.subtitle) subEl.innerText = currentMeta.subtitle;
    }

    // Update document title
    if (currentMeta.title) {
      document.title = `${currentMeta.title} | Auro & Jewellary`;
    }

    // 2. Load live products for this category
    let allProducts = [];
    if (window.ProductsCMSEngine) {
      allProducts = await window.ProductsCMSEngine.getProducts();
    } else if (typeof DEFAULT_PRODUCTS !== 'undefined') {
      allProducts = DEFAULT_PRODUCTS;
    }

    const catKey = currentMeta.categoryKey;
    const categoryProducts = allProducts.filter(p => p.category === catKey);

    // 3. Update category counts in sidebar & stats
    const countPill = document.querySelector('.active-tag-pill');
    if (countPill) {
      countPill.innerHTML = `Showing ${categoryProducts.length} Handcrafted Pieces <i data-lucide="sparkles" style="width: 13px; height: 13px;"></i>`;
    }

    const showingControl = document.querySelector('.catalog-top-controls div:last-child');
    if (showingControl && showingControl.innerText.includes('Showing')) {
      showingControl.innerText = `Showing ${categoryProducts.length} Items`;
    }

    // Update sidebar active link count
    document.querySelectorAll('.category-list-menu a').forEach(a => {
      const href = a.getAttribute('href');
      if (href === filename) {
        a.classList.add('active');
        const countSpan = a.querySelector('.count');
        if (countSpan) countSpan.innerText = categoryProducts.length;
      }
    });

    // 4. Render Products Grid dynamically
    const grid = document.querySelector('.catalog-products-main .products-grid') || document.querySelector('.products-grid');
    if (grid) {
      this.renderProductsList(grid, categoryProducts);
      this.wireSortDropdown(grid, categoryProducts);
    }

    if (window.lucide) window.lucide.createIcons();
  },

  renderProductsList(grid, productsList) {
    if (!grid) return;

    if (productsList.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; color: #888;">
          <i data-lucide="package-open" style="width: 48px; height: 48px; margin: 0 auto 1rem; display: block; color: #9A2143;"></i>
          <h3 style="font-size: 1.2rem; color: #1a1a1a; margin-bottom: 0.5rem;">New Pieces Coming Soon</h3>
          <p style="font-size: 0.9rem;">Our artisans are hand-crafting new designs for this collection.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = productsList.map(p => {
      const numericPrice = parseInt(String(p.price).replace(/[^0-9]/g, ''), 10) || 899;
      const discountBadge = p.discount ? `<span class="discount-percent">${p.discount}</span>` : '';
      const origPriceHtml = p.orig_price ? `<span class="original-price">${p.orig_price}</span>` : '';
      const badgeHtml = p.badge ? `<div class="product-badge royal">${p.badge}</div>` : '';

      return `
        <div class="product-card" data-category="${p.category}">
          ${badgeHtml}
          <div class="product-media">
            <img src="${p.image || 'images/hair_1.jpg'}" alt="${p.title}" class="primary-img" onerror="this.onerror=null;this.src='images/hair_1.jpg';">
            <div class="product-actions-overlay">
              <button class="quick-view-btn" onclick="openModal('${p.id}')"><i data-lucide="eye"></i> Quick View</button>
              <button class="wishlist-icon-btn" aria-label="Add to wishlist"><i data-lucide="heart"></i></button>
            </div>
          </div>
          <div class="product-info">
            <span class="product-tag">${p.tag || 'Handcrafted Collection'}</span>
            <h3 class="product-title"><a href="product-detail.html">${p.title}</a></h3>
            <div class="rating-stars">★★★★★ <span class="count">(${p.reviews || '30 reviews'})</span></div>
            <div class="price-row">
              <span class="current-price">${p.price}</span>
              ${origPriceHtml}
              ${discountBadge}
            </div>
            <button class="add-to-cart-btn" onclick="addToCart('${p.title.replace(/'/g, "\\'")}', ${numericPrice}, '${p.image}')">
              <i data-lucide="shopping-bag"></i> Add to Bag
            </button>
          </div>
        </div>
      `;
    }).join('');

    if (window.lucide) window.lucide.createIcons();
  },

  wireSortDropdown(grid, productsList) {
    const select = document.querySelector('.catalog-top-controls select');
    if (!select) return;

    select.addEventListener('change', (e) => {
      const val = e.target.value;
      let sorted = [...productsList];

      if (val.includes('Low to High')) {
        sorted.sort((a, b) => {
          const pA = parseInt(String(a.price).replace(/[^0-9]/g, ''), 10) || 0;
          const pB = parseInt(String(b.price).replace(/[^0-9]/g, ''), 10) || 0;
          return pA - pB;
        });
      } else if (val.includes('High to Low')) {
        sorted.sort((a, b) => {
          const pA = parseInt(String(a.price).replace(/[^0-9]/g, ''), 10) || 0;
          const pB = parseInt(String(b.price).replace(/[^0-9]/g, ''), 10) || 0;
          return pB - pA;
        });
      } else if (val.includes('Rating') || val.includes('Popularity')) {
        sorted.sort((a, b) => {
          const rA = parseInt(String(a.reviews).replace(/[^0-9]/g, ''), 10) || 0;
          const rB = parseInt(String(b.reviews).replace(/[^0-9]/g, ''), 10) || 0;
          return rB - rA;
        });
      }

      this.renderProductsList(grid, sorted);
    });
  }
};

window.CategoryPagesCMSEngine = CategoryPagesCMSEngine;

window.addEventListener('DOMContentLoaded', () => {
  CategoryPagesCMSEngine.initPage();
});
