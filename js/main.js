// Game flow: one chest at a time, question, answer check, then the reward.

const el = {
  title: document.getElementById("title"),
  subtitle: document.getElementById("subtitle"),
  progress: document.getElementById("progress"),
  gameScene: document.getElementById("game-scene"),
  rewardScene: document.getElementById("reward-scene"),
  islandSlot: document.getElementById("island-slot"),
  catSlot: document.getElementById("cat-slot"),
  chestSlot: document.getElementById("chest-slot"),
  question: document.getElementById("question"),
  feedback: document.getElementById("feedback"),
  form: document.getElementById("answer-form"),
  answerLabel: document.querySelector('label[for="answer"]'),
  input: document.getElementById("answer"),
  submit: document.querySelector("#answer-form button"),
  rewardAmount: document.getElementById("reward-amount"),
  rewardNote: document.getElementById("reward-note"),
  scratch: document.getElementById("scratch"),
  scratchHint: document.getElementById("scratch-hint"),
  revealAll: document.getElementById("reveal-all"),
};

let current = 0;
let busy = false;
let card = null;

// NFC keeps Vietnamese accents comparable: some keyboards send "à" as one
// code point, others as "a" plus a combining mark.
function normalize(text) {
  return String(text).normalize("NFC").trim().toLowerCase().replace(/\s+/g, " ");
}

function pick(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function setMood(mood) {
  const cat = el.catSlot.querySelector(".cat");
  if (!cat) return;
  cat.classList.remove("mood-neutral", "mood-bad", "mood-good");
  void cat.offsetWidth;
  cat.classList.add("mood-" + mood);
}

function drawProgress() {
  el.progress.innerHTML = "";
  CHESTS.forEach((_, i) => {
    const li = document.createElement("li");
    if (i < current) li.className = "done";
    else if (i === current) li.className = "current";
    li.title = MESSAGES.altChest + " " + (i + 1);
    el.progress.appendChild(li);
  });
}

// Chests are nested, so each one is a lot smaller than the last.
// Width is a % of the stage: 34, 25.5, 19.1, 14.3, 10.8 ...
const CHEST_START_WIDTH = 34;
const CHEST_SHRINK = 0.75;
const CHEST_MIN_WIDTH = 8;

function chestWidth(index) {
  const w = CHEST_START_WIDTH * Math.pow(CHEST_SHRINK, index);
  return Math.max(w, CHEST_MIN_WIDTH);
}

function showChest(index, entering) {
  el.chestSlot.className = "chest-slot" + (entering ? " is-entering" : "");
  el.chestSlot.style.width = chestWidth(index) + "%";
  el.chestSlot.innerHTML = chestArt(index);
  el.question.textContent = CHESTS[index].question;
  drawProgress();
}

function setFeedback(text, kind) {
  el.feedback.textContent = text;
  el.feedback.className = "feedback" + (kind ? " " + kind : "");
}

function wrongAnswer() {
  setMood("bad");
  setFeedback(pick(MESSAGES.wrong), "bad");
  el.chestSlot.classList.remove("is-wrong", "is-entering");
  void el.chestSlot.offsetWidth;
  el.chestSlot.classList.add("is-wrong");
  el.input.select();
}

function rightAnswer() {
  busy = true;
  setMood("good");
  setFeedback(pick(MESSAGES.right), "good");
  el.chestSlot.classList.add("is-open");
  el.input.value = "";
  el.input.blur();
  el.input.disabled = true;
  el.submit.disabled = true;

  setTimeout(() => {
    current++;
    if (current >= CHESTS.length) {
      showReward();
      return;
    }
    el.chestSlot.classList.add("is-leaving");
    setTimeout(() => {
      showChest(current, true);
      setMood("neutral");
      setFeedback(MESSAGES.next);
      el.input.disabled = false;
      el.submit.disabled = false;
      el.input.focus();
      busy = false;
    }, 480);
  }, 1400);
}

function onSubmit(event) {
  event.preventDefault();
  if (busy) return;
  const given = normalize(el.input.value);
  if (!given) return;
  if (given === normalize(CHESTS[current].answer)) rightAnswer();
  else wrongAnswer();
}

function showReward() {
  drawProgress();
  el.gameScene.hidden = true;
  el.rewardScene.hidden = false;
  el.rewardAmount.textContent = REWARD.amount;
  el.rewardNote.textContent = REWARD.note;

  card = initScratchcard(el.scratch, {
    threshold: 0.45,
    onComplete: () => {
      el.scratchHint.textContent = MESSAGES.done;
      el.revealAll.hidden = true;
    },
  });
  requestAnimationFrame(() => card.resize());
}

function start() {
  document.title = GAME.title;
  el.title.textContent = GAME.title;
  el.subtitle.textContent = GAME.subtitle;
  el.answerLabel.textContent = MESSAGES.answerLabel;
  el.input.placeholder = MESSAGES.answerPlaceholder;
  el.submit.textContent = MESSAGES.submit;
  el.progress.setAttribute("aria-label", MESSAGES.altProgress);
  el.scratch.setAttribute("aria-label", MESSAGES.altCard);
  el.islandSlot.innerHTML = islandArt();
  el.catSlot.innerHTML = catArt();
  showChest(0, false);
  setMood("neutral");
  setFeedback(MESSAGES.start);
  el.form.addEventListener("submit", onSubmit);
  el.revealAll.addEventListener("click", () => card && card.revealAll());
}

start();
