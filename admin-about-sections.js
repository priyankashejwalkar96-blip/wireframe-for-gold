// admin-about-sections.js
// Handles full CRUD for all sections on about.html

let aboutCMSData = null;

async function loadAboutSectionsAdmin() {
  if (!window.AboutCMSEngine) return;
  aboutCMSData = await window.AboutCMSEngine.getData();

  // 1. Hero
  if (aboutCMSData.hero) {
    if (document.getElementById('p-about-badge')) document.getElementById('p-about-badge').value = aboutCMSData.hero.badge || '';
    if (document.getElementById('p-about-title')) document.getElementById('p-about-title').value = aboutCMSData.hero.title || '';
    if (document.getElementById('p-about-story')) document.getElementById('p-about-story').value = aboutCMSData.hero.subtitle || '';
    if (document.getElementById('p-about-img-val')) document.getElementById('p-about-img-val').value = aboutCMSData.hero.banner_img || 'images/banner_jewelry_pure_2.jpg';
    if (document.getElementById('about-preview-img')) document.getElementById('about-preview-img').src = aboutCMSData.hero.banner_img || 'images/banner_jewelry_pure_2.jpg';
  }

  // 2. Stats
  renderAdminAboutStats();

  // 3. Chapter 1
  if (aboutCMSData.chapter1) {
    const c1 = aboutCMSData.chapter1;
    if (document.getElementById('ab-c1-tag')) document.getElementById('ab-c1-tag').value = c1.tag || '';
    if (document.getElementById('ab-c1-title')) document.getElementById('ab-c1-title').value = c1.title || '';
    if (document.getElementById('ab-c1-p1')) document.getElementById('ab-c1-p1').value = c1.p1 || '';
    if (document.getElementById('ab-c1-p2')) document.getElementById('ab-c1-p2').value = c1.p2 || '';
    if (document.getElementById('ab-c1-btn1-text')) document.getElementById('ab-c1-btn1-text').value = c1.btn1_text || '';
    if (document.getElementById('ab-c1-btn1-url')) document.getElementById('ab-c1-btn1-url').value = c1.btn1_url || '';
    if (document.getElementById('ab-c1-btn2-text')) document.getElementById('ab-c1-btn2-text').value = c1.btn2_text || '';
    if (document.getElementById('ab-c1-btn2-url')) document.getElementById('ab-c1-btn2-url').value = c1.btn2_url || '';
    if (document.getElementById('ab-c1-f-title')) document.getElementById('ab-c1-f-title').value = c1.tag_title || '';
    if (document.getElementById('ab-c1-f-sub')) document.getElementById('ab-c1-f-sub').value = c1.tag_sub || '';
    if (document.getElementById('ab-c1-img-preview')) document.getElementById('ab-c1-img-preview').src = c1.image || 'images/statement_necklace_1.jpg';
  }

  // 4. Chapter 2
  if (aboutCMSData.chapter2) {
    const c2 = aboutCMSData.chapter2;
    if (document.getElementById('ab-c2-tag')) document.getElementById('ab-c2-tag').value = c2.tag || '';
    if (document.getElementById('ab-c2-title')) document.getElementById('ab-c2-title').value = c2.title || '';
    if (document.getElementById('ab-c2-p1')) document.getElementById('ab-c2-p1').value = c2.p1 || '';
    if (document.getElementById('ab-c2-p2')) document.getElementById('ab-c2-p2').value = c2.p2 || '';
    if (document.getElementById('ab-c2-p3')) document.getElementById('ab-c2-p3').value = c2.p3 || '';
    if (document.getElementById('ab-c2-f-title')) document.getElementById('ab-c2-f-title').value = c2.tag_title || '';
    if (document.getElementById('ab-c2-f-sub')) document.getElementById('ab-c2-f-sub').value = c2.tag_sub || '';
    if (document.getElementById('ab-c2-img-preview')) document.getElementById('ab-c2-img-preview').src = c2.image || 'images/3d_luxury_necklace_pedestal.jpg';
  }

  // 5. Values Header
  if (aboutCMSData.values_header) {
    if (document.getElementById('ab-val-tag')) document.getElementById('ab-val-tag').value = aboutCMSData.values_header.tag || '';
    if (document.getElementById('ab-val-title')) document.getElementById('ab-val-title').value = aboutCMSData.values_header.title || '';
    if (document.getElementById('ab-val-sub')) document.getElementById('ab-val-sub').value = aboutCMSData.values_header.subtitle || '';
  }
  renderAdminAboutValues();

  // 6. Process Steps Header
  if (aboutCMSData.process_header) {
    if (document.getElementById('ab-proc-tag')) document.getElementById('ab-proc-tag').value = aboutCMSData.process_header.tag || '';
    if (document.getElementById('ab-proc-title')) document.getElementById('ab-proc-title').value = aboutCMSData.process_header.title || '';
    if (document.getElementById('ab-proc-sub')) document.getElementById('ab-proc-sub').value = aboutCMSData.process_header.subtitle || '';
  }
  renderAdminAboutProcessSteps();

  // 7. Quote
  if (aboutCMSData.quote) {
    if (document.getElementById('ab-quote-text')) document.getElementById('ab-quote-text').value = aboutCMSData.quote.text || '';
    if (document.getElementById('ab-quote-author')) document.getElementById('ab-quote-author').value = aboutCMSData.quote.author || '';
  }
}

