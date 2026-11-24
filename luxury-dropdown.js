/**
 * Ultra Luxury Customer Dropdown Menu
 * Injected when clicking or hovering on user badge
 */

function setupLuxuryUserDropdown() {
    const user = AuthService.getCurrentUser();
    if (!user) return;

    const userBadge = document.querySelector('.luxury-user-badge');
    if (!userBadge) return;

    // Check if dropdown already exists
    if (document.getElementById('luxuryUserDropdown')) return;

    const parent = userBadge.closest('.header-icon-btn') || userBadge.parentElement;
    parent.style.position = 'relative';

    const firstName = user.full_name ? user.full_name.split(' ')[0] : (user.email.split('@')[0]);

    const dropdown = document.createElement('div');
    dropdown.id = 'luxuryUserDropdown';
    dropdown.style.cssText = `
        position: absolute;
        top: calc(100% + 12px);
        right: 0;
        width: 250px;
        background: #ffffff;
        border: 1px solid #ebd9c8;
        border-radius: 12px;
        box-shadow: 0 15px 35px rgba(0,0,0,0.12);
        padding: 1rem;
        z-index: 99999;
        display: none;
        opacity: 0;
        transform: translateY(-8px);
        transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        text-align: left;
    `;

    dropdown.innerHTML = `
        <div style="border-bottom: 1px solid #f3eae0; padding-bottom: 0.8rem; margin-bottom: 0.8rem;">
            <div style="font-size: 0.75rem; color: #888; text-transform: uppercase; letter-spacing: 0.5px;">Royal Club Member</div>
            <div style="font-size: 1rem; font-weight: 700; color: #1a1a1a; font-family: 'Cormorant Garamond', serif;">${user.full_name || 'Valued Client'}</div>
            <div style="font-size: 0.75rem; color: #666; word-break: break-all;">${user.email}</div>
        </div>
        <div style="display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.85rem;">
            <a href="track-order.html" style="display: flex; align-items: center; gap: 8px; color: #333; text-decoration: none; padding: 6px 8px; border-radius: 6px; transition: 0.2s;" onmouseover="this.style.background='#fff4f6'; this.style.color='#9A2143';" onmouseout="this.style.background='none'; this.style.color='#333';">
                📦 Track My Orders
            </a>
            ${user.role === 'admin' ? `
            <a href="admin.html" style="display: flex; align-items: center; gap: 8px; color: #d4af37; font-weight: 600; text-decoration: none; padding: 6px 8px; border-radius: 6px; background: #111;" onmouseover="this.style.opacity='0.9';" onmouseout="this.style.opacity='1';">
                👑 Admin Dashboard
            </a>` : ''}
            <a href="login.html" style="display: flex; align-items: center; gap: 8px; color: #333; text-decoration: none; padding: 6px 8px; border-radius: 6px; transition: 0.2s;" onmouseover="this.style.background='#fff4f6'; this.style.color='#9A2143';" onmouseout="this.style.background='none'; this.style.color='#333';">
                👤 Account Settings
            </a>
            <button onclick="AuthService.signOut()" style="display: flex; align-items: center; gap: 8px; color: #dc2626; background: none; border: none; cursor: pointer; padding: 6px 8px; border-radius: 6px; font-size: 0.85rem; width: 100%; text-align: left; margin-top: 4px; border-top: 1px solid #f3eae0; padding-top: 8px;" onmouseover="this.style.background='#fef2f2';" onmouseout="this.style.background='none';">
                🚪 Sign Out
            </button>
        </div>
    `;

    parent.appendChild(dropdown);

    // Toggle on Click
    parent.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const isOpen = dropdown.style.display === 'block';
        if (isOpen) {
            dropdown.style.opacity = '0';
            dropdown.style.transform = 'translateY(-8px)';
            setTimeout(() => { dropdown.style.display = 'none'; }, 200);
        } else {
            dropdown.style.display = 'block';
            setTimeout(() => {
                dropdown.style.opacity = '1';
                dropdown.style.transform = 'translateY(0)';
            }, 10);
        }
    });

    // Close on clicking outside
    document.addEventListener('click', (e) => {
        if (!parent.contains(e.target)) {
            dropdown.style.opacity = '0';
            dropdown.style.transform = 'translateY(-8px)';
            setTimeout(() => { dropdown.style.display = 'none'; }, 200);
        }
    });
}

// Hook setup
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(setupLuxuryUserDropdown, 100);
});
