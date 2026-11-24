// admin-contact-sections.js
// Handles full CRUD for all sections on contact.html

let contactCMSData = null;

async function loadContactSectionsAdmin() {
  if (!window.ContactCMSEngine) return;
  contactCMSData = await window.ContactCMSEngine.getData();

  // 1. Hero Banner
  if (contactCMSData.hero) {
    const h = contactCMSData.hero;
    if (document.getElementById('p-contact-tag')) document.getElementById('p-contact-tag').value = h.tag || '';
    if (document.getElementById('p-contact-title')) document.getElementById('p-contact-title').value = h.title || '';
    if (document.getElementById('p-contact-subtitle')) document.getElementById('p-contact-subtitle').value = h.subtitle || '';
    if (document.getElementById('p-contact-img-val')) document.getElementById('p-contact-img-val').value = h.banner_img || 'images/banner_jewelry_pure_2.jpg';
    if (document.getElementById('contact-preview-img')) document.getElementById('contact-preview-img').src = h.banner_img || 'images/banner_jewelry_pure_2.jpg';
  }

  // 2. Direct Action Cards (4 Cards)
  renderAdminContactActionCards();

  // 3. Inquiry Form Settings
  if (contactCMSData.form_settings) {
    const fs = contactCMSData.form_settings;
    if (document.getElementById('cnt-form-title')) document.getElementById('cnt-form-title').value = fs.title || '';
    if (document.getElementById('cnt-form-subtitle')) document.getElementById('cnt-form-subtitle').value = fs.subtitle || '';
    if (document.getElementById('cnt-form-btn-text')) document.getElementById('cnt-form-btn-text').value = fs.btn_text || '';
  }

  // 4. VIP Global Virtual Video Shopping
  if (contactCMSData.virtual_shopping) {
    const vs = contactCMSData.virtual_shopping;
    if (document.getElementById('cnt-vs-title')) document.getElementById('cnt-vs-title').value = vs.title || '';
    if (document.getElementById('cnt-vs-desc')) document.getElementById('cnt-vs-desc').value = vs.desc || '';
    if (document.getElementById('cnt-vs-btn-text')) document.getElementById('cnt-vs-btn-text').value = vs.btn_text || '';
    if (document.getElementById('cnt-vs-btn-url')) document.getElementById('cnt-vs-btn-url').value = vs.btn_url || '';
  }

  // 5. Flagship Boutiques (Add / Edit / Delete)
  renderAdminContactBoutiques();

  // 6. FAQs (Tag, Title, Subtitle, Add / Edit / Delete items)
  if (contactCMSData.faq_header) {
    const fqh = contactCMSData.faq_header;
    if (document.getElementById('cnt-faq-tag')) document.getElementById('cnt-faq-tag').value = fqh.tag || '';
    if (document.getElementById('cnt-faq-title')) document.getElementById('cnt-faq-title').value = fqh.title || '';
    if (document.getElementById('cnt-faq-subtitle')) document.getElementById('cnt-faq-subtitle').value = fqh.subtitle || '';
  }
  renderAdminContactFAQs();
}

// 2. DIRECT ACTION CARDS (WhatsApp, Phone, Email, Boutiques)
function renderAdminContactActionCards() {
  const container = document.getElementById('admin-contact-actions-list');
  if (!container || !contactCMSData || !contactCMSData.action_cards) return;

  container.innerHTML = contactCMSData.action_cards.map((card, idx) => `
    <div class="bg-slate-800/80 p-3 rounded border border-slate-700 space-y-2">
      <div class="flex items-center justify-between pb-1 border-b border-slate-700">
        <span class="text-xs font-semibold text-amber-400">Action Card #${idx + 1} (${card.title})</span>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div>
          <label class="block text-[10px] text-slate-400">Title</label>
          <input type="text" value="${card.title || ''}" onchange="contactCMSData.action_cards[${idx}].title=this.value" class="bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-white w-full">
        </div>
        <div>
          <label class="block text-[10px] text-slate-400">Button / Link Text</label>
          <input type="text" value="${card.link_text || ''}" onchange="contactCMSData.action_cards[${idx}].link_text=this.value" class="bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-white w-full">
        </div>
      </div>
      <div>
        <label class="block text-[10px] text-slate-400">Short Description</label>
        <input type="text" value="${card.desc || ''}" onchange="contactCMSData.action_cards[${idx}].desc=this.value" class="bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-white w-full">
      </div>
      <div>
        <label class="block text-[10px] text-slate-400">Target Link URL / Phone / WhatsApp / Anchor</label>
        <input type="text" value="${card.link_url || ''}" onchange="contactCMSData.action_cards[${idx}].link_url=this.value" class="bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-white w-full">
      </div>
    </div>
  `).join('');
}

