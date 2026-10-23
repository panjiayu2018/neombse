# NeoMBSE

An independent directory for UML, SysML v1, and SysML v2 tools. The site is built as static HTML with Astro and performs search and filtering in the visitor's browser.

## Local development

Requirements:

- Node.js 22.22 or newer (an even-numbered release)
- Git

On Windows PowerShell, use `npm.cmd` if the local execution policy blocks `npm.ps1`:

```powershell
npm.cmd install
npm.cmd run dev
```

Open `http://localhost:4321/`.

## Quality checks

```powershell
npm.cmd run check
npm.cmd run check:data
npm.cmd run build
```

The production output is written to `dist/`.

## Data

Each tool is stored as one JSON file in `src/data/tools/`. Adding a record automatically adds it to the directory and creates a static detail page at `/tools/<id>/`.

Audit-only additions that do not exist in the two legacy HTML catalogs are also stored as individual JSON records in this directory. Re-running the legacy importer updates its own matching records but does not delete these independently reviewed additions.

The current catalog is imported from `tools/umltools.html` and `tools/sysmltools.html`. The importer merges duplicated records, applies the reviewed English metadata in `scripts/legacy-tool-overrides.mjs`, then applies the evidence-backed classification and capability corrections in `scripts/audit-overrides.mjs`. It copies referenced images and writes the site JSON files:

```powershell
npm.cmd run import:legacy
```

Update the two source HTML files and their image folders first, then update the English override map when a new heading is introduced. The import fails rather than silently publishing a tool without reviewed English metadata.

The audit override is part of the import pipeline so a future legacy import cannot silently restore ambiguous values such as `Cross-platform`, treat a browser as an operating system, or discard capability evidence.

The original `tools/pics/` and `tools/sysmlpics/` archives remain local and are ignored by Git to avoid storing two copies of every image. Referenced images are copied into the tracked `public/images/tools/` directory by the importer.

Classification fields intentionally separate:

- client operating systems;
- delivery / access modes;
- runtimes and host applications;
- source-code licensing and pricing models.

Capability evidence is attached to the individual capability and records the source, review date, availability condition, and any scope note.

Unverified P2/P3 candidates live in `src/data/toolCandidates.ts` and are published separately at `/coverage/`. They must not be promoted into `src/data/tools/` until their scope and claims have been checked against primary sources.

`npm run check:data` validates required classifications, rejects ambiguous operating-system values, and confirms that capability evidence agrees with the published state. It also runs automatically before each production build.

Capability values are deliberately three-state:

- `Yes`: supported by a current primary source or reproducible test.
- `No`: a source or test establishes that the capability is absent.
- `Unknown`: not yet verified; this is not evidence of absence.

## Cloudflare Pages

Use these build settings:

- Production branch: `main`
- Build command: `npm run build`
- Build output directory: `dist`
- Recommended Node version: `22.22.0` (also declared in `.nvmrc`)

The canonical site URL is configured as `https://neombse.com` in `astro.config.mjs`.
