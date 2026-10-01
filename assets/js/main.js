/**
 * 101 CAFÉ & FARM - MAIN INTERACTIVE LOGIC
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initDynamicHours();
  initMenuTabs();
  initCartSystem();
  initReservationModal();
  initContactForm();
  initNewsletter();
  initMobileNav();
  initSmoothScroll();
});

/* --------------------------------------------------------------------------
   STICKY HEADER SCROLL EFFECT
   -------------------------------------------------------------------------- */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* --------------------------------------------------------------------------
   REAL-TIME OPERATING HOURS STATUS
   -------------------------------------------------------------------------- */
function initDynamicHours() {
  const statusElement = document.getElementById('live-status-text');
  if (!statusElement) return;

  const now = new Date();
  const day = now.getDay(); // 0 is Sunday, 1 is Monday...
  const hour = now.getHours();

  // Wed-Fri: 11:00 - 21:00
  // Sat: 09:00 - 21:00
  // Sun: 09:00 - 15:00
  // Mon-Tue: Closed (Farm maintenance)
  let isOpen = false;
  let statusMsg = '';

  if (day === 1 || day === 2) {
    statusMsg = 'Closed Today • Farm Harvest & Prep Day';
  } else if (day >= 3 && day <= 5) {
    if (hour >= 11 && hour < 21) {
      isOpen = true;
      statusMsg = 'Open Now • Lunch & Dinner Service until 9:00 PM';
    } else {
      statusMsg = 'Closed Now • Reopens at 11:00 AM Wed–Fri';
    }
  } else if (day === 6) {
    if (hour >= 9 && hour < 21) {
      isOpen = true;
      statusMsg = 'Open Now • Weekend Farm Service until 9:00 PM';
    } else {
      statusMsg = 'Closed Now • Reopens Saturday at 9:00 AM';
    }
  } else if (day === 0) {
    if (hour >= 9 && hour < 15) {
      isOpen = true;
      statusMsg = 'Open Now • Farm Brunch until 3:00 PM';
    } else {
      statusMsg = 'Closed Now • Reopens Wednesday at 11:00 AM';
    }
  }

  // Support Admin Override
  const override = localStorage.getItem('101_status_override');
  if (override === 'open') {
    isOpen = true;
    statusMsg = 'Open Now • Live Farm Dining Service';
  } else if (override === 'closed') {
    isOpen = false;
    statusMsg = 'Closed Today • Private Farm Gathering / Harvest Day';
  }

  const dot = document.querySelector('.status-indicator-dot');
  if (dot) {
    dot.style.backgroundColor = isOpen ? '#38b000' : '#e63946';
    dot.style.boxShadow = isOpen ? '0 0 10px #38b000' : '0 0 10px #e63946';
  }
  statusElement.textContent = statusMsg;

  // Support Admin Custom Harvest Ticker
  const customHarvest = localStorage.getItem('101_harvest_ticker');
  if (customHarvest) {
    const harvestSpan = document.querySelector('.ticker-harvest span:last-child');
    if (harvestSpan) harvestSpan.textContent = customHarvest;
  }
}

/* --------------------------------------------------------------------------
   INTERACTIVE MENU TABS
   -------------------------------------------------------------------------- */
function initMenuTabs() {
  const tabButtons = document.querySelectorAll('.menu-tab-btn');
  const menuCards = document.querySelectorAll('.menu-card');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      menuCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'flex';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
          card.style.opacity = '0';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   CART & ONLINE ORDERING SYSTEM
   -------------------------------------------------------------------------- */
let cart = [
  { id: 'pantry-1', name: '101 Wild Mountain Raw Honey', price: 18, qty: 1 }
];

function initCartSystem() {
  const cartTrigger = document.getElementById('cart-trigger');
  const cartOverlay = document.getElementById('cart-overlay');
  const closeCartBtn = document.getElementById('btn-close-cart');
  const onlineOrderBtn = document.getElementById('hero-online-order-btn');
  const checkoutBtn = document.getElementById('btn-checkout');

  function openCart() {
    cartOverlay.classList.add('active');
    renderCart();
  }

  function closeCart() {
    cartOverlay.classList.remove('active');
  }

  if (cartTrigger) cartTrigger.addEventListener('click', openCart);
  if (onlineOrderBtn) {
    onlineOrderBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openCart();
    });
  }
  if (closeCartBtn) closeCartBtn.addEventListener('click', closeCart);

  if (cartOverlay) {
    cartOverlay.addEventListener('click', (e) => {
      if (e.target === cartOverlay) closeCart();
    });
  }

  // Hook up 'Add to Order' buttons across menus & pantry
  document.querySelectorAll('.btn-add-order, .btn-buy').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const name = btn.getAttribute('data-name');
      const price = parseFloat(btn.getAttribute('data-price'));

      addToCart(id, name, price);
    });
  });

  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (cart.length === 0) {
        showToast('Your cart is empty. Add farm provisions or menu dishes to order!');
        return;
      }
      const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
      
      // Save order to localStorage for Admin Dashboard
      try {
        const currentOrders = JSON.parse(localStorage.getItem('101_orders')) || [];
        currentOrders.unshift({
          id: `#101-${Math.floor(100 + Math.random() * 900)}`,
          items: cart.map(i => `${i.qty}x ${i.name}`).join(', '),
          total: `$${total.toFixed(2)}`,
          type: 'Curbside Pickup',
          status: 'Preparing'
        });
        localStorage.setItem('101_orders', JSON.stringify(currentOrders));
      } catch (err) {
        console.error('Order save error:', err);
      }

      showToast(`Thank you! Order confirmed ($${total.toFixed(2)}). Freshly prepared for pickup.`);
      cart = [];
      renderCart();
      closeCart();
    });
  }

  renderCart();
}

