# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Static marketing single-page site for "Amazing Galapagos Travel", a tour operator in Puerto Baquerizo Moreno, San Cristóbal, Galápagos. No build system, no package manager, no framework — plain HTML/CSS/JS served directly.

## Running locally

There is no dev server or build step. Open `index.html` directly in a browser, or serve the directory with any static file server (e.g. `python3 -m http.server`) if testing features that require an origin (e.g. `fetch`).

There is no lint, test, or build command configured in this repo. This directory is also not a git repository — there's no version history to check and no commits to make unless one is initialized.

## Structure

- `index.html` — the entire page. All sections (hero, islands, packages, cruise booking, reviews, gallery, footer) live here as one file, in order, each wrapped in an HTML comment banner (`<!-- ============ SECTION ============ -->`).
- `assets/css/style.css` — single stylesheet, CSS custom properties for the color/spacing system defined in `:root` (ocean/turquoise/sand/coral palette).
- `assets/js/script.js` — vanilla JS, no modules/bundler. Organized into banner-commented blocks, one per behavior (header scroll state, mobile nav, hero video fallback, scroll reveal via IntersectionObserver, animated stat counters, reviews carousel, gallery lightbox, cruise booking form, newsletter form, footer year).
- `assets/images/` — Unsplash photos; `CREDITS.json` maps each filename to photographer/profile/source/search query used to find it. Update this file when swapping or adding images.
- `assets/video/` — expected to hold `hero.mp4` for the hero background; currently empty.

## Key behaviors to know before editing

- **Hero media has a fallback chain**: `index.html` wires up a `<video>` (`assets/video/hero.mp4`) with a photo `<div class="hero-slideshow">` behind it. Since `assets/video/` is currently empty, `script.js`'s `useSlideshowFallback()` always kicks in and the slideshow is what actually renders. If a real video is added, the fallback logic in script.js still governs which one shows.
- **Forms have no backend.** Both the cruise booking form (`#cruiseForm`) and newsletter form (`#newsletterForm`) only preventDefault and show a client-side success state — no request is sent anywhere. Wiring a real endpoint is a prerequisite before relying on these for actual leads.
- **Reviews are hardcoded**, not pulled from TripAdvisor live — the section links out to the real TripAdvisor page but the card content in `#reviewsTrack` is static markup that must be updated by hand.