// 5. FLAGSHIP BOUTIQUES LIST (CRUD)
function renderAdminContactBoutiques() {
  const container = document.getElementById('admin-contact-boutiques-list');
  if (!container || !contactCMSData || !contactCMSData.boutiques) return;

  container.innerHTML = contactCMSData.boutiques.map((b, idx) => `
    <div class="bg-slate-800/80 p-3 rounded border border-slate-700 space-y-2">
      <div class="flex items-center justify-between pb-1 border-b border-slate-700">
        <span class="text-xs font-semibold text-amber-400">Boutique #${idx + 1} (${b.tag || 'Salon'})</span>
        <button type="button" onclick="contactCMSData.boutiques.splice(${idx}, 1); renderAdminContactBoutiques();" class="text-red-400 hover:text-red-300 text-xs">Delete</button>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div>
          <label class="block text-[10px] text-slate-400">Tag / City Badge</label>
          <input type="text" value="${b.tag || ''}" onchange="contactCMSData.boutiques[${idx}].tag=this.value" class="bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-white w-full">
        </div>
        <div>
          <label class="block text-[10px] text-slate-400">Salon Name / Title</label>
          <input type="text" value="${b.title || ''}" onchange="contactCMSData.boutiques[${idx}].title=this.value" class="bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-white w-full">
        </div>
      </div>
      <div>
        <label class="block text-[10px] text-slate-400">Full Address</label>
        <input type="text" value="${b.address || ''}" onchange="contactCMSData.boutiques[${idx}].address=this.value" class="bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-white w-full">
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div>
          <label class="block text-[10px] text-slate-400">Visiting Hours</label>
          <input type="text" value="${b.hours || ''}" onchange="contactCMSData.boutiques[${idx}].hours=this.value" class="bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-white w-full">
        </div>
        <div>
          <label class="block text-[10px] text-slate-400">Direct Phone Line</label>
          <input type="text" value="${b.phone || ''}" onchange="contactCMSData.boutiques[${idx}].phone=this.value" class="bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-white w-full">
        </div>
      </div>
    </div>
  `).join('');
}

function addContactBoutiqueCard() {
  if (!contactCMSData) return;
  if (!contactCMSData.boutiques) contactCMSData.boutiques = [];
  contactCMSData.boutiques.push({
    tag: "New Flagship Salon",
    title: "Delhi Boutique",
    address: "Connaught Place, New Delhi 110001",
    hours: "Mon - Sat: 11:00 AM – 8:00 PM",
    phone: "Direct Line: +91 11 4567 8900"
  });
  renderAdminContactBoutiques();
}

// 6. CONTACT FAQS (CRUD)
function renderAdminContactFAQs() {
  const container = document.getElementById('admin-contact-faqs-list');
  if (!container || !contactCMSData || !contactCMSData.faq_items) return;

  container.innerHTML = contactCMSData.faq_items.map((faq, idx) => `
    <div class="bg-slate-800/80 p-3 rounded border border-slate-700 space-y-2">
      <div class="flex items-center justify-between pb-1 border-b border-slate-700">
        <span class="text-xs font-semibold text-amber-400">FAQ #${idx + 1}</span>
        <button type="button" onclick="contactCMSData.faq_items.splice(${idx}, 1); renderAdminContactFAQs();" class="text-red-400 hover:text-red-300 text-xs">Delete</button>
      </div>
      <div>
        <label class="block text-[10px] text-slate-400">Question</label>
        <input type="text" value="${faq.q || ''}" onchange="contactCMSData.faq_items[${idx}].q=this.value" class="bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-white w-full">
      </div>
      <div>
        <label class="block text-[10px] text-slate-400">Answer</label>
        <textarea rows="2" onchange="contactCMSData.faq_items[${idx}].a=this.value" class="bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-white w-full">${faq.a || ''}</textarea>
      </div>
    </div>
  `).join('');
}

