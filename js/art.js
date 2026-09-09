// Hand-coded SVG art: island, cat, chests.
// Everything here returns an SVG string. No image files needed.

const CHEST_STYLES = [
  { light: "#c58e52", body: "#a9713f", dark: "#7f5129", band: "#f4c95d", stud: "#d9a63c", pattern: "dots" },
  { light: "#5fc9c0", body: "#3aa79e", dark: "#25786f", band: "#dfe7ea", stud: "#b6c4c9", pattern: "waves" },
  { light: "#a986e0", body: "#8a63c9", dark: "#63449b", band: "#f4c95d", stud: "#d9a63c", pattern: "stars" },
  { light: "#f08a7a", body: "#dd6152", dark: "#a93f34", band: "#f4c95d", stud: "#d9a63c", pattern: "hearts" },
  { light: "#4a6fbf", body: "#33509a", dark: "#20356c", band: "#ffd977", stud: "#ffbe3d", pattern: "crown" },
];

function chestPattern(style) {
  const c = style.light;
  switch (style.pattern) {
    case "dots":
      return `<g fill="${c}" opacity=".55">
        <circle cx="38" cy="82" r="4"/><circle cx="70" cy="94" r="4"/><circle cx="102" cy="82" r="4"/>
      </g>`;
    case "waves":
      return `<g fill="none" stroke="${c}" stroke-width="3" stroke-linecap="round" opacity=".6">
        <path d="M30 86q8-7 16 0t16 0"/><path d="M78 96q8-7 16 0t16 0"/>
      </g>`;
    case "stars":
      return `<g fill="${c}" opacity=".7">
        <path d="M40 78l3 7 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z"/>
        <path d="M98 88l2 5 6 1-4 4 1 6-5-3-5 3 1-6-4-4 6-1z"/>
      </g>`;
    case "hearts":
      return `<g fill="${c}" opacity=".7">
        <path d="M70 96c-9-6-13-10-13-15a6 6 0 0 1 13-3 6 6 0 0 1 13 3c0 5-4 9-13 15z"/>
      </g>`;
    case "crown":
      return `<g fill="${style.band}" opacity=".85">
        <path d="M52 92l5-11 6 7 7-11 7 11 6-7 5 11z"/>
      </g>`;
    default:
      return "";
  }
}

