/**
 * Dynamic Multi-Banner Slider Engine
 * Reads banners from universal-cms (or Supabase/LocalStorage)
 * Renders dynamic slides, pagination dots, auto-rotates every 5s
 */

const MultiBannerEngine = {
    DEFAULT_SLIDES: [
        {
            id: 'slide_1',
            eyebrow: "18K GOLD PLATED . ANTI-TARNISH",
            title: "A U R O",
            sale_label: "SIGNATURE STACK EDIT",
            headline: "BUY 2 GET 1 FREE",
            subheadline: "ON BANGLES, BRACELETS & RINGS",
            btn_domain: "AUROJEWELLERY.COM",
            btn_text: "SHOP STACKABLES",
            btn_url: "collections.html",
            image: "images/hero.jpg"
        },
        {
            id: 'slide_2',
            eyebrow: "ROYAL HERITAGE JAIPUR BRIDAL",
            title: "A U R O",
            sale_label: "IMPERIAL FESTIVE EDIT",
            headline: "UP TO 30% OFF",
            subheadline: "ON KUNDAN, MEENAKARI & POLKI BRIDAL SUITES",
            btn_domain: "AUROJEWELLERY.COM",
            btn_text: "EXPLORE BRIDAL",
            btn_url: "pachi-kundan-necklace.html",
            image: "images/banner_royal_bridal.jpg"
        },
        {
            id: 'slide_3',
            eyebrow: "925 STERLING & GERMAN SILVER",
            title: "A U R O",
            sale_label: "DAILY LUXE EDIT",
            headline: "FLAT ₹500 OFF",
            subheadline: "ON ORDERS ABOVE ₹2,999 | CODE: ROYAL500",
            btn_domain: "AUROJEWELLERY.COM",
            btn_text: "SHOP SILVER",
            btn_url: "german-silver-necklaces.html",
            image: "images/banner_jewelry_pure_2.jpg"
        }
    ],

    getSlides() {
        try {
            const raw = localStorage.getItem('auro_home_banners_list');
            if (raw) return JSON.parse(raw);
        } catch(e) {}
        return this.DEFAULT_SLIDES;
    },

    saveSlides(slides) {
        localStorage.setItem('auro_home_banners_list', JSON.stringify(slides));

        // Sync with Supabase
        if (typeof supabase !== 'undefined') {
            try {
                const client = supabase.createClient('https://efyqftxjtylvaoqhqptb.supabase.co', 'sb_publishable_WtIo91bnJaIRG7W0ITRR8w_-50i2_kY');
                client.from('site_cms').upsert({
                    section_key: 'home_banners_list',
                    section_name: 'Home Multiple Hero Banners',
                    content_json: slides,
                    updated_at: new Date().toISOString()
                }, { onConflict: 'section_key' });
            } catch(e) {}
        }

        this.renderSlider();
    },

    renderSlider() {
        const carousel = document.getElementById('heroCarousel');
        const pagination = document.getElementById('heroPagination');
        if (!carousel) return;

        const slides = this.getSlides();
        if (!slides || slides.length === 0) return;

        // Keep arrow buttons
        const prevBtn = document.getElementById('heroPrevBtn');
        const nextBtn = document.getElementById('heroNextBtn');

        // Render Slide Elements
        const slidesHtml = slides.map((slide, idx) => `
            <div class="hero-slide ${idx === 0 ? 'active' : ''} raviva-hero-slide" data-slide-index="${idx}">
              <div class="raviva-banner-wrapper">
                <div class="raviva-content-col">
                  <span class="raviva-sub-tag">${slide.eyebrow || '18K GOLD PLATED . ANTI-TARNISH'}</span>
                  <h1 class="raviva-brand-title">${slide.title || 'A U R O'}</h1>
                  <div class="raviva-divider-line"></div>
                  
                  <div class="raviva-offer-block">
                    <span class="raviva-sale-label">${slide.sale_label || 'SPECIAL PROMOTION'}</span>
                    <div class="raviva-main-offer-heading">${slide.headline}</div>
                    <p class="raviva-offer-subtext">${slide.subheadline}</p>
                  </div>

                  <div class="raviva-action-group">
                    <a href="${slide.btn_url || 'collections.html'}" class="raviva-domain-badge">${slide.btn_domain || 'AUROJEWELLERY.COM'}</a>
                    <a href="${slide.btn_url || 'collections.html'}" class="raviva-cta-btn">${slide.btn_text || 'EXPLORE NOW'}</a>
                  </div>
                </div>

                <div class="raviva-visual-col">
                  <img src="${slide.image || 'images/hero.jpg'}" alt="${slide.headline}" class="raviva-hero-img">
                </div>
              </div>
            </div>
        `).join('');

        // Remove old slides
        carousel.querySelectorAll('.hero-slide').forEach(s => s.remove());

        // Insert new slides before navigation buttons
        if (prevBtn) {
            prevBtn.insertAdjacentHTML('beforebegin', slidesHtml);
        } else {
            carousel.insertAdjacentHTML('afterbegin', slidesHtml);
        }

        // Render Pagination dots
        if (pagination) {
            pagination.innerHTML = slides.map((_, idx) => `
                <div class="hero-slider-dot ${idx === 0 ? 'active' : ''}" data-index="${idx}"></div>
            `).join('');
        }

        this.initSliderControls();
    },

    initSliderControls() {
        const slides = document.querySelectorAll('.hero-slide');
        const dots = document.querySelectorAll('.hero-slider-dot');
        const prevBtn = document.getElementById('heroPrevBtn');
        const nextBtn = document.getElementById('heroNextBtn');
        if (!slides.length) return;

        let currentIndex = 0;
        let timer = null;

        function showSlide(index) {
            if (index >= slides.length) currentIndex = 0;
            else if (index < 0) currentIndex = slides.length - 1;
            else currentIndex = index;

            slides.forEach((s, idx) => {
                s.classList.toggle('active', idx === currentIndex);
            });
            dots.forEach((d, idx) => {
                d.classList.toggle('active', idx === currentIndex);
            });
        }

        function nextSlide() { showSlide(currentIndex + 1); }
        function prevSlide() { showSlide(currentIndex - 1); }

        function startAutoPlay() {
            clearInterval(timer);
            timer = setInterval(nextSlide, 5000);
        }

        if (nextBtn) {
            nextBtn.onclick = (e) => { e.preventDefault(); nextSlide(); startAutoPlay(); };
        }
        if (prevBtn) {
            prevBtn.onclick = (e) => { e.preventDefault(); prevSlide(); startAutoPlay(); };
        }

        dots.forEach((dot, idx) => {
            dot.onclick = () => { showSlide(idx); startAutoPlay(); };
        });

        startAutoPlay();
    }
};

window.MultiBannerEngine = MultiBannerEngine;

window.addEventListener('DOMContentLoaded', () => {
    MultiBannerEngine.renderSlider();
});