function addContactFAQItem() {
  if (!contactCMSData) return;
  if (!contactCMSData.faq_items) contactCMSData.faq_items = [];
  contactCMSData.faq_items.push({
    q: "New Frequently Asked Question",
    a: "Here is the detailed answer explaining our craftsmanship and delivery policies."
  });
  renderAdminContactFAQs();
}

// SAVE ALL CONTACT CMS
async function saveAllContactSectionsCMS() {
  if (!window.ContactCMSEngine || !contactCMSData) return;

  // 1. Hero Banner
  if (!contactCMSData.hero) contactCMSData.hero = {};
  if (document.getElementById('p-contact-tag')) contactCMSData.hero.tag = document.getElementById('p-contact-tag').value.trim();
  if (document.getElementById('p-contact-title')) contactCMSData.hero.title = document.getElementById('p-contact-title').value.trim();
  if (document.getElementById('p-contact-subtitle')) contactCMSData.hero.subtitle = document.getElementById('p-contact-subtitle').value.trim();
  if (document.getElementById('p-contact-img-val')) contactCMSData.hero.banner_img = document.getElementById('p-contact-img-val').value.trim();

  // 3. Form Settings
  if (!contactCMSData.form_settings) contactCMSData.form_settings = {};
  if (document.getElementById('cnt-form-title')) contactCMSData.form_settings.title = document.getElementById('cnt-form-title').value.trim();
  if (document.getElementById('cnt-form-subtitle')) contactCMSData.form_settings.subtitle = document.getElementById('cnt-form-subtitle').value.trim();
  if (document.getElementById('cnt-form-btn-text')) contactCMSData.form_settings.btn_text = document.getElementById('cnt-form-btn-text').value.trim();

  // 4. Virtual Shopping
  if (!contactCMSData.virtual_shopping) contactCMSData.virtual_shopping = {};
  if (document.getElementById('cnt-vs-title')) contactCMSData.virtual_shopping.title = document.getElementById('cnt-vs-title').value.trim();
  if (document.getElementById('cnt-vs-desc')) contactCMSData.virtual_shopping.desc = document.getElementById('cnt-vs-desc').value.trim();
  if (document.getElementById('cnt-vs-btn-text')) contactCMSData.virtual_shopping.btn_text = document.getElementById('cnt-vs-btn-text').value.trim();
  if (document.getElementById('cnt-vs-btn-url')) contactCMSData.virtual_shopping.btn_url = document.getElementById('cnt-vs-btn-url').value.trim();

  // 6. FAQ Header
  if (!contactCMSData.faq_header) contactCMSData.faq_header = {};
  if (document.getElementById('cnt-faq-tag')) contactCMSData.faq_header.tag = document.getElementById('cnt-faq-tag').value.trim();
  if (document.getElementById('cnt-faq-title')) contactCMSData.faq_header.title = document.getElementById('cnt-faq-title').value.trim();
  if (document.getElementById('cnt-faq-subtitle')) contactCMSData.faq_header.subtitle = document.getElementById('cnt-faq-subtitle').value.trim();

  await window.ContactCMSEngine.saveAll(contactCMSData);
}

window.loadContactSectionsAdmin = loadContactSectionsAdmin;
window.saveAllContactSectionsCMS = saveAllContactSectionsCMS;
window.addContactBoutiqueCard = addContactBoutiqueCard;
window.addContactFAQItem = addContactFAQItem;
window.renderAdminContactActionCards = renderAdminContactActionCards;
window.renderAdminContactBoutiques = renderAdminContactBoutiques;
window.renderAdminContactFAQs = renderAdminContactFAQs;