function chestArt(index) {
  const s = CHEST_STYLES[index % CHEST_STYLES.length];
  return `
<svg class="chest" viewBox="0 0 140 130" role="img" aria-label="Treasure chest ${index + 1}">
  <defs>
    <radialGradient id="glow${index}" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#fff6c9" stop-opacity=".95"/>
      <stop offset="100%" stop-color="#ffd977" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <ellipse class="chest-shadow" cx="70" cy="120" rx="52" ry="9" fill="#000" opacity=".16"/>

  <g class="chest-inner">
    <path d="M18 44h104v34H18z" fill="${s.dark}"/>
    <ellipse cx="70" cy="46" rx="52" ry="12" fill="#2c1c10"/>
    <ellipse class="chest-glow" cx="70" cy="42" rx="54" ry="30" fill="url(#glow${index})"/>
  </g>

  <g class="chest-body">
    <path d="M18 62h104a6 6 0 0 1 6 6v40a8 8 0 0 1-8 8H20a8 8 0 0 1-8-8V68a6 6 0 0 1 6-6z" fill="${s.body}"/>
    <path d="M18 62h104a6 6 0 0 1 6 6v6H12v-6a6 6 0 0 1 6-6z" fill="${s.light}" opacity=".5"/>
    <path d="M12 104h116v4a8 8 0 0 1-8 8H20a8 8 0 0 1-8-8z" fill="${s.dark}" opacity=".45"/>
    ${chestPattern(s)}
    <rect x="62" y="66" width="16" height="48" rx="3" fill="${s.band}"/>
    <rect x="14" y="82" width="112" height="7" rx="3.5" fill="${s.band}" opacity=".8"/>
    <g fill="${s.stud}">
      <circle cx="24" cy="70" r="3"/><circle cx="116" cy="70" r="3"/>
      <circle cx="24" cy="108" r="3"/><circle cx="116" cy="108" r="3"/>
    </g>
    <rect class="chest-lock" x="60" y="72" width="20" height="18" rx="4" fill="${s.stud}" stroke="${s.dark}" stroke-width="2"/>
    <circle cx="70" cy="80" r="3" fill="${s.dark}"/>
  </g>

  <g class="chest-lid">
    <path d="M14 62a56 40 0 0 1 112 0z" fill="${s.body}"/>
    <path d="M14 62a56 40 0 0 1 112 0h-10a46 32 0 0 0-92 0z" fill="${s.light}" opacity=".55"/>
    <rect x="62" y="26" width="16" height="36" fill="${s.band}"/>
    <path d="M14 58h112v6H14z" fill="${s.band}" opacity=".8"/>
    <g fill="${s.stud}"><circle cx="30" cy="44" r="3"/><circle cx="110" cy="44" r="3"/></g>
  </g>

  <g class="chest-sparkles" fill="#ffe9a3">
    <path class="spark s1" d="M70 12l3 8 8 3-8 3-3 8-3-8-8-3 8-3z"/>
    <path class="spark s2" d="M24 30l2 6 6 2-6 2-2 6-2-6-6-2 6-2z"/>
    <path class="spark s3" d="M116 26l2 6 6 2-6 2-2 6-2-6-6-2 6-2z"/>
    <circle class="spark s4" cx="46" cy="14" r="3"/>
    <circle class="spark s5" cx="98" cy="18" r="2.5"/>
  </g>
</svg>`;
}

function catArt() {
  return `
<svg class="cat" viewBox="0 0 120 140" role="img" aria-label="A cat sitting on the island">
  <ellipse cx="60" cy="132" rx="38" ry="7" fill="#000" opacity=".15"/>

  <path class="cat-tail" d="M92 118q26 6 20-18t-14-16" fill="none" stroke="#f0a860" stroke-width="11" stroke-linecap="round"/>

  <path d="M32 128q-6-42 28-42t28 42z" fill="#f5b978"/>
  <path d="M46 128q-4-26 14-26t14 26z" fill="#ffe6c6"/>

  <path d="M28 118q-12 4-12 10h20z" fill="#f5b978"/>
  <path d="M92 118q12 4 12 10H84z" fill="#f5b978"/>

  <g class="cat-head">
    <path d="M26 44l4-24 20 12z" fill="#f5b978"/>
    <path d="M94 44l-4-24-20 12z" fill="#f5b978"/>
    <path d="M32 30l2-11 9 6z" fill="#f2907f"/>
    <path d="M88 30l-2-11-9 6z" fill="#f2907f"/>
    <ellipse cx="60" cy="56" rx="36" ry="30" fill="#f5b978"/>
    <ellipse cx="60" cy="64" rx="20" ry="15" fill="#ffe6c6"/>

    <g class="face face-neutral">
      <ellipse cx="46" cy="52" rx="4" ry="5" fill="#3b2a1c"/>
      <ellipse cx="74" cy="52" rx="4" ry="5" fill="#3b2a1c"/>
      <path d="M60 62l-4-3h8z" fill="#f2907f"/>
      <path d="M52 70q8 6 16 0" fill="none" stroke="#3b2a1c" stroke-width="2.5" stroke-linecap="round"/>
    </g>

    <g class="face face-bad">
      <path d="M41 52l9 3M79 52l-9 3" stroke="#3b2a1c" stroke-width="3" stroke-linecap="round" fill="none"/>
      <path d="M60 62l-4-3h8z" fill="#f2907f"/>
      <path d="M52 72q8-6 16 0" fill="none" stroke="#3b2a1c" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M38 40l10 5M82 40l-10 5" stroke="#3b2a1c" stroke-width="2.5" stroke-linecap="round" fill="none"/>
    </g>

    <g class="face face-good">
      <path d="M40 54q6-9 12 0M68 54q6-9 12 0" fill="none" stroke="#3b2a1c" stroke-width="3" stroke-linecap="round"/>
      <path d="M60 62l-4-3h8z" fill="#f2907f"/>
      <path d="M50 68q10 10 20 0" fill="none" stroke="#3b2a1c" stroke-width="2.5" stroke-linecap="round"/>
      <ellipse cx="34" cy="64" rx="6" ry="4" fill="#f2907f" opacity=".55"/>
      <ellipse cx="86" cy="64" rx="6" ry="4" fill="#f2907f" opacity=".55"/>
    </g>

    <g stroke="#3b2a1c" stroke-width="1.6" stroke-linecap="round" opacity=".55">
      <path d="M28 58H10M28 64l-17 6M92 58h18M92 64l17 6"/>
    </g>
  </g>
</svg>`;
}

