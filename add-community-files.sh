#!/usr/bin/env bash
# ConvertLAB — community files: CONTRIBUTING, SECURITY, issue forms, PR template (+ optional LICENSE)
# Run from the repository root:   bash add-community-files.sh
#
#   Adds   CONTRIBUTING.md, SECURITY.md
#          .github/PULL_REQUEST_TEMPLATE.md
#          .github/ISSUE_TEMPLATE/  wrong-result.yml, new-calculator.yml, bug-report.yml, feature-request.yml, config.yml
#   Edits  README.md  (security contact + links to the new files), only where the original text is still there
#
#   LICENSE is OPT-IN, because publishing a licence is your decision and is hard to undo once others copy the code:
#       WITH_LICENSE=MIT bash add-community-files.sh
#
# Safe to re-run. It never overwrites an existing LICENSE, and it backs up files it replaces
# into .convertlab-backups/community/.

set -euo pipefail

if [ ! -f package.json ] || [ ! -f README.md ]; then
  echo "✗ Run this from the repository root (package.json and README.md must exist)."; exit 1
fi
command -v node >/dev/null 2>&1 || { echo "✗ Node.js is required."; exit 1; }

BK=".convertlab-backups/community"
put() {
  mkdir -p "$(dirname "$1")"
  if [ -f "$1" ] && [ ! -f "$BK/$1" ]; then mkdir -p "$BK/$(dirname "$1")"; cp "$1" "$BK/$1"; fi
  cat > "$1"
}

echo "▶ 1/4  Writing community files"
put "CONTRIBUTING.md" <<'__CL_EOF__'
# Contributing to ConvertLAB

Thank you for helping. ConvertLAB is used for clinical and laboratory work, so we welcome code, clinical corrections, new calculators, accessibility fixes and documentation, and we hold clinical content to a higher bar than ordinary code.

