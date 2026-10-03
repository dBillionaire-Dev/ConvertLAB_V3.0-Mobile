# ConvertLAB Mobile-First v3

A clean, Android-first rebuild of ConvertLAB using the existing validated clinical calculation/conversion domain logic but a completely new mobile UI and application shell.

## What is included

- Next.js App Router + TypeScript
- Mobile-first responsive UI based on the supplied screen references
- Clinical calculator catalog using the complete calculator registry copied from the supplied ConvertLAB v2 repo
- Formula, notes, limitations and calculator reference/source metadata retained
- Unit converter across all existing conversion categories
- Density-aware Mass ↔ Volume tool
- Analyte-aware mg/dL ↔ mmol/L tool
- Serial dilution tool
- McFarland reference table
- Hematology and chemistry reference ranges
- Favorites and local history
- Global search
- Settings and About
- PWA manifest + service worker
- Capacitor configuration for Android packaging
- Static-export configuration suitable for Capacitor `webDir: out`

## Run

```bash
npm install
npm run dev
```

## Production / Capacitor

```bash
npm run build
npx cap add android   # first time only
npm run cap:sync
npm run cap:open:android
```

The Next.js build uses static export, producing `out/`, which Capacitor loads locally.

## Architecture note

The old PWA UI/components were not reused. Only the domain calculation/conversion/reference logic and product icon assets were carried over so the clinical behavior and source material remain intact while the interface and navigation are rebuilt mobile-first.
