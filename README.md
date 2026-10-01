# 101 Café & Farm 🌾

A modern, responsive farm-to-table restaurant website and staff operations dashboard. Built with semantic HTML5, vanilla CSS3, and modern interactive JavaScript.

## 🌿 Overview

101 Café & Farm is a culinary homestead celebrating hyper-local permaculture, zero-waste dining, and seasonal harvests.

### ✨ Features
- **Hero Section**: Distinctive rustic luxury aesthetic with high-contrast serif typography, custom acorn line-art emblem, and flowing calligraphic script.
- **Dynamic Operating Hours & Harvest Ticker**: Live status calculating open/closed hours and today's freshly picked farm herbs and produce.
- **Interactive Seasonal Menus**: Filterable tabs for Morning & Midday, Evening Table, Weekend Farm Brunch, and Artisan Libations with dietary tags.
- **Guest Table Reservation System**: Native accessible `<dialog>` modal with party size, seating preferences (Homestead Dining Room, Greenhouse Solarium, Pergola Patio), date/time slots, and confirmation toasts.
- **Online Farm Basket & Cart Drawer**: Slide-out cart with item increment/decrement, subtotal calculation, and instant order placement.
- **Staff & Admin Operations Dashboard (`admin.html`)**: Real-time management portal to view incoming reservations, track online orders, toggle open/closed status, and update the harvest ticker without touching code.

## 🚀 Running Locally

You can open `index.html` directly in any web browser, or start a local dev server:

```bash
# Using Python
python -m http.server 8080

# Or using Node.js / npx
npx serve
```

Then visit:
- **Main Website**: [http://localhost:8080](http://localhost:8080)
- **Staff & Admin Dashboard**: [http://localhost:8080/admin.html](http://localhost:8080/admin.html)

## 📁 Project Structure

```text
├── index.html              # Main customer website
├── admin.html              # Staff & operations management dashboard
├── assets/
│   ├── css/
│   │   └── style.css       # Complete design system & responsive styling
│   ├── js/
│   │   └── main.js         # Interactive reservations, cart, and live status
│   └── images/
│       ├── acorn-logo.svg  # Stylized white acorn emblem
│       ├── hero-bg.webp    # Gourmet velouté plate hero backdrop
│       ├── farm-homestead.jpg
│       ├── heirloom-dish.jpg
│       └── artisan-pantry.jpg
└── README.md
```
