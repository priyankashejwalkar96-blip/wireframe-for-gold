/**
 * contact-cms-engine.js
 * Controls EVERY single section of contact.html dynamically:
 * 1. Hero Header (Tag, Title, Subtitle, Background Banner)
 * 2. 4 Direct Action Cards (WhatsApp, Phone Hotline, Email, Flagship Salon)
 * 3. Inquiry Form Settings (Header, Subtitle, Button text, Category dropdown options)
 * 4. Virtual Video Shopping Card (Title, Description, WhatsApp Video Call link & text)
 * 5. Flagship Boutiques (Add, Edit, Delete boutiques with tag, name, address, hours, direct line)
 * 6. FAQ Quick Accordion Section (Tag, Title, Subtitle, Add / Edit / Delete FAQ items)
 */

const CONTACT_CMS_STORAGE_KEY = 'auro_contact_complete_cms';

const DEFAULT_CONTACT_CMS = {
  hero: {
    tag: "24/7 Luxury Jewellery Concierge",
    title: "Connect With Auro & Jewellary",
    subtitle: "Whether you seek personalized bridal trousseau guidance, custom bangle sizing, or live HD virtual shopping from across the world, our jewelry stylists are delighted to assist you.",
    banner_img: "images/banner_jewelry_pure_2.jpg"
  },
  action_cards: [
    {
      icon: "message-circle",
      title: "WhatsApp Stylist",
      desc: "Instant answers on stock, custom sizing, and real piece video previews.",
      link_text: "Chat on WhatsApp →",
      link_url: "https://wa.me/919820012345?text=Hello%20Auro%20Jewellery,%20I%20would%20like%20to%20inquire%20about%20a%20design."
    },
    {
      icon: "phone-call",
      title: "VIP Phone Desk",
      desc: "Speak directly with our senior jewellery consultant (10 AM - 9 PM IST).",
      link_text: "+91 98200 12345 →",
      link_url: "tel:+919820012345"
    },
    {
      icon: "mail",
      title: "Email Inquiries",
      desc: "For custom bridal sets, corporate gifting, or wholesale partnerships.",
      link_text: "concierge@aurojewels.com →",
      link_url: "mailto:concierge@aurojewels.com"
    },
    {
      icon: "map-pin",
      title: "Flagship Salons",
      desc: "Visit our private viewing salons in Jaipur Johari Bazaar and Mumbai.",
      link_text: "View Addresses →",
      link_url: "#flagshipSalons"
    }
  ],
  form_settings: {
    title: "Send Us A Message",
    subtitle: "Fill out the details below and a dedicated jewelry stylist will contact you with high-res photos and answers within 2 hours.",
    btn_text: "Submit Inquiry to Stylist"
  },
  virtual_shopping: {
    title: "Global Virtual Shopping",
    desc: "Living in the USA, UK, UAE, or Canada? Experience our jewels live in HD on a private 1-on-1 WhatsApp video call before you order.",
    btn_text: "Book Video Slot Now",
    btn_url: "https://wa.me/919820012345?text=Hello%20Auro,%20I%20would%20like%20to%20book%20a%20Video%20Shopping%20Slot."
  },
  boutiques: [
    {
      tag: "Heritage Flagship",
      title: "Jaipur Johari Bazaar Salon",
      address: "14, Johari Bazaar, Pink City Heritage Quarter, Jaipur, Rajasthan 302003",
      hours: "Mon - Sat: 11:00 AM – 8:30 PM (Sun by Appointment)",
      phone: "Direct Line: +91 141 256 7890"
    },
    {
      tag: "Bridal Boutique",
      title: "Mumbai Linking Road Salon",
      address: "Ground Floor, Grand Galleria, Linking Road, Bandra West, Mumbai 400050",
      hours: "Mon - Sun: 11:30 AM – 9:00 PM",
      phone: "Direct Line: +91 98200 12345"
    }
  ],
  faq_header: {
    tag: "Frequently Asked Questions",
    title: "Everything You Need To Know",
    subtitle: "Quick answers about hallmarking, insured courier transit, custom bangle sizes, and returns."
  },
  faqs: [
    {
      icon: "check-circle",
      question: "Are Auro Jewels authentic & hallmarked?",
      answer: "Yes. Every single piece is handcrafted using genuine 22K gold foil setting, BIS hallmarked precious metals, and hand-painted Meenakari kiln-fired by master artisans."
    },
    {
      icon: "truck",
      question: "How fast is shipping & is it insured?",
      answer: "Orders are dispatched via BlueDart / DHL express with 100% full transit insurance. Delivery takes 2-4 business days in India and 4-7 business days internationally."
    },
    {
      icon: "ruler",
      question: "How do I know my correct bangle size?",
      answer: "Our kadas are crafted in standard royal sizes 2.4, 2.6, and 2.8 with screw-open hinges. If you need help sizing your wrist, text us on WhatsApp for a quick instant measuring guide."
    },
    {
      icon: "refresh-cw",
      question: "What is your return or exchange policy?",
      answer: "We provide a seamless 7-day hassle-free exchange policy. If an item arrives with any sizing issue or variation, our concierge arranges doorstep pickup immediately."
    }
  ]
};

