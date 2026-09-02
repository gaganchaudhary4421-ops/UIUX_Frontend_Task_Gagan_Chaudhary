# DroneTV — Redesign (UI/UX & Frontend Practical Test)

A modern, responsive redesign concept for [dronetv.in](https://www.dronetv.in), built for the iPage Group UI/UX Designer & Frontend Developer internship practical test.

DroneTV is a media and training platform for the drone, GIS and AI ecosystem — it showcases products, publishes industry insight, and runs pilot/GIS/AI training programs. This redesign keeps that positioning while introducing a distinct visual identity (ink-navy + sky-blue + signal-amber palette, Space Grotesk/Inter type pairing) rather than reproducing the existing site.

## Project description

Five screens were designed and built:

- **Home** — hero, services overview, training programs, featured editorial content, stats, final CTA
- **Services** — filterable service catalog (Media & Insight / Training / GIS & AI) and a 4-step process
- **Courses** — featured course, filterable course catalog by level/track
- **Login** — split auth layout with client-side validation and a password-visibility toggle
- **Dashboard** — post-login home with KPIs, in-progress courses, recommendations and activity feed

## Technologies used

- HTML5 (semantic markup, no build step)
- CSS3 (custom properties, CSS Grid/Flexbox, no framework)
- Vanilla JavaScript (no libraries) — mobile navigation, tab filtering, animated counters/progress bars, form validation

No React, Vue, Angular or CSS framework was used, per the assignment brief.

## How to run the project

No build step or dependencies are required.

1. Download/clone this repository.
2. Open `index.html` directly in a browser, **or** serve the folder locally for the best experience (relative paths and fonts load the same either way):
   ```bash
   python3 -m http.server 8080
   # then visit http://localhost:8080
   ```
3. Navigate via the header (Home / Services / Courses / Log in). Logging in with any valid-looking email + a 6+ character password on `login.html` redirects to `dashboard.html`.

## Structure

```
├── index.html
├── services.html
├── courses.html
├── login.html
├── dashboard.html
├── css/
│   └── styles.css      # design tokens, layout, components, responsive rules
├── js/
│   └── main.js          # nav, tabs, counters, dashboard, form validation
└── README.md
```

## Responsive behaviour

Breakpoints at 1180px, 991px, 767px and 480px cover desktop, laptop, tablet and mobile. On mobile: the header collapses to a full-screen nav sheet, the dashboard sidebar becomes an off-canvas drawer, and course/service tab filters scroll horizontally.

## Screenshots

See `Screenshots/` in the submission folder for desktop and mobile captures of each screen.

## Figma

Design file and prototype nlink: see `01_Figma_Design/Figma_Link.txt` (design system, 5 screens and clickable prototype — figma link to be added).

## Live demo

Not deployed for this submission — run locally as described above, or see `https://github.com/gaganchaudhary4421-ops/UIUX_Frontend_Task_Gagan_Chaudhary`.