function islandArt() {
  return `
<svg class="island" viewBox="0 0 400 300" role="img" aria-label="A small island with a coconut tree">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#bfe8ff"/>
      <stop offset="70%" stop-color="#ffe8c9"/>
      <stop offset="100%" stop-color="#ffd7ae"/>
    </linearGradient>
    <linearGradient id="sea" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#4fc4d6"/>
      <stop offset="100%" stop-color="#2a8fb5"/>
    </linearGradient>
    <linearGradient id="sand" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#ffe7b0"/>
      <stop offset="100%" stop-color="#e9c07a"/>
    </linearGradient>
  </defs>

  <rect width="400" height="300" fill="url(#sky)"/>
  <circle cx="330" cy="52" r="26" fill="#ffe27a" opacity=".9"/>
  <circle cx="330" cy="52" r="38" fill="#ffe27a" opacity=".25"/>

  <g fill="#fff" opacity=".8">
    <ellipse cx="80" cy="52" rx="26" ry="13"/><ellipse cx="98" cy="46" rx="18" ry="12"/>
    <ellipse cx="230" cy="34" rx="20" ry="10"/><ellipse cx="245" cy="30" rx="14" ry="9"/>
  </g>

  <rect y="196" width="400" height="104" fill="url(#sea)"/>
  <g fill="none" stroke="#bff0f7" stroke-width="3" stroke-linecap="round" opacity=".7">
    <path class="wave w1" d="M18 224q10-7 20 0t20 0"/>
    <path class="wave w2" d="M300 240q10-7 20 0t20 0"/>
    <path class="wave w3" d="M120 268q10-7 20 0t20 0"/>
  </g>

  <ellipse cx="200" cy="222" rx="162" ry="42" fill="#ffeec6" opacity=".65"/>
  <ellipse cx="200" cy="216" rx="146" ry="36" fill="url(#sand)"/>

  <g class="tree">
    <path d="M322 216q-8-40 4-64" fill="none" stroke="#a9743f" stroke-width="11" stroke-linecap="round"/>
    <g fill="#4fb36a">
      <path d="M326 150q26-18 46-6-24 2-42 14z"/>
      <path d="M326 150q22-26 12-46-16 18-16 44z"/>
      <path d="M326 150q-26-16-46-2 24 0 42 12z"/>
      <path d="M326 150q-10-26-32-30 14 16 26 34z"/>
    </g>
    <g fill="#8a5a2b"><circle cx="322" cy="156" r="5"/><circle cx="332" cy="158" r="4"/></g>
  </g>

  <g opacity=".8">
    <path d="M96 232q6-8 12 0-6 5-12 0z" fill="#ffb3b8"/>
    <circle cx="286" cy="236" r="3" fill="#ffd0a1"/>
    <circle cx="118" cy="242" r="2.5" fill="#ffd0a1"/>
  </g>
</svg>`;
}
