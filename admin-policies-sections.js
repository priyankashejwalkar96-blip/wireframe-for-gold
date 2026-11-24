// admin-policies-sections.js
// Handles full CRUD for all sections on policies.html

let policiesCMSData = null;

async function loadPoliciesSectionsAdmin() {
  if (!window.PoliciesCMSEngine) return;
  policiesCMSData = await window.PoliciesCMSEngine.getData();

  // 1. Hero
  if (policiesCMSData.hero) {
    if (document.getElementById('pol-hero-tag')) document.getElementById('pol-hero-tag').value = policiesCMSData.hero.tag || '';
    if (document.getElementById('p-policies-title')) document.getElementById('p-policies-title').value = policiesCMSData.hero.title || '';
    if (document.getElementById('p-policies-subtitle')) document.getElementById('p-policies-subtitle').value = policiesCMSData.hero.subtitle || '';
    if (document.getElementById('p-policies-img-val')) document.getElementById('p-policies-img-val').value = policiesCMSData.hero.banner_img || 'images/hero_slide_2.jpg';
    if (document.getElementById('policies-preview-img')) document.getElementById('policies-preview-img').src = policiesCMSData.hero.banner_img || 'images/hero_slide_2.jpg';
  }

  // 2. Directory Title
  if (document.getElementById('pol-dir-title')) {
    document.getElementById('pol-dir-title').value = policiesCMSData.directory_title || 'Policy Directory';
  }

  // 3. Render Cards List
  renderAdminPolicyCards();
}