The full technical guide is in the [README](README.md#6-developer-guide). This file is the short version of how to contribute.

## Ways to help

| I want to… | Do this |
|---|---|
| Report a **wrong result, unit or reference** | Open an issue with the **"Wrong result or reference"** form. This is the most valuable report you can send |
| Suggest a **new calculator** | Open the **"New calculator"** form. A source and a worked example are required |
| Report a **bug** (layout, crash, Android behaviour) | Open the **"Bug report"** form |
| Suggest a **feature or improvement** | Open the **"Feature request"** form |
| Report a **security or privacy** concern | **Do not open a public issue.** See [SECURITY.md](SECURITY.md) |
| Fix something yourself | Follow the workflow below |

## Ground rules

1. **Patient safety first.** If a change could make a result wrong or a warning weaker, it needs extra scrutiny and a source.
2. **Local-first and private.** No analytics, tracking, accounts, backend calls or remote fonts and scripts. No patient-identifying data stored or logged.
3. **One product.** Use the shared components and design tokens. Do not give a single calculator its own one-off layout.
4. **Logic stays out of the UI.** Calculation and conversion code lives in `lib/` as pure functions with tests.
5. **Be respectful.** Assume good faith and keep feedback about the work. Contributors range from first-timers to practising clinicians.

## Set up

Requirements: Node.js 22+, pnpm. For Android work: Android Studio Otter (2025.2.1) or newer. Details are in the [README](README.md#62-prerequisites).

```bash
git clone <repo-url>
cd <project-folder>
pnpm install
pnpm dev
```

Before every push:

```bash
pnpm typecheck && pnpm test && pnpm build
```

## Workflow

1. **Open an issue first** for anything non-trivial (a new calculator, a new screen, a change to a formula), so we can agree on the approach.
2. Branch from `main`: `feat/<topic>`, `fix/<topic>`, `docs/<topic>` or `chore/<topic>`.
3. Make small, focused commits using [Conventional Commits](https://www.conventionalcommits.org/): `feat: add shock index calculator`, `fix: correct FENa rounding`, `docs: clarify import behaviour`.
4. Run the checks above.
5. Open a pull request using the template. Include screenshots for UI changes, in **light and dark**.
6. Respond to review. Clinical changes may be reviewed by a second person with clinical knowledge, which can take longer.

## Clinical change policy

Wrong numbers can hurt people. For anything touching a formula, threshold, dose, unit or reference:

1. **Every formula or threshold needs an attributable source** (guideline, product label, peer-reviewed paper, or an official calculator) with its **version or year**, recorded as reference metadata.
2. **Include at least one worked example from the source** as a test, using the source's own numbers.
3. **State the population and limits** (age, weight range, renal function, setting) in `limitations`, and enforce them with input `min` / `max` and warnings where possible.
4. **Never change an existing formula silently.** Explain the change and its source in the pull request, and update the reference's version and last-verified date.
5. **Never remove or weaken a disclaimer or safety warning.**
6. **No prescriptive wording.** Results describe ("value in the high range"), they do not instruct ("give X").
7. If a source is out of date or uncertain, mark its reference **`review-needed`** so users can see it.
8. Where possible, get a **second reviewer with clinical knowledge**.

Do not copy text, tables or code from copyrighted calculators, apps or guidelines. Implement the published formula yourself and cite it.

## Adding a calculator (summary)

The complete walkthrough, with a code example, is in the [README](README.md#67-adding-a-calculator).

1. Write a `CalculatorDefinition` in the right file under `lib/calculators/definitions/`.
2. Register it in `lib/calculators/registry.ts`.
3. Add the sub-category label in `types.ts` if you introduce one.
4. Add reference metadata (`dosing-references.ts` or the chemistry reference map).
5. Add tests next to the definition: a worked example from the source, each unit option, boundaries, and invalid input.
6. Run `pnpm typecheck && pnpm test && pnpm build`.

`calculate` must be pure, must throw on invalid input, and must use the helpers (`num`, `safeDivide`, `round`, …) instead of ad-hoc parsing.

## Pull request checklist

- [ ] `pnpm typecheck`, `pnpm test` and `pnpm build` pass
- [ ] New or changed logic has tests, including a worked example from a source
- [ ] UI uses the shared components and tokens, works in light and dark, and keeps 44 px touch targets
- [ ] No new network calls, analytics or tracking
- [ ] No patient-identifying data stored or logged
- [ ] Docs updated if behaviour changed
- [ ] Clinical changes follow the policy above

## Releases and the Android app

Maintainers handle releases (version bump, signing, Play Console). Please do not commit keystores, `local.properties`, `.env` files or a `CAPACITOR_SERVER_URL` baked into `android/`. See the [README](README.md#69-android-and-capacitor).

## Licence of contributions

By submitting a contribution you agree that it may be distributed under the repository's licence (see `LICENSE`, if present; otherwise the maintainer's terms in the README).
__CL_EOF__
put "SECURITY.md" <<'__CL_EOF__'
# Security and safety policy

ConvertLAB is an offline-first calculator and reference app with **no backend, no accounts and no analytics**, so its security surface is small. It is still used in clinical settings, so we take both **security** and **patient-safety** reports seriously.

## Two kinds of report

| Kind | Examples | Where to report |
|---|---|---|
| **Patient safety** | A wrong dose, formula, unit conversion, threshold or reference. A missing or weakened warning | A **public issue** using the **"Wrong result or reference"** form, so others are warned and it can be fixed quickly |
| **Security or privacy** | Stored data readable by other apps, a vulnerable dependency, malicious code, an exposed secret or signing key, unexpected network traffic, a way to execute untrusted content | **Privately**, as described below. Please do **not** open a public issue |

If you are unsure, report it privately.

## How to report a security or privacy issue

Use GitHub's **private vulnerability reporting**: open the repository's **Security** tab and choose **Report a vulnerability**.

Please include:

- what you found and where (file, screen, or Android component);
- steps to reproduce, and the app version and platform (Android version, or browser);
- the impact you believe it has;
- any suggested fix.

This is maintained by an individual, so responses are best-effort. We aim to acknowledge reports within a week and to keep you informed until the issue is resolved. Please give us a reasonable chance to fix a problem before disclosing it publicly. We are happy to credit you in the fix if you wish.

## Supported versions

ConvertLAB is pre-release. Fixes are made on the latest `main` branch, and only the most recent release will be supported once the app is published.

## Scope notes

- **In scope:** this repository's code, its build configuration, the Android wrapper (`android/`, Capacitor configuration), and its dependencies as used here.
- **Data:** history, favorites, recent searches and settings are stored in the device's local storage, unencrypted, and never leave the device. Anyone with access to an unlocked device or its app data can read them. This is by design. Please do not enter patient-identifying information.
- **Out of scope:** issues in third-party websites linked from source references, or in your own device's operating system.

## Hardening reminders for contributors

- Never commit keystores (`*.jks`, `*.keystore`), `local.properties`, `.env` files or API keys.
- Do not add analytics, tracking, remote scripts or remote fonts.
- Do not ship a release with `CAPACITOR_SERVER_URL` set. Check that `android/app/src/main/assets/capacitor.config.json` contains no `url`.
- Keep dependencies current, and run `pnpm audit` before releases.
__CL_EOF__
put ".github/PULL_REQUEST_TEMPLATE.md" <<'__CL_EOF__'
## What changed and why

<!-- A short description. Link the issue: Closes #123 -->

## Type

- [ ] Bug fix
- [ ] New calculator / conversion / tool
- [ ] Change to an existing formula, threshold or reference (**clinical change**)
- [ ] UI / UX
- [ ] Documentation
- [ ] Build / tooling

## Clinical changes only (delete if not applicable)

- **Source and version/year:**
- **Link:**
- **Worked example from the source (inputs → expected result):**
- **Population and limits stated in `limitations`:** 
- **Reviewed by a second person with clinical knowledge?** yes / no

## Screenshots (UI changes, light **and** dark)

## Checklist

- [ ] `pnpm typecheck`, `pnpm test` and `pnpm build` pass
- [ ] New or changed logic has tests, including a worked example from a source
- [ ] UI uses the shared components and tokens, works in light and dark, and keeps 44 px touch targets
- [ ] No new network calls, analytics or tracking
- [ ] No patient-identifying data stored or logged
- [ ] No disclaimer or safety warning removed or weakened
- [ ] Docs updated if behaviour changed
__CL_EOF__
put ".github/ISSUE_TEMPLATE/wrong-result.yml" <<'__CL_EOF__'
name: "⚠️ Wrong result or reference (clinical safety)"
description: A calculator, conversion, unit, threshold or reference looks wrong
title: "SAFETY: <calculator name> - <short description>"
labels: ["safety", "clinical"]
body:
  - type: markdown
    attributes:
      value: |
        Thank you. Reports like this are the most valuable thing you can send.

        **Do not include patient-identifying information** (names, record numbers, dates of birth). Use made-up or anonymised numbers.
  - type: input
    id: calculator
    attributes:
      label: Calculator or converter
      description: The exact name as shown in the app
      placeholder: "e.g. Creatinine Clearance (Cockcroft-Gault)"
    validations:
      required: true
  - type: dropdown
    id: platform
    attributes:
      label: Where did you see it?
      options:
        - Android app
        - Web browser
        - Both
        - Not sure
    validations:
      required: true
  - type: input
    id: version
    attributes:
      label: App version
      description: Settings → About
      placeholder: "e.g. 3.0.0"
  - type: textarea
    id: inputs
    attributes:
      label: Exact inputs and units you entered
      description: Every field, with its unit and any dropdown choice
      placeholder: |
        Age: 65 years
        Weight: 70 kg
        Serum creatinine: 1.2 mg/dL
        Sex: Male
    validations:
      required: true
  - type: textarea
    id: got
    attributes:
      label: Result the app gave
      description: Copy the result, or paste a screenshot
    validations:
      required: true
  - type: textarea
    id: expected
    attributes:
      label: Result you expected, and why
      description: Include your working if you have it
    validations:
      required: true
  - type: textarea
    id: source
    attributes:
      label: Source for the expected result
      description: Guideline, product label, paper or official calculator, with its version/year and a link if possible
      placeholder: "e.g. WHO guidelines for malaria, 2026 edition, section …"
    validations:
      required: true
  - type: dropdown
    id: severity
    attributes:
      label: How serious could this be?
      options:
        - Could lead to harm if relied upon (wrong dose, wrong unit, missing warning)
        - Misleading but unlikely to cause harm
        - Cosmetic or wording only
        - Not sure
    validations:
      required: true
  - type: checkboxes
    id: confirm
    attributes:
      label: Before submitting
      options:
        - label: I checked the units and dropdown choices I entered
          required: true
        - label: This report contains no patient-identifying information
          required: true
__CL_EOF__
put ".github/ISSUE_TEMPLATE/new-calculator.yml" <<'__CL_EOF__'
name: "🧮 New calculator or conversion"
description: Propose a calculator, converter or lab tool
title: "Calculator: <name>"
labels: ["enhancement", "new-calculator"]
body:
  - type: markdown
    attributes:
      value: |
        A source and a worked example are required. We cannot add a clinical tool without them. Please do not paste text or tables from copyrighted calculators, apps or guidelines. Describe the published formula in your own words and cite it.
  - type: input
    id: name
    attributes:
      label: Name
      placeholder: "e.g. Shock Index"
    validations:
      required: true
  - type: dropdown
    id: category
    attributes:
      label: Best category
      options:
        - General
        - Renal
        - Clinical Chemistry
        - Hematology
        - Microbiology
        - Laboratory Solutions
        - Spectrophotometry
        - Drug Dosing
        - Oncology
        - Cardiovascular
        - Stem Cell & Transplant
        - Unit conversion
        - Lab tool (other)
        - Not sure
    validations:
      required: true
  - type: textarea
    id: purpose
    attributes:
      label: What is it used for, and by whom?
      description: Who would use it and in what situation?
    validations:
      required: true
  - type: textarea
    id: formula
    attributes:
      label: Formula or method
      description: Write it out, with the units of each input and of the result
    validations:
      required: true
  - type: textarea
    id: source
    attributes:
      label: Source and version
      description: Guideline, label, paper or official calculator, with year/version and a link
    validations:
      required: true
  - type: textarea
    id: population
    attributes:
      label: Population and limits
      description: Age, weight range, renal function, setting, and anything where the tool should not be used
    validations:
      required: true
  - type: textarea
    id: example
    attributes:
      label: Worked example from the source
      description: Inputs with units, and the expected result, using the source's own numbers
    validations:
      required: true
  - type: textarea
    id: units
    attributes:
      label: Units and options
      description: Which unit choices should the user get (for example kg / lb)?
  - type: checkboxes
    id: confirm
    attributes:
      label: Before submitting
      options:
        - label: I checked that this tool is not already in the app (try Search)
          required: true
        - label: I am not copying text or tables from a copyrighted source
          required: true
        - label: I am willing to help test or review it
__CL_EOF__
put ".github/ISSUE_TEMPLATE/bug-report.yml" <<'__CL_EOF__'
name: "🐞 Bug report"
description: Something in the app does not work (layout, crash, Android behaviour)
title: "Bug: <short description>"
labels: ["bug"]
body:
  - type: markdown
    attributes:
      value: |
        For a **wrong calculation result**, please use the **"Wrong result or reference"** form instead.
        For a **security or privacy** concern, do not open an issue. See SECURITY.md.
  - type: textarea
    id: what
    attributes:
      label: What happened?
      description: Tell us what you did, what you expected, and what happened instead
    validations:
      required: true
  - type: textarea
    id: steps
    attributes:
      label: Steps to reproduce
      placeholder: |
        1. Open Tools → Calculators
        2. …
    validations:
      required: true
  - type: dropdown
    id: platform
    attributes:
      label: Platform
      options:
        - Android app
        - Web (desktop browser)
        - Web (mobile browser)
        - Android emulator
    validations:
      required: true
  - type: input
    id: device
    attributes:
      label: Device, Android version or browser
      placeholder: "e.g. Pixel 7, Android 15, or Chrome 130 on Linux"
  - type: input
    id: version
    attributes:
      label: App version
      description: Settings → About
  - type: dropdown
    id: theme
    attributes:
      label: Theme in use
      options:
        - Light
        - Dark
        - System
        - Not relevant
  - type: textarea
    id: extra
    attributes:
      label: Screenshots, logs or anything else
      description: On Android, Logcat lines containing "Capacitor" help. Remove any personal information first
__CL_EOF__
put ".github/ISSUE_TEMPLATE/feature-request.yml" <<'__CL_EOF__'
name: "💡 Feature request"
description: Suggest an improvement to the app
title: "Feature: <short description>"
labels: ["enhancement"]
body:
  - type: textarea
    id: problem
    attributes:
      label: What problem would this solve?
      description: Who is affected and in what situation?
    validations:
      required: true
  - type: textarea
    id: idea
    attributes:
      label: What would you like to see?
    validations:
      required: true
  - type: textarea
    id: alternatives
    attributes:
      label: Alternatives you considered
  - type: dropdown
    id: area
    attributes:
      label: Area
      options:
        - Calculators
        - Conversions
        - Lab tools
        - Search
        - History / Favorites
        - Settings / Backup
        - Android app
        - Accessibility
        - Documentation
        - Other
    validations:
      required: true
__CL_EOF__

echo "▶ 2/4  Issue chooser (.github/ISSUE_TEMPLATE/config.yml)"
REMOTE="$(git remote get-url origin 2>/dev/null || true)"
SLUG="$(printf '%s' "$REMOTE" | sed -E 's#^(git@github\.com:|https?://([^@/]+@)?github\.com/)##; s#\.git$##')"
if printf '%s' "$SLUG" | grep -Eq '^[^/]+/[^/]+$'; then
  put ".github/ISSUE_TEMPLATE/config.yml" <<EOF
blank_issues_enabled: false
contact_links:
  - name: 🔒 Report a security or privacy issue (private)
    url: https://github.com/$SLUG/security/advisories/new
    about: Please do not open a public issue for security or privacy problems.
EOF
  echo "  linked to https://github.com/$SLUG"
else
  put ".github/ISSUE_TEMPLATE/config.yml" <<'EOF'
blank_issues_enabled: false
EOF
  echo "  no GitHub remote found; wrote a minimal config (re-run after 'git remote add origin …' to add the security link)"
fi

echo "▶ 3/4  README.md"
[ -f "$BK/README.md" ] || { mkdir -p "$BK"; cp README.md "$BK/README.md"; }
WITH_LICENSE="${WITH_LICENSE:-}" node - <<'NODE'
const fs = require("fs")
let s = fs.readFileSync("README.md", "utf8").replace(/\r\n/g, "\n")
let changed = false
function swap(label, a, b) {
  if (s.includes(b)) console.log("  – " + label + ": already applied")
  else if (s.includes(a)) { s = s.replace(a, () => b); changed = true; console.log("  ✓ " + label) }
  else console.log("  – " + label + ": original text not found (already edited?) — skipped")
}
swap("security contact",
  "For a **security or privacy** concern, contact the maintainer directly instead of opening a public issue.",
  "For a **security or privacy** concern, do **not** open a public issue. Follow [SECURITY.md](SECURITY.md) and use GitHub's private vulnerability reporting.")
swap("contributing pointer",
  "Contributions are welcome: bug reports, clinical corrections, new calculators, translations, accessibility fixes and code.",
  "Contributions are welcome: bug reports, clinical corrections, new calculators, translations, accessibility fixes and code. The short version of this section is in [CONTRIBUTING.md](CONTRIBUTING.md), and the security policy is in [SECURITY.md](SECURITY.md). Issues are filed with forms for **wrong results**, **new calculators**, **bugs** and **feature requests**.")
if (process.env.WITH_LICENSE === "MIT") {
  swap("licence paragraph",
    "**Licence:** not chosen yet. Until a licence file is added to the repository, all rights are reserved by the author. Please ask before reusing the code, and see [Contributing](#7-contributing) if you would like to help.",
    "**Licence:** [MIT](LICENSE). The software is provided \"as is\", without warranty of any kind. The medical disclaimer in [section 2](#2-safety-and-intended-use) still applies: ConvertLAB is not a medical device and not a substitute for clinical judgement.")
}
if (changed) fs.writeFileSync("README.md", s)
NODE

echo "▶ 4/4  Licence"
if [ "${WITH_LICENSE:-}" = "MIT" ]; then
  if [ -f LICENSE ]; then
    echo "  LICENSE already exists — left untouched"
  else
    cat > LICENSE <<'__CL_EOF__'
MIT License

Copyright (c) 2026 Ebenezer Ekunke

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
__CL_EOF__
    echo "  wrote LICENSE (MIT)"
  fi
else
  echo "  skipped. Not licensed yet = all rights reserved. To add MIT:  WITH_LICENSE=MIT bash add-community-files.sh"
fi

echo
echo "✓ Done. Review with:  git status && git diff README.md"
echo "  Then:  git add -A && git commit -m \"docs: add contributing, security policy, issue forms and PR template\" && git push"
echo
echo "  On GitHub, also:"
echo "   • Settings → Code security → enable \"Private vulnerability reporting\" (SECURITY.md points to it)"
echo "   • Create the labels the forms use:  safety, clinical, new-calculator, bug, enhancement"
