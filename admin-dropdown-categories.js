// admin-dropdown-categories.js
// Controls Mega Menu Categories and Dropdown Sub-Pages metadata in admin.html

let categoryPagesMeta = null;

async function loadDropdownCategoriesAdmin() {
  // 1. Load Dropdown List
  if (typeof renderDropdownCategoryRows === 'function') {
    renderDropdownCategoryRows();
  }

  // 2. Load Metadata for Category Pages
  if (window.CategoryPagesCMSEngine) {
    categoryPagesMeta = await window.CategoryPagesCMSEngine.getPagesMeta();
    renderCategoryPagesMetaAdmin();
  }
}

function renderCategoryPagesMetaAdmin() {
  const container = document.getElementById('admin-category-pages-meta-list');
  if (!container || !categoryPagesMeta) return;

  const files = Object.keys(categoryPagesMeta);

  container.innerHTML = files.map(filename => {
    const meta = categoryPagesMeta[filename];
    return `
      <div class="bg-slate-800/80 p-3 rounded-lg border border-slate-700 space-y-2">
        <div class="flex items-center justify-between pb-1 border-b border-slate-700">
          <span class="text-xs font-bold text-amber-400">${meta.title || filename}</span>
          <span class="text-[10px] text-slate-400 font-mono">${filename}</span>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div>
            <label class="block text-[10px] text-slate-400">Hero Section Tag</label>
            <input type="text" value="${meta.tag || ''}" onchange="categoryPagesMeta['${filename}'].tag=this.value" class="bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-white w-full">
          </div>
          <div>
            <label class="block text-[10px] text-slate-400">Page Headline Title</label>
            <input type="text" value="${meta.title || ''}" onchange="categoryPagesMeta['${filename}'].title=this.value" class="bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-white w-full">
          </div>
        </div>
        <div>
          <label class="block text-[10px] text-slate-400">Hero Story Description</label>
          <textarea rows="2" onchange="categoryPagesMeta['${filename}'].subtitle=this.value" class="bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-white w-full">${meta.subtitle || ''}</textarea>
        </div>
      </div>
    `;
  }).join('');
}

async function saveAllCategoryPagesMetaCMS() {
  if (window.CategoryPagesCMSEngine && categoryPagesMeta) {
    await window.CategoryPagesCMSEngine.savePagesMeta(categoryPagesMeta);
  }
}

window.loadDropdownCategoriesAdmin = loadDropdownCategoriesAdmin;
window.renderCategoryPagesMetaAdmin = renderCategoryPagesMetaAdmin;
window.saveAllCategoryPagesMetaCMS = saveAllCategoryPagesMetaCMS;
