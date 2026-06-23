# ChadWallet Build Plan

## Goal

Build a FOMO.family inspired ChadWallet experience using real Solana data.

Deadline: June 28

---

# Phase 1 - Foundation

## Setup

* Next.js 15
* TypeScript
* Tailwind
* shadcn/ui
* Framer Motion

## Branding

* Import ChadWallet logo
* Extract colors from assets
* Create design tokens

## Infrastructure

* Configure Vercel
* Configure Cloudflare
* Configure environment variables

## Authentication

* Privy setup
* Google login
* Apple login
* Embedded wallet

## Database

* Supabase project
* Profiles table
* Watchlists table
* Recently viewed table
* RLS policies

Deliverable:

* Project running
* Auth working
* Supabase connected

---

# Phase 2 - Landing Page

## Hero

* ChadWallet branding
* Download buttons
* Login CTA

## Market Preview

* Trending token cards
* Top movers
* Live prices

## Token Tickers

Top:

* Continuous scrolling

Bottom:

* Continuous scrolling

Click:

* Navigate to trading page

## Product Showcase

* Screenshots
* Mobile previews

## Animations

* Framer Motion
* Smooth transitions

Deliverable:

* Fully functional landing page

---

# Phase 3 - BirdEye Integration

## Create API Layer

lib/birdeye

## Endpoints

* Trending tokens
* Market data
* Top gainers
* Top losers
* Holders
* Trades

## Caching

* Server-side caching
* Loading states
* Error handling

Deliverable:

* Real token data everywhere

---

# Phase 4 - Trading Page

## Left Panel

* Trending tokens
* Search
* Gainers
* Losers

## Center Panel

* Token overview
* Price
* Market cap
* Liquidity
* Volume

## TradingView

* Interactive chart

## Market Activity

* Holders
* Live trades

Deliverable:

* Fully working trading dashboard

---

# Phase 5 - Wallet & Trading

## RPC Integration

Alchemy Solana RPC

Features:

* Wallet balance
* Token balances
* Position data

## Jupiter

* Quote API
* Swap preview
* Buy/Sell UI

Deliverable:

* Functional trading experience

---

# Phase 6 - User Persistence

## Watchlist

Add/remove tokens

## Recently Viewed

Track token visits

## Profile

Wallet
Preferences
History

Deliverable:

* Persistent user experience

---

# Phase 7 - Polish & Deployment

## Mobile QA

* Phone
* Tablet
* Desktop

## Performance

* Lazy loading
* Optimized images
* API caching

## Security

* Secrets audit
* Environment validation

## Deployment

* Vercel

Deliverable:

* Production-ready preview URL