function addToCart(id, name, price) {
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id, name, price, qty: 1 });
  }
  renderCart();
  showToast(`Added "${name}" to your farm order!`);
}

function renderCart() {
  const itemsContainer = document.getElementById('cart-items-container');
  const badge = document.getElementById('cart-badge-count');
  const subtotalElem = document.getElementById('cart-subtotal-val');

  const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  if (badge) badge.textContent = totalCount;
  if (subtotalElem) subtotalElem.textContent = `$${subtotal.toFixed(2)}`;

  if (!itemsContainer) return;

  if (cart.length === 0) {
    itemsContainer.innerHTML = `
      <div style="text-align: center; padding: 3rem 1rem; color: #888;">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin: 0 auto 1rem; display:block; opacity: 0.5;">
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
        <p style="font-family: var(--font-serif-heading); font-size: 1.1rem; color: var(--color-text-main); margin-bottom: 0.4rem;">Your basket is empty</p>
        <p style="font-size: 0.85rem;">Discover seasonal harvests & gourmet pantry goods.</p>
      </div>
    `;
    return;
  }

  itemsContainer.innerHTML = cart.map(item => `
    <div class="cart-item" data-id="${item.id}">
      <div class="cart-item-info">
        <h5>${item.name}</h5>
        <span class="cart-item-price">$${(item.price * item.qty).toFixed(2)} ($${item.price.toFixed(2)} each)</span>
      </div>
      <div class="cart-item-controls">
        <button class="cart-qty-btn" onclick="updateQty('${item.id}', -1)">-</button>
        <span style="font-weight: 600; min-width: 18px; text-align: center;">${item.qty}</span>
        <button class="cart-qty-btn" onclick="updateQty('${item.id}', 1)">+</button>
      </div>
    </div>
  `).join('');
}

window.updateQty = function(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter(i => i.id !== id);
  }
  renderCart();
};

/* --------------------------------------------------------------------------
   RESERVATIONS MODAL (NATIVE HTML5 DIALOG)
   -------------------------------------------------------------------------- */
function initReservationModal() {
  const modal = document.getElementById('reservation-modal');
  const openButtons = document.querySelectorAll('.trigger-reservation');
  const closeButton = document.getElementById('btn-close-reservation');
  const reservationForm = document.getElementById('reservation-form');

  if (!modal) return;

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.showModal();
    });
  });

  if (closeButton) {
    closeButton.addEventListener('click', () => {
      modal.close();
    });
  }

  // Close on backdrop click
  modal.addEventListener('click', (e) => {
    const dialogDimensions = modal.getBoundingClientRect();
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      modal.close();
    }
  });

  if (reservationForm) {
    reservationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const guestName = document.getElementById('res-name').value;
      const guests = document.getElementById('res-guests').value;
      const date = document.getElementById('res-date').value;
      const time = document.getElementById('res-time').value;
      const seating = document.getElementById('res-seating').value;

      // Save reservation to localStorage for Admin Dashboard
      try {
        const currentRes = JSON.parse(localStorage.getItem('101_reservations')) || [];
        currentRes.unshift({
          id: `RES-${Math.floor(100 + Math.random() * 900)}`,
          name: guestName,
          guests: guests,
          date: date,
          time: time,
          seating: seating,
          status: 'Confirmed'
        });
        localStorage.setItem('101_reservations', JSON.stringify(currentRes));
      } catch (err) {
        console.error('Reservation save error:', err);
      }

      modal.close();
      reservationForm.reset();

      showToast(`Reservation Confirmed for ${guestName}! ${guests} on ${date} at ${time} (${seating}).`);
    });
  }
}

/* --------------------------------------------------------------------------
   CONTACT FORM HANDLER
   -------------------------------------------------------------------------- */
function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contact-name').value;
    contactForm.reset();
    showToast(`Thank you, ${name}! Your message has been sent to our farm hospitality team.`);
  });
}

/* --------------------------------------------------------------------------
   NEWSLETTER SIGNUP
   -------------------------------------------------------------------------- */
function initNewsletter() {
  const newsletterForm = document.getElementById('newsletter-form');
  if (!newsletterForm) return;

  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = newsletterForm.querySelector('input[type="email"]').value;
    newsletterForm.reset();
    showToast(`Welcome to the 101 Harvest Circle! Weekly farm notes sent to ${email}.`);
  });
}

/* --------------------------------------------------------------------------
   MOBILE NAV TOGGLE
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const drawer = document.getElementById('mobile-drawer');
  const closeBtn = document.getElementById('btn-close-mobile-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!toggleBtn || !drawer) return;

  toggleBtn.addEventListener('click', () => {
    drawer.classList.add('active');
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      drawer.classList.remove('active');
    });
  }

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      drawer.classList.remove('active');
    });
  });
}

/* --------------------------------------------------------------------------
   SMOOTH SCROLLING
   -------------------------------------------------------------------------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

/* --------------------------------------------------------------------------
   TOAST NOTIFICATION HELPER
   -------------------------------------------------------------------------- */
function showToast(message) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c8963e" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4200);
}
