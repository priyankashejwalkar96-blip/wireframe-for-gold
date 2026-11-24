/**
 * policies-cms-engine.js
 * Controls EVERY single section of policies.html dynamically:
 * 1. Policy Hero (Tag, Title, Subtitle, Background Banner)
 * 2. Side Directory Navigation (Dynamic list of policy topics)
 * 3. Dynamic Policy Cards / Articles (Add, Edit, Delete policy sections)
 *    - Card ID / Anchor
 *    - Icon (e.g. truck, refresh-cw, award, shield-check, lock)
 *    - Main Title
 *    - Primary Description
 *    - Highlight Box (Text)
 *    - Delivery / Timing Table (optional rows)
 *    - Additional Notes
 */

const POLICIES_CMS_STORAGE_KEY = 'auro_policies_complete_cms';

const DEFAULT_POLICIES_CMS = {
  hero: {
    tag: "Trust & Transparency",
    title: "Store Policies & Assurance",
    subtitle: "Our commitment to uncompromising purity, tamper-proof insured express logistics, and an effortless customer experience for jewellery connoisseurs worldwide.",
    banner_img: "images/hero_slide_2.jpg"
  },
  directory_title: "Policy Directory",
  policies_list: [
    {
      id: "shipping",
      icon: "truck",
      nav_label: "Shipping & Delivery",
      title: "Insured Express Shipping Policy",
      description: "Every piece of jewellery leaving our Jaipur studio is packed in velvet-lined luxury keepsake boxes, secured with tamper-evident seals, and tracked with real-time GPS courier logistics.",
      highlight_box: "Complimentary Domestic Shipping: All domestic orders above ₹3,999 qualify for free air-express delivery via BlueDart or Delhivery.",
      has_table: true,
      table_rows: [
        { region: "Metro Cities (Mumbai, Delhi, Bengaluru)", courier: "BlueDart Air Express", timeframe: "2 – 3 Business Days" },
        { region: "Rest of India (Tier 2 & Tier 3 Cities)", courier: "Delhivery / SpeedPost", timeframe: "3 – 5 Business Days" },
        { region: "International (USA, UK, UAE, Canada, Australia)", courier: "DHL Express / FedEx", timeframe: "4 – 7 Business Days" }
      ],
      extra_text: ""
    },
    {
      id: "returns",
      icon: "refresh-cw",
      nav_label: "7-Day Exchange",
      title: "7-Day Hassle-Free Exchange Policy",
      description: "We want you to treasure every heirloom jewellery piece you acquire. If you have an unexpected sizing mismatch on a kada or wish to exchange a design, we make it effortless.",
      highlight_box: "Easy Doorstep Pickup: Simply text our concierge on WhatsApp (+91 98200 12345) within 7 days of delivery. We arrange a reverse pickup directly from your doorstep with zero return hassle.",
      has_table: false,
      table_rows: [],
      extra_text: "Items must be unworn, in original velvet packaging with security tag intact. Once inspected, replacement or store credit voucher is issued within 24 hours."
    },
    {
      id: "hallmarking",
      icon: "award",
      nav_label: "Hallmarking Purity",
      title: "BIS Hallmarking & Authenticity Guarantee",
      description: "Auro & Jewellary strictly complies with Bureau of Indian Standards (BIS) hallmarking guidelines. Every piece carries our official laser-engraved hallmark guaranteeing metal purity and genuine gemstone certification.",
      highlight_box: "",
      has_table: false,
      table_rows: [],
      extra_text: "Our traditional Meenakari enamelling is kiln-fired with natural minerals, and uncut Jadau Polki stones are mounted using authentic 22K gold foil setting passed down through royal craft guilds."
    },
    {
      id: "warranty",
      icon: "shield-check",
      nav_label: "Lifetime Polish Warranty",
      title: "Lifetime Re-Polishing & Craft Care",
      description: "Heirloom jewellery is meant to be passed down through generations. Auro & Jewellary provides lifetime re-polishing and stone re-tightening support for all our bespoke clients at any of our flagship boutiques in Jaipur and Mumbai.",
      highlight_box: "",
      has_table: false,
      table_rows: [],
      extra_text: ""
    },
    {
      id: "privacy",
      icon: "lock",
      nav_label: "Privacy & Security",
      title: "256-Bit SSL Encrypted Luxury Checkout",
      description: "Your payment credentials and personal information are guarded with bank-grade 256-bit SSL encryption. We support all major UPI gateways, Visa, MasterCard, American Express, and PayPal with zero card storage.",
      highlight_box: "",
      has_table: false,
      table_rows: [],
      extra_text: ""
    }
  ]
};

