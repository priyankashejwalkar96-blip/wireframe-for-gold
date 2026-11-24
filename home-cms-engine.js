/**
 * home-cms-engine.js
 * Controls EVERY single section of index.html dynamically:
 * 1. Marquee Strip (items, announcements)
 * 2. Trust Badges (4 cards: icon, title, subtitle)
 * 3. Categories Grid (Add / Edit / Delete category cards with title, designs count, url, image)
 * 4. Bestsellers Section (Title, Subtitle, Add / Edit / Delete cards with badge, title, tag, price, reviews, image)
 * 5. Masterpieces / Featured Section (Badge, Title, Subtitle, Filter categories, Add / Edit / Delete cards)
 * 6. Demifine Section (Title, 4 Large Tiles: label, image, link)
 * 7. Demifine Filter Tabs & Cards (Add / Edit / Delete cards for Rings, Earrings, Necklace, Bracelet)
 * 8. Craftsmanship Story Section (Tag, Title, Story, 3 Steps, 3D Layered Images)
 * 9. Royal Brides / Instagram Shoppable Grid (Tag, Title, Subtitle, 4 Gallery items with handle, look title, image)
 * 10. Client Testimonials (Section Tag, Title, Add / Edit / Delete client review cards)
 * 11. Style Chronicles / Blog Cards on Home (Tag, Title, Subtitle, 3 Blog Cards with date, read time, title, excerpt, image)
 * 12. VIP Privilege Newsletter (Badge, Title, Subtitle, Button text, Note)
 */

const HOME_CMS_STORAGE_KEY = 'auro_home_complete_cms';

