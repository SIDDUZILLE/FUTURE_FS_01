# 🌿 101 Café & Farm

> A hyper-local farm-to-table restaurant, greenhouse, and artisan culinary homestead situated in Greenville, South Carolina.

---

## 📖 Overview

**101 Café and Farm** combines sustainable permaculture farming with fine dining. This project is a responsive, feature-rich web application built with semantic HTML5, modern Vanilla CSS, and modular JavaScript, featuring a customer-facing restaurant website and an integrated staff/operations dashboard.

---

## ✨ Features

### 🍽️ Customer Website (`index.html`)
- **Hero & Brand Identity**: Pixel-accurate artisan aesthetic with stylized line-art acorn logo, distressed serif typography for **101 CAFÉ**, and calligraphic script for **and farm**.
- **Real-Time Operating Status & Harvest Ticker**: Live status indicator (Open/Closed) dynamically calculated from operating hours, plus a seasonal harvest ticker.
- **Interactive Seasonal Dining Menus**: Filterable tabs for *Morning & Midday*, *Evening Table*, *Weekend Farm Brunch*, and *Libations & Natural Wine*, with dietary tags (Farm Harvested, GF, Vegan) and quick "Order Now" action.
- **Table Reservation System**: Accessible modal dialog allowing guests to select party size, date, time, and dining area (*Homestead Dining Room*, *Greenhouse Solarium*, *Garden Pergola Patio*).
- **Online Farm Pantry & Cart Drawer**: Slide-out cart drawer with quantity adjustments, real-time subtotal, and checkout flow.
- **The 2.4-Acre Farm & 1942 Homestead**: Story showcase highlighting permaculture practices and solar greenhouse.
- **Accolades & Press**: Citations from the James Beard Foundation and regional culinary publications.
- **Hours, Directions & Contact Form**: Inquiry form for private farm dinners, greenhouse weddings, and tours.

### ⚙️ Staff & Operations Dashboard (`admin.html`)
- **Live Metrics**: Today's reservations count, active orders, farm pantry revenue, and cafe operating status.
- **Table Reservations Manager**: View guest reservations made in real-time, toggle statuses (*Confirmed*, *Seated*, *Pending*), or delete bookings.
- **Online Order Fulfillment**: Track takeout & pantry basket orders with live status advancement (*Preparing* &rarr; *Ready for Pickup* &rarr; *Completed*).
- **Live Site Overrides**: Force Open/Closed status for special events or holidays and update the daily harvest ticker live from the browser without editing code.

---

## 🚀 Getting Started

### Prerequisites
- Any modern web browser (Chrome, Edge, Safari, Firefox)
- Optional: Python or Node.js (for local HTTP server)

### Running Locally
To launch a lightweight local server:

#### Using Python:
```bash
python -m http.server 8080
```
Open **[http://localhost:8080](http://localhost:8080)** in your browser.

#### Using Node / npx:
```bash
npx serve
```

---

## 📂 Project Structure

```text
├── index.html              # Main customer-facing website
├── admin.html              # Staff & Operations management portal
├── assets/
│   ├── css/
│   │   └── style.css       # Design system, typography & responsive layouts
│   ├── js/
│   │   └── main.js         # Interactive menus, cart drawer & reservation handlers
│   └── images/
│       ├── acorn-logo.svg  # Luminous line-art acorn brand emblem
│       ├── hero-bg.webp    # Gourmet velouté culinary hero plate
│       ├── farm-homestead.jpg
│       ├── heirloom-dish.jpg
│       └── artisan-pantry.jpg
└── README.md
```

---

## 📄 License
MIT License. © 2026 101 Café and Farm.