const PoliciesCMSEngine = {
  async getData() {
    // 1. Try Supabase
    if (typeof supabase !== 'undefined') {
      try {
        const client = supabase.createClient('https://efyqftxjtylvaoqhqptb.supabase.co', 'sb_publishable_WtIo91bnJaIRG7W0ITRR8w_-50i2_kY');
        const { data, error } = await client.from('site_cms').select('*').eq('section_key', 'policies_complete_cms').maybeSingle();
        if (!error && data && data.content_json) {
          localStorage.setItem(POLICIES_CMS_STORAGE_KEY, JSON.stringify(data.content_json));
          return data.content_json;
        }
      } catch(e) {}
    }

    // 2. LocalStorage Cache
    const cached = localStorage.getItem(POLICIES_CMS_STORAGE_KEY);
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        return { ...DEFAULT_POLICIES_CMS, ...parsed };
      } catch(e) {}
    }

    return DEFAULT_POLICIES_CMS;
  },

  async saveAll(data) {
    localStorage.setItem(POLICIES_CMS_STORAGE_KEY, JSON.stringify(data));

    if (typeof supabase !== 'undefined') {
      try {
        const client = supabase.createClient('https://efyqftxjtylvaoqhqptb.supabase.co', 'sb_publishable_WtIo91bnJaIRG7W0ITRR8w_-50i2_kY');
        await client.from('site_cms').upsert({
          section_key: 'policies_complete_cms',
          section_name: 'Policies Complete Page Dynamic CMS',
          content_json: data,
          updated_at: new Date().toISOString()
        }, { onConflict: 'section_key' });
      } catch(e) {
        console.warn('Policies CMS Supabase note:', e);
      }
    }

    this.apply(data);
  },

  apply(data) {
    if (!data) return;

    // 1. Hero Section
    if (data.hero) {
      const h = data.hero;
      const heroSec = document.querySelector('.policy-hero');
      if (heroSec) {
        const tag = heroSec.querySelector('.section-tag');
        if (tag && h.tag) tag.innerText = h.tag;
        const h1 = heroSec.querySelector('h1');
        if (h1 && h.title) h1.innerText = h.title;
        const p = heroSec.querySelector('p');
        if (p && h.subtitle) p.innerText = h.subtitle;
        if (h.banner_img) {
          heroSec.style.backgroundImage = `linear-gradient(rgba(18, 18, 18, 0.75), rgba(18, 18, 18, 0.75)), url('${h.banner_img}')`;
        }
      }
    }

    // 2. Side Directory Title
    if (data.directory_title) {
      const dirTitle = document.querySelector('.policy-side-nav h3');
      if (dirTitle) dirTitle.innerText = data.directory_title;
    }

    // 3. Side Directory Nav Links
    if (data.policies_list && data.policies_list.length) {
      const navList = document.querySelector('.policy-nav-list');
      if (navList) {
        navList.innerHTML = data.policies_list.map((item, idx) => `
          <li>
            <a href="#${item.id}" class="policy-nav-link ${idx === 0 ? 'active' : ''}">
              <i data-lucide="${item.icon || 'file-text'}" style="width: 16px;"></i> ${item.nav_label || item.title}
            </a>
          </li>
        `).join('');
      }

      // 4. Policy Detail Cards
      const detailsWrap = document.querySelector('.policy-details-wrap');
      if (detailsWrap) {
        detailsWrap.innerHTML = data.policies_list.map(item => `
          <article class="policy-card" id="${item.id}">
            <h2><i data-lucide="${item.icon || 'shield-check'}"></i> ${item.title}</h2>
            <p>${item.description}</p>
            
            ${item.highlight_box ? `
              <div class="policy-highlight-box">
                ${item.highlight_box}
              </div>
            ` : ''}

            ${item.has_table && item.table_rows && item.table_rows.length ? `
              <table class="policy-table">
                <thead>
                  <tr>
                    <th>Region</th>
                    <th>Courier Partner</th>
                    <th>Delivery Timeframe</th>
                  </tr>
                </thead>
                <tbody>
                  ${item.table_rows.map(row => `
                    <tr>
                      <td>${row.region}</td>
                      <td>${row.courier}</td>
                      <td>${row.timeframe}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            ` : ''}

            ${item.extra_text ? `<p>${item.extra_text}</p>` : ''}
          </article>
        `).join('');
      }
    }

    if (window.lucide) window.lucide.createIcons();
  }
};

window.PoliciesCMSEngine = PoliciesCMSEngine;

window.addEventListener('DOMContentLoaded', async () => {
  try {
    const d = await PoliciesCMSEngine.getData();
    PoliciesCMSEngine.apply(d);
  } catch(e) {
    console.warn('PoliciesCMSEngine init note:', e);
  }
});
