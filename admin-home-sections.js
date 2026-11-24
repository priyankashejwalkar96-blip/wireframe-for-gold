// admin-home-sections.js
// Handles all home sections CRUD in admin.html

let homeCMSData = null;

async function loadHomeSectionsAdmin() {
  if (!window.HomeCMSEngine) return;
  homeCMSData = await window.HomeCMSEngine.getData();

  // 1. Marquee
  renderHomeMarqueeAdmin();

  // 2. Trust Badges
  renderHomeTrustBadgesAdmin();

  // 3. Categories Grid
  if (homeCMSData.categories_header) {
    const tag = document.getElementById('h-cat-tag');
    if (tag) tag.value = homeCMSData.categories_header.tag || '';
    const title = document.getElementById('h-cat-title');
    if (title) title.value = homeCMSData.categories_header.title || '';
  }
  renderHomeCategoriesAdmin();

  // 4. Bestsellers
  if (homeCMSData.bestseller_header) {
    const title = document.getElementById('h-best-title');
    if (title) title.value = homeCMSData.bestseller_header.title || '';
    const sub = document.getElementById('h-best-subtitle');
    if (sub) sub.value = homeCMSData.bestseller_header.subtitle || '';
  }
  renderHomeBestsellersAdmin();

  // 5. Masterpieces / Featured
  if (homeCMSData.masterpieces_header) {
    const tag = document.getElementById('h-feat-tag');
    if (tag) tag.value = homeCMSData.masterpieces_header.tag || '';
    const title = document.getElementById('h-feat-title');
    if (title) title.value = homeCMSData.masterpieces_header.title || '';
    const sub = document.getElementById('h-feat-subtitle');
    if (sub) sub.value = homeCMSData.masterpieces_header.subtitle || '';
  }
  renderHomeMasterpiecesAdmin();

  // 6. Demifine
  if (homeCMSData.demifine_header) {
    const title = document.getElementById('h-demi-title');
    if (title) title.value = homeCMSData.demifine_header.title || '';
    const sub = document.getElementById('h-demi-subtitle');
    if (sub) sub.value = homeCMSData.demifine_header.sub_title || '';
  }
  renderHomeDemifineAdmin();

  // 7. Craftsmanship
  if (homeCMSData.craftsmanship) {
    const c = homeCMSData.craftsmanship;
    if (document.getElementById('h-craft-tag')) document.getElementById('h-craft-tag').value = c.tag || '';
    if (document.getElementById('h-craft-title')) document.getElementById('h-craft-title').value = c.title || '';
    if (document.getElementById('h-craft-desc')) document.getElementById('h-craft-desc').value = c.description || '';
    if (document.getElementById('h-craft-s1-title')) document.getElementById('h-craft-s1-title').value = c.step1_title || '';
    if (document.getElementById('h-craft-s1-desc')) document.getElementById('h-craft-s1-desc').value = c.step1_desc || '';
    if (document.getElementById('h-craft-s2-title')) document.getElementById('h-craft-s2-title').value = c.step2_title || '';
    if (document.getElementById('h-craft-s2-desc')) document.getElementById('h-craft-s2-desc').value = c.step2_desc || '';
    if (document.getElementById('h-craft-s3-title')) document.getElementById('h-craft-s3-title').value = c.step3_title || '';
    if (document.getElementById('h-craft-s3-desc')) document.getElementById('h-craft-s3-desc').value = c.step3_desc || '';
    if (document.getElementById('h-craft-years-num')) document.getElementById('h-craft-years-num').value = c.years_exp || '75+';
    if (document.getElementById('h-craft-years-text')) document.getElementById('h-craft-years-text').value = c.years_text || '';
    if (document.getElementById('h-craft-btn-text')) document.getElementById('h-craft-btn-text').value = c.btn_text || '';
    if (document.getElementById('h-craft-btn-url')) document.getElementById('h-craft-btn-url').value = c.btn_url || '';
  }

  // 8. Insta / Queens
  if (homeCMSData.insta_section) {
    const ins = homeCMSData.insta_section;
    if (document.getElementById('h-insta-tag')) document.getElementById('h-insta-tag').value = ins.tag || '';
    if (document.getElementById('h-insta-title')) document.getElementById('h-insta-title').value = ins.title || '';
    if (document.getElementById('h-insta-subtitle')) document.getElementById('h-insta-subtitle').value = ins.subtitle || '';
  }
  renderHomeInstaAdmin();

  // 9. Reviews
  if (homeCMSData.reviews_section) {
    const rev = homeCMSData.reviews_section;
    if (document.getElementById('h-rev-tag')) document.getElementById('h-rev-tag').value = rev.tag || '';
    if (document.getElementById('h-rev-title')) document.getElementById('h-rev-title').value = rev.title || '';
  }
  renderHomeReviewsAdmin();

  // 10. Blogs
  if (homeCMSData.blogs_section) {
    const blg = homeCMSData.blogs_section;
    if (document.getElementById('h-blog-tag')) document.getElementById('h-blog-tag').value = blg.tag || '';
    if (document.getElementById('h-blog-title')) document.getElementById('h-blog-title').value = blg.title || '';
    if (document.getElementById('h-blog-subtitle')) document.getElementById('h-blog-subtitle').value = blg.subtitle || '';
  }
  renderHomeBlogsAdmin();

  // 11. Newsletter
  if (homeCMSData.newsletter) {
    const nw = homeCMSData.newsletter;
    if (document.getElementById('h-news-tag')) document.getElementById('h-news-tag').value = nw.tag || '';
    if (document.getElementById('h-news-title')) document.getElementById('h-news-title').value = nw.title || '';
    if (document.getElementById('h-news-subtitle')) document.getElementById('h-news-subtitle').value = nw.subtitle || '';
    if (document.getElementById('h-news-btn')) document.getElementById('h-news-btn').value = nw.btn_text || '';
    if (document.getElementById('h-news-note')) document.getElementById('h-news-note').value = nw.note || '';
  }
}

