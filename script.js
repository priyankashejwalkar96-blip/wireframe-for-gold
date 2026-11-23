/**
 * AURA & CO. - Interactive Wireframe Behavior & Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide SVG Icons
  if (window.lucide) {
    lucide.createIcons();
  }

  // Sticky Navbar Effect on Scroll
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile Menu Drawer Controls
  const menuToggle = document.getElementById('menuToggle');
  const drawerClose = document.getElementById('drawerClose');
  const mobileDrawer = document.getElementById('mobileDrawer');

  if (menuToggle && mobileDrawer && drawerClose) {
    menuToggle.addEventListener('click', () => {
      mobileDrawer.classList.add('active');
    });
    drawerClose.addEventListener('click', () => {
      mobileDrawer.classList.remove('active');
    });
  }

  // ================= AUTOMATIC HERO BANNER SLIDER ================= //
  const heroSlides = document.querySelectorAll('.hero-slide');
  const heroDots = document.querySelectorAll('.hero-slider-dot');
  const heroPrevBtn = document.getElementById('heroPrevBtn');
  const heroNextBtn = document.getElementById('heroNextBtn');
  const heroCarousel = document.getElementById('heroCarousel');

  let currentHeroIndex = 0;
  let heroSlideTimer = null;
  const HERO_SLIDE_DURATION = 5000; // 5 seconds auto rotation

  function showHeroSlide(index) {
    if (!heroSlides.length) return;

    if (index >= heroSlides.length) currentHeroIndex = 0;
    else if (index < 0) currentHeroIndex = heroSlides.length - 1;
    else currentHeroIndex = index;

    heroSlides.forEach((slide, idx) => {
      if (idx === currentHeroIndex) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });

    heroDots.forEach((dot, idx) => {
      if (idx === currentHeroIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  function nextHeroSlide() {
    showHeroSlide(currentHeroIndex + 1);
  }

  function prevHeroSlide() {
    showHeroSlide(currentHeroIndex - 1);
  }

  function startHeroAutoPlay() {
    stopHeroAutoPlay();
    heroSlideTimer = setInterval(nextHeroSlide, HERO_SLIDE_DURATION);
  }

  function stopHeroAutoPlay() {
    if (heroSlideTimer) {
      clearInterval(heroSlideTimer);
      heroSlideTimer = null;
    }
  }

  if (heroSlides.length > 1) {
    // Arrow buttons
    if (heroNextBtn) {
      heroNextBtn.addEventListener('click', () => {
        nextHeroSlide();
        startHeroAutoPlay();
      });
    }

    if (heroPrevBtn) {
      heroPrevBtn.addEventListener('click', () => {
        prevHeroSlide();
        startHeroAutoPlay();
      });
    }

    // Dot indicators
    heroDots.forEach((dot) => {
      dot.addEventListener('click', () => {
        const idx = parseInt(dot.getAttribute('data-index'), 10);
        showHeroSlide(idx);
        startHeroAutoPlay();
      });
    });

    // Pause auto-rotation on mouse hover, resume on mouse leave
    if (heroCarousel) {
      heroCarousel.addEventListener('mouseenter', stopHeroAutoPlay);
      heroCarousel.addEventListener('mouseleave', startHeroAutoPlay);
    }

    // Start auto slide timer
    startHeroAutoPlay();
  }

  // Product Category Filter Tabs
  const filterBtns = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      productCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // Quick View Modal Data & Handlers
  const modal = document.getElementById('productModal');
  const modalClose = document.getElementById('modalClose');

  const productData = {
    'meera-bangles': {
      title: 'Meera Royal Peacock Meenakari Kada',
      tag: 'Royal Meenakari • Jaipur Heritage',
      price: '₹4,499',
      oldPrice: '₹6,999',
      desc: 'Hand-enamelled in vibrant Peacock blues and ruby hues with 22K micro gold plating. Features a convenient screw lock mechanism designed to fit sizes 2.4, 2.6, and 2.8 effortlessly.',
      img: 'images/bangles.jpg'
    },
    'padmavati-choker': {
      title: 'Padmavati Heritage Uncut Polki Choker Set',
      tag: 'Bridal Heritage • Uncut Polki & Emerald',
      price: '₹12,850',
      oldPrice: '₹18,500',
      desc: 'Inspired by imperial Rajasthani court jewelry, strung with natural Russian emerald bead drops, hand-set polki stones, and matching cluster earrings with maangtika.',
      img: 'images/chokers.jpg'
    },
    'noor-chandbalis': {
      title: 'Noor Jahan Reversible Meenakari Chandbalis',
      tag: 'Freshwater Pearls & Ruby Inlay',
      price: '₹3,890',
      oldPrice: '₹5,400',
      desc: 'Reversible double-sided hand-painted earrings with delicate freshwater seed pearls and ruby teardrop hangings. Weight-balanced for 12+ hour festive comfort.',
      img: 'images/jhumkas.jpg'
    },
    'rajputana-kada': {
      title: 'Rajputana Carved Gajraj Motif Kada Pair',
      tag: 'Elephant Finial • 22K Gold Foil',
      price: '₹5,999',
      oldPrice: '₹8,500',
      desc: 'Artisanal elephant trunk clasp adorned with micro ruby eyes and floral scrollwork. Solid brass alloy core guaranteed not to bend or lose shape.',
      img: 'images/kadas.jpg'
    },
    'celeste-chain': {
      title: 'Celeste Waterproof Herringbone Layering Set',
      tag: 'Anti-Tarnish • 18K PVD Solid Gold Tone',
      price: '₹1,999',
      oldPrice: '₹2,899',
      desc: 'Hypoallergenic, shower-proof, perfume-proof, and workout-safe. Features double-stacked snake and paperclip chains with high-sheen liquid mirror finish.',
      img: 'images/modern.jpg'
    },
    'lotus-jhumka': {
      title: 'Banaras Gulabi Lotus Layered Jhumka',
      tag: 'Banarasi Pink Enamel & Pearls',
      price: '₹3,250',
      oldPrice: '₹4,800',
      desc: 'Triple-tier jhumka with iconic Gulabi Meenakari pink lotus motifs, finished with tinkling gold bells and natural pearl tassels.',
      img: 'images/jhumkas.jpg'
    }
  };

  window.openModal = function(productId) {
    const data = productData[productId];
    if (!data) return;

    document.getElementById('modalTitle').textContent = data.title;
    document.getElementById('modalTag').textContent = data.tag;
    document.getElementById('modalPrice').textContent = data.price;
    document.getElementById('modalOldPrice').textContent = data.oldPrice;
    document.getElementById('modalDesc').textContent = data.desc;
    document.getElementById('modalImg').src = data.img;

    modal.classList.add('active');
  };

  if (modalClose) {
    modalClose.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }

  // Close modal when clicking outside dialog
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });

  // Size Button Selector in Modal
  const sizeBtns = document.querySelectorAll('.size-btn');
  sizeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      sizeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // Color Selector in Modal
  const colorCircles = document.querySelectorAll('.color-circle');
  colorCircles.forEach(circle => {
    circle.addEventListener('click', () => {
      colorCircles.forEach(c => c.classList.remove('active'));
      circle.classList.add('active');
    });
  });

  // Cart Drawer Controls
  const cartDrawer = document.getElementById('cartDrawer');
  const cartOpenBtn = document.getElementById('cartOpenBtn');
  const cartCloseBtn = document.getElementById('cartCloseBtn');
  const continueShopping = document.getElementById('continueShopping');
  const cartCountBadges = [
    document.getElementById('cartCount'),
    document.getElementById('cartDrawerCount'),
    document.querySelector('.cart-count-badge')
  ];

  let cartItems = [
    { title: 'Meera Peacock Meenakari Kada', price: 4499, img: 'https://images.unsplash.com/photo-1611591475878-831d102e3b2b?auto=format&fit=crop&w=200&q=80', variant: 'Size: 2.6 • Royal Blue' },
    { title: 'Padmavati Heritage Choker Set', price: 12850, img: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=200&q=80', variant: 'Emerald & Uncut Polki' }
  ];

  function toggleCart(open = true) {
    if (open) {
      cartDrawer.classList.add('active');
    } else {
      cartDrawer.classList.remove('active');
    }
  }

  if (cartOpenBtn) cartOpenBtn.addEventListener('click', (e) => { e.preventDefault(); toggleCart(true); });
  if (cartCloseBtn) cartCloseBtn.addEventListener('click', () => toggleCart(false));
  if (continueShopping) continueShopping.addEventListener('click', () => toggleCart(false));

  // Render & Update Cart
  function renderCart() {
    const container = document.getElementById('cartItemsContainer');
    const subtotalEl = document.getElementById('cartSubtotal');
    if (!container) return;

    container.innerHTML = '';
    let total = 0;

    cartItems.forEach((item, index) => {
      total += item.price;
      const itemEl = document.createElement('div');
      itemEl.className = 'cart-item';
      itemEl.innerHTML = `
        <img src="${item.img}" alt="${item.title}">
        <div class="cart-item-details">
          <h4>${item.title}</h4>
          <span class="variant">${item.variant}</span>
          <div class="qty-and-price">
            <div class="qty-stepper">
              <button onclick="decrementCartItem(${index})">-</button>
              <span>1</span>
              <button onclick="incrementCartItem(${index})">+</button>
            </div>
            <span class="price">₹${item.price.toLocaleString('en-IN')}</span>
          </div>
        </div>
        <button class="cart-remove-item" onclick="removeCartItem(${index})">
          <i data-lucide="trash-2"></i>
        </button>
      `;
      container.appendChild(itemEl);
    });

    if (subtotalEl) {
      subtotalEl.textContent = `₹${total.toLocaleString('en-IN')}`;
    }

    cartCountBadges.forEach(badge => {
      if (badge) badge.textContent = cartItems.length;
    });

    if (window.lucide) lucide.createIcons();
  }

  window.addToCart = function(title, price, img) {
    cartItems.push({
      title: title,
      price: price,
      img: img,
      variant: 'Standard Size • Handcrafted Finish'
    });
    renderCart();
    toggleCart(true);
  };

  window.removeCartItem = function(index) {
    cartItems.splice(index, 1);
    renderCart();
  };

  window.incrementCartItem = function(index) {
    alert('Quantity increased!');
  };

  window.decrementCartItem = function(index) {
    removeCartItem(index);
  };

  const modalAddToCart = document.getElementById('modalAddToCart');
  if (modalAddToCart) {
    modalAddToCart.addEventListener('click', () => {
      const title = document.getElementById('modalTitle').textContent;
      const priceText = document.getElementById('modalPrice').textContent.replace('₹', '').replace(',', '');
      const img = document.getElementById('modalImg').src;
      addToCart(title, parseInt(priceText, 10), img);
      modal.classList.remove('active');
    });
  }

  // Global Tab Filter for Auro & Jewellary Collection
  window.filterTabCollection = function(tabName) {
    const tabButtons = document.querySelectorAll('.tab-filter-btn');
    const tabCards = document.querySelectorAll('.tab-product-card');

    tabButtons.forEach(btn => {
      if (btn.getAttribute('data-tab') === tabName) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    let ringsCount = 0, earringsCount = 0, necklaceCount = 0, braceletCount = 0;

    tabCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category');
      
      if (tabName === 'all') {
        // Show exactly 1 best card from each of the 4 categories (4 total in row)
        let show = false;
        if (cardCategory === 'rings' && ringsCount < 1) { show = true; ringsCount++; }
        else if (cardCategory === 'earrings' && earringsCount < 1) { show = true; earringsCount++; }
        else if (cardCategory === 'necklace' && necklaceCount < 1) { show = true; necklaceCount++; }
        else if (cardCategory === 'bracelet' && braceletCount < 1) { show = true; braceletCount++; }

        if (show) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          setTimeout(() => { card.style.opacity = '1'; }, 30);
        } else {
          card.style.display = 'none';
        }
      } else {
        // Show all 4 cards of the selected category (Rings, Earrings, Necklace, Bracelet)
        if (cardCategory === tabName) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          setTimeout(() => { card.style.opacity = '1'; }, 30);
        } else {
          card.style.display = 'none';
        }
      }
    });
  };

  // Initial tab filter run
  if (document.querySelector('.tab-filter-btn')) {
    filterTabCollection('all');
  }

  // ================= WISHLIST FUNCTIONALITY ================= //
  let wishlistItems = [
    {
      id: 'demo-1',
      title: 'Noor Jahan Reversible Meenakari Chandbalis',
      price: 3890,
      img: 'images/jhumkas.jpg'
    }
  ];

  const wishlistDrawer = document.getElementById('wishlistDrawer');
  const wishlistOpenBtn = document.getElementById('wishlistOpenBtn');
  const wishlistCloseBtn = document.getElementById('wishlistCloseBtn');
  const continueWishlistShopping = document.getElementById('continueWishlistShopping');
  const wishlistCountBadge = document.getElementById('wishlistCount');
  const wishlistDrawerCount = document.getElementById('wishlistDrawerCount');
  const wishlistContainer = document.getElementById('wishlistItemsContainer');

  function toggleWishlist(open) {
    if (wishlistDrawer) {
      if (open) {
        wishlistDrawer.classList.add('active');
        document.body.style.overflow = 'hidden';
      } else {
        wishlistDrawer.classList.remove('active');
        document.body.style.overflow = '';
      }
    }
  }

  if (wishlistOpenBtn) {
    wishlistOpenBtn.addEventListener('click', (e) => {
      e.preventDefault();
      toggleWishlist(true);
    });
  }

  if (wishlistCloseBtn) {
    wishlistCloseBtn.addEventListener('click', () => toggleWishlist(false));
  }

  if (continueWishlistShopping) {
    continueWishlistShopping.addEventListener('click', () => toggleWishlist(false));
  }

  if (wishlistDrawer) {
    wishlistDrawer.addEventListener('click', (e) => {
      if (e.target === wishlistDrawer) toggleWishlist(false);
    });
  }

  window.renderWishlist = function() {
    if (!wishlistContainer) return;

    if (wishlistCountBadge) wishlistCountBadge.textContent = wishlistItems.length;
    if (wishlistDrawerCount) wishlistDrawerCount.textContent = wishlistItems.length;

    if (wishlistItems.length === 0) {
      wishlistContainer.innerHTML = `
        <div class="wishlist-empty-state">
          <i data-lucide="heart"></i>
          <p>Your wishlist is currently empty.</p>
          <a href="#all-products" class="btn btn-outline-dark" onclick="toggleWishlist(false)">Explore Jewels</a>
        </div>
      `;
      if (window.lucide) lucide.createIcons();
      return;
    }

    wishlistContainer.innerHTML = wishlistItems.map((item, index) => `
      <div class="wishlist-item">
        <img src="${item.img}" alt="${item.title}">
        <div class="wishlist-item-details">
          <h4>${item.title}</h4>
          <span class="price">₹${item.price.toLocaleString('en-IN')}</span>
          <button class="wishlist-move-to-cart-btn" onclick="moveWishlistItemToCart(${index})">
            <i data-lucide="shopping-bag" style="width: 14px; height: 14px;"></i> Move to Bag
          </button>
        </div>
        <button class="wishlist-remove-btn" onclick="removeWishlistItem(${index})" aria-label="Remove item">
          <i data-lucide="trash-2" style="width: 18px; height: 18px;"></i>
        </button>
      </div>
    `).join('');

    if (window.lucide) {
      lucide.createIcons();
    }
  };

  window.toggleWishlistItem = function(title, price, img, btnElement) {
    const existingIndex = wishlistItems.findIndex(item => item.title === title);
    if (existingIndex > -1) {
      wishlistItems.splice(existingIndex, 1);
      if (btnElement) btnElement.classList.remove('active');
    } else {
      wishlistItems.push({
        id: 'w-' + Date.now(),
        title: title,
        price: price,
        img: img
      });
      if (btnElement) btnElement.classList.add('active');
    }
    renderWishlist();
  };

  window.removeWishlistItem = function(index) {
    wishlistItems.splice(index, 1);
    renderWishlist();
    syncWishlistHeartButtons();
  };

  window.moveWishlistItemToCart = function(index) {
    const item = wishlistItems[index];
    if (item) {
      addToCart(item.title, item.price, item.img);
      wishlistItems.splice(index, 1);
      renderWishlist();
      syncWishlistHeartButtons();
    }
  };

  window.addAllWishlistItemsToBag = function() {
    if (wishlistItems.length === 0) {
      alert('Your wishlist is empty!');
      return;
    }
    wishlistItems.forEach(item => {
      addToCart(item.title, item.price, item.img);
    });
    wishlistItems = [];
    renderWishlist();
    syncWishlistHeartButtons();
    toggleWishlist(false);
    toggleCart(true);
  };

  function syncWishlistHeartButtons() {
    document.querySelectorAll('.wishlist-icon-btn').forEach(btn => {
      const card = btn.closest('.product-card');
      if (card) {
        const titleEl = card.querySelector('.product-title');
        if (titleEl) {
          const title = titleEl.textContent.trim();
          const isSaved = wishlistItems.some(item => item.title.includes(title) || title.includes(item.title));
          if (isSaved) {
            btn.classList.add('active');
          } else {
            btn.classList.remove('active');
          }
        }
      }
    });
  }

  // Bind all heart buttons on product cards
  document.querySelectorAll('.wishlist-icon-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const card = btn.closest('.product-card');
      if (card) {
        const title = card.querySelector('.product-title') ? card.querySelector('.product-title').textContent.trim() : 'Handcrafted Jewelry';
        const priceText = card.querySelector('.current-price') ? card.querySelector('.current-price').textContent.replace(/[^0-9]/g, '') : '2999';
        const img = card.querySelector('.primary-img') ? card.querySelector('.primary-img').getAttribute('src') : 'images/bangles.jpg';
        toggleWishlistItem(title, parseInt(priceText, 10), img, btn);
      }
    });
  });

  renderWishlist();
  syncWishlistHeartButtons();

  renderCart();
});
