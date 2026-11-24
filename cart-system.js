/**
 * E-Commerce Dynamic Cart & Checkout System with Supabase
 * Handles: Cart State, Dynamic Metal Pricing, Order Placement, UPI/COD/Razorpay
 */

const CartSystem = {
    STORAGE_KEY: 'auro_jewels_cart',
    
    getItems() {
        try {
            return JSON.parse(localStorage.getItem(this.STORAGE_KEY)) || [];
        } catch (e) {
            return [];
        }
    },

    saveItems(items) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
        this.updateUI();
    },

    addItem(product) {
        let items = this.getItems();
        const existingIndex = items.findIndex(item => item.id === product.id && item.size === product.size && item.metalType === product.metalType);
        
        if (existingIndex > -1) {
            items[existingIndex].quantity += (product.quantity || 1);
        } else {
            items.push({
                id: product.id || 'prod_' + Date.now(),
                title: product.title,
                price: product.price,
                image: product.image,
                metalType: product.metalType || 'gold_22k',
                weightGrams: product.weightGrams || 0,
                metalRate: product.metalRate || 0,
                makingCharge: product.makingCharge || 0,
                size: product.size || 'Standard',
                quantity: product.quantity || 1
            });
        }
        
        this.saveItems(items);
        this.openDrawer();
    },

    removeItem(index) {
        let items = this.getItems();
        items.splice(index, 1);
        this.saveItems(items);
    },

    updateQuantity(index, delta) {
        let items = this.getItems();
        if (!items[index]) return;
        items[index].quantity += delta;
        if (items[index].quantity <= 0) {
            items.splice(index, 1);
        }
        this.saveItems(items);
    },

    getTotal() {
        const items = this.getItems();
        return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    },

    getItemCount() {
        const items = this.getItems();
        return items.reduce((sum, item) => sum + item.quantity, 0);
    },

    updateUI() {
        const items = this.getItems();
        const count = this.getItemCount();
        const total = this.getTotal();

        // Update header badges
        document.querySelectorAll('#cartCount, .cart-count-badge').forEach(el => {
            el.textContent = count;
        });

        // Update drawer count and subtotal
        const drawerCount = document.getElementById('cartDrawerCount');
        if (drawerCount) drawerCount.textContent = count;
        
        const subtotalEl = document.getElementById('cartSubtotal');
        if (subtotalEl) subtotalEl.textContent = '₹' + total.toLocaleString('en-IN');

        // Render Cart Items
        const container = document.getElementById('cartItemsContainer');
        if (!container) return;

        if (items.length === 0) {
            container.innerHTML = `
                <div style="text-align: center; padding: 3rem 1rem; color: #888;">
                    <div style="font-size: 2.5rem; margin-bottom: 0.8rem;">🛍️</div>
                    <p style="font-weight: 500; font-size: 1rem; margin-bottom: 0.5rem; color: #333;">Your Royal Bag is empty</p>
                    <p style="font-size: 0.85rem;">Discover our latest handcrafted bridal & daily fine jewellery collections.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = items.map((item, idx) => `
            <div class="cart-item-card" style="display: flex; gap: 1rem; padding: 1rem; border-bottom: 1px solid #f0eae1; align-items: center;">
                <img src="${item.image}" alt="${item.title}" style="width: 70px; height: 70px; object-fit: cover; border-radius: 4px; border: 1px solid #eee;">
                <div style="flex: 1;">
                    <h4 style="font-size: 0.95rem; font-family: 'Cormorant Garamond', serif; font-weight: 700; margin-bottom: 0.2rem; color: #111;">${item.title}</h4>
                    <p style="font-size: 0.75rem; color: #888; margin-bottom: 0.4rem;">
                        ${item.metalType ? item.metalType.replace('_', ' ').toUpperCase() : ''} ${item.weightGrams ? '| ' + item.weightGrams + 'g' : ''} ${item.size ? '| Size: ' + item.size : ''}
                    </p>
                    <div style="font-weight: 700; font-size: 0.95rem; color: #9A2143;">₹${item.price.toLocaleString('en-IN')}</div>
                </div>
                <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 0.5rem;">
                    <div style="display: flex; align-items: center; border: 1px solid #ddd; border-radius: 3px;">
                        <button onclick="CartSystem.updateQuantity(${idx}, -1)" style="padding: 2px 8px; background: none; border: none; cursor: pointer; font-size: 1rem;">-</button>
                        <span style="font-size: 0.85rem; font-weight: 600; padding: 0 6px;">${item.quantity}</span>
                        <button onclick="CartSystem.updateQuantity(${idx}, 1)" style="padding: 2px 8px; background: none; border: none; cursor: pointer; font-size: 1rem;">+</button>
                    </div>
                    <button onclick="CartSystem.removeItem(${idx})" style="background: none; border: none; color: #dc2626; font-size: 0.75rem; cursor: pointer; text-decoration: underline;">Remove</button>
                </div>
            </div>
        `).join('');
    },

    openDrawer() {
        const drawer = document.getElementById('cartDrawer');
        if (drawer) {
            drawer.classList.add('active');
            drawer.style.display = 'block';
            this.updateUI();
        }
    },

    closeDrawer() {
        const drawer = document.getElementById('cartDrawer');
        if (drawer) {
            drawer.classList.remove('active');
            drawer.style.display = 'none';
        }
    }
};

window.CartSystem = CartSystem;

// Initialize on DOM load
window.addEventListener('DOMContentLoaded', () => {
    CartSystem.updateUI();

    // Hook cart trigger buttons
    document.querySelectorAll('#cartOpenBtn, .cart-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            CartSystem.openDrawer();
        });
    });

    const closeBtn = document.getElementById('cartCloseBtn');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => CartSystem.closeDrawer());
    }

    // Modal background close
    const drawerBackdrop = document.getElementById('cartDrawer');
    if (drawerBackdrop) {
        drawerBackdrop.addEventListener('click', (e) => {
            if (e.target === drawerBackdrop) {
                CartSystem.closeDrawer();
            }
        });
    }
});