const ContactCMSEngine = {
  async getData() {
    // 1. Try Supabase
    if (typeof supabase !== 'undefined') {
      try {
        const client = supabase.createClient('https://efyqftxjtylvaoqhqptb.supabase.co', 'sb_publishable_WtIo91bnJaIRG7W0ITRR8w_-50i2_kY');
        const { data, error } = await client.from('site_cms').select('*').eq('section_key', 'contact_complete_cms').maybeSingle();
        if (!error && data && data.content_json) {
          localStorage.setItem(CONTACT_CMS_STORAGE_KEY, JSON.stringify(data.content_json));
          return data.content_json;
        }
      } catch(e) {}
    }

    // 2. LocalStorage Cache
    const cached = localStorage.getItem(CONTACT_CMS_STORAGE_KEY);
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        return { ...DEFAULT_CONTACT_CMS, ...parsed };
      } catch(e) {}
    }

    return DEFAULT_CONTACT_CMS;
  },

  async saveAll(data) {
    localStorage.setItem(CONTACT_CMS_STORAGE_KEY, JSON.stringify(data));

    if (typeof supabase !== 'undefined') {
      try {
        const client = supabase.createClient('https://efyqftxjtylvaoqhqptb.supabase.co', 'sb_publishable_WtIo91bnJaIRG7W0ITRR8w_-50i2_kY');
        await client.from('site_cms').upsert({
          section_key: 'contact_complete_cms',
          section_name: 'Contact Complete Page Dynamic CMS',
          content_json: data,
          updated_at: new Date().toISOString()
        }, { onConflict: 'section_key' });
      } catch(e) {
        console.warn('Contact CMS Supabase note:', e);
      }
    }

    this.apply(data);
  },

  apply(data) {
    if (!data) return;

    // 1. Hero Section
    if (data.hero) {
      const h = data.hero;
      const heroSec = document.querySelector('.contact-hero');
      if (heroSec) {
        const tag = heroSec.querySelector('.section-tag');
        if (tag && h.tag) tag.innerText = h.tag;
        const h1 = heroSec.querySelector('h1');
        if (h1 && h.title) h1.innerText = h.title;
        const p = heroSec.querySelector('p');
        if (p && h.subtitle) p.innerText = h.subtitle;
        if (h.banner_img) {
          heroSec.style.backgroundImage = `linear-gradient(rgba(18, 14, 12, 0.78), rgba(18, 12, 10, 0.78)), url('${h.banner_img}')`;
        }
      }
    }

    // 2. Action Cards
    if (data.action_cards && data.action_cards.length) {
      const cardsGrid = document.querySelector('.contact-cards-grid');
      if (cardsGrid) {
        cardsGrid.innerHTML = data.action_cards.map(c => `
          <a href="${c.link_url || '#'}" target="${c.link_url && c.link_url.startsWith('http') ? '_blank' : '_self'}" class="contact-action-card">
            <div class="contact-icon-bubble">
              <i data-lucide="${c.icon || 'message-circle'}" style="width: 28px; height: 28px;"></i>
            </div>
            <h3>${c.title}</h3>
            <p>${c.desc}</p>
            <span class="contact-link-text">${c.link_text || 'Connect →'}</span>
          </a>
        `).join('');
      }
    }

    // 3. Form Settings
    if (data.form_settings) {
      const formCard = document.querySelector('.contact-form-card');
      if (formCard) {
        const h2 = formCard.querySelector('h2');
        if (h2 && data.form_settings.title) h2.innerText = data.form_settings.title;
        const pSub = formCard.querySelector('.form-sub');
        if (pSub && data.form_settings.subtitle) pSub.innerText = data.form_settings.subtitle;
        const btn = formCard.querySelector('.submit-inquiry-btn');
        if (btn && data.form_settings.btn_text) {
          btn.innerHTML = `<i data-lucide="send" style="width: 18px; height: 18px;"></i> ${data.form_settings.btn_text}`;
        }
      }
    }

    // 4. Virtual Shopping Card
    if (data.virtual_shopping) {
      const vCard = document.querySelector('.vip-virtual-card');
      if (vCard) {
        const h3 = vCard.querySelector('h3');
        if (h3 && data.virtual_shopping.title) h3.innerHTML = `<i data-lucide="video"></i> ${data.virtual_shopping.title}`;
        const p = vCard.querySelector('p');
        if (p && data.virtual_shopping.desc) p.innerText = data.virtual_shopping.desc;
        const btn = vCard.querySelector('.vip-whatsapp-btn');
        if (btn) {
          if (data.virtual_shopping.btn_text) btn.innerHTML = `<i data-lucide="calendar"></i> ${data.virtual_shopping.btn_text}`;
          if (data.virtual_shopping.btn_url) btn.href = data.virtual_shopping.btn_url;
        }
      }
    }

    // 5. Boutiques
    if (data.boutiques && data.boutiques.length) {
      const sidebar = document.querySelector('.showrooms-sidebar');
      if (sidebar) {
        // Keep virtual card first
        const vCardHtml = sidebar.querySelector('.vip-virtual-card') ? sidebar.querySelector('.vip-virtual-card').outerHTML : '';
        const bHtml = data.boutiques.map(b => `
          <div class="showroom-box">
            <span class="showroom-tag">${b.tag}</span>
            <h3>${b.title}</h3>
            <div class="showroom-detail">
              <i data-lucide="map-pin"></i>
              <span>${b.address}</span>
            </div>
            <div class="showroom-detail">
              <i data-lucide="clock"></i>
              <span>${b.hours}</span>
            </div>
            <div class="showroom-detail">
              <i data-lucide="phone"></i>
              <span>${b.phone}</span>
            </div>
          </div>
        `).join('');
        sidebar.innerHTML = vCardHtml + bHtml;
      }
    }

    // 6. FAQ Quick Accordion Section
    if (data.faq_header) {
      const faqSec = document.querySelector('.contact-faq-section');
      if (faqSec) {
        const tag = faqSec.querySelector('.section-tag');
        if (tag && data.faq_header.tag) tag.innerText = data.faq_header.tag;
        const h2 = faqSec.querySelector('h2');
        if (h2 && data.faq_header.title) h2.innerText = data.faq_header.title;
        const p = faqSec.querySelector('.container > .text-center p');
        if (p && data.faq_header.subtitle) p.innerText = data.faq_header.subtitle;
      }
    }
    if (data.faqs && data.faqs.length) {
      const faqGrid = document.querySelector('.faq-grid');
      if (faqGrid) {
        faqGrid.innerHTML = data.faqs.map(f => `
          <div class="faq-item-card">
            <h4><i data-lucide="${f.icon || 'check-circle'}"></i> ${f.question}</h4>
            <p>${f.answer}</p>
          </div>
        `).join('');
      }
    }

    if (window.lucide) window.lucide.createIcons();
  }
};

window.ContactCMSEngine = ContactCMSEngine;

window.addEventListener('DOMContentLoaded', async () => {
  try {
    const d = await ContactCMSEngine.getData();
    ContactCMSEngine.apply(d);
  } catch(e) {
    console.warn('ContactCMSEngine init note:', e);
  }
});