// 2. STATS CRUD
function renderAdminAboutStats() {
  const container = document.getElementById('admin-about-stats-list');
  if (!container || !aboutCMSData) return;
  container.innerHTML = aboutCMSData.stats.map((st, idx) => `
    <div class="bg-slate-800/80 p-2.5 rounded border border-slate-700 space-y-1 relative">
      <div class="flex items-center justify-between">
        <span class="text-[11px] font-bold text-amber-300">Metric #${idx+1}</span>
        <button type="button" onclick="aboutCMSData.stats.splice(${idx},1); renderAdminAboutStats();" class="text-red-400 text-xs">✕</button>
      </div>
      <input type="text" value="${st.number}" onchange="aboutCMSData.stats[${idx}].number=this.value" class="w-full bg-slate-900 border border-slate-700 rounded p-1 text-xs text-white font-bold" placeholder="72+">
      <input type="text" value="${st.label}" onchange="aboutCMSData.stats[${idx}].label=this.value" class="w-full bg-slate-900 border border-slate-700 rounded p-1 text-[11px] text-white" placeholder="Label">
    </div>
  `).join('');
}
function addAboutStatMetric() {
  if (!aboutCMSData) return;
  aboutCMSData.stats.push({ number: "99+", label: "Verified Awards" });
  renderAdminAboutStats();
}

// 3. CHAPTER 1 IMAGE UPLOAD
function handleChapter1ImageUpload(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    aboutCMSData.chapter1.image = e.target.result;
    document.getElementById('ab-c1-img-preview').src = e.target.result;
  };
  reader.readAsDataURL(file);
}

// 4. CHAPTER 2 IMAGE UPLOAD
function handleChapter2ImageUpload(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    aboutCMSData.chapter2.image = e.target.result;
    document.getElementById('ab-c2-img-preview').src = e.target.result;
  };
  reader.readAsDataURL(file);
}

