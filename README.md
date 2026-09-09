# Chest in Chest

A tiny web game. Five chests, one inside the next. A cat asks a
question at each chest. The right answer opens it. The last chest
hands you a scratchcard.

Plain HTML, CSS and JS. No build step, no framework.

## Play it

Open `index.html` in a browser. That is all.

If your browser blocks local files, serve the folder:

```
python3 -m http.server
```

then visit http://localhost:8000

## Make it yours

Edit `js/config.js`. It is the only file you need to touch.

```js
const GAME = {
  title: "Chest in Chest",
  subtitle: "Five chests. One cat. Answer well.",
};

const CHESTS = [
  { question: "What street did we first meet on?", answer: "Nguyen Hue" },
  // ...five of them
];

const REWARD = {
  amount: "2,000,000 VND",
  note: "Happy birthday my love",
};
```

Answer check is loose but simple: it trims spaces, lowercases, and
collapses double spaces. So `" Nguyen  HUE "` matches `"Nguyen Hue"`.
No fuzzy match beyond that.

You can have more or fewer than five chests. The art cycles through
five looks, and the progress dots follow the list length.

## Deploy on GitHub Pages

1. Push to GitHub.
2. Settings → Pages → Source: `main` branch, `/` (root).
3. It goes live at `https://<user>.github.io/<repo>/`.

No CI, no build.

## Files

```
index.html
css/style.css
js/config.js       <- edit me
js/main.js         <- game flow
js/art.js          <- inline SVG art
js/scratchcard.js  <- scratch-off canvas
docs/PLAN.md
```