const DEFAULT_HOME_CMS = {
  marquee: [
    { text: "HAUTE JOAILLERIE ARCHIVE", highlight: true },
    { text: "FLAT 40% OFF ON ROYAL JADAU & POLKI", highlight: true },
    { text: "100% HALLMARKED & ANTI-ALLERGIC 22K MICRO-PLATED", highlight: false },
    { text: "COMPLIMENTARY LUXURY VAULT BOX ON ORDERS OVER ₹3,999", highlight: true },
    { text: "INSURED EXPRESS DOORSTEP DISPATCH", highlight: false }
  ],
  trust_badges: [
    { icon: "shield-check", title: "100% Certified Purity", subtitle: "Hallmarked & Anti-Allergic Safe" },
    { icon: "sparkles", title: "Heritage Craftsmanship", subtitle: "Handmade by 4th-Gen Master Artisans" },
    { icon: "truck", title: "Worldwide Insured Shipping", subtitle: "Dispatched with Tamper-Proof Box" },
    { icon: "rotate-ccw", title: "Hassle-Free Returns", subtitle: "7-Day Easy Exchange Policy" }
  ],
  categories_header: {
    tag: "Curated Collections",
    title: "Shop by Category"
  },
  categories_items: [
    { title: "Hair Accesories", count: "8 Designs", url: "hair-accessories.html", image: "images/hair_1.jpg" },
    { title: "Pachi Kundan Earrings", count: "6 Designs", url: "pachi-kundan-earrings.html", image: "images/pachi_earrings_1.jpg" },
    { title: "Kashmiri Earrings", count: "6 Designs", url: "kashmiri-earrings.html", image: "images/kashmiri_1.jpg" },
    { title: "German Silver (Below 300)", count: "6 Designs", url: "silver-earrings-below-300.html", image: "images/silver_below_300_1.jpg" },
    { title: "German Silver (Above 300)", count: "6 Designs", url: "silver-earrings-above-300.html", image: "images/silver_above_300_1.jpg" },
    { title: "Earcuff (Bugadi-Kundan-Needle)", count: "6 Designs", url: "earcuff-bugadi.html", image: "images/earcuff_1.jpg" },
    { title: "Statement Earrings", count: "6 Designs", url: "statement-earrings.html", image: "images/statement_earrings_1.jpg" },
    { title: "Statement Rings", count: "6 Designs", url: "statement-rings.html", image: "images/statement_rings_1.jpg" },
    { title: "Statement Necklace", count: "6 Designs", url: "statement-necklace.html", image: "images/statement_necklace_1.jpg" },
    { title: "Pachi Kundan Necklace", count: "6 Designs", url: "pachi-kundan-necklace.html", image: "images/pachi_necklace_1.jpg" },
    { title: "German Silver Necklaces", count: "6 Designs", url: "german-silver-necklaces.html", image: "images/silver_necklace_1.jpg" },
    { title: "Handcrafted Rings", count: "6 Designs", url: "rings.html", image: "images/rings_1.jpg" },
    { title: "PREMIUM RINGS", count: "6 Designs", url: "premium-rings.html", image: "images/premium_rings_1.jpg" },
    { title: "Nosepins", count: "6 Designs", url: "nosepin.html", image: "images/nosepin_1.jpg" }
  ],
  bestseller_header: {
    title: "Our Bestseller",
    subtitle: "The most popular pieces, loved by our customers and crafted to make every moment special."
  },
  bestseller_items: [
    { badge: "Bestseller", tag: "Pachi Kundan Choker", title: "German Silver Aad Choker", price: "₹2,080.00 INR", orig_price: "", reviews: "68", image: "images/bestseller_1.jpg" },
    { badge: "Heritage", tag: "Statement Necklace", title: "Polki Necklace", price: "₹2,999.00 INR", orig_price: "", reviews: "54", image: "images/bestseller_2.jpg" },
    { badge: "Sale", tag: "Dori Choker", title: "Handmade Choker", price: "₹1,499.00 INR", orig_price: "₹1,850.00 INR", reviews: "42", image: "images/bestseller_3.jpg" },
    { badge: "Temple Heritage", tag: "Kundan Dangles", title: "Cow Kundan Earrings", price: "₹1,150.00 INR", orig_price: "", reviews: "61", image: "images/bestseller_4.jpg" },
    { badge: "Bridal Special", tag: "Festive Bridal", title: "Statement Necklace", price: "₹4,000.00 INR", orig_price: "", reviews: "73", image: "images/bestseller_5.jpg" }
  ],
  masterpieces_header: {
    tag: "Iconic Best Sellers",
    title: "The Royal Masterpieces",
    subtitle: "Each piece requires over 48 hours of artisanal hand-carving and enamel heating."
  },
  masterpieces_items: [
    { category: "bangles", badge: "Royal Heritage", tag: "Royal Meenakari • 2.6 Size Openable", title: "Meera Royal Peacock Meenakari Kada", price: "₹4,499", orig_price: "₹6,999", discount: "35% OFF", reviews: "142", image: "images/bangles.jpg" },
    { category: "chokers", badge: "Bridal Pick", tag: "Uncut Polki & Emerald Beads", title: "Padmavati Heritage Uncut Polki Choker Set", price: "₹12,850", orig_price: "₹18,500", discount: "30% OFF", reviews: "98", image: "images/chokers.jpg" },
    { category: "earrings", badge: "Hand Enamelled", tag: "Freshwater Pearls & Ruby Inlay", title: "Noor Jahan Reversible Meenakari Chandbalis", price: "₹3,890", orig_price: "₹5,400", discount: "28% OFF", reviews: "74", image: "images/jhumkas.jpg" },
    { category: "bangles", badge: "22K Gold Foil", tag: "Elephant Finial • Screw Lock", title: "Rajputana Carved Gajraj Motif Kada Pair", price: "₹5,999", orig_price: "₹8,500", discount: "29% OFF", reviews: "112", image: "images/kadas.jpg" },
    { category: "modern", badge: "Anti-Tarnish", tag: "Stainless Steel • 18K PVD Gold", title: "Celeste Waterproof Herringbone Layering Set", price: "₹1,999", orig_price: "₹2,899", discount: "31% OFF", reviews: "88", image: "images/modern.jpg" },
    { category: "earrings", badge: "Bestseller", tag: "Banarasi Pink Enamel & Pearls", title: "Banaras Gulabi Lotus Layered Jhumka", price: "₹3,250", orig_price: "₹4,800", discount: "32% OFF", reviews: "62", image: "images/jhumkas.jpg" }
  ],
  demifine_header: {
    title: "DEMIFINE JEWELLERY",
    sub_title: "Auro & Jewellary Collection"
  },
  demifine_tiles: [
    { label: "RINGS", url: "rings.html", image: "images/hd_rings_model.jpg" },
    { label: "EARRING", url: "statement-earrings.html", image: "images/hd_earrings_model.jpg" },
    { label: "BRACELET", url: "collections.html", image: "images/hd_bracelet_model.jpg" },
    { label: "NECKLACE", url: "statement-necklace.html", image: "images/hd_necklace_model.jpg" }
  ],
  craftsmanship: {
    tag: "Artisanal Pedigree",
    title: "The Secret Behind Authentic Meenakari",
    description: "Originating from the royal courts of Rajasthan, Meenakari is the intricate art of engraving delicate metal crevices and filling them with vibrant mineral enamels heated at blistering temperatures over kiln fire.",
    step1_title: "Chitrai (Hand Engraving)",
    step1_desc: "Master chiteras hand-chisel floral jaals and peacock plumes into high-grade alloy.",
    step2_title: "Rangbhari (Mineral Enamelling)",
    step2_desc: "Ground lapis, ruby powder, and turquoise glass pastes are painted with squirrel-hair brushes.",
    step3_title: "Jadau & Kundan Setting",
    step3_desc: "Pure 24K gold leaves (Daak) frame each uncut polki glass stone to catch ambient candlelight.",
    btn_text: "Read The Artisan Manifesto",
    btn_url: "about.html",
    years_exp: "75+",
    years_text: "Years of Heritage Legacy",
    img1: "images/3d_luxury_necklace_pedestal.jpg",
    img2: "images/3d_diamond_gold_ring.jpg",
    img3: "images/3d_luxury_choker_gold.jpg"
  },
  insta_section: {
    tag: "#AuroBrides & Celebrities",
    title: "Worn by Real Queens Across The World",
    subtitle: "Tag @AuroJewels on Instagram to be featured in our royal bridal hall of fame.",
    items: [
      { handle: "@priyanka_kapoor", name: "Royal Polki Choker", image: "images/3d_luxury_necklace_pedestal.jpg" },
      { handle: "@styledbyriya", name: "22K Solitaire Ring", image: "images/3d_diamond_gold_ring.jpg" },
      { handle: "@ananya_fashion", name: "Baroque Pearl Drops", image: "images/3d_pearl_earrings.jpg" },
      { handle: "@tarun_and_tanya", name: "Imperial Jadau Choker", image: "images/3d_luxury_choker_gold.jpg" }
    ]
  },
  reviews_section: {
    tag: "Words of Love",
    title: "Client Reverence",
    items: [
      {
        badge: "Verified Purchase",
        text: "The Meera Meenakari bangles are simply breathtaking. The weight feels authentic, the enamelling is sharp with zero bleeding, and the screw lock fits effortlessly on my wrists. Received countless compliments at my sister's wedding!",
        name: "Sunita Parasrampuria",
        location: "Verified Patron • Mumbai",
        avatar: "SP"
      },
      {
        badge: "Verified Bride",
        text: "I ordered the Padmavati Choker for my wedding reception in Melbourne. The packaging was immaculate with insurance seals. It looked identical to real Polki jewelry worth ₹25 Lakhs. Thank you Auro & Jewellary!",
        name: "Navneet Gill",
        location: "Verified Bride • Melbourne, Australia",
        avatar: "NG"
      },
      {
        badge: "Verified Patron",
        text: "Their anti-tarnish collection from the modern line is legitimately waterproof. I've worn the Celeste snake chain in showers and workouts for 4 months—still shines like brand new 18K solid gold.",
        name: "Kriti Deshmukh",
        location: "Verified Patron • Bengaluru",
        avatar: "KD"
      }
    ]
  },
  blogs_section: {
    tag: "The Jewellery Journal",
    title: "Style Chronicles & Heritage Tales",
    subtitle: "Discover expert styling guides, traditional Meenakari secrets, and tips for caring for your heirlooms.",
    items: [
      {
        tag: "Bridal Styling",
        date: "Nov 20, 2026",
        readTime: "5 Min Read",
        title: "How to Style Imperial Meenakari Chokers for Winter Brides",
        excerpt: "Master the royal art of pairing Daak foil Polki with deep velvet lehengas and balancing regal necklace depths.",
        url: "blog-single.html",
        image: "images/chokers.jpg"
      },
      {
        tag: "Artisan Heritage",
        date: "Nov 15, 2026",
        readTime: "7 Min Read",
        title: "The Secret Alchemy Behind 850°C Mineral Glass Enameling",
        excerpt: "Step inside our Johari Bazaar atelier to witness how raw silica minerals transform into unbreakable Jaipur enamel.",
        url: "blog-single.html",
        image: "images/3d_meenakari_jewelry_craft.jpg"
      },
      {
        tag: "Care & Trend",
        date: "Nov 08, 2026",
        readTime: "4 Min Read",
        title: "Caring for German Silver & 22K Micro-Micron Plated Jewels",
        excerpt: "Longevity rituals from master polishers to keep your oxidised and gold-plated jewels sparkling without tarnishing.",
        url: "blog-single.html",
        image: "images/bestseller_1.jpg"
      }
    ]
  },
  newsletter: {
    tag: "The Royal Circle",
    title: "Enjoy 10% Off Your First Royal Acquisition",
    subtitle: "Subscribe to receive preview invitations to festive trousseau drops and private trunk shows.",
    btn_text: "Join Privilege Club",
    note: "By subscribing you agree to our Privacy Terms. No spam, only royalty."
  }
};