// 1. MARQUEE CRUD
function renderHomeMarqueeAdmin() {
  const container = document.getElementById('admin-marquee-list');
  if (!container || !homeCMSData) return;
  container.innerHTML = homeCMSData.marquee.map((item, idx) => `
    <div class="flex items-center gap-2 bg-slate-800/80 p-2.5 rounded border border-slate-700">
      <input type="text" value="${item.text}" onchange="homeCMSData.marquee[${idx}].text=this.value" class="bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-white flex-1">
      <label class="text-[11px] text-amber-300 flex items-center gap-1 cursor-pointer">
        <input type="checkbox" ${item.highlight ? 'checked' : ''} onchange="homeCMSData.marquee[${idx}].highlight=this.checked"> Highlight
      </label>
      <button type="button" onclick="homeCMSData.marquee.splice(${idx},1); renderHomeMarqueeAdmin();" class="text-red-400 hover:text-red-300 text-xs px-2 py-1 rounded bg-red-500/10">Delete</button>
    </div>
  `).join('');
}
function addHomeMarqueeItem() {
  if (!homeCMSData) return;
  homeCMSData.marquee.push({ text: "NEW FESTIVE ANNOUNCEMENT", highlight: true });
  renderHomeMarqueeAdmin();
}

// 2. TRUST BADGES
function renderHomeTrustBadgesAdmin() {
  const container = document.getElementById('admin-trust-badges-list');
  if (!container || !homeCMSData) return;
  container.innerHTML = homeCMSData.trust_badges.map((tb, idx) => `
    <div class="bg-slate-800/80 p-3 rounded border border-slate-700 space-y-2">
      <div class="flex items-center justify-between">
        <span class="text-xs font-bold text-amber-300">Badge #${idx+1} (${tb.icon})</span>
        <button type="button" onclick="homeCMSData.trust_badges.splice(${idx},1); renderHomeTrustBadgesAdmin();" class="text-red-400 text-xs">Delete</button>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
        <input type="text" value="${tb.title}" onchange="homeCMSData.trust_badges[${idx}].title=this.value" class="bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-white" placeholder="Title">
        <input type="text" value="${tb.subtitle}" onchange="homeCMSData.trust_badges[${idx}].subtitle=this.value" class="bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-white" placeholder="Subtitle">
      </div>
    </div>
  `).join('');
}
function addHomeTrustBadge() {
  if (!homeCMSData) return;
  homeCMSData.trust_badges.push({ icon: "shield-check", title: "New Trust Assurance", subtitle: "Certified & Guaranteed" });
  renderHomeTrustBadgesAdmin();
}

