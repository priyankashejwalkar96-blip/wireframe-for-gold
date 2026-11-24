// admin-blogs-sections.js
// Handles full CRUD for Blogs & Lookbook and Single Blog Stories in admin.html

let blogsCMSData = null;

async function loadBlogsSectionsAdmin() {
  if (!window.BlogsCMSEngine) return;
  blogsCMSData = await window.BlogsCMSEngine.getData();

  // 1. Hero Banner
  if (blogsCMSData.hero) {
    const h = blogsCMSData.hero;
    if (document.getElementById('p-blogs-badge')) document.getElementById('p-blogs-badge').value = h.tag || '';
    if (document.getElementById('p-blogs-title')) document.getElementById('p-blogs-title').value = h.title || '';
    if (document.getElementById('p-blogs-subtitle')) document.getElementById('p-blogs-subtitle').value = h.subtitle || '';
    if (document.getElementById('p-blogs-img-val')) document.getElementById('p-blogs-img-val').value = h.banner_img || 'images/banner_jewelry_pure_3.jpg';
    if (document.getElementById('blogs-preview-img')) document.getElementById('blogs-preview-img').src = h.banner_img || 'images/banner_jewelry_pure_3.jpg';
  }

  // 2. Filter Categories Pills
  renderAdminBlogFilters();

  // 3. Articles (Full CRUD)
  renderAdminBlogArticles();
}

// 2. FILTER PILLS
function renderAdminBlogFilters() {
  const container = document.getElementById('admin-blog-filters-list');
  if (!container || !blogsCMSData || !blogsCMSData.filters) return;

  container.innerHTML = blogsCMSData.filters.map((f, idx) => `
    <div class="flex items-center gap-2 bg-slate-800 p-2 rounded border border-slate-700">
      <input type="text" value="${f}" onchange="blogsCMSData.filters[${idx}]=this.value" class="bg-slate-900 border border-slate-700 rounded p-1 text-xs text-white flex-1">
      <button type="button" onclick="blogsCMSData.filters.splice(${idx}, 1); renderAdminBlogFilters();" class="text-red-400 hover:text-red-300 text-xs px-2">Delete</button>
    </div>
  `).join('');
}

function addBlogFilterTag() {
  if (!blogsCMSData) return;
  if (!blogsCMSData.filters) blogsCMSData.filters = [];
  blogsCMSData.filters.push("New Category");
  renderAdminBlogFilters();
}

