/**
 * Auth System for Jewellery Store & Admin Panel
 * Connects with Supabase database & provides offline fallback
 */

const AuthService = {
    STORAGE_USER: 'auro_logged_in_user',
    STORAGE_ALL_USERS: 'auro_registered_users',
    STORAGE_LOGIN_LOGS: 'auro_login_logs',

    getCurrentUser() {
        try {
            return JSON.parse(localStorage.getItem(this.STORAGE_USER)) || null;
        } catch (e) {
            return null;
        }
    },

    setCurrentUser(user) {
        if (user) {
            localStorage.setItem(this.STORAGE_USER, JSON.stringify(user));
        } else {
            localStorage.removeItem(this.STORAGE_USER);
        }
        this.updateHeaderUI();
    },

    async logActivity(email, name, role, status = 'success') {
        const logData = {
            user_email: email,
            user_name: name || email.split('@')[0],
            role: role || 'customer',
            login_status: status,
            device_info: navigator.userAgent.includes('Mobile') ? 'Mobile Device' : 'Desktop Browser',
            ip_address: 'Client Direct',
            logged_in_at: new Date().toISOString()
        };

        // 1. Save to Supabase Cloud
        try {
            if (typeof supabase !== 'undefined') {
                const client = supabase.createClient('https://efyqftxjtylvaoqhqptb.supabase.co', 'sb_publishable_WtIo91bnJaIRG7W0ITRR8w_-50i2_kY');
                await client.from('login_logs').insert([logData]);
            }
        } catch (err) {
            console.warn('Supabase login log note:', err);
        }

        // 2. Save to Local Cache (Guarantees Admin panel always sees logs even offline)
        try {
            let logs = JSON.parse(localStorage.getItem(this.STORAGE_LOGIN_LOGS) || '[]');
            logs.unshift(logData);
            localStorage.setItem(this.STORAGE_LOGIN_LOGS, JSON.stringify(logs));
        } catch (e) {}
    },

    async signUp(fullName, email, phone, password) {
        const cleanEmail = email.trim().toLowerCase();
        const userData = {
            full_name: fullName.trim(),
            email: cleanEmail,
            phone: phone.trim(),
            password_hash: password,
            role: 'customer',
            last_login: new Date().toISOString(),
            created_at: new Date().toISOString()
        };

        // Save in Supabase
        try {
            if (typeof supabase !== 'undefined') {
                const client = supabase.createClient('https://efyqftxjtylvaoqhqptb.supabase.co', 'sb_publishable_WtIo91bnJaIRG7W0ITRR8w_-50i2_kY');
                await client.from('customer_profiles').insert([userData]);
            }
        } catch (e) {}

        // Save in local users
        let users = JSON.parse(localStorage.getItem(this.STORAGE_ALL_USERS) || '[]');
        users.push(userData);
        localStorage.setItem(this.STORAGE_ALL_USERS, JSON.stringify(users));

        this.setCurrentUser(userData);
        await this.logActivity(userData.email, userData.full_name, 'customer', 'success');
        return { success: true, user: userData };
    },

    async signIn(email, password) {
        const cleanEmail = email.trim().toLowerCase();

        // Check Hardcoded / Default Admin Credential
        if (cleanEmail === 'admin@aurojewels.com' && password === 'admin123') {
            const adminUser = {
                full_name: 'Store Administrator',
                email: 'admin@aurojewels.com',
                phone: '+91 98200 12345',
                role: 'admin'
            };
            this.setCurrentUser(adminUser);
            await this.logActivity(adminUser.email, adminUser.full_name, 'admin', 'success');
            return { success: true, user: adminUser };
        }

        // 1. Try Supabase Verification
        try {
            if (typeof supabase !== 'undefined') {
                const client = supabase.createClient('https://efyqftxjtylvaoqhqptb.supabase.co', 'sb_publishable_WtIo91bnJaIRG7W0ITRR8w_-50i2_kY');
                const { data, error } = await client
                    .from('customer_profiles')
                    .select('*')
                    .eq('email', cleanEmail)
                    .maybeSingle();

                if (!error && data) {
                    if (data.password_hash === password) {
                        this.setCurrentUser(data);
                        await this.logActivity(data.email, data.full_name, data.role || 'customer', 'success');
                        return { success: true, user: data };
                    } else {
                        await this.logActivity(cleanEmail, data.full_name, 'customer', 'failed (Wrong Password)');
                        return { success: false, message: 'Invalid password' };
                    }
                }
            }
        } catch (e) {}

        // 2. Check local users fallback
        let users = JSON.parse(localStorage.getItem(this.STORAGE_ALL_USERS) || '[]');
        const found = users.find(u => u.email === cleanEmail);
        if (found) {
            if (found.password_hash === password) {
                this.setCurrentUser(found);
                await this.logActivity(found.email, found.full_name, found.role || 'customer', 'success');
                return { success: true, user: found };
            } else {
                await this.logActivity(cleanEmail, found.full_name, 'customer', 'failed');
                return { success: false, message: 'Invalid password' };
            }
        }

        // Auto-register first time customer on simple login
        const newCustomer = {
            full_name: cleanEmail.split('@')[0],
            email: cleanEmail,
            role: 'customer'
        };
        this.setCurrentUser(newCustomer);
        await this.logActivity(newCustomer.email, newCustomer.full_name, 'customer', 'success');
        return { success: true, user: newCustomer };
    },

    signOut() {
        this.setCurrentUser(null);
        window.location.reload();
    },

    updateHeaderUI() {
        const user = this.getCurrentUser();
        const userBtn = document.querySelector('a.header-icon-btn[href="contact.html"], a.header-icon-btn[href="login.html"]');
        if (userBtn) {
            if (user) {
                userBtn.href = "login.html";
                userBtn.title = "Logged in as " + (user.full_name || user.email);
                const firstName = user.full_name ? user.full_name.split(' ')[0] : (user.email.split('@')[0]);
                const initial = firstName.charAt(0).toUpperCase();

                // Ultra Luxury Royal Gold & Maroon Pill UI
                userBtn.innerHTML = `
                  <div class="luxury-user-badge" style="
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 4px 14px 4px 5px;
                    background: linear-gradient(135deg, #ffffff 0%, #fff7f9 100%);
                    border: 1px solid rgba(154, 33, 67, 0.25);
                    border-radius: 30px;
                    box-shadow: 0 4px 15px rgba(154, 33, 67, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.9);
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    cursor: pointer;
                  " onmouseover="this.style.transform='translateY(-1px)'; this.style.boxShadow='0 6px 18px rgba(154,33,67,0.18)'; this.style.borderColor='#9A2143';" 
                     onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 15px rgba(154,33,67,0.08)'; this.style.borderColor='rgba(154, 33, 67, 0.25)';">
                    
                    <!-- Gradient Luxury Monogram Avatar with Royal Gold Border -->
                    <span style="
                      width: 26px;
                      height: 26px;
                      border-radius: 50%;
                      background: linear-gradient(135deg, #9A2143 0%, #681129 100%);
                      color: #fff;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      font-size: 11px;
                      font-weight: 700;
                      font-family: 'Montserrat', sans-serif;
                      box-shadow: 0 2px 6px rgba(154, 33, 67, 0.35);
                      border: 1.5px solid #d4af37;
                    ">${initial}</span>
                    
                    <!-- Customer Name & Online Status Dot -->
                    <span style="
                      font-size: 12px;
                      font-weight: 600;
                      color: #1a1a1a;
                      letter-spacing: 0.3px;
                      font-family: 'Montserrat', sans-serif;
                      text-transform: capitalize;
                    ">${firstName}</span>
                    
                    <span style="
                      width: 6px;
                      height: 6px;
                      border-radius: 50%;
                      background: #10b981;
                      box-shadow: 0 0 6px #10b981;
                    "></span>
                  </div>
                `;
            } else {
                userBtn.href = "login.html";
                userBtn.title = "Sign In / Register";
            }
        }
    }
};

window.AuthService = AuthService;
window.addEventListener('DOMContentLoaded', () => {
    AuthService.updateHeaderUI();
});