// 3. CATEGORIES GRID
function renderHomeCategoriesAdmin() {
  const container = document.getElementById('admin-categories-list');
  if (!container || !homeCMSData) return;
  container.innerHTML = homeCMSData.categories_items.map((cat, idx) => `
    <div class="bg-slate-800/80 p-3 rounded border border-slate-700 space-y-2 relative">
      <div class="flex items-center justify-between pb-1 border-b border-slate-700">
        <span class="text-xs font-semibold text-amber-400">Card #${idx+1}</span>
        <button type="button" onclick="homeCMSData.categories_items.splice(${idx},1); renderHomeCategoriesAdmin();" class="text-red-400 text-xs">Delete</button>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-2">
        <div>
          <label class="block text-[10px] text-slate-400">Title</label>
          <input type="text" value="${cat.title}" onchange="homeCMSData.categories_items[${idx}].title=this.value" class="bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-white w-full">
        </div>
        <div>
          <label class="block text-[10px] text-slate-400">Designs Count</label>
          <input type="text" value="${cat.count}" onchange="homeCMSData.categories_items[${idx}].count=this.value" class="bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-white w-full">
        </div>
        <div>
          <label class="block text-[10px] text-slate-400">Page Link URL</label>
          <input type="text" value="${cat.url}" onchange="homeCMSData.categories_items[${idx}].url=this.value" class="bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-white w-full">
        </div>
      </div>
      <div class="flex items-center gap-2 pt-1">
        <input type="file" accept="image/*" id="cat-file-${idx}" onchange="handleCatImageUpload(event, ${idx})" class="hidden">
        <button type="button" onclick="document.getElementById('cat-file-${idx}').click()" class="px-2 py-1 bg-slate-900 hover:bg-slate-700 border border-slate-600 rounded text-amber-300 text-xs">Choose Image</button>
        <img id="cat-preview-${idx}" src="${cat.image}" class="w-8 h-8 object-cover rounded border border-slate-600">
        <span class="text-[10px] text-slate-400 truncate max-w-xs">${cat.image}</span>
      </div>
    </div>
  `).join('');
}
function handleCatImageUpload(event, idx) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    homeCMSData.categories_items[idx].image = e.target.result;
    document.getElementById('cat-preview-' + idx).src = e.target.result;
  };
  reader.readAsDataURL(file);
}
function addHomeCategoryCard() {
  if (!homeCMSData) return;
  homeCMSData.categories_items.push({
    title: "New Category",
    count: "6 Designs",
    url: "collections.html",
    image: "images/hair_1.jpg"
  });
  renderHomeCategoriesAdmin();
}