// 3. ARTICLES LIST (FULL CRUD)
function renderAdminBlogArticles() {
  const container = document.getElementById('admin-blog-articles-list');
  if (!container || !blogsCMSData || !blogsCMSData.articles) return;

  container.innerHTML = blogsCMSData.articles.map((art, idx) => {
    const parasJoined = (art.content_paragraphs || []).join('\n\n');
    const fp = art.featured_product || {};

    return `
      <div class="bg-slate-800/90 p-4 rounded-lg border border-slate-700 space-y-3 relative shadow-md">
        <div class="flex items-center justify-between pb-2 border-b border-slate-700">
          <div class="flex items-center gap-2">
            <span class="text-xs font-bold text-amber-400 uppercase">Article #${idx + 1}</span>
            <span class="text-[10px] bg-slate-900 text-slate-300 px-2 py-0.5 rounded border border-slate-700">${art.tag || 'General'}</span>
          </div>
          <div class="flex items-center gap-3">
            <a href="blog-single.html?id=${encodeURIComponent(art.id || art.slug)}" target="_blank" class="text-amber-400 hover:underline text-xs flex items-center gap-1">
              Preview Story &rarr;
            </a>
            <button type="button" onclick="blogsCMSData.articles.splice(${idx}, 1); renderAdminBlogArticles();" class="text-red-400 hover:text-red-300 text-xs font-semibold">
              Delete Article
            </button>
          </div>
        </div>

        <!-- Title, Slug & Tag -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div class="md:col-span-2">
            <label class="block text-[10px] text-slate-400">Story Title</label>
            <input type="text" value="${art.title || ''}" onchange="blogsCMSData.articles[${idx}].title=this.value" class="bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-white w-full">
          </div>
          <div>
            <label class="block text-[10px] text-slate-400">Category Tag (e.g. Bridal Styling)</label>
            <input type="text" value="${art.tag || ''}" onchange="blogsCMSData.articles[${idx}].tag=this.value" class="bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-white w-full">
          </div>
        </div>

        <!-- Meta (Author, Date, Read Time, ID) -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
          <div>
            <label class="block text-[10px] text-slate-400">Author Name</label>
            <input type="text" value="${art.author || ''}" onchange="blogsCMSData.articles[${idx}].author=this.value" class="bg-slate-900 border border-slate-700 rounded p-1 text-xs text-white w-full">
          </div>
          <div>
            <label class="block text-[10px] text-slate-400">Published Date</label>
            <input type="text" value="${art.date || ''}" onchange="blogsCMSData.articles[${idx}].date=this.value" class="bg-slate-900 border border-slate-700 rounded p-1 text-xs text-white w-full">
          </div>
          <div>
            <label class="block text-[10px] text-slate-400">Read Time (e.g. 5 Min Read)</label>
            <input type="text" value="${art.read_time || ''}" onchange="blogsCMSData.articles[${idx}].read_time=this.value" class="bg-slate-900 border border-slate-700 rounded p-1 text-xs text-white w-full">
          </div>
          <div>
            <label class="block text-[10px] text-slate-400">Slug / URL ID</label>
            <input type="text" value="${art.slug || art.id || ''}" onchange="blogsCMSData.articles[${idx}].slug=this.value" class="bg-slate-900 border border-slate-700 rounded p-1 text-xs text-white w-full">
          </div>
        </div>

        <!-- Image Upload & Preview -->
        <div class="flex items-center gap-3 pt-1">
          <input type="file" accept="image/*" id="blog-file-${idx}" onchange="handleBlogArticleImageUpload(event, ${idx})" class="hidden">
          <button type="button" onclick="document.getElementById('blog-file-${idx}').click()" class="px-2.5 py-1 bg-slate-900 hover:bg-slate-700 border border-slate-600 rounded text-amber-300 text-xs">
            Upload Article Image
          </button>
          <img id="blog-preview-${idx}" src="${art.image || 'images/chokers.jpg'}" class="w-12 h-10 object-cover rounded border border-slate-700">
          <span class="text-[10px] text-slate-400 truncate max-w-xs">${art.image || ''}</span>
        </div>

        <!-- Short Excerpt -->
        <div>
          <label class="block text-[10px] text-slate-400">Short Summary / Excerpt (Shows on Lookbook Grid)</label>
          <textarea rows="2" onchange="blogsCMSData.articles[${idx}].excerpt=this.value" class="bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-white w-full">${art.excerpt || ''}</textarea>
        </div>

        <!-- Full Story Paragraphs -->
        <div>
          <label class="block text-[10px] text-slate-400">Full Story Content (Double Enter between paragraphs - Shows on Single Blog Page)</label>
          <textarea rows="5" onchange="blogsCMSData.articles[${idx}].content_paragraphs=this.value.split('\\n\\n').map(s=>s.trim()).filter(Boolean)" class="bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-white w-full leading-relaxed">${parasJoined}</textarea>
        </div>

        <!-- Highlight Quote -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-2 bg-slate-900/40 p-2.5 rounded border border-slate-800">
          <div>
            <label class="block text-[10px] text-slate-400">Highlighted Blockquote</label>
            <input type="text" value="${art.quote || ''}" onchange="blogsCMSData.articles[${idx}].quote=this.value" class="bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-white w-full">
          </div>
          <div>
            <label class="block text-[10px] text-slate-400">Quote Citation / Author</label>
            <input type="text" value="${art.quote_author || ''}" onchange="blogsCMSData.articles[${idx}].quote_author=this.value" class="bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-white w-full">
          </div>
        </div>

        <!-- Featured Piece In Story -->
        <div class="bg-slate-900/60 p-2.5 rounded border border-slate-800 space-y-2">
          <span class="text-[10px] font-bold text-amber-400 uppercase">Featured Jewellery Piece Embedded In Story</span>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-2">
            <div>
              <label class="block text-[10px] text-slate-400">Product Title</label>
              <input type="text" value="${fp.title || ''}" onchange="if(!blogsCMSData.articles[${idx}].featured_product) blogsCMSData.articles[${idx}].featured_product={}; blogsCMSData.articles[${idx}].featured_product.title=this.value" class="bg-slate-900 border border-slate-700 rounded p-1 text-xs text-white w-full">
            </div>
            <div>
              <label class="block text-[10px] text-slate-400">Product Price (e.g. ₹12,850 INR)</label>
              <input type="text" value="${fp.price || ''}" onchange="if(!blogsCMSData.articles[${idx}].featured_product) blogsCMSData.articles[${idx}].featured_product={}; blogsCMSData.articles[${idx}].featured_product.price=this.value" class="bg-slate-900 border border-slate-700 rounded p-1 text-xs text-white w-full">
            </div>
            <div>
              <label class="block text-[10px] text-slate-400">Button Target URL</label>
              <input type="text" value="${fp.url || 'collections.html'}" onchange="if(!blogsCMSData.articles[${idx}].featured_product) blogsCMSData.articles[${idx}].featured_product={}; blogsCMSData.articles[${idx}].featured_product.url=this.value" class="bg-slate-900 border border-slate-700 rounded p-1 text-xs text-white w-full">
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function handleBlogArticleImageUpload(event, idx) {
  const file = event.target.files[0];
  if (!file || !blogsCMSData) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    blogsCMSData.articles[idx].image = e.target.result;
    const preview = document.getElementById('blog-preview-' + idx);
    if (preview) preview.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function addBlogArticleItem() {
  if (!blogsCMSData) return;
  if (!blogsCMSData.articles) blogsCMSData.articles = [];
  const newId = 'blog-' + (blogsCMSData.articles.length + 1);
  blogsCMSData.articles.push({
    id: newId,
    slug: 'new-royal-jewellery-story-' + Date.now(),
    title: "New Royal Jewellery Chronicle",
    tag: "Jewellery Trends",
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
    read_time: "5 Min Read",
    author: "Senior Auro Stylist",
    image: "images/statement_necklace_1.jpg",
    excerpt: "Discover the latest insights into handcrafted luxury, bridal styling, and imperial heirloom care.",
    content_paragraphs: [
      "Every piece of jewelry tells a story of heritage, love, and intricate artisan devotion.",
      "In this feature, we delve into how modern bridal styling embraces timeless Rajasthani techniques."
    ],
    quote: "True beauty is timeless, resting effortlessly against royal silhouettes.",
    quote_author: "Auro Styling Atelier",
    featured_product: {
      title: "Royal Polki Masterpiece",
      price: "₹8,900 INR",
      image: "images/statement_necklace_1.jpg",
      url: "collections.html"
    }
  });
  renderAdminBlogArticles();
}

// SAVE ALL BLOGS CMS
async function saveAllBlogsSectionsCMS() {
  if (!window.BlogsCMSEngine || !blogsCMSData) return;

  // 1. Hero
  if (!blogsCMSData.hero) blogsCMSData.hero = {};
  if (document.getElementById('p-blogs-badge')) blogsCMSData.hero.tag = document.getElementById('p-blogs-badge').value.trim();
  if (document.getElementById('p-blogs-title')) blogsCMSData.hero.title = document.getElementById('p-blogs-title').value.trim();
  if (document.getElementById('p-blogs-subtitle')) blogsCMSData.hero.subtitle = document.getElementById('p-blogs-subtitle').value.trim();
  if (document.getElementById('p-blogs-img-val')) blogsCMSData.hero.banner_img = document.getElementById('p-blogs-img-val').value.trim();

  await window.BlogsCMSEngine.saveAll(blogsCMSData);
}

window.loadBlogsSectionsAdmin = loadBlogsSectionsAdmin;
window.saveAllBlogsSectionsCMS = saveAllBlogsSectionsCMS;
window.renderAdminBlogFilters = renderAdminBlogFilters;
window.addBlogFilterTag = addBlogFilterTag;
window.renderAdminBlogArticles = renderAdminBlogArticles;
window.handleBlogArticleImageUpload = handleBlogArticleImageUpload;
window.addBlogArticleItem = addBlogArticleItem;