const HomeCMSEngine = {
  async getData() {
    function sanitizeCategoryItem(cat) {
      if (!cat) return cat;
      if (!cat.image || cat.image.trim() === '' || cat.image.includes('undefined')) {
        if (cat.title && cat.title.toLowerCase().includes('below 300')) {
          cat.image = 'images/silver_below_300_1.jpg';
        } else if (cat.title && cat.title.toLowerCase().includes('above 300')) {
          cat.image = 'images/silver_above_300_1.jpg';
        } else if (cat.title && cat.title.toLowerCase().includes('kashmiri')) {
          cat.image = 'images/kashmiri_1.jpg';
        } else if (cat.title && cat.title.toLowerCase().includes('hair')) {
          cat.image = 'images/hair_1.jpg';
        } else if (cat.title && cat.title.toLowerCase().includes('earcuff')) {
          cat.image = 'images/earcuff_1.jpg';
        } else if (cat.title && cat.title.toLowerCase().includes('rings')) {
          cat.image = 'images/rings_1.jpg';
        } else if (cat.title && cat.title.toLowerCase().includes('nosepin')) {
          cat.image = 'images/nosepin_1.jpg';
        } else {
          cat.image = 'images/hair_1.jpg';
        }
      }
      if (cat.image === 'images/silver_below_1.jpg' || cat.image === 'images/silver_below.jpg') {
        cat.image = 'images/silver_below_300_1.jpg';
      }
      if (cat.image === 'images/silver_above_1.jpg' || cat.image === 'images/silver_above.jpg') {
        cat.image = 'images/silver_above_300_1.jpg';
      }
      if (cat.image === 'images/kashmiri_earrings_1.jpg') {
        cat.image = 'images/kashmiri_1.jpg';
      }
      return cat;
    }

    // 1. Try Supabase
    if (typeof supabase !== 'undefined') {
      try {
        const client = supabase.createClient('https://efyqftxjtylvaoqhqptb.supabase.co', 'sb_publishable_WtIo91bnJaIRG7W0ITRR8w_-50i2_kY');
        const { data, error } = await client.from('site_cms').select('*').eq('section_key', 'home_all_sections_cms').maybeSingle();
        if (!error && data && data.content_json) {
          if (data.content_json.categories_items && data.content_json.categories_items.length) {
            data.content_json.categories_items = data.content_json.categories_items.map(sanitizeCategoryItem);
          }
          localStorage.setItem(HOME_CMS_STORAGE_KEY, JSON.stringify(data.content_json));
          return data.content_json;
        }
      } catch(e) {}
    }

    // 2. LocalStorage Cache
    const cached = localStorage.getItem(HOME_CMS_STORAGE_KEY);
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        // Correct any legacy invalid image paths
        if (parsed.categories_items && parsed.categories_items.length) {
          parsed.categories_items = parsed.categories_items.map(sanitizeCategoryItem);
        }
        // Merge with defaults to guarantee all keys exist
        return { ...DEFAULT_HOME_CMS, ...parsed };
      } catch(e) {}
    }

    return DEFAULT_HOME_CMS;
  },

  async saveAll(data) {
    localStorage.setItem(HOME_CMS_STORAGE_KEY, JSON.stringify(data));

    if (typeof supabase !== 'undefined') {
      try {
        const client = supabase.createClient('https://efyqftxjtylvaoqhqptb.supabase.co', 'sb_publishable_WtIo91bnJaIRG7W0ITRR8w_-50i2_kY');
        await client.from('site_cms').upsert({
          section_key: 'home_all_sections_cms',
          section_name: 'Home All Sections Dynamic CMS',
          content_json: data,
          updated_at: new Date().toISOString()
        }, { onConflict: 'section_key' });
      } catch(e) {
        console.warn('Home CMS Supabase note:', e);
      }
    }

    this.apply(data);
  },

  apply(data) {
    if (!data) return;

    // 1. Marquee Strip
    if (data.marquee && data.marquee.length) {
      const track = document.querySelector('.marquee-strip-track');
      if (track) {
        const itemsHtml = data.marquee.map(item => `
          <span class="marquee-strip-item">✦ <span class="${item.highlight ? 'marquee-highlight' : ''}">${item.text}</span> <span class="marquee-sep">⬥</span></span>
        `).join('');
        // Render with seamless double loop
        track.innerHTML = itemsHtml + itemsHtml;
      }
    }

    // 2. Trust Badges
    if (data.trust_badges && data.trust_badges.length) {
      const grid = document.querySelector('.features-grid');
      if (grid) {
        grid.innerHTML = data.trust_badges.map(tb => `
          <div class="feature-item">
            <div class="feature-icon-wrapper">
              <i data-lucide="${tb.icon || 'shield-check'}"></i>
            </div>
            <div>
              <strong>${tb.title}</strong>
              <p>${tb.subtitle}</p>
            </div>
          </div>
        `).join('');
      }
    }

    // 3. Categories Grid
    if (data.categories_header) {
      const sec = document.getElementById('categories');
      if (sec) {
        const tag = sec.querySelector('.section-tag');
        if (tag && data.categories_header.tag) tag.innerText = data.categories_header.tag;
        const title = sec.querySelector('.section-title');
        if (title && data.categories_header.title) title.innerText = data.categories_header.title;
      }
    }
    if (data.categories_items && data.categories_items.length) {
      const catGrid = document.querySelector('.categories-grid');
      if (catGrid) {
        catGrid.innerHTML = data.categories_items.map(cat => {
          let imgSrc = cat.image && cat.image.trim() !== '' ? cat.image : 'images/hair_1.jpg';
          if (imgSrc.includes('silver_below_1.jpg') || imgSrc.includes('silver_below.jpg')) imgSrc = 'images/silver_below_300_1.jpg';
          if (imgSrc.includes('silver_above_1.jpg') || imgSrc.includes('silver_above.jpg')) imgSrc = 'images/silver_above_300_1.jpg';
          if (imgSrc.includes('kashmiri_earrings_1.jpg')) imgSrc = 'images/kashmiri_1.jpg';
          return `
          <a href="${cat.url || 'collections.html'}" class="category-card">
            <div class="cat-img-box">
              <img src="${imgSrc}" alt="${cat.title || 'Category'}" onerror="this.onerror=null;this.src='images/hair_1.jpg';">
            </div>
            <h3>${cat.title || ''}</h3>
            <span>${cat.count || ''}</span>
          </a>
        `;
        }).join('');
      }
    }

    // 4. Bestseller Section
    if (data.bestseller_header) {
      const bestSec = document.getElementById('bestseller');
      if (bestSec) {
        const title = bestSec.querySelector('.section-title');
        if (title && data.bestseller_header.title) title.innerText = data.bestseller_header.title;
        const sub = bestSec.querySelector('.section-header p');
        if (sub && data.bestseller_header.subtitle) sub.innerText = data.bestseller_header.subtitle;
      }
    }
    if (data.bestseller_items && data.bestseller_items.length) {
      const bestGrid = document.querySelector('.bestseller-grid');
      if (bestGrid) {
        bestGrid.innerHTML = data.bestseller_items.map((item, idx) => `
          <div class="product-card">
            <div class="product-badge royal">${item.badge || 'Bestseller'}</div>
            <div class="product-media">
              <img src="${item.image || 'images/bestseller_1.jpg'}" alt="${item.title}" class="primary-img">
              <div class="product-actions-overlay">
                <button class="quick-view-btn" onclick="openModal('best-${idx+1}')"><i data-lucide="eye"></i> Quick View</button>
                <button class="wishlist-icon-btn"><i data-lucide="heart"></i></button>
              </div>
            </div>
            <div class="product-info">
              <span class="product-tag">${item.tag || 'Handcrafted'}</span>
              <h3 class="product-title"><a href="product-detail.html">${item.title}</a></h3>
              <div class="rating-stars">★★★★★ <span class="count">(${item.reviews || '50'} reviews)</span></div>
              <div class="price-row">
                <span class="current-price">${item.price}</span>
                ${item.orig_price ? `<span class="original-price">${item.orig_price}</span>` : ''}
              </div>
              <button class="add-to-cart-btn" onclick="addToCart('${item.title.replace(/'/g, "\\'")}', parseFloat('${item.price}'.replace(/[^0-9.]/g,'')) || 1999, '${item.image}')">
                <i data-lucide="shopping-bag"></i> Add to Cart
              </button>
            </div>
          </div>
        `).join('');
      }
    }

    // 5. Masterpieces / Featured Section
    if (data.masterpieces_header) {
      const featSec = document.getElementById('featured');
      if (featSec) {
        const tag = featSec.querySelector('.section-tag');
        if (tag && data.masterpieces_header.tag) tag.innerText = data.masterpieces_header.tag;
        const title = featSec.querySelector('.section-title');
        if (title && data.masterpieces_header.title) title.innerText = data.masterpieces_header.title;
        const sub = featSec.querySelector('.section-subtext');
        if (sub && data.masterpieces_header.subtitle) sub.innerText = data.masterpieces_header.subtitle;
      }
    }
    if (data.masterpieces_items && data.masterpieces_items.length) {
      const prodGrid = document.getElementById('productGrid');
      if (prodGrid) {
        prodGrid.innerHTML = data.masterpieces_items.map((item, idx) => `
          <div class="product-card" data-category="${item.category || 'bangles'}">
            <div class="product-badge royal">${item.badge || 'Masterpiece'}</div>
            <div class="product-media">
              <img src="${item.image || 'images/bangles.jpg'}" alt="${item.title}" class="primary-img">
              <div class="product-actions-overlay">
                <button class="quick-view-btn" onclick="openModal('feat-${idx+1}')"><i data-lucide="eye"></i> Quick View</button>
                <button class="wishlist-icon-btn"><i data-lucide="heart"></i></button>
              </div>
            </div>
            <div class="product-info">
              <span class="product-tag">${item.tag || 'Imperial Heritage'}</span>
              <h3 class="product-title"><a href="product-detail.html">${item.title}</a></h3>
              <div class="rating-stars">
                <span class="stars">★★★★★</span>
                <span class="count">(${item.reviews || '100'} reviews)</span>
              </div>
              <div class="price-row">
                <span class="current-price">${item.price}</span>
                ${item.orig_price ? `<span class="original-price">${item.orig_price}</span>` : ''}
                ${item.discount ? `<span class="discount-percent">${item.discount}</span>` : ''}
              </div>
              <button class="add-to-cart-btn" onclick="addToCart('${item.title.replace(/'/g, "\\'")}', parseFloat('${item.price}'.replace(/[^0-9.]/g,'')) || 4499, '${item.image}')">
                <i data-lucide="shopping-bag"></i> Add to Bag
              </button>
            </div>
          </div>
        `).join('');
      }
    }

    // 6. Demifine Section
    if (data.demifine_header) {
      const dTitle = document.querySelector('.demifine-title');
      if (dTitle && data.demifine_header.title) dTitle.innerText = data.demifine_header.title;
      const dSubTitle = document.querySelector('.demifine-sub-title');
      if (dSubTitle && data.demifine_header.sub_title) dSubTitle.innerText = data.demifine_header.sub_title;
    }
    if (data.demifine_tiles && data.demifine_tiles.length) {
      const dGrid = document.querySelector('.demifine-grid');
      if (dGrid) {
        dGrid.innerHTML = data.demifine_tiles.map(tile => `
          <a href="${tile.url || 'collections.html'}" class="demifine-card">
            <img src="${tile.image}" alt="${tile.label}" loading="lazy">
            <div class="demifine-overlay">
              <span class="demifine-label">${tile.label}</span>
            </div>
          </a>
        `).join('');
      }
    }

    // 7. Craftsmanship Story Section
    if (data.craftsmanship) {
      const c = data.craftsmanship;
      const cSec = document.querySelector('.craftsmanship-section');
      if (cSec) {
        const tag = cSec.querySelector('.section-tag');
        if (tag && c.tag) tag.innerText = c.tag;
        const title = cSec.querySelector('.section-title');
        if (title && c.title) title.innerText = c.title;
        const pDesc = cSec.querySelector('.craft-content > p');
        if (pDesc && c.description) pDesc.innerText = c.description;

        // Steps
        const steps = cSec.querySelectorAll('.craft-steps .step');
        if (steps[0]) {
          if (c.step1_title) steps[0].querySelector('h4').innerText = c.step1_title;
          if (c.step1_desc) steps[0].querySelector('p').innerText = c.step1_desc;
        }
        if (steps[1]) {
          if (c.step2_title) steps[1].querySelector('h4').innerText = c.step2_title;
          if (c.step2_desc) steps[1].querySelector('p').innerText = c.step2_desc;
        }
        if (steps[2]) {
          if (c.step3_title) steps[2].querySelector('h4').innerText = c.step3_title;
          if (c.step3_desc) steps[2].querySelector('p').innerText = c.step3_desc;
        }

        // Button
        const btn = cSec.querySelector('.craft-content > a.btn');
        if (btn) {
          if (c.btn_text) btn.innerText = c.btn_text;
          if (c.btn_url) btn.href = c.btn_url;
        }

        // Years experience
        const expNum = cSec.querySelector('.exp-num');
        if (expNum && c.years_exp) expNum.innerText = c.years_exp;
        const expText = cSec.querySelector('.exp-text');
        if (expText && c.years_text) expText.innerText = c.years_text;

        // 3D Images
        const img1 = cSec.querySelector('.card-primary img');
        if (img1 && c.img1) img1.src = c.img1;
        const img2 = cSec.querySelector('.card-secondary img');
        if (img2 && c.img2) img2.src = c.img2;
        const img3 = cSec.querySelector('.card-tertiary img');
        if (img3 && c.img3) img3.src = c.img3;
      }
    }

    // 8. Insta / As Seen On Queens Section
    if (data.insta_section) {
      const ins = data.insta_section;
      const iSec = document.querySelector('.insta-section');
      if (iSec) {
        const tag = iSec.querySelector('.section-tag');
        if (tag && ins.tag) tag.innerText = ins.tag;
        const title = iSec.querySelector('.section-title');
        if (title && ins.title) title.innerText = ins.title;
        const sub = iSec.querySelector('.section-subtext');
        if (sub && ins.subtitle) sub.innerText = ins.subtitle;

        if (ins.items && ins.items.length) {
          const grid = iSec.querySelector('.insta-grid');
          if (grid) {
            grid.innerHTML = ins.items.map(item => `
              <div class="insta-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="insta-overlay">
                  <span class="insta-brand-tag">AURO COUTURE</span>
                  <span class="insta-handle-text">${item.handle}</span>
                  <div class="insta-item-name">${item.name}</div>
                  <button class="shop-look-btn">Shop The Look &rarr;</button>
                </div>
              </div>
            `).join('');
          }
        }
      }
    }

    // 9. Client Reviews / Testimonials Section
    if (data.reviews_section) {
      const rev = data.reviews_section;
      const rSec = document.querySelector('.reviews-section');
      if (rSec) {
        const tag = rSec.querySelector('.section-tag');
        if (tag && rev.tag) tag.innerText = rev.tag;
        const title = rSec.querySelector('.section-title');
        if (title && rev.title) title.innerText = rev.title;

        if (rev.items && rev.items.length) {
          const slider = rSec.querySelector('.reviews-slider');
          if (slider) {
            slider.innerHTML = rev.items.map(item => `
              <div class="review-card">
                <div class="review-card-top">
                  <div class="stars-gold">
                    <i data-lucide="star" class="star-fill"></i>
                    <i data-lucide="star" class="star-fill"></i>
                    <i data-lucide="star" class="star-fill"></i>
                    <i data-lucide="star" class="star-fill"></i>
                    <i data-lucide="star" class="star-fill"></i>
                  </div>
                  <span class="review-badge-verified"><i data-lucide="check-circle" style="width: 13px; height: 13px;"></i> ${item.badge}</span>
                </div>
                <p class="review-text">"${item.text}"</p>
                <div class="reviewer-meta">
                  <div class="reviewer-avatar">${item.avatar || item.name.substring(0,2).toUpperCase()}</div>
                  <div>
                    <h5>${item.name}</h5>
                    <span>${item.location}</span>
                  </div>
                </div>
              </div>
            `).join('');
          }
        }
      }
    }

    // 10. Home Blogs / Style Chronicles Section
    if (data.blogs_section) {
      const blg = data.blogs_section;
      const bSec = document.querySelector('.home-blog-section');
      if (bSec) {
        const tag = bSec.querySelector('.section-tag');
        if (tag && blg.tag) tag.innerText = blg.tag;
        const title = bSec.querySelector('.section-title');
        if (title && blg.title) title.innerText = blg.title;
        const sub = bSec.querySelector('.section-header p');
        if (sub && blg.subtitle) sub.innerText = blg.subtitle;

        if (blg.items && blg.items.length) {
          const grid = bSec.querySelector('.blog-grid-3col');
          if (grid) {
            grid.innerHTML = blg.items.map(post => `
              <article class="blog-card">
                <div class="blog-card-media">
                  <img src="${post.image}" alt="${post.title}">
                  <span class="blog-tag-pill">${post.tag}</span>
                </div>
                <div class="blog-card-body">
                  <div class="blog-meta-row">
                    <span>${post.date || 'Recent'}</span>
                    <span>•</span>
                    <span>${post.readTime || '5 Min Read'}</span>
                  </div>
                  <h3 class="blog-card-title">${post.title}</h3>
                  <p class="blog-card-excerpt">${post.excerpt}</p>
                  <a href="${post.url || 'blog-single.html'}" class="blog-read-more-btn">
                    Read Full Story <i data-lucide="arrow-right" style="width: 15px; height: 15px;"></i>
                  </a>
                </div>
              </article>
            `).join('');
          }
        }
      }
    }

    // 11. Newsletter VIP Privilege Club Section
    if (data.newsletter) {
      const nw = data.newsletter;
      const nSec = document.querySelector('.newsletter-section');
      if (nSec) {
        const tag = nSec.querySelector('.section-tag');
        if (tag && nw.tag) tag.innerText = nw.tag;
        const h2 = nSec.querySelector('h2');
        if (h2 && nw.title) h2.innerText = nw.title;
        const p = nSec.querySelector('p');
        if (p && nw.subtitle) p.innerText = nw.subtitle;
        const btn = nSec.querySelector('.newsletter-form button span');
        if (btn && nw.btn_text) btn.innerText = nw.btn_text;
        const small = nSec.querySelector('.small-text');
        if (small && nw.note) small.innerText = nw.note;
      }
    }

    if (window.lucide) window.lucide.createIcons();
  }
};

window.HomeCMSEngine = HomeCMSEngine;

window.addEventListener('DOMContentLoaded', async () => {
  try {
    const data = await HomeCMSEngine.getData();
    HomeCMSEngine.apply(data);
  } catch(e) {
    console.warn('HomeCMSEngine init note:', e);
  }
});