// 4. BESTSELLERS
function renderHomeBestsellersAdmin() {
  const container = document.getElementById('admin-bestsellers-list');
  if (!container || !homeCMSData) return;
  container.innerHTML = homeCMSData.bestseller_items.map((b, idx) => `
    <div class="bg-slate-800/80 p-3 rounded border border-slate-700 space-y-2">
      <div class="flex items-center justify-between pb-1 border-b border-slate-700">
        <span class="text-xs font-semibold text-amber-400">Bestseller #${idx+1}</span>
        <button type="button" onclick="homeCMSData.bestseller_items.splice(${idx},1); renderHomeBestsellersAdmin();" class="text-red-400 text-xs">Delete</button>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
        <div>
          <label class="block text-[10px] text-slate-400">Product Title</label>
          <input type="text" value="${b.title}" onchange="homeCMSData.bestseller_items[${idx}].title=this.value" class="bg-slate-900 border border-slate-700 rounded p-1 text-xs text-white w-full">
        </div>
        <div>
          <label class="block text-[10px] text-slate-400">Badge (e.g. Bestseller, Sale)</label>
          <input type="text" value="${b.badge}" onchange="homeCMSData.bestseller_items[${idx}].badge=this.value" class="bg-slate-900 border border-slate-700 rounded p-1 text-xs text-white w-full">
        </div>
        <div>
          <label class="block text-[10px] text-slate-400">Product Tag / Style</label>
          <input type="text" value="${b.tag}" onchange="homeCMSData.bestseller_items[${idx}].tag=this.value" class="bg-slate-900 border border-slate-700 rounded p-1 text-xs text-white w-full">
        </div>
        <div>
          <label class="block text-[10px] text-slate-400">Price Display (e.g. ₹2,080.00)</label>
          <input type="text" value="${b.price}" onchange="homeCMSData.bestseller_items[${idx}].price=this.value" class="bg-slate-900 border border-slate-700 rounded p-1 text-xs text-white w-full">
        </div>
      </div>
      <div class="flex items-center gap-2 pt-1">
        <input type="file" accept="image/*" id="best-file-${idx}" onchange="handleBestImageUpload(event, ${idx})" class="hidden">
        <button type="button" onclick="document.getElementById('best-file-${idx}').click()" class="px-2 py-1 bg-slate-900 hover:bg-slate-700 border border-slate-600 rounded text-amber-300 text-xs">Upload Photo</button>
        <img id="best-preview-${idx}" src="${b.image}" class="w-8 h-8 object-cover rounded border border-slate-600">
        <span class="text-[10px] text-slate-400 truncate max-w-xs">${b.image}</span>
      </div>
    </div>
  `).join('');
}
function handleBestImageUpload(event, idx) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    homeCMSData.bestseller_items[idx].image = e.target.result;
    document.getElementById('best-preview-' + idx).src = e.target.result;
  };
  reader.readAsDataURL(file);
}
function addHomeBestseller() {
  if (!homeCMSData) return;
  homeCMSData.bestseller_items.push({
    badge: "Bestseller",
    tag: "Handcrafted Heritage",
    title: "New Royal Masterpiece",
    price: "₹2,499.00 INR",
    orig_price: "",
    reviews: "50",
    image: "images/bestseller_1.jpg"
  });
  renderHomeBestsellersAdmin();
}

// 5. MASTERPIECES / FEATURED
function renderHomeMasterpiecesAdmin() {
  const container = document.getElementById('admin-masterpieces-list');
  if (!container || !homeCMSData) return;
  container.innerHTML = homeCMSData.masterpieces_items.map((m, idx) => `
    <div class="bg-slate-800/80 p-3 rounded border border-slate-700 space-y-2">
      <div class="flex items-center justify-between pb-1 border-b border-slate-700">
        <span class="text-xs font-semibold text-amber-400">Piece #${idx+1} (${m.category})</span>
        <button type="button" onclick="homeCMSData.masterpieces_items.splice(${idx},1); renderHomeMasterpiecesAdmin();" class="text-red-400 text-xs">Delete</button>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
        <div>
          <label class="block text-[10px] text-slate-400">Title</label>
          <input type="text" value="${m.title}" onchange="homeCMSData.masterpieces_items[${idx}].title=this.value" class="bg-slate-900 border border-slate-700 rounded p-1 text-xs text-white w-full">
        </div>
        <div>
          <label class="block text-[10px] text-slate-400">Filter Category (bangles, chokers, earrings, modern)</label>
          <input type="text" value="${m.category}" onchange="homeCMSData.masterpieces_items[${idx}].category=this.value" class="bg-slate-900 border border-slate-700 rounded p-1 text-xs text-white w-full">
        </div>
        <div>
          <label class="block text-[10px] text-slate-400">Price Display</label>
          <input type="text" value="${m.price}" onchange="homeCMSData.masterpieces_items[${idx}].price=this.value" class="bg-slate-900 border border-slate-700 rounded p-1 text-xs text-white w-full">
        </div>
        <div>
          <label class="block text-[10px] text-slate-400">Original Price / Discount</label>
          <input type="text" value="${m.orig_price || ''}" onchange="homeCMSData.masterpieces_items[${idx}].orig_price=this.value" class="bg-slate-900 border border-slate-700 rounded p-1 text-xs text-white w-full">
        </div>
      </div>
      <div class="flex items-center gap-2 pt-1">
        <input type="file" accept="image/*" id="feat-file-${idx}" onchange="handleFeatImageUpload(event, ${idx})" class="hidden">
        <button type="button" onclick="document.getElementById('feat-file-${idx}').click()" class="px-2 py-1 bg-slate-900 hover:bg-slate-700 border border-slate-600 rounded text-amber-300 text-xs">Upload Photo</button>
        <img id="feat-preview-${idx}" src="${m.image}" class="w-8 h-8 object-cover rounded border border-slate-600">
        <span class="text-[10px] text-slate-400 truncate max-w-xs">${m.image}</span>
      </div>
    </div>
  `).join('');
}
function handleFeatImageUpload(event, idx) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    homeCMSData.masterpieces_items[idx].image = e.target.result;
    document.getElementById('feat-preview-' + idx).src = e.target.result;
  };
  reader.readAsDataURL(file);
}
function addHomeMasterpiece() {
  if (!homeCMSData) return;
  homeCMSData.masterpieces_items.push({
    category: "bangles",
    badge: "Royal Heritage",
    tag: "Royal Meenakari",
    title: "Imperial Handcrafted Jewellery",
    price: "₹4,999",
    orig_price: "₹7,500",
    discount: "33% OFF",
    reviews: "80",
    image: "images/bangles.jpg"
  });
  renderHomeMasterpiecesAdmin();
}

