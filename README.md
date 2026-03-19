<p align="center">
  <img src="https://img.shields.io/badge/PAAV-ESPORTS-a855f7?style=for-the-badge&labelColor=0c0c18" alt="PAAV Esports" />
  <img src="https://img.shields.io/badge/Status-Live-06d6a0?style=for-the-badge&labelColor=0c0c18" alt="Status" />
  <img src="https://img.shields.io/badge/Season-5-22d3ee?style=for-the-badge&labelColor=0c0c18" alt="Season 5" />
</p>

<h1 align="center">🎮 PAAV ESPORTS</h1>
<p align="center">
  <strong>An exclusive gaming community & tournament hub — Compete. Dominate. Rise.</strong>
</p>
<p align="center">
  <em>A sleek, dark-themed esports website built with vanilla HTML, CSS & JavaScript.</em>
</p>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Pages](#-pages)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Design System](#-design-system)
- [Getting Started](#-getting-started)
- [How It Works](#-how-it-works)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [Credits](#-credits)
- [License](#-license)

---

## 🔍 Overview

**PAAV Esports** is a members-only competitive gaming community website that serves as a central hub for tournament registration, player tracking, and community memories. The site features a premium dark UI with glassmorphism effects, gradient accents, and a fully responsive layout across all devices.

The platform has hosted **5 seasons** of competitive tournaments with **100+ registered players** and a thriving 24/7 community.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🏠 **Landing Page** | Hero section with quick stats, season history cards, and CTAs |
| 📝 **Player Registration** | Full-featured form with real-time validation and Google Sheets integration |
| 👥 **Player Roster** | Live data table with search, filtering, and gender-based stats |
| 🎬 **Memories** | Embedded YouTube video recaps from past tournament seasons |
| 🎨 **Dark Theme** | Premium dark UI with purple/cyan gradient accents and glassmorphism |
| 📱 **Responsive** | Fully responsive across desktop, tablet, and mobile (breakpoints at 768px & 480px) |
| ✅ **Form Validation** | Client-side validation with visual feedback (green/red borders) |
| 🔄 **Live Data** | Real-time player data fetched from Google Sheets via Apps Script API |

---

## 📄 Pages

### 🏠 Home (`index.html`)
The main landing page featuring:
- **Hero Section** — Welcome banner with gradient-styled heading and CTA buttons
- **Quick Stats** — Animated stat cards showing Seasons (5), Players (100+), Community (24/7)
- **Seasons Grid** — Cards for all 5 tournament seasons with descriptions and "Read More" links

### 📝 Register (`register.html`)
Player registration portal with the following fields:
- Player Name, Gender (select), Age (13–99)
- Discord ID, Phone Number, In-Game ID
- Auto-captured registration timestamp (IST timezone)
- Loading spinner on submit with success/error feedback messages

### 👥 Players (`players.html`)
Registered players dashboard featuring:
- **Stats Bar** — Total players, Male/Female/Other counts
- **Search** — Real-time search by name, Discord ID, or Game ID
- **Data Table** — Sortable roster with gender badges, Discord IDs (styled), and registration dates
- **State Management** — Loading, error, empty, and no-results states

### 🎬 Memories (`memories.html`)
A gallery page with embedded YouTube video recaps from past tournament seasons (Season 4 recaps currently featured).

---

## 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| **HTML5** | Semantic page structure |
| **CSS3** | Custom design system with CSS variables, gradients, glassmorphism |
| **Vanilla JavaScript** | Form handling, API calls, DOM manipulation, search/filter |
| **Google Fonts** | [Orbitron](https://fonts.google.com/specimen/Orbitron) (display) + [Inter](https://fonts.google.com/specimen/Inter) (body) |
| **Google Apps Script** | Serverless backend API for form submissions and data retrieval |
| **Google Sheets** | Database for storing player registrations |

> **No frameworks, no build tools, no dependencies** — Pure vanilla web stack for maximum simplicity and performance.

---

## 📁 Project Structure

```
Paav_Esports/
├── CSS/
│   ├── paav.css          # 🎨 Main unified design system (839 lines)
│   ├── form.css          # 📝 Legacy/alternate form styles
│   └── trail.css         # 📜 Legacy/alternate timeline styles
├── index.html            # 🏠 Home page
├── register.html         # 📝 Player registration form
├── players.html          # 👥 Registered players roster
├── memories.html         # 🎬 Video memories gallery
└── README.md             # 📖 You are here
```

---

## 🎨 Design System

The project uses a comprehensive CSS design system defined in `CSS/paav.css` with CSS custom properties:

### Color Palette

| Token | Color | Hex | Usage |
|---|---|---|---|
| `--bg-body` | 🟣 | `#0c0c18` | Page background |
| `--bg-card` | 🟣 | `rgba(16,16,32,0.92)` | Card/panel backgrounds |
| `--accent` | 🟣 | `#a855f7` | Primary accent (purple) |
| `--cyan` | 🔵 | `#22d3ee` | Secondary accent (cyan) |
| `--green` | 🟢 | `#06d6a0` | Success states |
| `--red` | 🔴 | `#ef4444` | Error/danger states |
| `--discord` | 🔵 | `#7289da` | Discord ID styling |

### Typography

| Role | Font | Weights |
|---|---|---|
| Display / Headings | **Orbitron** | 400–900 |
| Body / UI Text | **Inter** | 300–700 |

### Key Design Principles
- **Glassmorphism** — Frosted glass effects with `backdrop-filter: blur()` on navbar and cards
- **Gradient Accents** — Purple → Cyan gradient on headings, dividers, and buttons
- **Subtle Glow** — Soft purple glow on interactive elements via `box-shadow`
- **Dark-first** — Deep navy/black backgrounds with high-contrast text

---

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Edge, Safari)
- A local web server (optional, for best experience)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/Paav_Esports.git
   cd Paav_Esports
   ```

2. **Open in browser**
   ```bash
   # Option 1: Direct file open
   start index.html          # Windows
   open index.html           # macOS

   # Option 2: VS Code Live Server
   # Install "Live Server" extension → Right-click index.html → "Open with Live Server"

   # Option 3: Python HTTP server
   python -m http.server 8000
   # Visit http://localhost:8000
   ```

3. **That's it!** No build steps, no `npm install`, no configuration needed. 🎉

---

## ⚙ How It Works

### Registration Flow

```
┌─────────────┐     ┌──────────────────┐     ┌───────────────┐
│  register   │────▶│  Google Apps      │────▶│ Google Sheets │
│  .html      │     │  Script (POST)   │     │  (Database)   │
│  (Form)     │     │                  │     │               │
└─────────────┘     └──────────────────┘     └───────────────┘
```

1. User fills out the registration form on `register.html`
2. On submit, a `POST` request sends `FormData` to the Google Apps Script endpoint
3. The Apps Script writes the data to a Google Sheet
4. A success/error message is displayed to the user

### Player Data Fetching

```
┌─────────────┐     ┌──────────────────┐     ┌───────────────┐
│  players    │◀────│  Google Apps      │◀────│ Google Sheets │
│  .html      │     │  Script (GET)    │     │  (Database)   │
│  (Table)    │     │                  │     │               │
└─────────────┘     └──────────────────┘     └───────────────┘
```

1. `players.html` sends a `GET` request to the Apps Script on page load
2. The script reads all rows from the Google Sheet and returns JSON
3. The page renders the data in a styled table with stats and search functionality

---

## 🖼 Screenshots

> _Screenshots coming soon — visit the live site to preview!_

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

---

## 👏 Credits

- **Built by** — [GT Edits](https://www.instagram.com/gt._.edits/)
- **Fonts** — [Google Fonts](https://fonts.google.com/) (Orbitron & Inter)
- **Backend** — [Google Apps Script](https://developers.google.com/apps-script)

---

## 📜 License

© 2026 **PAAV ESPORTS** — All Rights Reserved.

---

<p align="center">
  Made with ❤️ by <a href="https://www.instagram.com/gt._.edits/">GT Edits</a>
</p>