// 5. VALUES CRUD
function renderAdminAboutValues() {
  const container = document.getElementById('admin-about-values-list');
  if (!container || !aboutCMSData) return;
  container.innerHTML = aboutCMSData.values_list.map((val, idx) => `
    <div class="bg-slate-800/80 p-3 rounded-lg border border-slate-700 space-y-2">
      <div class="flex items-center justify-between pb-1 border-b border-slate-700">
        <span class="text-xs font-bold text-amber-300">Pillar #${idx+1} (${val.badge})</span>
        <button type="button" onclick="aboutCMSData.values_list.splice(${idx},1); renderAdminAboutValues();" class="text-red-400 text-xs">Delete</button>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-2">
        <input type="text" value="${val.badge}" onchange="aboutCMSData.values_list[${idx}].badge=this.value" class="bg-slate-900 border border-slate-700 rounded p-1 text-xs text-white" placeholder="Badge Tag">
        <input type="text" value="${val.icon}" onchange="aboutCMSData.values_list[${idx}].icon=this.value" class="bg-slate-900 border border-slate-700 rounded p-1 text-xs text-white" placeholder="Icon Name">
        <input type="text" value="${val.title}" onchange="aboutCMSData.values_list[${idx}].title=this.value" class="bg-slate-900 border border-slate-700 rounded p-1 text-xs text-white font-semibold" placeholder="Pillar Title">
      </div>
      <textarea rows="2" onchange="aboutCMSData.values_list[${idx}].description=this.value" class="w-full bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-white" placeholder="Value description">${val.description}</textarea>
    </div>
  `).join('');
}
function addAboutValueCard() {
  if (!aboutCMSData) return;
  aboutCMSData.values_list.push({
    badge: "New Pillar",
    icon: "shield-check",
    title: "Commitment to Purity",
    description: "Every single creation upholds our uncompromising standards of royal perfection."
  });
  renderAdminAboutValues();
}

// 6. PROCESS STEPS CRUD
function renderAdminAboutProcessSteps() {
  const container = document.getElementById('admin-about-process-list');
  if (!container || !aboutCMSData) return;
  container.innerHTML = aboutCMSData.process_steps.map((st, idx) => `
    <div class="bg-slate-800/80 p-3 rounded-lg border border-slate-700 space-y-2">
      <div class="flex items-center justify-between pb-1 border-b border-slate-700">
        <span class="text-xs font-bold text-amber-300">Step #${st.num || (idx+1)}</span>
        <button type="button" onclick="aboutCMSData.process_steps.splice(${idx},1); renderAdminAboutProcessSteps();" class="text-red-400 text-xs">Delete</button>
      </div>
      <div class="grid grid-cols-3 gap-2">
        <input type="text" value="${st.num}" onchange="aboutCMSData.process_steps[${idx}].num=this.value" class="bg-slate-900 border border-slate-700 rounded p-1 text-xs text-white" placeholder="01">
        <input type="text" value="${st.title}" onchange="aboutCMSData.process_steps[${idx}].title=this.value" class="col-span-2 bg-slate-900 border border-slate-700 rounded p-1 text-xs text-white font-semibold" placeholder="Step Title">
      </div>
      <textarea rows="2" onchange="aboutCMSData.process_steps[${idx}].description=this.value" class="w-full bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-white" placeholder="Step Description">${st.description}</textarea>
    </div>
  `).join('');
}
function addAboutProcessStep() {
  if (!aboutCMSData) return;
  aboutCMSData.process_steps.push({
    num: "0" + (aboutCMSData.process_steps.length + 1),
    title: "Kundan Setting",
    description: "Hand-embedding uncut polki gemstones in gold foil."
  });
  renderAdminAboutProcessSteps();
}