// 6. DEMIFINE 4 TILES
function renderHomeDemifineAdmin() {
  const container = document.getElementById('admin-demifine-list');
  if (!container || !homeCMSData) return;
  container.innerHTML = homeCMSData.demifine_tiles.map((tile, idx) => `
    <div class="bg-slate-800/80 p-3 rounded border border-slate-700 space-y-2">
      <div class="flex items-center justify-between pb-1 border-b border-slate-700">
        <span class="text-xs font-semibold text-amber-400">Tile #${idx+1} (${tile.label})</span>
        <button type="button" onclick="homeCMSData.demifine_tiles.splice(${idx},1); renderHomeDemifineAdmin();" class="text-red-400 text-xs">Delete</button>
      </div>
      <div class="grid grid-cols-2 gap-2">
        <input type="text" value="${tile.label}" onchange="homeCMSData.demifine_tiles[${idx}].label=this.value" class="bg-slate-900 border border-slate-700 rounded p-1 text-xs text-white" placeholder="Label (e.g. RINGS)">
        <input type="text" value="${tile.url}" onchange="homeCMSData.demifine_tiles[${idx}].url=this.value" class="bg-slate-900 border border-slate-700 rounded p-1 text-xs text-white" placeholder="Target Link (e.g. rings.html)">
      </div>
      <div class="flex items-center gap-2 pt-1">
        <input type="file" accept="image/*" id="demi-file-${idx}" onchange="handleDemiImageUpload(event, ${idx})" class="hidden">
        <button type="button" onclick="document.getElementById('demi-file-${idx}').click()" class="px-2 py-1 bg-slate-900 hover:bg-slate-700 border border-slate-600 rounded text-amber-300 text-xs">Upload Photo</button>
        <img id="demi-preview-${idx}" src="${tile.image}" class="w-8 h-8 object-cover rounded border border-slate-600">
        <span class="text-[10px] text-slate-400 truncate max-w-xs">${tile.image}</span>
      </div>
    </div>
  `).join('');
}
function handleDemiImageUpload(event, idx) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    homeCMSData.demifine_tiles[idx].image = e.target.result;
    document.getElementById('demi-preview-' + idx).src = e.target.result;
  };
  reader.readAsDataURL(file);
}
function addHomeDemifineTile() {
  if (!homeCMSData) return;
  homeCMSData.demifine_tiles.push({ label: "JEWELLERY", url: "collections.html", image: "images/hd_rings_model.jpg" });
  renderHomeDemifineAdmin();
}

