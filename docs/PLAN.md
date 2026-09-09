# Chest in Chest — Plan

## Goal

A small web game. 5 chests, one inside the next. A cat asks one
question per chest. Right answer opens the chest. Last chest gives
a scratchcard reward.

Made for one player (a gift), but built so anyone can fork it and
put in their own questions and reward.

## Tech stack

Plain HTML, CSS, JS. No build step, no framework. This keeps it
simple and lets GitHub Pages serve it as-is.

## File layout

```
chest-in-chest/
  index.html
  css/style.css
  js/config.js       <- EDIT ME: questions, answers, reward text
  js/main.js         <- game flow (chest state, answer check)
  js/scratchcard.js  <- scratch-off canvas logic
  assets/            <- svg art for chests and cat
  README.md          <- how to customize and deploy
  docs/PLAN.md        <- this file
```

## Art

No image assets exist yet. Plan: hand-code cute cartoon art as
inline SVG (chests, cat, sparkle effects). Simple shapes, rounded
corners, warm colors. No external image tool needed, and SVG stays
crisp on any screen size.

Each of the 5 chests gets a slightly different look (color/pattern)
so they feel distinct, not just a repeated sprite.

## Config file (js/config.js)

One plain JS file, so a stranger can edit it with no build step:

```js
const CHESTS = [
  { question: "Placeholder question 1?", answer: "placeholder1" },
  { question: "Placeholder question 2?", answer: "placeholder2" },
  { question: "Placeholder question 3?", answer: "placeholder3" },
  { question: "Placeholder question 4?", answer: "placeholder4" },
  { question: "Placeholder question 5?", answer: "placeholder5" },
];

const REWARD = {
  amount: "2,000,000 VND",
  note: "Happy birthday my love",
};
```

Answer check: trim whitespace, lowercase, then compare. Simple
string equal, no fuzzy match.

## Game flow

The scene is one island (sand, coconut tree, water) with the cat
sitting beside it. Only one chest sits on the island at a time —
chests are nested, not shown as a row.

1. Show chest N (closed) on the island, the cat, and chest N's
   question.
2. Player types an answer, hits submit (or Enter).
3. Wrong: small shake on the chest, cat's mood switches to
   "Unimpressed". No limit on tries, no penalty.
4. Right: cat's mood switches to "Approving". Chest N plays an
   open animation (lid swings open, brief glow/sparkle), then
   fades out. Chest N+1 fades in on the same spot, closed, with
   its own question. This repeats through chest 5.
5. After chest 5 is opened correctly: the island scene gives way
   to the reward scene — a glowing, shining scratchcard.
6. Player scratches with mouse drag (and touch drag on mobile)
   using a canvas over the hidden text. Scratching clears the
   canvas (destination-out) to reveal `REWARD.amount` and
   `REWARD.note` styled like handwriting underneath.

## Deployment

Repo already has a GitHub remote (`thai-nm/chest-in-chest`). Since
it's plain static files:

1. Push `main` to GitHub.
2. In repo Settings → Pages, set source to `main` branch, root
   folder.
3. Page goes live at `https://thai-nm.github.io/chest-in-chest/`.

No CI, no build step needed.

## Testing plan

- Open `index.html` locally (or `python3 -m http.server`) and play
  through all 5 chests, both wrong and right answers.
- Check the scratch-off works with mouse drag and touch drag.
- Check on a narrow (phone-width) viewport, since the real player
  may open this on a phone.

## Open assumptions (will proceed unless you say otherwise)

- Unlimited answer tries, no hint system for v1.
- Reward text supports one amount + one note line; no support for
  multiple reward lines in v1.
- Chests open in fixed order 1 → 5 (no skipping).
