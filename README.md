# Lois Letters

**First words. Strong roots.**

Mother-tongue and multi-script literacy tools, printable decodables and audio supports for schools, churches and families.

## Start locally

- Install Node.js 24 or newer (`.nvmrc` is set to `24`).
- Run `npm ci` and then `npm run dev`.
- Open the local URL printed by Next.js.

## Routes

- `/` Home, why mother-tongue first, pack steps and featured languages
- `/packs` Browse and filter viewable literacy packs by language and level
- `/packs/[id]` View and print a pack
- `/decodables` Printable syllable and short story practice
- `/audio` HTML audio practice controls
- `/scripts` Respectful, non-exhaustive script notes
- `/teachers` Classroom and church-class guidance
- `/families` Home reading tips
- `/contribute` Save a contribution draft on this device
- `/my-contributions` View and remove local drafts
- `/saved` Saved packs on this device
- `/about`, `/method`, `/contact`, `/privacy`, `/terms`

## Template and assets

The UI uses the supplied OneSchool template's original Bootstrap stylesheet, custom stylesheet, icon fonts, Muli font request, class patterns, spacing, colors and AOS animation library. `app/globals.css` contains only layout support for the product's responsive content, accessibility targets, safe areas and interactive controls. It does not replace the template's design tokens or add new brand effects. Pexels photo details are listed in [image-credits.md](./image-credits.md).

## Local-only features and setup notes

Saved packs, locale preference and contribution drafts use browser local storage. Contribution drafts are not transmitted to a server, and the interface says so. No learner analytics are collected. The contribution form includes reCAPTCHA v3 checks with a v2 checkbox fallback when matching site and version-specific secret keys are supplied in `.env.example`. Drafts remain local and are not remotely submitted. Optional Google sign-in is available when OAuth credentials and an Auth secret are configured. Account identity does not sync local drafts to a server. Do not represent local drafts as submitted contributions.

The audio page uses native HTML audio controls with a text-to-speech audio source. Browser connectivity and language quality can vary, so qualified speakers should confirm pronunciations.

## Configuration

Copy `.env.example` to `.env.local` and add configured service keys before enabling authentication or remote contribution delivery. `vercel.json` pins deployment to `cdg1` and supplies response security headers.

## Build and checks

```sh
npm ci
npx tsc --noEmit
npm run build
npm audit --audit-level=high
```

**Security gate note:** the requested exact `next-auth@5.0.0-beta.28` pin is currently reported by `npm audit` with critical Auth.js advisories. It has been kept to honor the required stack pin, and Google sign-in stays disabled until credentials are configured. This means `npm audit --audit-level=high` currently fails. Resolve the version-versus-audit conflict by approving a patched NextAuth release before enabling OAuth or merging for production.

Review local storage, privacy disclosures, language examples, image context and local curriculum alignment before classroom use. These are educational support materials only, not a full curriculum replacement or an official ministry product. Adapt to local standards and test with qualified teachers.