// 8. INSTA / QUEENS
function renderHomeInstaAdmin() {
  const container = document.getElementById('admin-insta-list');
  if (!container || !homeCMSData) return;
  container.innerHTML = homeCMSData.insta_section.items.map((item, idx) => `
    <div class="bg-slate-800/80 p-3 rounded border border-slate-700 space-y-2">
      <div class="flex items-center justify-between pb-1 border-b border-slate-700">
        <span class="text-xs font-semibold text-amber-400">Card #${idx+1}</span>
        <button type="button" onclick="homeCMSData.insta_section.items.splice(${idx},1); renderHomeInstaAdmin();" class="text-red-400 text-xs">Delete</button>
      </div>
      <div class="grid grid-cols-2 gap-2">
        <input type="text" value="${item.handle}" onchange="homeCMSData.insta_section.items[${idx}].handle=this.value" class="bg-slate-900 border border-slate-700 rounded p-1 text-xs text-white" placeholder="Instagram Handle">
        <input type="text" value="${item.name}" onchange="homeCMSData.insta_section.items[${idx}].name=this.value" class="bg-slate-900 border border-slate-700 rounded p-1 text-xs text-white" placeholder="Jewel Look Name">
      </div>
      <div class="flex items-center gap-2 pt-1">
        <input type="file" accept="image/*" id="insta-file-${idx}" onchange="handleInstaImageUpload(event, ${idx})" class="hidden">
        <button type="button" onclick="document.getElementById('insta-file-${idx}').click()" class="px-2 py-1 bg-slate-900 hover:bg-slate-700 border border-slate-600 rounded text-amber-300 text-xs">Upload Photo</button>
        <img id="insta-preview-${idx}" src="${item.image}" class="w-8 h-8 object-cover rounded border border-slate-600">
        <span class="text-[10px] text-slate-400 truncate max-w-xs">${item.image}</span>
      </div>
    </div>
  `).join('');
}
function handleInstaImageUpload(event, idx) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    homeCMSData.insta_section.items[idx].image = e.target.result;
    document.getElementById('insta-preview-' + idx).src = e.target.result;
  };
  reader.readAsDataURL(file);
}
function addHomeInstaItem() {
  if (!homeCMSData) return;
  homeCMSData.insta_section.items.push({
    handle: "@celebrity_style",
    name: "Royal Jadau Choker",
    image: "images/3d_luxury_necklace_pedestal.jpg"
  });
  renderHomeInstaAdmin();
}

// 9. REVIEWS / TESTIMONIALS
function renderHomeReviewsAdmin() {
  const container = document.getElementById('admin-reviews-list');
  if (!container || !homeCMSData) return;
  container.innerHTML = homeCMSData.reviews_section.items.map((item, idx) => `
    <div class="bg-slate-800/80 p-3 rounded border border-slate-700 space-y-2">
      <div class="flex items-center justify-between pb-1 border-b border-slate-700">
        <span class="text-xs font-semibold text-amber-400">Review #${idx+1} (${item.name})</span>
        <button type="button" onclick="homeCMSData.reviews_section.items.splice(${idx},1); renderHomeReviewsAdmin();" class="text-red-400 text-xs">Delete</button>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-2">
        <input type="text" value="${item.name}" onchange="homeCMSData.reviews_section.items[${idx}].name=this.value" class="bg-slate-900 border border-slate-700 rounded p-1 text-xs text-white" placeholder="Client Name">
        <input type="text" value="${item.badge}" onchange="homeCMSData.reviews_section.items[${idx}].badge=this.value" class="bg-slate-900 border border-slate-700 rounded p-1 text-xs text-white" placeholder="Badge (Verified Purchase)">
        <input type="text" value="${item.location}" onchange="homeCMSData.reviews_section.items[${idx}].location=this.value" class="bg-slate-900 border border-slate-700 rounded p-1 text-xs text-white" placeholder="Location">
      </div>
      <textarea rows="2" onchange="homeCMSData.reviews_section.items[${idx}].text=this.value" class="bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-white w-full" placeholder="Testimonial Words">${item.text}</textarea>
    </div>
  `).join('');
}
function addHomeReviewItem() {
  if (!homeCMSData) return;
  homeCMSData.reviews_section.items.push({
    badge: "Verified Patron",
    text: "The jewellery quality exceeded my expectations. Outstanding craftsmanship!",
    name: "Auro Patron",
    location: "Verified Patron • Mumbai",
    avatar: "AP"
  });
  renderHomeReviewsAdmin();
}

