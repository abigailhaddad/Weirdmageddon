# Project: Gravity Falls Choose Your Own Adventure

## What This Is

A browser-based choose-your-own-adventure fan fiction set during Gravity Falls: Weirdmageddon. Open `index.html` in a browser to play. No build step, no dependencies — just static HTML/CSS/JS.

## Architecture

- **`story.js`** — The single source of truth. Contains ALL story nodes in a `storyData` object. This is the file loaded by the browser.
- **`branch_*.js`** — Reference/organizational copies of each branch's nodes. These are NOT loaded by the browser. If you edit story content, you must update BOTH `story.js` AND the corresponding `branch_*.js` file to keep them in sync.
- **`engine.js`** — The game engine. Reads `storyData`, renders text and choices, tracks the path. Small and simple.
- **`style.css`** — Journal 3 themed styling. Includes a fixed fan fiction disclaimer watermark.
- **`index.html`** — Entry point. Loads `story.js` and `engine.js`.

## Story Node Format

```js
node_name: {
  text: "Paragraph one.\n\nParagraph two.",
  choices: [
    { label: "Choice text shown to player", target: "other_node_name" }
  ]
}
```

Ending nodes use `ending: true` instead of `choices`:

```js
ending_name: {
  text: "The ending text...",
  ending: true
}
```

## Four Branches

1. **Bunker** (`bunker_*`) — Flee to Ford's underground bunker
2. **Resistance** (`resistance_*`) — Rally fighters at the Mystery Shack
3. **Fearamid** (`fearamid_*`) — Confront Bill directly at his fortress
4. **Axolotl** (`axolotl_*`) — Search for the cosmic entity

## Ending Design Rules

- **Most endings should be bad.** Characters fail, get captured, die, or worse. This is Weirdmageddon.
- **Only two good endings exist:** `ending_axolotl_confrontation` (cosmic battle victory) and `ending_axolotl_reset_good` (sacrifice together). Do not add more good endings without discussion.
- Bad endings should be creative and varied — not just "Bill kills everyone" over and over. Gold transformations, time loops, dimensional exile, petrification, sock puppets, etc.

## Fan Fiction Disclaimer

A watermark reading "FAN FICTION — NOT AFFILIATED WITH DISNEY OR GRAVITY FALLS" appears on every page via CSS. Do not remove this.

## Rules for Claude

- **Commit changes when you make them.** Don't wait for the user to ask.
- When editing story text, update BOTH `story.js` and the corresponding `branch_*.js` file.
- Preserve the existing writing style: long, vivid, character-accurate prose with humor even in dark moments. Bill's dialogue is ALL CAPS.
- Keep the Journal 3 visual theme intact.
- No build tools, no frameworks, no npm. This stays as plain static files.