// SAVE ALL ABOUT SECTIONS
async function saveAllAboutSectionsCMS() {
  if (!window.AboutCMSEngine || !aboutCMSData) return;

  // Hero
  if (!aboutCMSData.hero) aboutCMSData.hero = {};
  if (document.getElementById('p-about-badge')) aboutCMSData.hero.badge = document.getElementById('p-about-badge').value.trim();
  if (document.getElementById('p-about-title')) aboutCMSData.hero.title = document.getElementById('p-about-title').value.trim();
  if (document.getElementById('p-about-story')) aboutCMSData.hero.subtitle = document.getElementById('p-about-story').value.trim();
  if (document.getElementById('p-about-img-val')) aboutCMSData.hero.banner_img = document.getElementById('p-about-img-val').value;

  // Chapter 1
  if (document.getElementById('ab-c1-tag')) aboutCMSData.chapter1.tag = document.getElementById('ab-c1-tag').value.trim();
  if (document.getElementById('ab-c1-title')) aboutCMSData.chapter1.title = document.getElementById('ab-c1-title').value.trim();
  if (document.getElementById('ab-c1-p1')) aboutCMSData.chapter1.p1 = document.getElementById('ab-c1-p1').value.trim();
  if (document.getElementById('ab-c1-p2')) aboutCMSData.chapter1.p2 = document.getElementById('ab-c1-p2').value.trim();
  if (document.getElementById('ab-c1-btn1-text')) aboutCMSData.chapter1.btn1_text = document.getElementById('ab-c1-btn1-text').value.trim();
  if (document.getElementById('ab-c1-btn1-url')) aboutCMSData.chapter1.btn1_url = document.getElementById('ab-c1-btn1-url').value.trim();
  if (document.getElementById('ab-c1-btn2-text')) aboutCMSData.chapter1.btn2_text = document.getElementById('ab-c1-btn2-text').value.trim();
  if (document.getElementById('ab-c1-btn2-url')) aboutCMSData.chapter1.btn2_url = document.getElementById('ab-c1-btn2-url').value.trim();
  if (document.getElementById('ab-c1-f-title')) aboutCMSData.chapter1.tag_title = document.getElementById('ab-c1-f-title').value.trim();
  if (document.getElementById('ab-c1-f-sub')) aboutCMSData.chapter1.tag_sub = document.getElementById('ab-c1-f-sub').value.trim();

  // Chapter 2
  if (document.getElementById('ab-c2-tag')) aboutCMSData.chapter2.tag = document.getElementById('ab-c2-tag').value.trim();
  if (document.getElementById('ab-c2-title')) aboutCMSData.chapter2.title = document.getElementById('ab-c2-title').value.trim();
  if (document.getElementById('ab-c2-p1')) aboutCMSData.chapter2.p1 = document.getElementById('ab-c2-p1').value.trim();
  if (document.getElementById('ab-c2-p2')) aboutCMSData.chapter2.p2 = document.getElementById('ab-c2-p2').value.trim();
  if (document.getElementById('ab-c2-p3')) aboutCMSData.chapter2.p3 = document.getElementById('ab-c2-p3').value.trim();
  if (document.getElementById('ab-c2-f-title')) aboutCMSData.chapter2.tag_title = document.getElementById('ab-c2-f-title').value.trim();
  if (document.getElementById('ab-c2-f-sub')) aboutCMSData.chapter2.tag_sub = document.getElementById('ab-c2-f-sub').value.trim();

  // Values Header
  if (document.getElementById('ab-val-tag')) aboutCMSData.values_header.tag = document.getElementById('ab-val-tag').value.trim();
  if (document.getElementById('ab-val-title')) aboutCMSData.values_header.title = document.getElementById('ab-val-title').value.trim();
  if (document.getElementById('ab-val-sub')) aboutCMSData.values_header.subtitle = document.getElementById('ab-val-sub').value.trim();

  // Process Header
  if (document.getElementById('ab-proc-tag')) aboutCMSData.process_header.tag = document.getElementById('ab-proc-tag').value.trim();
  if (document.getElementById('ab-proc-title')) aboutCMSData.process_header.title = document.getElementById('ab-proc-title').value.trim();
  if (document.getElementById('ab-proc-sub')) aboutCMSData.process_header.subtitle = document.getElementById('ab-proc-sub').value.trim();

  // Quote
  if (document.getElementById('ab-quote-text')) aboutCMSData.quote.text = document.getElementById('ab-quote-text').value.trim();
  if (document.getElementById('ab-quote-author')) aboutCMSData.quote.author = document.getElementById('ab-quote-author').value.trim();

  await window.AboutCMSEngine.saveAll(aboutCMSData);
}