// 10. BLOGS / CHRONICLES
function renderHomeBlogsAdmin() {
  const container = document.getElementById('admin-blogs-list');
  if (!container || !homeCMSData) return;
  container.innerHTML = homeCMSData.blogs_section.items.map((b, idx) => `
    <div class="bg-slate-800/80 p-3 rounded border border-slate-700 space-y-2">
      <div class="flex items-center justify-between pb-1 border-b border-slate-700">
        <span class="text-xs font-semibold text-amber-400">Article #${idx+1}</span>
        <button type="button" onclick="homeCMSData.blogs_section.items.splice(${idx},1); renderHomeBlogsAdmin();" class="text-red-400 text-xs">Delete</button>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-2">
        <input type="text" value="${b.title}" onchange="homeCMSData.blogs_section.items[${idx}].title=this.value" class="bg-slate-900 border border-slate-700 rounded p-1 text-xs text-white" placeholder="Article Headline">
        <input type="text" value="${b.tag}" onchange="homeCMSData.blogs_section.items[${idx}].tag=this.value" class="bg-slate-900 border border-slate-700 rounded p-1 text-xs text-white" placeholder="Tag Pill (e.g. Bridal Styling)">
        <input type="text" value="${b.readTime}" onchange="homeCMSData.blogs_section.items[${idx}].readTime=this.value" class="bg-slate-900 border border-slate-700 rounded p-1 text-xs text-white" placeholder="Read Time (e.g. 5 Min Read)">
      </div>
      <textarea rows="2" onchange="homeCMSData.blogs_section.items[${idx}].excerpt=this.value" class="bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-white w-full" placeholder="Excerpt / Short Summary">${b.excerpt}</textarea>
      <div class="flex items-center gap-2 pt-1">
        <input type="file" accept="image/*" id="blog-file-${idx}" onchange="handleBlogImageUpload(event, ${idx})" class="hidden">
        <button type="button" onclick="document.getElementById('blog-file-${idx}').click()" class="px-2 py-1 bg-slate-900 hover:bg-slate-700 border border-slate-600 rounded text-amber-300 text-xs">Upload Photo</button>
        <img id="blog-preview-${idx}" src="${b.image}" class="w-8 h-8 object-cover rounded border border-slate-600">
        <span class="text-[10px] text-slate-400 truncate max-w-xs">${b.image}</span>
      </div>
    </div>
  `).join('');
}
function handleBlogImageUpload(event, idx) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    homeCMSData.blogs_section.items[idx].image = e.target.result;
    document.getElementById('blog-preview-' + idx).src = e.target.result;
  };
  reader.readAsDataURL(file);
}
function addHomeBlogItem() {
  if (!homeCMSData) return;
  homeCMSData.blogs_section.items.push({
    tag: "Bridal Styling",
    date: "Nov 24, 2026",
    readTime: "5 Min Read",
    title: "New Heritage Styling Guide",
    excerpt: "Explore exquisite ways to style traditional royal jewelry for modern weddings.",
    url: "blog-single.html",
    image: "images/chokers.jpg"
  });
  renderHomeBlogsAdmin();
}

