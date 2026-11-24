// admin-products-manager.js
// Complete CRUD & Live Inventory Manager for Admin Panel

let adminProductsList = [];
let currentCategoryFilter = 'all';
let currentSearchQuery = '';

async function loadAdminProducts() {
  if (!window.ProductsCMSEngine) return;
  adminProductsList = await window.ProductsCMSEngine.getProducts();
  renderAdminProductsUI();
}

function renderAdminProductsUI() {
  const container = document.getElementById('product-list-preview');
  if (!container) return;

  // Filter by category & search
  let filtered = adminProductsList;
  if (currentCategoryFilter !== 'all') {
    filtered = filtered.filter(p => p.category === currentCategoryFilter);
  }
  if (currentSearchQuery.trim() !== '') {
    const q = currentSearchQuery.toLowerCase();
    filtered = filtered.filter(p => 
      (p.title && p.title.toLowerCase().includes(q)) || 
      (p.category && p.category.toLowerCase().includes(q)) ||
      (p.tag && p.tag.toLowerCase().includes(q))
    );
  }

  // Header stats and controls
  const controlsHtml = `
    <div class="flex flex-col md:flex-row items-center justify-between gap-4 pb-4 border-b border-slate-800">
      <div class="flex items-center gap-3 w-full md:w-auto">
        <input type="text" id="admin-product-search" placeholder="Search by name, category, or tag..." value="${currentSearchQuery}" oninput="handleAdminProductSearch(this.value)" class="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white w-full md:w-64 focus:outline-none focus:border-amber-400">
        <select id="admin-category-select" onchange="handleAdminCategoryFilter(this.value)" class="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400">
          <option value="all" ${currentCategoryFilter === 'all' ? 'selected' : ''}>All Categories (${adminProductsList.length})</option>
          <option value="hair" ${currentCategoryFilter === 'hair' ? 'selected' : ''}>Hair Accessories</option>
          <option value="pachi-earrings" ${currentCategoryFilter === 'pachi-earrings' ? 'selected' : ''}>Pachi Kundan Earrings</option>
          <option value="kashmiri" ${currentCategoryFilter === 'kashmiri' ? 'selected' : ''}>Kashmiri Earrings</option>
          <option value="silver-below-300" ${currentCategoryFilter === 'silver-below-300' ? 'selected' : ''}>German Silver (&lt; 300)</option>
          <option value="silver-above-300" ${currentCategoryFilter === 'silver-above-300' ? 'selected' : ''}>German Silver (&gt; 300)</option>
          <option value="earcuff" ${currentCategoryFilter === 'earcuff' ? 'selected' : ''}>Earcuff Bugadi</option>
          <option value="statement-earrings" ${currentCategoryFilter === 'statement-earrings' ? 'selected' : ''}>Statement Earrings</option>
          <option value="statement-rings" ${currentCategoryFilter === 'statement-rings' ? 'selected' : ''}>Statement Rings</option>
          <option value="statement-necklace" ${currentCategoryFilter === 'statement-necklace' ? 'selected' : ''}>Statement Necklace</option>
          <option value="pachi-necklace" ${currentCategoryFilter === 'pachi-necklace' ? 'selected' : ''}>Pachi Kundan Necklace</option>
          <option value="german-silver-necklace" ${currentCategoryFilter === 'german-silver-necklace' ? 'selected' : ''}>German Silver Necklaces</option>
          <option value="rings" ${currentCategoryFilter === 'rings' ? 'selected' : ''}>Handcrafted Rings</option>
          <option value="premium-rings" ${currentCategoryFilter === 'premium-rings' ? 'selected' : ''}>Premium Rings</option>
          <option value="nosepin" ${currentCategoryFilter === 'nosepin' ? 'selected' : ''}>Nosepins</option>
        </select>
      </div>

      <div class="flex items-center gap-3">
        <span class="text-xs text-slate-400">Showing <strong class="text-white">${filtered.length}</strong> of ${adminProductsList.length} designs</span>
        <button type="button" onclick="saveAdminProductsList()" class="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-lg text-xs flex items-center gap-1.5 shadow">
          <i class="ph ph-floppy-disk text-sm"></i> Save & Publish All Products
        </button>
      </div>
    </div>
  `;

  // Product cards / rows
  let rowsHtml = '';
  if (filtered.length === 0) {
    rowsHtml = `
      <div class="text-center py-12 text-slate-500">
        <i class="ph ph-magnifying-glass text-3xl mb-2 block text-slate-600"></i>
        <p class="text-sm">No products found matching "${currentSearchQuery}".</p>
      </div>
    `;
  } else {
    rowsHtml = `
      <div class="grid grid-cols-1 gap-3">
        ${filtered.map(p => {
          const globalIdx = adminProductsList.findIndex(item => item.id === p.id);
          return `
            <div class="bg-slate-900/80 p-3.5 rounded-lg border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:border-slate-700 transition">
              <!-- Thumbnail & Upload -->
              <div class="flex items-center gap-3 w-full md:w-auto">
                <div class="relative group">
                  <img id="admin-prod-img-${globalIdx}" src="${p.image || 'images/hair_1.jpg'}" class="w-16 h-16 object-cover rounded-md border border-slate-700 shadow" onerror="this.onerror=null;this.src='images/hair_1.jpg';">
                  <input type="file" accept="image/*" id="admin-prod-file-${globalIdx}" onchange="handleProductImageChange(event, ${globalIdx})" class="hidden">
                  <button type="button" onclick="document.getElementById('admin-prod-file-${globalIdx}').click()" class="absolute inset-0 bg-black/60 rounded-md opacity-0 group-hover:opacity-100 flex items-center justify-center text-amber-300 text-[10px] font-semibold transition">
                    Change
                  </button>
                </div>
                <div class="space-y-1">
                  <div class="flex items-center gap-2">
                    <span class="text-xs font-bold text-amber-400">#${p.id}</span>
                    <input type="text" value="${p.badge || 'Bestseller'}" onchange="adminProductsList[${globalIdx}].badge=this.value" placeholder="Badge" class="bg-slate-800 border border-slate-700 rounded px-1.5 py-0.5 text-[10px] text-amber-300 w-24">
                  </div>
                  <input type="text" value="${p.tag || ''}" onchange="adminProductsList[${globalIdx}].tag=this.value" placeholder="Tag / Style" class="bg-slate-800 border border-slate-700 rounded px-2 py-1 text-xs text-slate-300 w-44">
                </div>
              </div>

              <!-- Title & Category -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-2 flex-1 w-full md:w-auto">
                <div>
                  <label class="block text-[10px] text-slate-400">Product Title</label>
                  <input type="text" value="${p.title || ''}" onchange="adminProductsList[${globalIdx}].title=this.value" class="bg-slate-800 border border-slate-700 rounded p-1.5 text-xs text-white w-full">
                </div>
                <div>
                  <label class="block text-[10px] text-slate-400">Category</label>
                  <select onchange="adminProductsList[${globalIdx}].category=this.value" class="bg-slate-800 border border-slate-700 rounded p-1.5 text-xs text-white w-full">
                    <option value="hair" ${p.category === 'hair' ? 'selected' : ''}>Hair Accessories</option>
                    <option value="pachi-earrings" ${p.category === 'pachi-earrings' ? 'selected' : ''}>Pachi Kundan Earrings</option>
                    <option value="kashmiri" ${p.category === 'kashmiri' ? 'selected' : ''}>Kashmiri Earrings</option>
                    <option value="silver-below-300" ${p.category === 'silver-below-300' ? 'selected' : ''}>German Silver (&lt; 300)</option>
                    <option value="silver-above-300" ${p.category === 'silver-above-300' ? 'selected' : ''}>German Silver (&gt; 300)</option>
                    <option value="earcuff" ${p.category === 'earcuff' ? 'selected' : ''}>Earcuff Bugadi</option>
                    <option value="statement-earrings" ${p.category === 'statement-earrings' ? 'selected' : ''}>Statement Earrings</option>
                    <option value="statement-rings" ${p.category === 'statement-rings' ? 'selected' : ''}>Statement Rings</option>
                    <option value="statement-necklace" ${p.category === 'statement-necklace' ? 'selected' : ''}>Statement Necklace</option>
                    <option value="pachi-necklace" ${p.category === 'pachi-necklace' ? 'selected' : ''}>Pachi Kundan Necklace</option>
                    <option value="german-silver-necklace" ${p.category === 'german-silver-necklace' ? 'selected' : ''}>German Silver Necklaces</option>
                    <option value="rings" ${p.category === 'rings' ? 'selected' : ''}>Handcrafted Rings</option>
                    <option value="premium-rings" ${p.category === 'premium-rings' ? 'selected' : ''}>Premium Rings</option>
                    <option value="nosepin" ${p.category === 'nosepin' ? 'selected' : ''}>Nosepins</option>
                  </select>
                </div>
              </div>

              <!-- Price, Orig Price & Stock -->
              <div class="grid grid-cols-3 gap-2 w-full md:w-72">
                <div>
                  <label class="block text-[10px] text-slate-400">Current Price</label>
                  <input type="text" value="${p.price || ''}" onchange="adminProductsList[${globalIdx}].price=this.value" class="bg-slate-800 border border-slate-700 rounded p-1.5 text-xs text-emerald-400 font-semibold w-full">
                </div>
                <div>
                  <label class="block text-[10px] text-slate-400">Original Price</label>
                  <input type="text" value="${p.orig_price || ''}" onchange="adminProductsList[${globalIdx}].orig_price=this.value" class="bg-slate-800 border border-slate-700 rounded p-1.5 text-xs text-slate-400 w-full">
                </div>
                <div>
                  <label class="block text-[10px] text-slate-400">In Stock</label>
                  <input type="number" value="${p.stock || 12}" onchange="adminProductsList[${globalIdx}].stock=parseInt(this.value)||0" class="bg-slate-800 border border-slate-700 rounded p-1.5 text-xs text-white w-full">
                </div>
              </div>

              <!-- Actions (Delete) -->
              <div class="flex items-center gap-2 pt-2 md:pt-0">
                <button type="button" onclick="deleteAdminProduct(${globalIdx})" class="px-2.5 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded text-xs transition">
                  <i class="ph ph-trash"></i>
                </button>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  container.innerHTML = controlsHtml + rowsHtml;
}

function handleAdminProductSearch(query) {
  currentSearchQuery = query;
  renderAdminProductsUI();
}

function handleAdminCategoryFilter(cat) {
  currentCategoryFilter = cat;
  renderAdminProductsUI();
}

function handleProductImageChange(event, idx) {
  const file = event.target.files[0];
  if (!file || !adminProductsList[idx]) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    adminProductsList[idx].image = e.target.result;
    const imgEl = document.getElementById('admin-prod-img-' + idx);
    if (imgEl) imgEl.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function deleteAdminProduct(idx) {
  if (confirm(`Are you sure you want to delete "${adminProductsList[idx].title}"?`)) {
    adminProductsList.splice(idx, 1);
    renderAdminProductsUI();
  }
}

function addNewProductModal() {
  const newId = 'prod-' + (adminProductsList.length + 1);
  const newProduct = {
    id: newId,
    title: "New Handcrafted Royal Jewellery",
    category: currentCategoryFilter !== 'all' ? currentCategoryFilter : 'hair',
    badge: "New Arrival",
    image: "images/hair_1.jpg",
    tag: "Royal Collection",
    price: "₹1,299.00 INR",
    orig_price: "₹1,850",
    discount: "30% OFF",
    reviews: "25 reviews",
    stock: 20
  };

  adminProductsList.unshift(newProduct);
  renderAdminProductsUI();
  alert(`✅ New Product created with ID: ${newId}!\nEdit its title, price, category or upload photo, then click 'Save & Publish All Products'.`);
}

async function saveAdminProductsList() {
  if (!window.ProductsCMSEngine) return;
  await window.ProductsCMSEngine.saveProducts(adminProductsList);
  alert(`🎉 All ${adminProductsList.length} products saved and published to live catalogue successfully!`);
}

window.loadAdminProducts = loadAdminProducts;
window.renderAdminProductsUI = renderAdminProductsUI;
window.handleAdminProductSearch = handleAdminProductSearch;
window.handleAdminCategoryFilter = handleAdminCategoryFilter;
window.handleProductImageChange = handleProductImageChange;
window.deleteAdminProduct = deleteAdminProduct;
window.addNewProductModal = addNewProductModal;
window.saveAdminProductsList = saveAdminProductsList;