function renderAdminPolicyCards() {
  const container = document.getElementById('admin-policies-cards-list');
  if (!container || !policiesCMSData) return;

  container.innerHTML = policiesCMSData.policies_list.map((item, idx) => `
    <div class="bg-slate-800/80 p-4 rounded-xl border border-slate-700/80 space-y-3 relative">
      <div class="flex items-center justify-between pb-2 border-b border-slate-700">
        <div class="flex items-center gap-2">
          <span class="text-xs font-bold text-amber-400">Section #${idx+1}:</span>
          <span class="text-xs text-white font-medium">${item.title}</span>
          <span class="text-[10px] text-slate-400 font-mono">(#${item.id})</span>
        </div>
        <button type="button" onclick="policiesCMSData.policies_list.splice(${idx},1); renderAdminPolicyCards();" class="text-red-400 hover:text-red-300 text-xs px-2.5 py-1 rounded bg-red-500/10 border border-red-500/20">
          Delete Section
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div>
          <label class="block text-[11px] text-slate-400 mb-1">Navigation Sidebar Label</label>
          <input type="text" value="${item.nav_label || ''}" onchange="policiesCMSData.policies_list[${idx}].nav_label=this.value" class="w-full bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-white">
        </div>
        <div>
          <label class="block text-[11px] text-slate-400 mb-1">Section Heading / Title</label>
          <input type="text" value="${item.title || ''}" onchange="policiesCMSData.policies_list[${idx}].title=this.value" class="w-full bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-white font-bold">
        </div>
        <div>
          <label class="block text-[11px] text-slate-400 mb-1">Icon Name (truck, refresh-cw, award, shield-check, lock)</label>
          <input type="text" value="${item.icon || 'shield-check'}" onchange="policiesCMSData.policies_list[${idx}].icon=this.value" class="w-full bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-white font-mono">
        </div>
      </div>

      <div>
        <label class="block text-[11px] text-slate-400 mb-1">Primary Policy Explanation</label>
        <textarea rows="2" onchange="policiesCMSData.policies_list[${idx}].description=this.value" class="w-full bg-slate-900 border border-slate-700 rounded p-2 text-xs text-white">${item.description || ''}</textarea>
      </div>

      <div>
        <label class="block text-[11px] text-amber-300 mb-1">Highlight Notice Box (e.g. Complimentary Shipping / 7-Day Doorstep Pickup)</label>
        <textarea rows="2" onchange="policiesCMSData.policies_list[${idx}].highlight_box=this.value" class="w-full bg-slate-900 border border-amber-500/30 rounded p-2 text-xs text-amber-100" placeholder="Optional highlight text box...">${item.highlight_box || ''}</textarea>
      </div>

      ${item.has_table ? `
        <div class="bg-slate-900/60 p-3 rounded border border-slate-700 space-y-2">
          <div class="flex items-center justify-between pb-1">
            <span class="text-[11px] font-bold text-amber-400 uppercase">Delivery & Logistics Table Rows</span>
            <button type="button" onclick="addPolicyTableRow(${idx})" class="text-[11px] text-amber-300 hover:text-white px-2 py-0.5 rounded bg-amber-500/20 border border-amber-500/30">+ Add Row</button>
          </div>
          <div class="space-y-1.5">
            ${(item.table_rows || []).map((row, rIdx) => `
              <div class="grid grid-cols-1 md:grid-cols-3 gap-2 items-center bg-slate-800/70 p-2 rounded">
                <input type="text" value="${row.region}" onchange="policiesCMSData.policies_list[${idx}].table_rows[${rIdx}].region=this.value" class="bg-slate-900 border border-slate-700 rounded p-1 text-xs text-white" placeholder="Region">
                <input type="text" value="${row.courier}" onchange="policiesCMSData.policies_list[${idx}].table_rows[${rIdx}].courier=this.value" class="bg-slate-900 border border-slate-700 rounded p-1 text-xs text-white" placeholder="Courier Partner">
                <div class="flex items-center gap-2">
                  <input type="text" value="${row.timeframe}" onchange="policiesCMSData.policies_list[${idx}].table_rows[${rIdx}].timeframe=this.value" class="bg-slate-900 border border-slate-700 rounded p-1 text-xs text-white flex-1" placeholder="Timeframe">
                  <button type="button" onclick="policiesCMSData.policies_list[${idx}].table_rows.splice(${rIdx},1); renderAdminPolicyCards();" class="text-red-400 text-xs px-1">✕</button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      ` : `
        <div>
          <label class="block text-[11px] text-slate-400 mb-1">Additional Terms / Concluding Statement</label>
          <input type="text" value="${item.extra_text || ''}" onchange="policiesCMSData.policies_list[${idx}].extra_text=this.value" class="w-full bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-white" placeholder="Optional extra note...">
        </div>
      `}
    </div>
  `).join('');
}

function addPolicyTableRow(cardIdx) {
  if (!policiesCMSData || !policiesCMSData.policies_list[cardIdx]) return;
  if (!policiesCMSData.policies_list[cardIdx].table_rows) policiesCMSData.policies_list[cardIdx].table_rows = [];
  policiesCMSData.policies_list[cardIdx].table_rows.push({
    region: "New Region / City",
    courier: "Express Air Courier",
    timeframe: "2 - 4 Business Days"
  });
  renderAdminPolicyCards();
}

function addNewPolicySection() {
  if (!policiesCMSData) return;
  const newId = 'policy_' + Date.now();
  policiesCMSData.policies_list.push({
    id: newId,
    icon: "shield-check",
    nav_label: "Custom Policy",
    title: "New Policy & Assurance Section",
    description: "Write custom terms, care guidelines, or delivery assurances here.",
    highlight_box: "Key point or benefit for luxury jewellery patrons.",
    has_table: false,
    table_rows: [],
    extra_text: "Contact our VIP concierge for additional clarification."
  });
  renderAdminPolicyCards();
}

async function saveAllPoliciesSectionsCMS() {
  if (!window.PoliciesCMSEngine || !policiesCMSData) return;

  // Hero
  if (!policiesCMSData.hero) policiesCMSData.hero = {};
  if (document.getElementById('pol-hero-tag')) policiesCMSData.hero.tag = document.getElementById('pol-hero-tag').value.trim();
  if (document.getElementById('p-policies-title')) policiesCMSData.hero.title = document.getElementById('p-policies-title').value.trim();
  if (document.getElementById('p-policies-subtitle')) policiesCMSData.hero.subtitle = document.getElementById('p-policies-subtitle').value.trim();
  if (document.getElementById('p-policies-img-val')) policiesCMSData.hero.banner_img = document.getElementById('p-policies-img-val').value;

  // Directory title
  if (document.getElementById('pol-dir-title')) policiesCMSData.directory_title = document.getElementById('pol-dir-title').value.trim();

  await window.PoliciesCMSEngine.saveAll(policiesCMSData);
}
