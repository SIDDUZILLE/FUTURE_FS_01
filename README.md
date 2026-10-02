# 🌿 101 Café & Farm

> A hyper-local farm-to-table restaurant, greenhouse, and artisan culinary homestead situated in Greenville, South Carolina.

---

## 📖 Overview

**101 Café & Farm** combines sustainable permaculture farming with fine artisan dining. This project is a responsive, feature-rich web application built with semantic HTML5, modern Vanilla CSS, and modular JavaScript, featuring a customer-facing restaurant website and an integrated real-time staff/operations dashboard.

---

## ✨ Key Features

### 🍽️ Customer Website (`index.html`)
- **Brand Identity & Atmosphere**: Refined artisan aesthetic with line-art acorn emblem, serif typography for **101 CAFÉ**, and calligraphic script for **and farm**.
- **Real-Time Operating Status & Harvest Ticker**: Live status badge (Open / Closed) dynamically calculated based on actual operating hours, alongside a seasonal harvest ticker.
- **Interactive Seasonal Dining Menus**: Filterable tabs for *Morning & Midday*, *Evening Table*, *Weekend Farm Brunch*, and *Libations & Natural Wine*, with dietary tags (*Farm Harvested*, *GF*, *Vegan*) and quick "Order Now" capability.
- **Table Reservation System**: Accessible modal dialog allowing guests to select party size, date, time, and dining area (*Homestead Dining Room*, *Greenhouse Solarium*, *Garden Pergola Patio*).
- **Online Farm Pantry & Cart Drawer**: Interactive slide-out cart drawer with quantity adjustments, live subtotal calculations, and streamlined checkout flow.
- **The 2.4-Acre Farm & 1942 Homestead**: Story showcase highlighting organic permaculture practices, composting loops, and solar-powered greenhouse production.
- **Accolades & Press**: Feature spotlights from culinary publications and regional dining awards.
- **Hours, Directions & Contact Form**: Inquiry form for private farm dinners, greenhouse weddings, workshops, and tours.

### ⚙️ Staff & Operations Dashboard (`admin.html`)
- **Live Metrics Overview**: Quick KPIs tracking today's reservations count, active pantry orders, daily revenue, and current restaurant status.
- **Table Reservations Manager**: Inspect incoming guest bookings in real-time, toggle statuses (*Confirmed*, *Seated*, *Pending*), or cancel bookings.
- **Online Order Fulfillment**: Track takeout and farm pantry baskets with live status progression (*Preparing* &rarr; *Ready for Pickup* &rarr; *Completed*).
- **Live Site Overrides**: Force Open/Closed status for private events and modify the daily seasonal harvest ticker live from the browser without editing source files.
- **Cross-Tab Synchronization**: State changes in the admin dashboard reflect seamlessly across the customer site via browser `localStorage`.

---

## 🚀 Getting Started

### Prerequisites
- Any modern web browser (Google Chrome, Microsoft Edge, Mozilla Firefox, Safari).
- *Optional*: Python or Node.js (if you prefer running via a local HTTP server).

### Running Locally

#### Option 1: Direct File Opening
Simply double-click `index.html` to view the public website, or double-click `admin.html` to access the staff portal.

#### Option 2: Lightweight Python Server
```bash
# In the project root directory
python -m http.server 8080
```
Open [http://localhost:8080](http://localhost:8080) in your web browser.

#### Option 3: Using Node.js / npx
```bash
npx serve
```

---

## 📂 Project Structure

```text
FUTURE_FS_01/
├── index.html              # Main customer-facing restaurant website
├── admin.html              # Staff & Operations management portal
├── assets/
│   ├── css/
│   │   └── style.css       # Design tokens, typography, layouts & animations
│   ├── js/
│   │   └── main.js         # Interactive menus, cart drawer & reservation handlers
│   └── images/             # Brand logos, hero culinary photography & dish gallery
├── .gitignore              # Git ignore rules for build artifacts & temporary files
└── README.md               # Project documentation
```

---

## 🛠️ Technology Stack

- **Markup**: Semantic HTML5 with accessibility attributes (ARIA, landmark regions, modal focus management)
- **Styling**: Vanilla CSS3 (Custom properties/tokens, Flexbox, CSS Grid, Glassmorphism, smooth micro-interactions)
- **Scripting**: Modern Vanilla JavaScript (ES6+, DOM manipulation, Web Storage API)
- **Typography**: Google Fonts (*Cinzel*, *Playfair Display*, *Inter*, *Caveat*)

---

## 📄 License

MIT License. © 2026 101 Café & Farm.
