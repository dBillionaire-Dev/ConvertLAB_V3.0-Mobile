# ConvertLAB - Your Clinical Toolkit

Medical calculators, clinical and laboratory tools, and unit conversions in one fast, **offline-first** app. It runs as an **Android app** (through Capacitor) and as a **responsive web app / PWA**, from a single Next.js codebase. Everything works without an account, and your calculations, inputs and history never leave your device. The Android app can send an anonymous usage count, which you can switch off in Settings (see [4.12 Privacy](#412-privacy)).

> **Version:** 3.0.0 &nbsp;·&nbsp; **Status:** active development, pre-release &nbsp;·&nbsp; **Package manager:** pnpm
>
> **Important:** ConvertLAB is a calculation and reference utility. It is **not** a medical device, **not** a prescribing system and **not** a substitute for clinical judgement. Read [Safety and intended use](#2-safety-and-intended-use) before relying on any result.

---

## Choose your path

| You are… | Start here |
|---|---|
| Someone who just wants to use the app | [4. User guide](#4-user-guide) |
| A clinician, pharmacist, nurse, lab scientist or student | [4. User guide](#4-user-guide), then [5. Notes for clinical users](#5-notes-for-clinical-users) |
| Setting the app up or running it for a team | [6.3 Quick start](#63-quick-start) |
| A developer who wants to contribute or extend it | [6. Developer guide](#6-developer-guide) and [7. Contributing](#7-contributing) |
| Reviewing the clinical content | [5.3 Sources and versions](#53-sources-and-versions) and [7.2 Clinical change policy](#72-clinical-change-policy) |

---

## Contents

1. [What ConvertLAB is](#1-what-convertlab-is)
2. [Safety and intended use](#2-safety-and-intended-use)
3. [Feature overview](#3-feature-overview)
4. [User guide](#4-user-guide)
5. [Notes for clinical users](#5-notes-for-clinical-users)
6. [Developer guide](#6-developer-guide)
7. [Contributing](#7-contributing)
8. [Troubleshooting](#8-troubleshooting)
9. [Roadmap and known limitations](#9-roadmap-and-known-limitations)
10. [Glossary](#10-glossary)
11. [Licence and credits](#11-licence-and-credits)

---

## 1. What ConvertLAB is

ConvertLAB started as a laboratory conversion and calculator tool. It has grown into an all-in-one toolkit for clinical and laboratory work:

- **Medical and clinical calculators**: BMI, body surface area, eGFR, creatinine clearance, anion gap, corrected calcium, scores and risk tools.
- **Drug dosing helpers**: weight-based, renal-adjusted, antimalarial, antibiotic and therapeutic drug monitoring tools.
- **Laboratory tools**: dilutions, solution preparation, spectrophotometry, microbiology counts, McFarland standards.
- **Unit conversions**: mass, volume, temperature, pressure, energy, time, mass and molar concentration.
- **References**: hematology and chemistry reference ranges, plus the formula, notes, limitations and source for each calculator.

**Design principles**

1. **Mobile first.** The Android experience is the priority. Desktop gets a sidebar and wider layout, but it is the same app.
2. **Local first.** No account, and no data about your work leaves the device. History, favorites and settings are stored on the device. The only network traffic is an optional, anonymous usage count (see [6.13](#613-anonymous-usage-statistics)).
3. **One product, not 155 forms.** Every tool shares the same header, input cards, result card, favorite, copy and share controls.
4. **Logic is separate from UI.** Calculation and conversion code never depends on React, so it is easy to test and to extend.
5. **Show your working.** Results come with the formula, assumptions, limitations and a source wherever they exist.

---

## 2. Safety and intended use

Please read this section even if you skip everything else.

- ConvertLAB provides **mathematical calculations and estimates** for educational and laboratory utility.
- It does **not** diagnose, prescribe, or replace clinical judgement, local protocols, a formulary, validated laboratory SOPs or a manufacturer's instructions.
- **Verify before acting.** Check results against your local guideline, product label or a second calculation, especially for medicines, children, pregnancy, kidney or liver impairment, and high-risk drugs.
- **Formulas and guidelines change.** Each reference shows a version and the date it was last verified. Guidance newer than that date is not reflected.
- **Estimates are not measurements.** Tools marked as estimators (for example eGFR) are population equations. They can be wrong for an individual.
- **Do not enter patient-identifying information.** ConvertLAB stores your history on the device in readable form and has no need for names, record numbers or dates of birth.
- If something looks wrong, **stop and check**. Then report it (see [5.6 Reporting a wrong result](#56-reporting-a-wrong-result)).

Laboratory preparation tools (dilutions, solutions, density and molar conversions) additionally remind you to follow your laboratory's validated SOPs, the reagent manufacturer's instructions and your safety procedures.

---

## 3. Feature overview

| Area | What you get |
|---|---|
| **Calculators** | **155** calculators in **11** categories, many with sub-groups |
| **Estimators** | A dedicated page listing the **15** calculators that estimate a value from an equation |
| **Conversions** | **9** categories with instant results, swap, copy and clear |
| **Lab tools** | Serial dilution, mass ↔ volume (density), molar ↔ mass concentration (by analyte), McFarland standards, reference ranges, plus shortcuts to lab categories |
| **Search** | One search across calculators, conversions, lab tools and reference ranges, grouped, with recent searches |
| **History** | The last 150 calculations and conversions, filterable, with per-item delete |
| **Favorites** | Pin calculators and converters |
| **Settings** | Light / Dark / System theme, font size, default units, haptics, auto-save, confirm-before-clear, offline mode |
| **Backup** | Export and import your history, favorites and settings as a JSON file |
| **Android** | Status bar and splash screen, hardware back button, keyboard handling, native share sheet, haptics, in-app browser for source links |
| **Web / PWA** | Installable, works offline (browser only), responsive with a sidebar from 1024 px |

**Calculators by category**

| Category | Tools | Examples of what is inside |
|---|---:|---|
| General | 8 | BMI, BSA, ideal and adjusted body weight, BMR, calorie requirement, waist ratios |
| Renal | 6 | Creatinine clearance, eGFR (CKD-EPI and MDRD), BUN:creatinine, FENa, FEUrea |
| Clinical Chemistry | 15 | Anion gap, corrected calcium, corrected sodium, LDL (Friedewald), osmolality, HbA1c ↔ eAG |
| Hematology | 12 | RBC indices, corrected WBC, absolute counts, INR, aPTT ratio, blood volume, transfusion |
| Microbiology | 6 | CFU, dilution factors, serial dilution |
| Laboratory Solutions | 6 | Molarity, normality, C1V1 = C2V2, percent solutions, reagent preparation |
| Spectrophotometry | 11 | Beer-Lambert, absorbance ↔ transmittance, standard curve, wavelength and photon energy |
| Drug Dosing | 57 | General dosing, antimalarial, antibiotic, renal adjustment, therapeutic drug monitoring |
| Oncology | 15 | BSA dosing, dose intensity, carboplatin (Calvert), dose caps and modifications, cycle tracking |
| Cardiovascular | 10 | MAP, CHA₂DS₂-VASc, HAS-BLED, DAPT score, QTc, ejection fraction |
| Stem Cell & Transplant | 9 | CD34+ dose, collection yield, engraftment, chimerism |

**Conversion categories**: Mass (7 units), Volume (5), Length (5), Temperature (3), Pressure (6), Energy (4), Time (4), Mass Concentration (5), Molar Concentration (4).

---

## 4. User guide

This part is for everyone, with no technical knowledge needed.

### 4.1 Getting the app

- **Android:** install the ConvertLAB app when it is published, or install an APK or test build that your team gives you. A Play Store listing is planned.
- **Web:** open the web version in any modern browser. On a phone you can use *Add to Home screen* (or the browser's *Install app* option) to get an app-like icon. The web version can be hosted by anyone who builds it (see [6.3 Quick start](#63-quick-start)).

You do not need to sign in. Nothing is downloaded after the first launch, because everything is built into the app.

### 4.2 Finding your way around

**On a phone**, the bottom bar has four tabs:

| Tab | What it does |
|---|---|
| **Home** | Quick actions, popular tools, categories, and the tools you used recently |
| **Tools** | The hub: Calculators, Conversions, Lab Tools, Drug Dosing, Estimators, Reference, History |
| **Search** | Full-screen search across everything |
| **Saved** | Your favorites |

The **☰ menu** (top left) lists every section, including Settings and About. The **🔍 icon** (top right) opens Search from anywhere. On a **desktop or tablet (1024 px and wider)** the menu becomes a permanent sidebar and the bottom bar disappears.

**On Android**, the system **back button** closes an open menu or dialog first, then goes back one screen. On the Home screen it exits the app.

### 4.3 Using a calculator

1. Open **Tools → Calculators** (or search for it) and pick a category, then a calculator.
2. Fill in the **input fields**. Grey text such as *e.g. 14* is only a hint for the kind of value expected. **It is not entered for you**, so you must type your own value.
3. Check the **unit dropdowns** (for example kg / lb, cm / ft / in). Units are converted for you.
4. Tap **Calculate**. A **required** field that is empty shows a message instead of being treated as zero.
5. Read the **Result card**: the main value with its unit, any secondary values (such as a category), the working, an interpretation and any warnings.
6. Use **Copy result** or **Share** to send it to a note or message. On Android, Share opens the system share sheet.
7. Tap **♡** to add the calculator to **Saved**. The **↺ Clear** button resets the inputs.
8. Scroll to **Clinical notes & sources** for the formula, notes, limitations and the source with its version.
9. **Related tools** at the bottom suggest similar calculators.

Inside a category such as **Drug Dosing**, the tools are grouped into sub-groups (General Dosing, Antimalarial, Antibiotic, Renal Adjustment, Therapeutic Drug Monitoring). A row of tabs under the header stays in place while you scroll, so you can jump between groups.

### 4.4 Converting units

1. Open **Tools → Conversions**.
2. Pick a category (Mass, Volume, Temperature, …) from the row of chips.
3. Choose the **From** and **To** units, then type a value. **The result updates instantly**, with no Convert button.
4. Use **⇅ Swap** to reverse the units, **Copy result** to copy, and **Clear** to empty the value.
5. The conversion is saved to History after you pause typing for a moment.
6. Tap **♡** to pin the converter to Saved.

### 4.5 Lab tools

**Tools → Lab Tools** gives you:

- **Hematology, Clinical Chemistry, Microbiology, Spectrophotometry, Laboratory Solutions**: shortcuts to those calculator categories.
- **Serial dilution**: concentration at every step of a dilution series.
- **Mass ↔ Volume**: converts using the density of a chosen substance.
- **Molar ↔ Mass concentration**: converts for a chosen analyte (for example mg/dL ↔ mmol/L).
- **McFarland standards**: turbidity standards with approximate cell density.
- **Reference ranges**: quick hematology and chemistry ranges.

### 4.6 Drug dosing

**Tools → Drug Dosing** (also under Calculators) holds 57 dosing helpers. They are **calculation aids, not prescriptions**. Always check the dose against the current product information and your local protocol. See [5. Notes for clinical users](#5-notes-for-clinical-users).

### 4.7 Estimators

**Tools → Estimators** lists calculators that **estimate** a value from an equation (for example eGFR, body surface area, ideal weight). Treat their output as an estimate, not a measurement.

### 4.8 Search

Tap **Search** and start typing. Results are grouped under **Calculators**, **Conversions**, **Lab Tools** and **References**. Search matches names, descriptions and keywords, and every word you type must match. Try *creatinine*, *anion gap*, *temperature*, *dilution* or a drug name. Your **recent searches** are listed when the box is empty.

### 4.9 History

**Tools → History** lists what you calculated or converted, newest first (up to 150 items).

- Tap an item to **re-open** its tool.
- Tap the **bin icon** to delete one item.
- Use the **filter** to show only calculators or only conversions.
- **Clear all** removes everything (it asks for confirmation unless you turned that off).

History is saved automatically. You can turn that off in Settings.

### 4.10 Favorites

Tap **♡** on any calculator or converter, in a list or on its own page. Open **Saved** to see them, and tap the heart again to remove one.

### 4.11 Settings

| Setting | What it does |
|---|---|
| **Theme** | Light, Dark, or System (follows your phone or computer) |
| **Font size** | Small, Medium or Large |
| **Default units** | Metric or US. US pre-selects pounds and inches in calculators that offer them |
| **Haptic feedback** | A small vibration on results and favorites (Android app only) |
| **Auto-save history** | Saves calculations and conversions automatically |
| **Confirm before clearing history** | Asks before deleting all history |
| **Share anonymous usage statistics** | Lets the Android app send an anonymous usage count (see [Privacy](#412-privacy)). Never your inputs or results. On by default, and you can turn it off |
| **Offline mode** | Lets the **web** version work offline. It has no effect in the Android app, which is always offline |
| **Export data** | Saves your history, favorites and settings as a JSON backup. On Android it opens the share sheet, so you can send it to Drive, email or notes |
| **Import data** | Merges a ConvertLAB backup into this device (it never deletes what you already have) |
| **Clear history** | Removes all saved calculations and conversions |

**Moving to a new phone:** Export on the old device, send the file to yourself, then Import on the new one.

### 4.12 Privacy

- There is **no account**. The Android app can send an **anonymous usage count**: a random installation ID, which tool was used, the app version and when. It **never** includes your inputs, results or history. Turn it off in **Settings → Share anonymous usage statistics**. Nothing else is sent.
- Your history, favorites, recent searches and settings are stored **only on your device**.
- Source links (for example to a WHO guideline) open in your browser, and that website is then a separate service with its own privacy practices.
- Clearing the app's data (or uninstalling it) deletes everything it stored. Use **Export** first if you want a copy.
- **Please do not enter patient-identifying information.**

### 4.13 Frequently asked questions

<details>
<summary><b>The input boxes are empty. Is that a bug?</b></summary>

No. The grey "e.g." text is only a hint. Enter your own value. This is deliberate, so a forgotten number is never silently replaced by a default.
</details>

<details>
<summary><b>I get "… is required."</b></summary>

A field that is not marked *optional* was left empty. Fill it in, or choose the right unit.
</details>

<details>
<summary><b>Can I use ConvertLAB without internet?</b></summary>

Yes. The Android app is fully offline. The web version works offline after the first visit if **Offline mode** is on in Settings.
</details>

<details>
<summary><b>Where is my history stored? Can someone else see it?</b></summary>

Only on your device, in the app's own storage. Anyone who can unlock and use your phone can open the app. Use **Clear history** if you share a device.
</details>

<details>
<summary><b>Why is a result different from another calculator?</b></summary>

Different tools use different equations, rounding and reference versions. Check the formula and source under **Clinical notes & sources**.
</details>

<details>
<summary><b>The numbers on my screen look old after an update (web).</b></summary>

Close all tabs of the site and reopen it. If it still looks old, clear the site's data in your browser settings.
</details>

---

## 5. Notes for clinical users

### 5.1 What a result contains

Each result card can show:

- the **primary value** and its **unit**, in a clear format such as `22.9 kg/m²`;
- **secondary values** (a category, or a related quantity);
- the **calculation steps**, so you can follow the substitution;
- an **interpretation** (descriptive text, never a diagnosis);
- **warnings** for unusual inputs, and for dosing, laboratory preparation, spectrophotometry and microbiology tools.

### 5.2 Units, input checks and rounding

- Unit dropdowns (kg / lb, cm / m / ft / in, mg/dL / mmol/L and so on) are converted **inside** the calculation, not by you.
- Inputs have **minimum and maximum limits** where they make sense. A value outside them is rejected with a message that names the limit and the unit.
- A result that is not a finite number (for example a division by zero) is **rejected**, never shown.
- Dosing tools add **safety warnings** for unusual inputs and results.
- Results are rounded for display to a sensible precision for that quantity (for example BMI to one decimal). The unrounded value is used internally.

### 5.3 Sources and versions

Open **Clinical notes & sources** on any calculator to see:

- the **formula**;
- **notes** and **limitations** (population, setting, caveats);
- one or more **references**, each with its **source**, **version**, a **link**, the **applicable population**, the date it was **last verified**, and a **status**:

| Status | Meaning |
|---|---|
| **current** | The latest version we know of at the verification date |
| **supporting** | Useful background, but newer or more specific guidance may exist. Read the note |
| **review-needed** | Flagged for re-checking. Treat the result with extra caution |

Examples of sources used include WHO guidelines (malaria, paediatric care, the AWaRe antibiotic book) and published consensus guidelines for drug monitoring. **A reference's verification date is when someone last checked it, not today's date.** Always check for newer guidance.

### 5.4 Good-practice checklist

Before using a result clinically:

1. Confirm the **units** you entered.
2. Confirm the **population** (adult, child, neonate, pregnancy, renal or hepatic impairment) matches the tool's stated population.
3. Read the **limitations** and any **warnings**.
4. **Cross-check** against your local guideline, formulary or product label. For high-risk medicines, use an independent second check.
5. Record the decision in the patient record according to your own procedures. **ConvertLAB is not a record system.**

### 5.5 For laboratory scientists

Dilution, solution-preparation, spectrophotometry and microbiology tools calculate **arithmetic**. They do not validate your method, instrument, linear range, reagent quality or organism identification. Use blank-corrected measurements and your laboratory's validated procedures, and follow your safety rules.

### 5.6 Reporting a wrong result

If you believe a result or a reference is wrong, please report it with:

- the calculator name (and the version shown in Settings or About);
- the **exact inputs and units** you entered;
- the **result you got**, and the **result you expected with its source** (a guideline, paper or worked example);
- the date you checked.

Report it through the project's issue tracker (see [Contributing](#7-contributing)). For anything affecting patient safety, say so clearly in the title.

### 5.7 For students and non-clinical users

ConvertLAB is a good way to learn how common clinical formulas work, because it shows the formula and the steps. It must **not** be used to decide your own or someone else's medicine doses. Ask a doctor or pharmacist.

---

## 6. Developer guide

### 6.1 Technology

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router), React 19, TypeScript (strict) |
| Styling | Tailwind CSS 3 plus CSS variables and a few global component classes |
| Icons | Lucide |
| Native wrapper | Capacitor 8 (Android) |
| Capacitor plugins | App, Browser, Haptics, Keyboard, Share, Splash Screen, Status Bar |
| Tests | Vitest |
| Package manager | pnpm |

The web app is a **static export** (`output: "export"`), so `pnpm build` produces a plain `out/` folder. That folder is both the web deployment and the bundle that Capacitor packs into the Android app.

### 6.2 Prerequisites

- **Node.js 22 or newer** (Next.js needs 20.9+, Capacitor 8 needs 22+).
- **pnpm** (`npm i -g pnpm`).
- For Android: **Android Studio Otter (2025.2.1) or newer**, with an Android SDK platform (API 24 or higher; the latest stable is recommended) and an emulator or a phone with USB debugging. Android Studio installs the correct JDK for you.

### 6.3 Quick start

```bash
git clone <your-repo-url>
cd <project-folder>
pnpm install
pnpm dev            # http://localhost:3000
```

| Script | What it does |
|---|---|
| `pnpm dev` | Start the development server |
| `pnpm build` | Type-check and produce the static export in `out/` |
| `pnpm typecheck` | `tsc --noEmit` |
| `pnpm test` | Run the Vitest suite |
| `pnpm build:android` | `next build` then `cap sync android` |
| `pnpm android:dev` | Sync, then run on a connected device or emulator |
| `pnpm android:open` | Open the Android project in Android Studio |
| `pnpm cap:sync`, `cap:add:android`, `cap:open:android` | Plain Capacitor commands |

A production check before any merge: `pnpm typecheck && pnpm test && pnpm build`.

### 6.4 Project structure

```
app/                         Routes (App Router). Pages are thin; logic lives in lib/
  page.tsx                   Home
  tools/                     Tools hub, plus tools/serial-dilution, mass-volume, molar-mass, mcfarland
  lab-tools/                 Lab Tools list
  calculators/               Category list, [category] (grouped by sub-category), [category]/[id] (a calculator)
  convert/                   Converter
  estimators/                Estimators list
  search/                    Full-screen search
  history/  favorites/  settings/  about/  references/
  layout.tsx                 Root layout, theme bootstrap script
  manifest.ts                PWA manifest (force-static)
  globals.css                Design tokens, dark theme, animations

components/                  Shared UI
  app-shell.tsx              Header, sidebar (desktop), bottom tabs, drawer, back-button handling
  calculator-runner.tsx      Renders any CalculatorDefinition: form, result, copy/share, sources
  item-row.tsx  tool-row.tsx favorite-button.tsx  recently-used.tsx
  confirm-sheet.tsx  switch.tsx  toaster.tsx  external-link.tsx  service-worker-register.tsx

hooks/                       use-settings, use-favorites, use-history, use-overlay

lib/
  calculators/               ★ Business logic. No React.
    types.ts                 CalculatorDefinition, inputs, results, categories, sub-categories
    registry.ts              The list of all calculators and lookup/search helpers
    definitions/*.ts         One file per category, with a *.test.ts beside each
    helpers.ts               num, str, round, fmt, safeDivide, assertPositive, unit helpers
    validation.ts            Structural audit of definitions (used by tests)
    calculation-safety.ts    Warnings for lab/spectro/micro tools
    dosing-safety.ts         Input bounds and warnings for dosing tools
    dosing-references.ts     Source, version, last-verified metadata
    treatment-engine.ts      Regimen metadata (protocol-aware, does not prescribe)
    clinical-audit.ts        Audit summary (missing formula, limitations, reviews)
  conversions/               ★ Conversion engine. No React.
    types.ts  engine.ts  registry.ts  data/*.ts  density.ts  molar-mass.ts  substances.ts
  client-store.ts            localStorage: favorites, history, searches, settings, export/import
  native.ts                  Capacitor bridge: status bar, back button, share, haptics, links
  search-index.ts            Builds the search index from the registries
  lab-tools.ts  reference-ranges.ts  ui-meta.ts  theme.ts  format.ts  toast.ts  app-info.ts

public/                      Icons, sw.js (service worker, web only)
android/                     Capacitor Android project (generated; see 6.9)
capacitor.config.ts          Native config (dev server URL, splash, status bar, keyboard)
next.config.mjs              Static export config
vitest.config.ts             Test config
```

### 6.5 Architecture

```
            ┌────────────── UI (React) ──────────────┐
 Pages ───► │ calculator-runner / convert / search … │
            └───────┬───────────────┬────────────────┘
                    │               │
          lib/calculators     lib/conversions        ← pure TypeScript, unit-tested
          (registry + defs)   (engine + data)
                    │
        lib/client-store ─► localStorage  (history, favorites, searches, settings)
        lib/native      ─► Capacitor plugins (Android only; no-ops on the web)
```

Key ideas:

- **Registry-driven.** Home, Search, categories, Favorites, History and the calculator pages all read from the same registry. Add a calculator in one place and it appears everywhere.
- **Generic runner.** One component, `calculator-runner.tsx`, renders **every** calculator from its definition. Calculators do not have their own pages.
- **Static export constraints.** There are no API routes or server actions. Dynamic routes must provide `generateStaticParams`. Anything that needs the browser (storage, Capacitor) lives in client components and hooks.
- **State sync.** `client-store.ts` dispatches `convertlab:*` window events after each write, and the hooks listen to them. This keeps every screen in step without a state library.
- **Platform code is isolated.** Only `lib/native.ts` imports Capacitor plugins, and it loads them lazily with `Capacitor.isNativePlatform()` guards. The web build never needs native code.

### 6.6 Data and storage

All storage is `localStorage`, accessed only through `lib/client-store.ts` (so it can move to IndexedDB later without touching screens).

| Key | Content |
|---|---|
| `convertlab:favorites:v3` | `string[]`. A calculator id, or `conv:<categoryId>` for a converter |
| `convertlab:history:v3` | `HistoryItem[]` (newest first, capped at 150) |
| `convertlab:searches:v3` | `string[]` of recent searches (capped at 8) |
| `convertlab:settings:v3` | `AppSettings` (theme, fontSize, unitSystem, offline, autoHistory, haptics, confirmClear) |

**Export file format** (`Settings → Export data`):

```json
{
  "app": "convertlab",
  "version": 3.0,
  "exportedAt": "2026-10-04T12:00:00.000Z",
  "favorites": ["bmi", "conv:temperature"],
  "history": [ { "id": "…", "type": "calculator", "name": "…", "subtitle": "…", "result": "…", "href": "…", "at": 1760000000000 } ],
  "settings": { "theme": "system", "fontSize": "medium", "unitSystem": "metric", "offline": true, "autoHistory": true, "haptics": true, "confirmClear": true }
}
```

Import validates every field, ignores anything malformed, and **merges** (it does not replace).

> If you change a stored shape, bump the key suffix (`:v3` → `:v4`) or write a migration. Never reuse a key for a different shape.

### 6.7 Adding a calculator

Every calculator is a `CalculatorDefinition` (see `lib/calculators/types.ts`).

**Step 1. Write the definition** in the matching file under `lib/calculators/definitions/`. This is an *illustrative* example. A real addition needs a real source (see [7.2](#72-clinical-change-policy)).

```ts
// lib/calculators/definitions/clinical.ts
import type { CalculatorDefinition } from "../types"
import { num, assertPositive, safeDivide, round, fmt } from "../helpers"

export const shockIndexCalculator: CalculatorDefinition = {
  id: "shock-index",                       // unique, kebab-case, becomes the URL
  name: "Shock Index",
  shortName: "Shock Index",
  category: "general",                     // a CalculatorGroup
  // subcategory: "…",                     // only if the category defines sub-categories
  description: "Heart rate divided by systolic blood pressure.",
  isEstimator: false,                      // true lists it on the Estimators page
  formula: "Shock index = heart rate (beats/min) / systolic BP (mmHg)",
  keywords: ["shock index", "heart rate", "systolic", "hemodynamic"],
  relatedTools: ["map"],                   // ids that must exist
  limitations: ["Interpret with the clinical picture; a single value is not a diagnosis."],
  inputs: [
    // For number inputs, defaultValue is shown as the grey "e.g." hint, not pre-filled.
    { id: "hr",  label: "Heart rate",         kind: "number", unit: "beats/min", min: 1, max: 300, defaultValue: 80 },
    { id: "sbp", label: "Systolic BP",        kind: "number", unit: "mmHg",      min: 1, max: 350, defaultValue: 120 },
  ],
  calculate: (inputs) => {
    const hr = num(inputs, "hr")
    const sbp = num(inputs, "sbp")
    assertPositive(hr, "Heart rate")
    assertPositive(sbp, "Systolic BP")
    const value = round(safeDivide(hr, sbp, "systolic BP"), 2)
    return {
      value,
      display: fmt(value, 2),
      calculationSteps: [`${hr} / ${sbp} = ${value}`],
      interpretation: "Interpret with clinical context.",
    }
  },
}
```

**Step 2. Register it.** In `lib/calculators/registry.ts`, import it and add it to the `calculators` array. Its category page, search entry, Home categories and related-tool suggestions then update automatically.

**Step 3. Sub-category (if used).** The `subcategory` must exist in `CALCULATOR_SUBCATEGORY_LABELS` in `types.ts`. If you add a new sub-category, add its label there.

**Step 4. Reference metadata.**
- *Drug dosing:* add or reuse a `CalculatorReference` in `lib/calculators/dosing-references.ts` and map the id in `getCalculatorReferences`.
- *Chemistry:* add the id to `CHEMISTRY_REFERENCES`.
- Other categories fall back to a category reference, but **add a specific one whenever there is a published source**.

**Step 5. Tests.** Add cases to the `*.test.ts` file next to the definition. Cover at least: a **known worked example from the source**, each unit option, boundary values, and invalid input (zero, negative, missing). The shared registry tests also check that ids are unique, `relatedTools` point to real calculators, and every fully-defaulted calculator runs on its own defaults.

**Step 6. Verify.**

```bash
pnpm typecheck && pnpm test && pnpm build
```

**Conventions for definitions**

- `calculate` must be **pure** (no I/O, no React, no `Date.now()`), and must **throw** (`CalculatorInputError` or any `Error`) on invalid input. The runner shows the message to the user.
- Prefer the helpers in `helpers.ts` over ad-hoc parsing, and use `safeDivide` for any division.
- Put units in `InputDefinition.unit`, and use a `select` input for user-choosable units.
- Write `limitations`. A calculator without one is flagged by the clinical audit.
- Keep wording **descriptive**, never directive ("Value in the high range", not "Give X").

### 6.8 Adding a conversion, a lab tool or a reference range

**A new unit in an existing category:** add a `UnitDefinition` to the file in `lib/conversions/data/`. A unit's value is converted to the category's base unit as `base = (value − offset) × factor`. Temperature uses `offset`. Add a round-trip test in `engine.test.ts`.

**A new conversion category:** create `lib/conversions/data/<name>.ts` exporting a `ConversionCategory`, then add it to `conversionCategories` in `lib/conversions/registry.ts`. It then appears on the converter, in Search, and can be favorited as `conv:<id>`. To give it a specific icon, add it to `conversionIcons` in `lib/ui-meta.ts` (a generic icon is used otherwise).

**A new lab tool:** create `app/tools/<slug>/page.tsx` (follow an existing tool for layout), then add an entry to `lib/lab-tools.ts`. It will show on **Lab Tools** and in **Search**.

**A reference range:** add a row to `lib/reference-ranges.ts`. It will show on **References** and in **Search**.

### 6.9 Android and Capacitor

The Android project lives **inside this repository** in `android/`. Next.js is the frontend and Capacitor is only the native wrapper.

- App ID: `com.convertlab.app` (see `capacitor.config.ts`).
- `webDir` is `out`, the static export.
- `lib/native.ts` is the **only** place that talks to native plugins.

**First-time setup**

```bash
pnpm build
pnpm exec cap add android
git add android && git commit -m "chore: add Capacitor Android project"
```

**Run on the emulator with live reload** (loads your dev server):

```bash
pnpm dev                                                         # terminal 1
CAPACITOR_SERVER_URL=http://10.0.2.2:3000 pnpm exec cap sync android   # terminal 2
pnpm exec cap open android                                       # then press Run in Android Studio
```

`10.0.2.2` is how the Android emulator reaches your computer. `next.config.mjs` must list it in `allowedDevOrigins` (`["10.0.2.2", "localhost", "127.0.0.1"]`), or the dev server blocks the emulator and the app hangs on the splash screen.

**Test the real bundled build** (no dev server):

```bash
unset CAPACITOR_SERVER_URL
pnpm build:android
pnpm android:open       # press Run in Android Studio
```

> **Never ship with `CAPACITOR_SERVER_URL` set.** `cap sync` bakes the URL into the app. Always `unset` it and sync again before a release build, then check `grep url android/app/src/main/assets/capacitor.config.json` prints nothing.

**What the native layer does** (`lib/native.ts`, `components/app-shell.tsx`)

| Feature | Behaviour |
|---|---|
| Status bar | Dark style, navy background, does not overlay the web view |
| Splash screen | Hidden once the app has started |
| Back button | Closes the drawer or a dialog first, then goes back, and exits at Home |
| Keyboard | The focused field is scrolled into view |
| Share | Native share sheet (falls back to the Web Share API, then the clipboard) |
| Haptics | Light tap on favorites, success on a result (respects the Settings toggle) |
| External links | Open in the in-app browser |

**Release checklist**

1. Set `versionName` and increase `versionCode` in `android/app/build.gradle`.
2. In Android Studio: **Build → Generate Signed Bundle / APK → Android App Bundle**. Create a keystore once and **back it up outside the repository**. If it is lost, the app cannot be updated on Google Play. Keystore files are already git-ignored.
3. Provide a **privacy policy** page (the privacy text in [4.12](#412-privacy) is a good starting point) and answer the Play **Data safety** form to match the anonymous usage statistics in [6.13](#613-anonymous-usage-statistics). Do not answer "no data collected" while analytics are enabled.
4. New Google Play developer accounts usually must run a **closed test** before publishing. Check Google's current requirements.
5. **The application ID cannot be changed after the first upload.** Decide the final name and ID first.

**Renaming the app** before first release means changing the app name and ID in `capacitor.config.ts`, the UI strings, `app/manifest.ts`, `lib/app-info.ts` and the About page, and then recreating `android/` (`rm -rf android && pnpm build && pnpm exec cap add android`). Do not hand-edit files inside `android/` until the name is final.

### 6.10 Web and PWA

- `app/manifest.ts` defines the PWA (it must keep `dynamic = "force-static"` for the static export).
- `public/sw.js` is a small network-first service worker with an app-shell cache. It is registered **only in production, only on the web, and only if Offline mode is on**. In development and in the Android app it is never registered, and any old one is removed.
- To force clients to drop old caches after a release, change the cache name in `sw.js` (`convertlab-vN-shell`).

### 6.11 Design system and UI conventions

- **Tokens:** CSS variables in `app/globals.css` (`--navy`, `--blue`, `--card`, `--ink`, `--line`, …). Dark mode overrides them under `html.dark`.
- **Shared classes:** `.page`, `.card`, `.pill`, `.field`, `.primary`, `.press` (tap feedback), `.section-title`, `.iconbox`, `.switch`.
- **Theme:** `lib/theme.ts` applies System / Light / Dark and font size. An inline script in `app/layout.tsx` sets it before first paint to prevent a flash.
- **Touch targets:** at least **44 px** for anything tappable.
- **Safe areas:** respect `env(safe-area-inset-*)` (`.safe-top`, `.safe-bottom`).
- **Motion:** subtle only, and disabled under `prefers-reduced-motion`.
- **Accessibility:** semantic HTML, `aria-label` on icon-only buttons, `aria-pressed` on toggles, `aria-current` on navigation, visible focus rings, and sufficient contrast in both themes.
- **Consistency rule:** every tool must use the same header, input card, result card and favorite, copy and share controls. Do not build a one-off layout for a single calculator.
- **Overlays** (drawers, sheets, dialogs) must use `useOverlay` (`hooks/use-overlay.ts`) so Esc and the Android back button close them.

### 6.12 Testing

```bash
pnpm test          # Vitest (≈550 tests)
pnpm typecheck
```

Tests live next to the code (`*.test.ts`) and cover the calculators, the conversion engine, validation, taxonomy and the registry. `next build` does not type-check test files (they are excluded in `tsconfig.json`), so run `pnpm test` as well as `pnpm build`.

The tests prove that the code does what it was written to do. **They do not prove that a formula is clinically right.** That is what sources, worked examples and clinical review are for (see [7.2](#72-clinical-change-policy)).

`lib/calculators/service-worker-routes.test.ts` is a leftover from the earlier web-only version and is excluded in `vitest.config.ts`.

### 6.13 Anonymous usage statistics

The Android app can report **anonymous** usage to the ConvertLAB web backend (the deployed web app, which owns `/api/analytics` and `/api/analytics/presence` and stores data in Supabase). This is how the number of users and the most-used tools are counted. It is the **only** network traffic the app makes of its own.

**What is sent**

| Field | Example | Notes |
|---|---|---|
| `anonymousId` | a random UUID | Created on first use and kept on the device. Identifies an installation, never a person |
| `calculatorId`, `calculatorName`, `category` | `bmi`, `BMI`, `general` | Which tool was used. Converters report as `conversion:<category>` |
| `occurredAt` | ISO timestamp | When it was used |
| `appVersion`, `source`, `environment` | `3.0.0`, `android`, `production` | `development` for dev builds |
| `wasOffline` | `true` / `false` | Whether the device was offline when the tool was used |

**Never sent:** inputs, results, history, favorites, searches, settings, names, contact details, location or hardware identifiers.

**How it works** (`lib/analytics/`)

- `track.ts` queues an event each time a calculator or converter is used. `outbox.ts` keeps the queue in local storage (500 events at most, oldest dropped), so nothing is lost while offline.
- `sync.ts` sends the queue in batches of 100 and removes only the ids the server accepted.
- `components/analytics-sync.tsx` sends a presence heartbeat every minute while the app is on screen, and flushes the queue when the app returns to the foreground or the device comes back online.
- `http.ts` uses Capacitor's **native** HTTP client, so the backend needs **no CORS configuration** and normal page loading is not affected.
- Analytics run **only** in the Android app, **only** when a backend URL was set at build time, and **only** if the user has not turned off **Settings → Share anonymous usage statistics**.

**Configuration** (the app is a static export, so this is fixed at build time)

```bash
# .env.production  (git-ignored; see .env.example)
NEXT_PUBLIC_ANALYTICS_URL=https://your-web-app.example
```

- `pnpm dev` does not read `.env.production`, so **analytics are off in development** and emulator testing never reaches your real numbers. To test the pipeline, set the variable for the dev run and `NEXT_PUBLIC_APP_ENV=development` so the rows are tagged and easy to delete.
- Leave the variable unset to build a version with analytics completely disabled.

**Backend requirements.** The backend must accept `source: "android"` (a one-line change in both routes, plus the TypeScript type, in the web repository). Until that is deployed, the app's events are rejected with HTTP 400 and stay queued. Deploy the backend change **first**.

**Privacy and the Play Store.** Answer the Data safety form to match this behaviour: an **anonymous identifier** ("Device or other IDs") and **app activity** (which tools are used) are collected, they are **not shared with third parties**, they are sent **encrypted in transit (HTTPS)**, and the user can **opt out** in Settings. Update your privacy policy to say the same. This is engineering guidance, not legal advice. Check the data-protection rules that apply to your users.

**Known limits.** Reinstalling the app or clearing its data creates a new ID, so counts slightly overstate users. The endpoint is public (like the web app's), so a determined person could send fake events. Add rate limiting on the server if that matters. Treat the numbers as indicative.

---

## 7. Contributing

Contributions are welcome: bug reports, clinical corrections, new calculators, translations, accessibility fixes and code. The short version of this section is in [CONTRIBUTING.md](CONTRIBUTING.md), and the security policy is in [SECURITY.md](SECURITY.md). Issues are filed with forms for **wrong results**, **new calculators**, **bugs** and **feature requests**.

### 7.1 Workflow

1. **Open an issue first** for anything non-trivial (new calculator, new screen, a change to a formula).
2. Branch from `main`: `feat/<topic>`, `fix/<topic>`, `docs/<topic>`, `chore/<topic>`.
3. Make small, focused commits with [Conventional Commit](https://www.conventionalcommits.org/) messages, for example `feat: add shock index calculator` or `fix: correct FENa rounding`.
4. Run `pnpm typecheck && pnpm test && pnpm build` before pushing.
5. Open a pull request. Describe what changed and why, and include screenshots for UI changes.

**Pull request checklist**

- [ ] Type-check, tests and build pass
- [ ] New or changed logic has tests (including a worked example from a source)
- [ ] UI changes use the shared components and tokens, work in light **and** dark, and have 44 px touch targets
- [ ] No new network calls, analytics or tracking beyond the documented anonymous usage statistics
- [ ] No patient-identifying data stored or logged
- [ ] Docs updated if behaviour changed
- [ ] Clinical changes follow [7.2](#72-clinical-change-policy)

### 7.2 Clinical change policy

Wrong numbers can hurt people, so clinical content is held to a higher bar than ordinary code.

1. **Every formula or threshold needs an attributable source** (guideline, label, peer-reviewed paper or an official calculator) with its **version or year**, added as reference metadata.
2. **Include at least one worked example from the source** as a test, with the source's own numbers.
3. **State the population and limits** (age, weight range, renal function, setting) in `limitations`, and enforce them with input `min` / `max` and warnings where possible.
4. **Do not change an existing formula silently.** Explain the change and its source in the pull request, and update the reference's version and last-verified date.
5. **Do not remove or weaken a disclaimer or safety warning.**
6. **No prescriptive wording.** Results and interpretations describe, they do not instruct.
7. If a source is out of date or uncertain, mark its reference **`review-needed`** so users see it.
8. Where possible, have a **second person with clinical knowledge** review the change.

### 7.3 Code style

- TypeScript strict mode, no `any` without a comment explaining why.
- Keep logic out of components. Calculation code belongs in `lib/`, as pure functions.
- Components stay small. Split before a file becomes unwieldy.
- No hard-coded repeated data. Put it in a registry or constants file.
- Handle errors, empty states and loading states explicitly.

### 7.4 Reporting security or safety issues

For a **patient-safety issue** (a wrong dose, a wrong unit, a missing warning), open an issue with *SAFETY* in the title and the details from [5.6](#56-reporting-a-wrong-result). For a **security or privacy** concern, do **not** open a public issue. Follow [SECURITY.md](SECURITY.md) and use GitHub's private vulnerability reporting.

### 7.5 Conduct

Be respectful and constructive. Assume good faith, keep feedback about the work, and remember that people here range from first-time contributors to practising clinicians.

---

## 8. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| `Command "build:android" not found` | The script is missing from `package.json`, or you typed a space (`build: android`). Add it, or run `pnpm build && pnpm exec cap sync android` |
| `android platform has not been added yet` | Run `pnpm build && pnpm exec cap add android` |
| Android Studio: *Directory … does not contain a Gradle build* | The `android/` folder is incomplete (for example after switching branches). Recreate it: `rm -rf android && pnpm build && pnpm exec cap add android`, then commit it |
| App stuck on the splash screen (emulator) | Dev server unreachable. Check `pnpm dev` is running, `allowedDevOrigins` includes `10.0.2.2`, and re-run `cap sync` with `CAPACITOR_SERVER_URL` set |
| App loads the dev server in a release build | `CAPACITOR_SERVER_URL` was set during sync. `unset` it and sync again |
| Old screens or an old icon after a change | Uninstall the app from the device, or (web) clear site data. The service worker caches the web build |
| `Cannot find module 'vitest'` | Run `pnpm install` (vitest is a dev dependency) |
| Build fails on a test file | Tests are excluded from the type-check in `tsconfig.json`. Make sure that `exclude` entry is still present |
| `next build` complains about the manifest | `app/manifest.ts` must export `dynamic = "force-static"` |
| Fields look pre-filled or empty unexpectedly | Number inputs start empty and show `defaultValue` as the "e.g." hint. Select inputs keep their default |
| Windows line-ending (CRLF) problems in scripts | Convert with `dos2unix`, or set `core.autocrlf` appropriately |

---

## 9. Roadmap and known limitations

**Planned**

- Final app name, icon and splash screen, then a Google Play release (closed test first).
- A converter home with large category cards.
- True multi-column layouts for tablet and desktop.
- A TalkBack and keyboard accessibility audit.
- `features/` folder structure and `icon` / `route` fields in the registry.
- Optional IndexedDB storage for larger history.
- A systematic clinical review pass of every calculator against its source.

**Known limitations**

- Export on Android uses the share sheet (text) rather than saving a file directly.
- The Android app has been tested on the emulator. Test on your own devices before relying on it.
- Reference metadata carries a last-verified date. Guidance published after it is not reflected.
- Some calculators have only a category-level reference rather than a specific one.
- No iOS build is configured yet (Capacitor supports it).

---

## 10. Glossary

| Term | Meaning |
|---|---|
| **eGFR** | Estimated glomerular filtration rate. An estimate of kidney filtration from creatinine, age and sex |
| **CrCl** | Creatinine clearance. A kidney function estimate (Cockcroft–Gault) often used in drug dosing |
| **BSA** | Body surface area. Used for some drug doses, notably in oncology |
| **BMI** | Body mass index: weight (kg) divided by height (m) squared |
| **Anion gap** | Sodium minus chloride and bicarbonate. Helps interpret acid–base disorders |
| **FENa** | Fractional excretion of sodium |
| **MAP** | Mean arterial pressure |
| **QTc** | Heart-rate-corrected QT interval |
| **CFU** | Colony-forming units. A count of viable microorganisms |
| **McFarland standard** | A turbidity reference used to estimate bacterial suspension density |
| **Beer–Lambert law** | Relates absorbance to concentration and path length |
| **Estimator** | A tool that estimates a value from an equation rather than measuring it |
| **PWA** | Progressive web app. A website that can be installed and used offline |
| **Capacitor** | The tool that wraps a web app as a native Android or iOS app |
| **Static export** | A build that produces plain HTML, CSS and JavaScript files with no server |

---

## 11. Licence and credits

**Licence:** not chosen yet. Until a licence file is added to the repository, all rights are reserved by the author. Please ask before reusing the code, and see [Contributing](#7-contributing) if you would like to help.

**Maintainer:** Ebenezer Ekunke ([@dBillionaire-Dev](https://github.com/dBillionaire-Dev)), Nex.Dev.

**Credits:** clinical reference material comes from the organisations named in each calculator's *Clinical notes & sources* panel (for example the World Health Organization). Built with Next.js, React, Tailwind CSS, Lucide, Vitest and Capacitor.

---

<sub>ConvertLAB is a calculation and reference utility for educational and laboratory use. It is not a prescribing system and does not replace clinical judgement, local protocols, validated laboratory SOPs or manufacturer instructions. Always verify results before acting on them.</sub>
