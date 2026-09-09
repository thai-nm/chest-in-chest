// Scratch-off canvas. Drag with mouse or finger to erase the cover.

function initScratchcard(canvas, options) {
  const opts = options || {};
  const threshold = opts.threshold || 0.5;
  const onComplete = opts.onComplete || function () {};

  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  let dpr = 1;
  let drawing = false;
  let scratched = false;
  let done = false;
  let last = null;

  function paintCover() {
    const w = canvas.width;
    const h = canvas.height;
    ctx.globalCompositeOperation = "source-over";
    ctx.clearRect(0, 0, w, h);

    const g = ctx.createLinearGradient(0, 0, w, h);
    g.addColorStop(0, "#d8b26a");
    g.addColorStop(0.45, "#f0d79a");
    g.addColorStop(0.55, "#c8a05a");
    g.addColorStop(1, "#e6c583");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);

    ctx.fillStyle = "rgba(255,255,255,.22)";
    for (let i = 0; i < 60; i++) {
      const x = Math.random() * w;
      const y = Math.random() * h;
      ctx.beginPath();
      ctx.arc(x, y, Math.random() * 2.5 * dpr + dpr, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.fillStyle = "rgba(120, 80, 30, .55)";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "700 " + Math.round(16 * dpr) + "px 'Nunito', system-ui, sans-serif";
    ctx.fillText("SCRATCH HERE", w / 2, h / 2 - 10 * dpr);
    ctx.font = Math.round(20 * dpr) + "px system-ui, sans-serif";
    ctx.fillText("★  ★  ★", w / 2, h / 2 + 20 * dpr);
  }

  function resize() {
    if (scratched) return;
    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    paintCover();
  }

  function pointAt(e) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: (e.clientX - rect.left) * (canvas.width / rect.width),
      y: (e.clientY - rect.top) * (canvas.height / rect.height),
    };
  }

  function erase(from, to) {
    const r = 22 * dpr;
    ctx.globalCompositeOperation = "destination-out";
    ctx.lineWidth = r * 2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(to.x, to.y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  function clearedRatio() {
    const step = 8;
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let clear = 0;
    let total = 0;
    for (let i = 3; i < data.length; i += 4 * step) {
      total++;
      if (data[i] < 40) clear++;
    }
    return total ? clear / total : 0;
  }

  function finish() {
    if (done) return;
    done = true;
    canvas.classList.add("gone");
    onComplete();
  }

  function start(e) {
    if (done) return;
    drawing = true;
    scratched = true;
    last = pointAt(e);
    erase(last, last);
    canvas.setPointerCapture && canvas.setPointerCapture(e.pointerId);
  }

  function move(e) {
    if (!drawing || done) return;
    e.preventDefault();
    const p = pointAt(e);
    erase(last, p);
    last = p;
  }

  function end() {
    if (!drawing) return;
    drawing = false;
    if (!done && clearedRatio() >= threshold) finish();
  }

  canvas.addEventListener("pointerdown", start);
  canvas.addEventListener("pointermove", move, { passive: false });
  canvas.addEventListener("pointerup", end);
  canvas.addEventListener("pointercancel", end);
  canvas.addEventListener("pointerleave", end);
  window.addEventListener("resize", resize);

  resize();

  return { resize: resize, revealAll: finish };
}