// SAVE ALL HOME SECTIONS TO SUPABASE & LOCALSTORAGE
async function saveAllHomeSectionsCMS() {
  if (!window.HomeCMSEngine || !homeCMSData) return;

  // Categories Header
  if (document.getElementById('h-cat-tag')) homeCMSData.categories_header.tag = document.getElementById('h-cat-tag').value.trim();
  if (document.getElementById('h-cat-title')) homeCMSData.categories_header.title = document.getElementById('h-cat-title').value.trim();

  // Bestsellers Header
  if (document.getElementById('h-best-title')) homeCMSData.bestseller_header.title = document.getElementById('h-best-title').value.trim();
  if (document.getElementById('h-best-subtitle')) homeCMSData.bestseller_header.subtitle = document.getElementById('h-best-subtitle').value.trim();

  // Masterpieces Header
  if (document.getElementById('h-feat-tag')) homeCMSData.masterpieces_header.tag = document.getElementById('h-feat-tag').value.trim();
  if (document.getElementById('h-feat-title')) homeCMSData.masterpieces_header.title = document.getElementById('h-feat-title').value.trim();
  if (document.getElementById('h-feat-subtitle')) homeCMSData.masterpieces_header.subtitle = document.getElementById('h-feat-subtitle').value.trim();

  // Demifine Header
  if (document.getElementById('h-demi-title')) homeCMSData.demifine_header.title = document.getElementById('h-demi-title').value.trim();
  if (document.getElementById('h-demi-subtitle')) homeCMSData.demifine_header.sub_title = document.getElementById('h-demi-subtitle').value.trim();

  // Craftsmanship
  if (document.getElementById('h-craft-tag')) homeCMSData.craftsmanship.tag = document.getElementById('h-craft-tag').value.trim();
  if (document.getElementById('h-craft-title')) homeCMSData.craftsmanship.title = document.getElementById('h-craft-title').value.trim();
  if (document.getElementById('h-craft-desc')) homeCMSData.craftsmanship.description = document.getElementById('h-craft-desc').value.trim();
  if (document.getElementById('h-craft-s1-title')) homeCMSData.craftsmanship.step1_title = document.getElementById('h-craft-s1-title').value.trim();
  if (document.getElementById('h-craft-s1-desc')) homeCMSData.craftsmanship.step1_desc = document.getElementById('h-craft-s1-desc').value.trim();
  if (document.getElementById('h-craft-s2-title')) homeCMSData.craftsmanship.step2_title = document.getElementById('h-craft-s2-title').value.trim();
  if (document.getElementById('h-craft-s2-desc')) homeCMSData.craftsmanship.step2_desc = document.getElementById('h-craft-s2-desc').value.trim();
  if (document.getElementById('h-craft-s3-title')) homeCMSData.craftsmanship.step3_title = document.getElementById('h-craft-s3-title').value.trim();
  if (document.getElementById('h-craft-s3-desc')) homeCMSData.craftsmanship.step3_desc = document.getElementById('h-craft-s3-desc').value.trim();
  if (document.getElementById('h-craft-years-num')) homeCMSData.craftsmanship.years_exp = document.getElementById('h-craft-years-num').value.trim();
  if (document.getElementById('h-craft-years-text')) homeCMSData.craftsmanship.years_text = document.getElementById('h-craft-years-text').value.trim();
  if (document.getElementById('h-craft-btn-text')) homeCMSData.craftsmanship.btn_text = document.getElementById('h-craft-btn-text').value.trim();
  if (document.getElementById('h-craft-btn-url')) homeCMSData.craftsmanship.btn_url = document.getElementById('h-craft-btn-url').value.trim();

  // Insta Header
  if (document.getElementById('h-insta-tag')) homeCMSData.insta_section.tag = document.getElementById('h-insta-tag').value.trim();
  if (document.getElementById('h-insta-title')) homeCMSData.insta_section.title = document.getElementById('h-insta-title').value.trim();
  if (document.getElementById('h-insta-subtitle')) homeCMSData.insta_section.subtitle = document.getElementById('h-insta-subtitle').value.trim();

  // Reviews Header
  if (document.getElementById('h-rev-tag')) homeCMSData.reviews_section.tag = document.getElementById('h-rev-tag').value.trim();
  if (document.getElementById('h-rev-title')) homeCMSData.reviews_section.title = document.getElementById('h-rev-title').value.trim();

  // Blogs Header
  if (document.getElementById('h-blog-tag')) homeCMSData.blogs_section.tag = document.getElementById('h-blog-tag').value.trim();
  if (document.getElementById('h-blog-title')) homeCMSData.blogs_section.title = document.getElementById('h-blog-title').value.trim();
  if (document.getElementById('h-blog-subtitle')) homeCMSData.blogs_section.subtitle = document.getElementById('h-blog-subtitle').value.trim();

  // Newsletter
  if (document.getElementById('h-news-tag')) homeCMSData.newsletter.tag = document.getElementById('h-news-tag').value.trim();
  if (document.getElementById('h-news-title')) homeCMSData.newsletter.title = document.getElementById('h-news-title').value.trim();
  if (document.getElementById('h-news-subtitle')) homeCMSData.newsletter.subtitle = document.getElementById('h-news-subtitle').value.trim();
  if (document.getElementById('h-news-btn')) homeCMSData.newsletter.btn_text = document.getElementById('h-news-btn').value.trim();
  if (document.getElementById('h-news-note')) homeCMSData.newsletter.note = document.getElementById('h-news-note').value.trim();

  await window.HomeCMSEngine.saveAll(homeCMSData);
}
